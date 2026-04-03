"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { PhoneInputWithCountryProps } from "@/types/authTypes";
import { countryMap } from "@/utils/constants";


// ─── Derived data from the canonical Map ────────────────────────────────────

const COUNTRY_LIST = [...countryMap.entries()]
  .map(([code, { name, flag, countrycode }]) => ({
    code,
    name,
    flag,
    dialCode: countrycode.replace(/[^0-9]/g, ""),
    dialCodeRaw: countrycode,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

/** O(1) lookup by ISO-2 code */
const COUNTRY_MAP_FAST = new Map(COUNTRY_LIST.map((c) => [c.code, c]));


/** keep only digits */
function digitsOnly(val: string) {
  return val.replace(/\D/g, "");
}

/** Build E.164 string from country code + national number digits */
function buildE164(countryCode: string, nationalDigits: string): string | undefined {
  if (!nationalDigits) return undefined;
  const entry = COUNTRY_MAP_FAST.get(countryCode);
  if (!entry) return undefined;
  return `+${entry.dialCode}${nationalDigits}`;
}

/**
 * Given an E.164 value like "+919876543210" and a fallback country code,
 * return { countryCode, nationalDigits }.
 *
 * Strategy: try every entry ordered by dialCode length desc
 * so "+1868…" matches TT (+1-868) before US (+1).
 */
const BY_DIAL_LENGTH = [...COUNTRY_LIST].sort(
  (a, b) => b.dialCode.length - a.dialCode.length
);

function parseE164(value: string | undefined, fallback: string) {
  if (!value) return { countryCode: fallback, nationalDigits: "" };

  const digits = digitsOnly(value);

  for (const entry of BY_DIAL_LENGTH) {
    if (digits.startsWith(entry.dialCode)) {
      return {
        countryCode: entry.code,
        nationalDigits: digits.slice(entry.dialCode.length),
      };
    }
  }

  return { countryCode: fallback, nationalDigits: digits };
}

// ─── Component ───────────────────────────────────────────────────────────────

const PhoneInputWithCountry = ({
  value,
  onChange,
  onCountryChange,
  defaultCountry = "IN",
  placeholder = "",
  disabled = false,
  id,
  className,
  "aria-invalid": ariaInvalid,
}: PhoneInputWithCountryProps) => {

  const { countryCode, nationalDigits } = useMemo(
    () => parseE164(value, defaultCountry),
    [value, defaultCountry]
  );

  const selected = COUNTRY_MAP_FAST.get(countryCode) ?? COUNTRY_MAP_FAST.get(defaultCountry)!;
  const triggerLabel = `${selected.flag} ${selected.dialCodeRaw}`;

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleCountryChange = (newCode: string | null) => {
    if (!newCode) return;
    onCountryChange?.(newCode);
    const e164 = buildE164(newCode, nationalDigits);
    onChange(e164);
  };

  const handleNationalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = digitsOnly(e.target.value);
    const e164 = buildE164(countryCode, digits);
    onChange(e164);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={cn("w-full", className)}>
      <Combobox
        items={COUNTRY_LIST.map((c) => c.code)}
        value={countryCode}
        onValueChange={handleCountryChange}
        disabled={disabled}
        filter={(itemValue, query) => {
          const q = query.trim().toLowerCase();
          if (!q) return true;
          const entry = COUNTRY_MAP_FAST.get(itemValue);
          if (!entry) return false;
          return (
            entry.name.toLowerCase().includes(q) ||
            itemValue.toLowerCase().includes(q) ||      // ISO code "IN"
            entry.dialCode.includes(q) ||
            entry.dialCodeRaw.includes(q)               // "+91"
          );
        }}
      >
        <InputGroup className="flex items-center gap-3">

          <ComboboxTrigger
            className={cn(
              "w-28 justify-around px-2 py-1.5",
              "hover:bg-muted/50 rounded-l-[calc(var(--radius)-2px)] transition-colors flex"
            )}
          >
            <span className="truncate text-sm">{triggerLabel}</span>
          </ComboboxTrigger>

          <InputGroupInput
            id={id}
            type="tel"
            inputMode="numeric"
            placeholder={placeholder}
            value={nationalDigits}
            onChange={handleNationalChange}
            disabled={disabled}
            aria-invalid={ariaInvalid}
          />

        </InputGroup>

        <ComboboxContent className="w-72">
          <ComboboxInput
            placeholder="Search by name, code or dial code..."
            className="w-full border-none shadow-none focus-visible:ring-0 focus:ring-0 focus:outline-none"
            showClear
            showTrigger={false}
          />

          <ComboboxEmpty>No results</ComboboxEmpty>

          <ComboboxList className="max-h-[252px]">
            {(code: string) => {
              const entry = COUNTRY_MAP_FAST.get(code);
              if (!entry) return null;
              return (
                <ComboboxItem key={code} value={code}>
                  {/* Flag */}
                  <span className="shrink-0 text-base leading-none">{entry.flag}</span>

                  {/* Country name */}
                  <span className="flex-1 min-w-0 truncate">{entry.name}</span>

                  {/* Dial code */}
                  <span className="shrink-0 text-muted-foreground text-xs">
                    {entry.dialCodeRaw}
                  </span>
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default PhoneInputWithCountry;