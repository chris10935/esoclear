/**
 * Single source of truth for site copy and structured content.
 * Edit text here; components render whatever is defined below.
 *
 * Compliance reminders (see CONTENT_REVIEW.md):
 *  - Keep animal-model results labelled as preclinical.
 *  - Do not add numeric incidence / hospitalization figures without a citation.
 *  - Do not change a pipeline status or a patent `verified` flag without
 *    documentary confirmation.
 */

export const siteContent = {
  company: {
    name: "EsoClear",
    legalName: "EsoClear, LLC",
    footerTagline:
      "Advancing targeted approaches to prevent caustic esophageal fibrosis.",
  },

  meta: {
    title: "EsoClear | Advancing Prevention of Caustic Esophageal Stricture",
    description:
      "EsoClear is advancing an investigational PAI-1 targeted therapeutic approach to prevent caustic esophageal stricture following severe esophageal injury.",
    keywords: [
      "EsoClear",
      "Caustic Esophageal Stricture",
      "Pediatric Rare Disease",
      "PAI-1",
      "SERPINE1",
      "Tiplaxtinin",
      "PAI-039",
      "Esophageal Fibrosis",
      "Drug Repurposing",
      "Translational Medicine",
    ],
  },

  nav: [
    { label: "The Need", href: "#need", ids: ["need"] },
    { label: "The Science", href: "#mechanism", ids: ["mechanism", "evidence"] },
    { label: "PAI-039", href: "#candidate", ids: ["candidate"] },
    { label: "Development", href: "#development", ids: ["development"] },
    { label: "Our Foundation", href: "#foundation", ids: ["foundation"] },
    { label: "Contact", href: "#contact", ids: ["contact"] },
  ],

  hero: {
    eyebrow: "Pediatric caustic esophageal injury",
    headline: "Preventing the Scar Before It Changes a Child's Life.",
    subheadline:
      "Advancing a targeted therapeutic approach to prevent caustic esophageal stricture following severe chemical injury.",
    paragraphs: [
      "Caustic esophageal injury can initiate progressive fibrosis, leaving children facing recurrent endoscopic dilations, nutritional complications, and potentially lifelong consequences.",
      "EsoClear is investigating a targeted approach to interrupt the molecular processes that drive pathological scarring.",
    ],
    statement:
      "Targeting PAI-1 to investigate the prevention of injury-induced esophageal fibrosis.",
    primaryCta: { label: "Explore the Science", href: "#mechanism" },
    secondaryCta: { label: "Meet Our Therapeutic Candidate", href: "#candidate" },
    illustration: {
      caption:
        "Schematic illustration of injury-induced fibrosis. Conceptual; not clinical imaging.",
      sliderLabel: "Progression from healthy wall to fibrosis",
      sliderHint: "Drag to scrub through the sequence, or select a stage.",
      passage: {
        button: "Trace passage",
        running: "Tracing passage through the lumen…",
        passed: "The illustrative bolus passes through the open lumen.",
        stalled: "The illustrative bolus stalls where the lumen is narrowed.",
        note: "Illustrative only. Not a model of clinical severity or swallowing function.",
      },
      lumenStatus: ["Lumen open", "Lumen narrowing", "Lumen markedly narrowed"],
      stages: [
        {
          label: "Healthy esophageal wall",
          detail: "Open lumen and flexible, layered tissue.",
          target: 0,
        },
        {
          label: "Chemical injury",
          detail: "Damage to the lining and deeper layers, with inflammation.",
          target: 38,
        },
        {
          label: "Fibrosis and narrowing",
          detail: "Dense scar tissue progressively narrows the lumen.",
          target: 100,
        },
      ],
    },
  },

  need: {
    id: "need",
    eyebrow: "The unmet clinical need",
    heading: "When Healing Becomes Harmful",
    intro: [
      "Caustic esophageal injury occurs when corrosive substances damage the lining and deeper tissues of the esophagus.",
      "Although acute treatment can address the initial injury, the subsequent inflammatory and fibrotic response may produce dense scar tissue that narrows the esophagus.",
      "This complication, known as caustic esophageal stricture, can severely impair swallowing and nutritional intake.",
    ],
    cards: [
      {
        icon: "triangle-alert",
        title: "Severe Initial Injury",
        body: "Corrosive exposure can trigger deep esophageal tissue damage and a prolonged inflammatory response.",
      },
      {
        icon: "layers",
        title: "Progressive Fibrosis",
        body: "Unregulated tissue repair may result in circumferential scar formation and narrowing of the esophageal lumen.",
      },
      {
        icon: "stethoscope",
        title: "Repeated Interventions",
        body: "Patients may require recurrent endoscopic dilations, anesthesia, nutritional support, or reconstructive interventions.",
        refs: ["jpedsurg-caustic"],
      },
    ],
    comparison: {
      heading: "Healthy esophagus versus caustic esophageal stricture",
      caption:
        "Cross-sectional schematic of the esophageal wall. Conceptual illustration; proportions are simplified.",
      healthy: {
        title: "Healthy esophagus",
        points: [
          { label: "Normal lumen", region: "lumen" },
          { label: "Flexible tissue", region: "tissue" },
          { label: "Unrestricted passage", region: "flow" },
        ],
      },
      stricture: {
        title: "Caustic esophageal stricture",
        points: [
          { label: "Narrowed lumen", region: "lumen" },
          { label: "Dense fibrotic tissue", region: "tissue" },
          { label: "Impaired passage", region: "flow" },
        ],
      },
      hint: "Hover or select a feature to compare it across both views.",
      flowNote:
        "Drifting dots are a schematic of passage through the lumen (viewed end-on); they are not measured data.",
    },
    closing:
      "Today's interventions primarily address the narrowing. EsoClear is investigating how to prevent the scarring that causes it.",
    closingNote:
      "Supportive and procedural care, including endoscopic dilation and nutritional support, is available to patients. The unmet need is a disease-modifying approach that addresses the fibrotic process itself.",
  },

  mechanism: {
    id: "mechanism",
    eyebrow: "The science behind the approach",
    heading: "Interrupting the Molecular Pathway of Fibrosis",
    intro: [
      "Plasminogen activator inhibitor-1 (PAI-1), encoded by SERPINE1, is a key regulator of fibrinolysis and extracellular matrix remodeling.",
      "Preclinical research implicates elevated PAI-1 signaling in pathological tissue responses following caustic esophageal injury.",
    ],
    introRefs: ["ghosh2012", "patent-us2026166009"],
    caption:
      "Conceptual representation of the proposed mechanism, informed by preclinical research. Clinical efficacy has not been established.",
    note: "PAI-1 is one of several factors implicated in tissue fibrosis; it is not presented here as the sole cause of caustic esophageal stricture.",
    tabs: [
      { id: "without", label: "Without PAI-1 Inhibition" },
      { id: "with", label: "With Investigational PAI-1 Inhibition" },
    ],
    evidenceLevels: {
      established: "Established biology",
      preclinical: "Preclinical observation",
      proposed: "Proposed / conceptual",
    },
    pathways: {
      without: {
        title: "Pathway A: Unregulated fibrotic response",
        summary:
          "Following injury, elevated PAI-1 activity is proposed to suppress fibrinolysis and favor persistent matrix accumulation.",
        visuals: [
          "The lining is damaged by the corrosive agent. PAI-1 is at a low baseline and plasmin (blue) is available.",
          "Inflammatory cells (amber) gather and PAI-1 (red hexagons) increases.",
          "PAI-1 blocks plasminogen activation, so plasmin disappears. Red crosses mark the blocked step.",
          "With little plasmin, matrix turnover slows and collagen starts to build up beneath the lining.",
          "Fibroblasts turn red (activated) and collagen fibers multiply and thicken.",
          "Dense collagen thickens the wall and pushes the lining inward, narrowing the lumen.",
        ],
        nodes: [
          {
            title: "Caustic chemical injury",
            short: "Corrosive agent damages the esophageal wall",
            icon: "flask-conical",
            evidence: "established",
            detail:
              "Exposure to an alkaline or acidic corrosive agent injures the epithelium and, in severe cases, the deeper layers of the esophageal wall.",
          },
          {
            title: "Tissue inflammation and increased PAI-1 activity",
            short: "Inflammation; PAI-1 signal rises",
            icon: "flame",
            evidence: "preclinical",
            detail:
              "In the cited mouse model, PAI-1 immunostaining was reported to be stronger in injured esophageal tissue after alkali exposure than in controls.",
            refs: ["patent-us2026166009"],
          },
          {
            title: "Inhibition of tPA/uPA-mediated plasmin generation",
            short: "PAI-1 blocks plasmin formation",
            icon: "ban",
            evidence: "established",
            detail:
              "PAI-1 is the principal inhibitor of tissue-type and urokinase-type plasminogen activators (tPA/uPA), the enzymes that convert plasminogen to plasmin.",
            refs: ["ghosh2012"],
          },
          {
            title: "Reduced fibrinolysis and altered matrix remodeling",
            short: "Less plasmin, less matrix turnover",
            icon: "activity",
            evidence: "established",
            detail:
              "Plasmin contributes to fibrin clearance and activation of matrix-degrading enzymes. Lower plasmin generation is associated with reduced matrix turnover.",
            refs: ["ghosh2012"],
          },
          {
            title: "Fibroblast/myofibroblast activation and collagen accumulation",
            short: "Scar-forming cells deposit collagen",
            icon: "dna",
            evidence: "proposed",
            detail:
              "PAI-1 has been implicated in fibrosis of several organs. In the esophagus, activation of fibroblasts and myofibroblasts with collagen accumulation is the proposed downstream consequence.",
            refs: ["ghosh2012"],
          },
          {
            title: "Progressive esophageal fibrosis and stricture",
            short: "Scar narrows the lumen",
            icon: "shrink",
            evidence: "preclinical",
            detail:
              "Circumferential scarring narrows the lumen. In the cited preclinical model, stricture was observed in 16 of 25 untreated wild-type mice after alkali exposure.",
            refs: ["patent-us2026166009"],
          },
        ],
      },
      with: {
        title: "Pathway B: Investigational PAI-1 inhibition",
        summary:
          "Pharmacological inhibition of PAI-1 is being investigated as a way to restore fibrinolytic balance and limit pathological scarring.",
        visuals: [
          "The lining is damaged by the corrosive agent. PAI-1 is at a low baseline and plasmin (blue) is available.",
          "PAI-039 (teal circles) is introduced after injury. Whether this is feasible in children has not been established.",
          "PAI-039 binds PAI-1 (dashed hexagons with a teal circle), inhibiting its activity.",
          "Plasmin generation returns (proposed), and the tissue environment is shown more balanced.",
          "Fewer collagen fibers accumulate and fibroblasts stay quiet. This is a potential effect, not a demonstrated one.",
          "The lumen stays open, as observed in treated mice in the cited preclinical model. Not demonstrated in people.",
        ],
        nodes: [
          {
            title: "Caustic chemical injury",
            short: "Corrosive agent damages the esophageal wall",
            icon: "flask-conical",
            evidence: "established",
            detail:
              "The initiating event is the same as in Pathway A: corrosive injury to the esophageal wall.",
          },
          {
            title: "Therapeutic administration of PAI-039",
            short: "Investigational dosing after injury",
            icon: "pill",
            evidence: "preclinical",
            detail:
              "In the cited mouse model, tiplaxtinin (PAI-039) was reported to be given after alkali exposure. Whether and when administration would be feasible in children has not been established.",
            refs: ["patent-us2026166009"],
          },
          {
            title: "Pharmacological inhibition of PAI-1 activity",
            short: "Small molecule inhibits PAI-1",
            icon: "shield",
            evidence: "preclinical",
            detail:
              "Tiplaxtinin was characterized as an orally active small-molecule inhibitor of PAI-1, and reduced plasma PAI-1 activity in an earlier canine thrombosis study.",
            refs: ["elokdah2004", "hennan2005"],
          },
          {
            title: "Modulation of the fibrinolytic and extracellular matrix remodeling environment",
            short: "Plasmin generation may be restored",
            icon: "activity",
            evidence: "proposed",
            detail:
              "Reduced PAI-1 activity is expected to allow greater tPA/uPA-mediated plasmin generation and a more balanced matrix environment. This is a proposed mechanism.",
            refs: ["ghosh2012"],
          },
          {
            title: "Potential attenuation of pathological collagen accumulation",
            short: "Less pathological scarring (potential)",
            icon: "layers",
            evidence: "proposed",
            detail:
              "A more balanced remodeling environment may limit excess collagen deposition. This has not been demonstrated in human patients.",
          },
          {
            title: "Reduced stricture formation observed in preclinical models",
            short: "No strictures in 5 treated mice",
            icon: "circle-check",
            evidence: "preclinical",
            detail:
              "In the cited mouse model, 0 of 5 tiplaxtinin-treated mice developed stricture, compared with 16 of 25 untreated wild-type mice. The group was small; findings are not predictive of clinical outcomes.",
            refs: ["patent-us2026166009"],
          },
        ],
      },
    },
    legend: [
      { key: "pathology", label: "Pathological process" },
      { key: "intervention", label: "Investigational intervention" },
    ],
  },

  evidence: {
    id: "evidence",
    eyebrow: "Preclinical research",
    heading: "From Molecular Discovery to Preclinical Proof of Concept",
    intro:
      "Preclinical research examined the relationship between PAI-1 expression and esophageal stricture formation after experimentally induced caustic injury in mice.",
    chart: {
      title: "Stricture prevalence after experimental alkali injury (mouse model)",
      subtitle:
        "Animal-model observations. These are not clinical efficacy rates.",
      axisLabel: "Mice with esophageal stricture",
      rows: [
        {
          id: "wt",
          label: "Wild-type, untreated",
          group: "control",
          percent: 64,
          display: "64%",
          events: 16,
          n: 25,
        },
        {
          id: "het",
          label: "Heterozygous SERPINE1",
          group: "genetic",
          percent: 17,
          display: "≈16–17%",
          events: 2,
          n: 12,
        },
        {
          id: "ko",
          label: "Homozygous SERPINE1 knockout",
          group: "genetic",
          percent: 0,
          display: "0%",
          events: 0,
          n: 8,
        },
        {
          id: "inhibitor",
          label: "PAI-1 inhibitor intervention (tiplaxtinin)",
          group: "pharmacological",
          percent: 0,
          display: "0%",
          events: 0,
          n: 5,
        },
      ],
      groups: {
        control: "Untreated control",
        genetic: "Genetic modification",
        pharmacological: "Pharmacological intervention",
      },
      footnotes: [
        "Group sizes are small. Percentages are events divided by animals per group, as reported in the cited patent application publication, and remain subject to verification against the originating study.",
        "Genetic knockout and pharmacological inhibition are distinct experimental approaches and are shown with different patterns.",
      ],
      refs: ["patent-us2026166009"],
    },
    narrative: [
      "Preclinical research suggests that modulation of the PAI-1 pathway may substantially influence stricture development following caustic injury.",
      "Both genetic and pharmacological approaches have provided evidence supporting further therapeutic investigation.",
    ],
    takeaway:
      "A compelling preclinical rationale for a new approach to stricture prevention.",
    disclosure:
      "Preclinical findings are not predictive of clinical outcomes. Tiplaxtinin has not been approved for the prevention or treatment of caustic esophageal stricture.",
  },

  candidate: {
    id: "candidate",
    eyebrow: "Our therapeutic candidate",
    heading: "PAI-039: A Targeted Small-Molecule Approach",
    paragraphs: [
      "EsoClear is advancing an investigational program centered on Tiplaxtinin (PAI-039), a small-molecule inhibitor of plasminogen activator inhibitor-1.",
      "Originally investigated in earlier drug discovery programs, Tiplaxtinin has an existing body of published preclinical research that may support a drug-repurposing strategy.",
      "EsoClear aims to investigate whether targeted PAI-1 inhibition can prevent pathological esophageal fibrosis following caustic injury.",
    ],
    paragraphRefs: ["elokdah2004", "hennan2005"],
    summary: [
      { label: "Candidate", value: "Tiplaxtinin" },
      { label: "Research identifier", value: "PAI-039" },
      { label: "Modality", value: "Small molecule" },
      { label: "Molecular target", value: "PAI-1 / SERPINE1 pathway" },
      {
        label: "Proposed indication",
        value: "Prevention of caustic esophageal stricture",
      },
      {
        label: "Target population",
        value: "Pediatric patients with severe caustic esophageal injury",
      },
      {
        label: "Development position",
        value: "Preclinical / IND planning, subject to confirmation",
      },
    ],
    chemicalName:
      "{1-Benzyl-5-[4-(trifluoromethoxy)phenyl]-1H-indol-3-yl}(oxo)acetic acid",
    chemicalNameRef: "hennan2005",
    modules: [
      {
        icon: "target",
        title: "Mechanism-Based Intervention",
        body: "Targets a pathway implicated in fibrotic tissue remodeling.",
      },
      {
        icon: "recycle",
        title: "Repurposing Opportunity",
        body: "Builds upon prior published research and historical development work to explore a potentially more efficient development strategy.",
      },
      {
        icon: "baby",
        title: "Pediatric-Focused Development",
        body: "Designed around a serious clinical need with limited disease-modifying treatment options.",
      },
    ],
    disclaimer:
      "The existence of prior small-molecule research does not establish a complete human safety profile, clinical efficacy, or regulatory readiness.",
    figureCaption:
      "Schematic motif inspired by small-molecule drug structures. Not a chemical structure.",
  },

  pipeline: {
    id: "development",
    eyebrow: "Our development roadmap",
    heading: "One Asset. One Focused Development Path.",
    intro:
      "EsoClear has one primary therapeutic candidate. The timeline below shows the anticipated progression of PAI-039; it is a plan, not a record of completed regulatory milestones.",
    /**
     * Status values:
     *   "supported"   – completed or evidence-supported activity
     *   "in-progress" – activity currently underway (requires confirmation)
     *   "planned"     – proposed future milestone
     * Defaults are deliberately conservative. Update only with confirmation.
     */
    statusLabels: {
      supported: "Evidence-supported",
      "in-progress": "In progress",
      planned: "Proposed",
    },
    milestones: [
      {
        number: "01",
        title: "Target Discovery",
        body: "Identification and validation of PAI-1 as an investigational target in caustic esophageal fibrosis.",
        status: "supported",
      },
      {
        number: "02",
        title: "Preclinical Proof of Concept",
        body: "Evaluation of genetic and pharmacological PAI-1 inhibition in experimental disease models.",
        status: "supported",
      },
      {
        number: "03",
        title: "IND-Enabling Development",
        body: "Planned pharmacology, toxicology, formulation, and regulatory activities supporting a potential FDA IND submission.",
        status: "planned",
      },
      {
        number: "04",
        title: "FDA IND and Clinical Development",
        body: "Prospective regulatory submission and clinical investigation, subject to FDA review and authorization.",
        status: "planned",
      },
      {
        number: "05",
        title: "NDA Submission and FDA Review",
        body: "Potential future marketing application following successful clinical development.",
        status: "planned",
      },
    ] as {
      number: string;
      title: string;
      body: string;
      status: "supported" | "in-progress" | "planned";
    }[],
    regulatory: {
      title: "Regulatory Strategy Under Evaluation",
      items: [
        { label: "Orphan Drug Designation", refs: ["fda-orphan"] },
        { label: "Rare Pediatric Disease Designation", refs: ["fda-rpd"] },
        { label: "FDA INTERACT or other appropriate early agency engagement" },
        { label: "IND-enabling studies", refs: ["fda-ind"] },
        { label: "Pediatric clinical development planning" },
      ],
      note: "These are potential or planned activities. No designation has been requested or granted unless stated otherwise.",
      disclaimer:
        "Regulatory milestones are subject to scientific evidence, eligibility, and FDA determination.",
    },
  },

  foundation: {
    id: "foundation",
    eyebrow: "Scientific foundation",
    heading: "Built on Academic Discovery",
    intro: [
      "EsoClear, LLC is an emerging biotechnology company established to advance intellectual property and translational research associated with Morehouse School of Medicine.",
      "The program draws upon expertise in gastroenterology, immunology, translational medicine, biotechnology commercialization, and intellectual property development.",
    ],
    indicators: [
      { label: "Academic origin", value: "Morehouse School of Medicine" },
      { label: "Evidence base", value: "Preclinical animal-model data" },
      { label: "IP status", value: "Patent application pending" },
    ],
    modules: [
      {
        icon: "graduation-cap",
        title: "Academic Origins",
        body: "The program originates in research conducted at Morehouse School of Medicine, and reflects an effort to translate an academic discovery toward potential patient impact.",
      },
      {
        icon: "microscope",
        title: "Scientific Leadership",
        body: "",
        leader: {
          name: "Julia J. Liu, MD",
          title:
            "Professor of Medicine and Chief, Division of Gastroenterology and Hepatology, Morehouse School of Medicine",
          contribution:
            "Investigates the role of PAI-1 in caustic esophageal injury and is a named inventor on the published patent application cited below.",
          refs: ["patent-us2026166009"],
        },
      },
      {
        icon: "route",
        title: "Technology Translation",
        body: "EsoClear focuses on intellectual property development, licensing, partnership development, and the translation of academic research into a potential therapeutic product.",
      },
    ],
    ip: {
      title: "Research-Driven Intellectual Property",
      body: "EsoClear's intellectual property strategy centers on PAI-1 inhibition for the prevention of caustic esophageal fibrosis. Patent applications are pending and have not been issued as patents. Rights in any application depend on assignment and license terms.",
      /**
       * Only entries with verified: true are shown publicly. Confirm each
       * identifier, applicant, and EsoClear's rights before changing a flag.
       */
      applications: [
        {
          id: "US 19/419,490",
          detail:
            "U.S. application, published as US 2026/0166009 A1. Pending. Applicant of record in public databases: Morehouse School of Medicine.",
          verified: true,
          refs: ["patent-us2026166009"],
        },
        { id: "PCT/US2025/010891", detail: "", verified: false },
        { id: "US 19/711,850", detail: "", verified: false },
        { id: "PCT/US25/59598", detail: "", verified: false },
      ] as {
        id: string;
        detail: string;
        verified: boolean;
        refs?: string[];
      }[],
      note: "Pending applications are not issued patents. Listing does not imply ownership or exclusive license of any application.",
    },
  },

  contact: {
    id: "contact",
    eyebrow: "Collaborations and contact",
    heading: "Advancing a New Approach to Pediatric Esophageal Care",
    body: "EsoClear welcomes opportunities to engage with academic researchers, translational medicine collaborators, pharmaceutical development partners, and organizations supporting innovation in pediatric rare diseases.",
    cta: "Connect With EsoClear",
    inquiryTypes: [
      {
        id: "general",
        label: "General inquiry",
        description: "Questions about EsoClear or this program.",
      },
      {
        id: "collaboration",
        label: "Collaboration inquiry",
        description: "Academic, clinical, or translational collaboration.",
      },
      {
        id: "research",
        label: "Research partnership inquiry",
        description: "Pharmaceutical, licensing, or funding partnerships.",
      },
    ] as { id: "general" | "collaboration" | "research"; label: string; description: string }[],
    // Approved addresses are supplied via environment variables (see README).
    emails: {
      general: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
      collaboration:
        process.env.NEXT_PUBLIC_CONTACT_EMAIL_COLLABORATION ||
        process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
        "",
      research:
        process.env.NEXT_PUBLIC_CONTACT_EMAIL_RESEARCH ||
        process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
        "",
    },
    unconfiguredNotice:
      "A public contact address has not been configured for this deployment. Set NEXT_PUBLIC_CONTACT_EMAIL to enable inquiry links.",
  },

  footer: {
    navigation: [
      { label: "Clinical Need", href: "#need" },
      { label: "Science", href: "#mechanism" },
      { label: "PAI-039", href: "#candidate" },
      { label: "Development", href: "#development" },
      { label: "Scientific Foundation", href: "#foundation" },
      { label: "Contact", href: "#contact" },
    ],
    disclaimer:
      "EsoClear's therapeutic program is investigational. PAI-039 has not been approved by the U.S. Food and Drug Administration for prevention or treatment of caustic esophageal stricture. Statements regarding potential benefits and development plans are forward-looking and subject to further research and regulatory review.",
    privacy:
      "This website does not use advertising trackers or analytics cookies. Inquiry forms open your own email application; nothing you type is transmitted to or stored on this site. Hosting providers may keep standard server logs.",
  },
};

export type SiteContent = typeof siteContent;
