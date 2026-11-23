# Content review checklist

Developer-facing file. Lists claims on the site that need scientific, legal, or regulatory confirmation before public launch. Nothing here is hidden from the code; items marked **Hidden by default** are not rendered until verified.

Legend: **Source checked** means the claim was traced to a public source during development. It does not mean the claim has been approved by EsoClear's scientific, legal, or regulatory leads.

## 1. Preclinical data (Evidence section and mechanism steps)

| Item | Where | Status | Action |
| --- | --- | --- | --- |
| Stricture rates: wild-type 16/25 (64%), heterozygous *Serpine1* 2/12 (~16-17%), homozygous knockout 0/8 (0%), tiplaxtinin 0/5 (0%) | `evidence.chart.rows` | Source checked against the published patent application US 2026/0166009 A1 (text and figure legend). Not yet checked against the originating study records. | Confirm all counts with the study team. Figure-legend group sizes in the application are not fully consistent with the results text. |
| Homozygous knockout group size (n = 8) | `evidence.chart.rows` | The patent text prints the genotype symbols inconsistently (+/- appears for both knockout and heterozygous groups). n = 8 for the knockout group is inferred from the surrounding text. | Confirm with the study team. |
| "Approximately 16-17%" for heterozygous | `evidence.chart.rows` | 2/12 = 16.7%. The source text states both 16% and 17%. | Confirm preferred presentation. |
| Model description (mouse, alkali injury, barium swallow at day 7) | chart title, steps 2 and 6 | Taken from the application text. The same document also contains a phrase referring to "colonic" injury, which appears inconsistent with an esophageal model. | Confirm model description and wording. |
| Tiplaxtinin "given after alkali exposure" (6 hours post-exposure in the application) | Pathway B, step 2 | Timing is not displayed numerically; wording is "after alkali exposure". | Confirm dosing route, dose, and timing before adding detail. |
| "Stronger PAI-1 immunostaining in injured tissue" | Pathway A, step 2 | Based on the application's figure legend (7 days after alkali exposure). | Confirm with the study team. |
| Data is unpublished in a peer-reviewed journal | Evidence section | Cited as a pending patent application only. | Confirm whether a manuscript exists to cite instead; confirm the data may appear publicly. |
| Small group sizes | Chart footnote | Disclosed on the page. | Keep the disclosure. |

## 2. Mechanism of action

- PAI-1 as principal inhibitor of tPA/uPA and its role in fibrosis (Ghosh and Vaughan, PMID 21465481): source checked. Confirm the reference's exact scope (it supports fibrosis in several organs, not the esophagus).
- Steps labelled "Proposed / conceptual" (fibroblast/myofibroblast activation, modulation of the remodeling environment, attenuation of collagen accumulation) are hypotheses, not demonstrated findings. Confirm the labels with the scientists.
- The page states that PAI-1 is not the sole proven cause of caustic esophageal stricture. Keep this wording.
- The tissue schematic changes with each selected step (`src/components/TissueSchematic.tsx` holds the visual parameters; step captions are in `mechanism.pathways.*.visuals`). The drawing is conceptual and unquantified. Have the scientists confirm that each step's visual (for example, plasmin absent in step 3 without inhibition, plasmin restored in step 4 with inhibition) and caption wording matches their understanding. Pathway B step 6 is captioned as observed in the cited mouse model and "not demonstrated in people".

## 3. Tiplaxtinin / PAI-039 claims

| Claim | Status | Action |
| --- | --- | --- |
| Small-molecule PAI-1 inhibitor, orally active | Elokdah et al., J Med Chem (2004). Source checked via title and abstract. | Confirm author list, volume, pages, DOI. |
| Reduced plasma PAI-1 activity in a canine thrombosis model | Hennan et al., J Pharmacol Exp Ther (2005). Source checked via title and abstract. | Confirm author list, volume, pages, DOI. |
| "Originally investigated in earlier drug discovery programs" | Supported by the two publications above. | Confirm; do not name the originating company or any clinical history without documentation. |
| Chemical name | From the title of the JPET paper. | Confirm against the registered structure. Molecule graphic on the site is a decorative motif, labelled as not a chemical structure. |
| "Repurposing opportunity" / "potentially more efficient development strategy" | Qualified language only. | Do not add statements about a transferable IND, prior Phase 1 trials, toxicology data access, or "de-risked" status without documents. |
| Development position "Preclinical / IND planning, subject to confirmation" | Supplied copy. | Confirm and edit. |

## 4. Clinical need

- No incidence, hospitalization, or outcome numbers are published. Add only with citations.
- "Recurrent endoscopic dilations, anesthesia, nutritional support, or reconstructive interventions": cited qualitatively to a *J Pediatr Surg* article on procedural and surgical interventions after pediatric caustic ingestion. Confirm that the article supports each element, and confirm the full bibliographic details.
- "Limited disease-modifying treatment options" and "unmet need is a disease-modifying approach": confirm against current clinical guidance and literature that no established therapy prevents stricture formation.
- Pediatric target population is stated as the intended population; no pediatric data exist on the site.

