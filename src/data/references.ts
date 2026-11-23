/**
 * Central reference list. Claims in siteContent.ts cite entries by `id`.
 * Numbering shown on the site follows the order of this array.
 *
 * Only add entries that can be traced to a real, checkable source.
 * Bibliographic details flagged in CONTENT_REVIEW.md must be confirmed by the
 * science team before publication.
 */

export type ReferenceKind = "publication" | "patent" | "regulatory";

export interface Reference {
  id: string;
  kind: ReferenceKind;
  citation: string;
  url: string;
  note?: string;
}

export const references: Reference[] = [
  {
    id: "patent-us2026166009",
    kind: "patent",
    citation:
      "Liu J, Banerjee S. Method of preventing and/or treating tissue damage or injury. U.S. Patent Application Publication No. US 2026/0166009 A1 (Application No. 19/419,490; pending; published June 18, 2026).",
    url: "https://patents.google.com/patent/US20260166009A1/en",
    note: "Pending patent application; not an issued patent. Source of the preclinical animal-model observations shown on this site.",
  },
  {
    id: "ghosh2012",
    kind: "publication",
    citation:
      "Ghosh AK, Vaughan DE. PAI-1 in tissue fibrosis. J Cell Physiol. 2012;227(2):493-507. PMID: 21465481.",
    url: "https://pubmed.ncbi.nlm.nih.gov/21465481/",
  },
  {
    id: "elokdah2004",
    kind: "publication",
    citation:
      "Elokdah H, et al. Tiplaxtinin, a novel, orally efficacious inhibitor of plasminogen activator inhibitor-1: design, synthesis, and preclinical characterization. J Med Chem. 2004.",
    url: "https://www.scilit.com/publications/e9478f2e726ea6708f11d5b4b8e3c179",
  },
  {
    id: "hennan2005",
    kind: "publication",
    citation:
      "Hennan JK, et al. Evaluation of PAI-039 [{1-benzyl-5-[4-(trifluoromethoxy)phenyl]-1H-indol-3-yl}(oxo)acetic acid], a novel plasminogen activator inhibitor-1 inhibitor, in a canine model of coronary artery thrombosis. J Pharmacol Exp Ther. 2005.",
    url: "https://jpet.aspetjournals.org/article/S0022-3565(24)32134-2/fulltext",
  },
  {
    id: "jpedsurg-caustic",
    kind: "publication",
    citation:
      "Procedural and surgical interventions for esophageal stricture secondary to caustic ingestion in children. J Pediatr Surg.",
    url: "https://www.jpedsurg.org/article/S0022-3468(23)00080-5/fulltext",
    note: "Cited qualitatively for the range of procedural and surgical care; no figures from this article are reproduced.",
  },
  {
    id: "fda-orphan",
    kind: "regulatory",
    citation:
      "U.S. Food and Drug Administration. Designating an Orphan Product: Drugs and Biological Products.",
    url: "https://www.fda.gov/industry/developing-products-rare-diseases-conditions/designating-orphan-product-drugs-and-biological-products",
  },
  {
    id: "fda-rpd",
    kind: "regulatory",
    citation:
      "U.S. Food and Drug Administration. Rare Pediatric Disease Designation and Priority Review Voucher Programs.",
    url: "https://www.fda.gov/industry/medical-products-rare-diseases-and-conditions/rare-pediatric-disease-designation-and-priority-review-voucher-programs",
  },
  {
    id: "fda-ind",
    kind: "regulatory",
    citation:
      "U.S. Food and Drug Administration. Investigational New Drug (IND) Application.",
    url: "https://www.fda.gov/drugs/types-applications/investigational-new-drug-ind-application",
  },
  {
    id: "fda-nda",
    kind: "regulatory",
    citation:
      "U.S. Food and Drug Administration. New Drug Application (NDA).",
    url: "https://www.fda.gov/drugs/types-applications/new-drug-application-nda",
  },
];

const referenceIndex = new Map(
  references.map((reference, index) => [reference.id, index + 1] as const),
);

export function referenceNumber(id: string): number {
  const number = referenceIndex.get(id);
  if (!number) {
    throw new Error(`Unknown reference id: ${id}`);
  }
  return number;
}
