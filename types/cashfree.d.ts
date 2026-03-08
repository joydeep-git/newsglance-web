declare module "@cashfreepayments/cashfree-js" {
  export interface CashfreeLoadOptions {
    mode: "sandbox" | "production";
  }

  export interface CheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: "_self" | "_blank" | "_top" | "_modal";
    appearance?: Record<string, unknown>;
  }

  export interface CashfreeInstance {
    checkout(options: CheckoutOptions): Promise<{ error?: unknown; redirect?: unknown }>;
  }

  export function load(options: CashfreeLoadOptions): Promise<CashfreeInstance>;
}
