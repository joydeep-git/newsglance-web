"use client";

import { useGoogleAuth } from "@/hooks/authHooks";
import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/store";
import { setLoginState } from "@/redux/slices/uiSlice";
import { GoogleAuthResponseType } from "@/types/authTypes";
import { setLogout, setUser } from "@/redux/slices/authSlice";

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (params: {
            client_id: string;
            callback: (response: GoogleAuthResponseType) => void;
            auto_select?: boolean;
            context?: string;
            nonce?: string;
            ux_mode?: "popup" | "redirect";
            hosted_domain?: string;
            prompt_parent_id?: string;
          }) => void;
          renderButton: (
            parent: HTMLElement | null,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "small" | "medium" | "large";
              text?: "signin_with" | "signup_with" | "continue_with" | "signup_with_google";
              shape?: "rectangular" | "pill" | "circle";
              logo_alignment?: "left" | "center";
              width?: string;
              locale?: string;
            }
          ) => void;
          prompt: (options?: { prompt_parent_id?: string }) => void;
        };
      };
    };
  }
}

const GoogleAuthButton = () => {

  const { mutate, isPending } = useGoogleAuth();

  const dispatch = useAppDispatch();
  const buttonRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);


  const handleCredentialResponse = useCallback(
    (response: GoogleAuthResponseType) => {

      const idToken = response.credential;

      mutate(idToken,
        {
          onSuccess: (data) => {
            toast.success(data.message || "Authentication successful!");
            dispatch(setUser(data.data));
            dispatch(setLoginState(false));
          },
          onError: (err) => {
            toast.error(err.message || "Google authentication failed!");
            dispatch(setLogout());
          },
        }
      );
    },
    [mutate, dispatch]
  );

  useEffect(() => {

    if (initialized.current) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          width: "100%",
        });
      } else {
        console.error("Google Identity Services script failed to load properly.");
      }
    };

    initialized.current = true;

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

  }, [handleCredentialResponse]);


  return (
    <div className="w-full">
      <div
        ref={buttonRef}
        style={{ flex: 1, pointerEvents: isPending ? "none" : "auto", opacity: isPending ? 0.5 : 1 }}
      />
    </div>
  );
};

export default GoogleAuthButton;