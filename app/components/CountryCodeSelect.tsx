import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { countryCodes } from "../data/content";

type Country = (typeof countryCodes)[number];

export function CountryCodeSelect({
  name,
  defaultCode,
  required,
}: {
  name: string;
  defaultCode?: string;
  required?: boolean;
}) {
  const [selected, setSelected] = useState<Country | null>(
    () => (defaultCode ? countryCodes.find((c) => c.code === defaultCode) ?? null : null)
  );
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? countryCodes
      : countryCodes.filter((c) =>
          `${c.country} ${c.code}`.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox value={selected} onChange={setSelected} onClose={() => setQuery("")}>
      <div className="relative w-[180px]">
        <ComboboxInput
          className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm outline-none"
          displayValue={(c: Country | null) => (c ? `${c.code} ${c.country}` : "")}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="País"
          autoComplete="off"
          required={required}
        />
        <ComboboxOptions
          anchor="bottom start"
          transition
          className="z-10 max-h-60 w-[var(--input-width)] overflow-auto rounded-lg border border-border bg-surface py-1 text-sm shadow-lg [--anchor-gap:4px] empty:hidden"
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-ink-faint">Sin resultados</div>
          ) : (
            filtered.map((c) => (
              <ComboboxOption
                key={`${c.code}-${c.country}`}
                value={c}
                className="cursor-pointer px-3 py-2 data-focus:bg-b2b-tag-bg data-focus:text-b2b-tag-ink"
              >
                {c.code} {c.country}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
      <input type="hidden" name={name} value={selected?.code ?? ""} />
    </Combobox>
  );
}