## 5. Pipeline statuses (defaults in `pipeline.milestones`)

| Milestone | Default | Note |
| --- | --- | --- |
| 01 Target Discovery | evidence-supported | Supported by the preclinical observations in the patent application. |
| 02 Preclinical Proof of Concept | evidence-supported | Early animal observations only. Change to "in-progress" or "planned" if the team does not consider this complete. |
| 03-05 | proposed | No IND-enabling work, IND, or NDA activity is claimed. |

No milestone is marked "in-progress" by default. Update only with confirmation.

## 6. Regulatory statements

- Orphan Drug Designation, Rare Pediatric Disease Designation, IND-enabling studies, pediatric development planning: described as potential or planned. No designation is claimed.
- FDA INTERACT meetings are a CBER program (biologics and cell/gene products). A small-molecule program would typically use CDER pre-IND engagement. The text follows the supplied copy ("FDA INTERACT or other appropriate early agency engagement"). Confirm wording with regulatory counsel; no reference link is given for INTERACT.
- Confirm the current statutory status of the Rare Pediatric Disease designation and priority review voucher program before describing it, since it depends on Congressional authorization.
- FDA reference links (orphan, rare pediatric, IND, NDA pages) were checked to resolve at development time; re-verify before launch.
- Footer states PAI-039 is not FDA-approved for this use. Keep.

## 7. Institutional and people claims

| Item | Status | Action |
| --- | --- | --- |
| "Associated with Morehouse School of Medicine" | Supplied copy. | Confirm the license/option or other agreement that supports this statement and any permitted wording. No institutional logos are used. |
| Dr. Julia J. Liu: "Professor of Medicine and Chief, Division of Gastroenterology and Hepatology, Morehouse School of Medicine" | Matches the Morehouse School of Medicine public faculty pages at development time. | **Get Dr. Liu's approval** of her title, wording, and inclusion. Confirm current title. |
| "Named inventor on the published patent application" | Source checked (inventors listed as Julia Liu and Sudip Banerjee on US 2026/0166009 A1). | Confirm. Other inventors are not named on the site; add only with approval. |
| "Investigates the role of PAI-1 in caustic esophageal injury" | Supplied copy, consistent with the application. | Confirm. |
| Expertise list (gastroenterology, immunology, translational medicine, commercialization, IP development) | Supplied copy. | Confirm it reflects actual expertise of people associated with the company. |
| No regulatory advisors, former officials, or partner institutions are named. | - | Keep unless approved in writing. |

## 8. Intellectual property

| Identifier | Displayed | Status |
| --- | --- | --- |
| US 19/419,490 | Yes | Verified as US 2026/0166009 A1 (pending; priority date 2024-12-16, filed 2025-12-15, published 2026-06-18). Public databases list Morehouse School of Medicine as applicant/assignee, not EsoClear. |
| PCT/US2025/010891 | **Hidden by default** | Supplied, not verified. |
| US 19/711,850 | **Hidden by default** | Supplied, not verified. |
| PCT/US25/59598 | **Hidden by default** | Supplied, not verified. |

Actions: confirm each identifier and its status; confirm EsoClear's ownership or license rights before any ownership language is added; have patent counsel approve the IP paragraph. A published PCT application (WO 2026/136207) appears to relate to the same subject matter but was not matched to a supplied identifier. The site describes only public information and does not discuss nonpublic patent strategy.

## 9. Legal and operational

- Privacy notice (footer): states there are no advertising trackers or analytics cookies and that the form opens the visitor's email app. Have counsel review; update if analytics or a form backend is added. Hosting providers may keep server logs.
- Contact address: none configured. Supply approved addresses through environment variables (see README).
- Domain and `NEXT_PUBLIC_SITE_URL`: not set. Needed for canonical URLs, sitemap, and social cards.
- Structured data (JSON-LD) is omitted until company details (legal name, address, contact) are verified.
- Trademark: the EsoClear name and logo mark are used without a trademark symbol. Confirm clearance and branding.
- Forward-looking statements and investigational disclaimers appear in the footer and near the evidence and candidate sections. Have counsel review.

## 10. Testing notes

At development time the project was checked with `npm run lint`, `npx tsc --noEmit`, and `npm run build`, and visually reviewed in a browser at desktop (1440 px) and mobile (390 px) widths, including the mobile drawer, mechanism tabs and nodes, and form validation. No automated accessibility audit, screen reader testing, or cross-browser testing has been performed. Before launch, run a WCAG 2.2 AA audit (keyboard, screen reader, contrast) and test on real iOS and Android devices.
