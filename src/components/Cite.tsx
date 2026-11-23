import { referenceNumber } from "@/data/references";

export function Cite({ ids }: { ids?: string[] }) {
  if (!ids || ids.length === 0) return null;
  return (
    <sup className="ml-0.5 whitespace-nowrap text-[0.7em] font-semibold">
      {ids.map((id, index) => {
        const number = referenceNumber(id);
        return (
          <span key={id}>
            {index > 0 ? <span aria-hidden="true">,</span> : null}
            <a
              href={`#ref-${id}`}
              aria-label={`Reference ${number}`}
              className="text-teal-deep underline-offset-2 hover:underline"
            >
              [{number}]
            </a>
          </span>
        );
      })}
    </sup>
  );
}
