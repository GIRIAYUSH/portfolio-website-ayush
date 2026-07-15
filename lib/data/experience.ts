export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  bullets: string[];
  stats?: { label: string; value: string }[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "nchl",
    company: "Nepal Clearing House Ltd. (NCHL)",
    role: "Research Engineer — LLM Reliability & Interpretability",
    period: "Mar 2025 — Present",
    location: "Kathmandu, Nepal",
    current: true,
    bullets: [
      "Conducting empirical research on hallucination reduction in Retrieval-Augmented Generation (RAG) pipelines for high-stakes financial document retrieval, analyzing failure modes and where parametric knowledge overrides retrieved contextual information.",
      "Investigating model alignment and factual reliability in production LLM deployments via systematic fine-tuning experiments, serving infrastructure design (vLLM, Docker), and evaluation framework deployment for regulatory and compliance needs.",
      "Prototyping lightweight in-process monitors for agentic banking workflows to flag representational divergence before tool-call commitment, without external post-hoc filtering.",
      "Developing interpretable agent-based automation systems for banking compliance workflows, with emphasis on audit trail design and real-time monitoring as constraints on model behavior.",
      "Designing and researching black-box LLM interpretability techniques including activation probing (TransformerLens), behavioral analysis, and confidence estimation.",
    ],
    stats: [
      { label: "Routing accuracy", value: "91%" },
      { label: "ECE", value: "0.06" },
      { label: "Uncertainty-handled success", value: "95%" },
    ],
  },
  {
    id: "cedar-gate",
    company: "Cedar Gate Technologies",
    role: "Data Trainee (Healthcare)",
    period: "Dec 2024 — Mar 2025",
    location: "Kathmandu, Nepal",
    bullets: [
      "Analyzed large-scale US healthcare datasets (pharmaceutical and medical claims) to extract actionable insights under HIPAA constraints; developed Data Structure Designs (DSD) for standardized data transformation and reporting.",
      "Built and maintained ETL pipelines mapping raw data to production-ready formats, ensuring accuracy, consistency, and regulatory compliance across high-volume clinical data systems.",
    ],
  },
  {
    id: "nus",
    company: "National University of Singapore (NUS)",
    role: "Academic Intern — Deep Learning & Data Analytics",
    period: "May 2023 — Jul 2023",
    location: "Singapore",
    bullets: [
      "Contributed to an industry safety-gear detection project applying object detection algorithms (YOLO, SSD) to CCTV footage; ran experiments for low-latency, high-accuracy inference under variable real-world constraints.",
      "Worked collaboratively on optimization problems in high-noise and data-augmented environments for accurate, consistent inference.",
    ],
  },
  {
    id: "vit-research",
    company: "Vellore Institute of Technology (Undergrad Research)",
    role: "Undergraduate Research Assistant — Prof. Saira Banu J.",
    period: "Aug 2023 — Mar 2024",
    location: "Vellore, India",
    bullets: [
      "Published \"Harnessing ResUHybridNet with Federated Learning: A New Paradigm in Brain Tumour Segmentation\" for data-preserving, decentralized medical imaging environments.",
      "Developed MediQNet, a multi-modal transformer-based medical VQA system, as final-year thesis.",
      "Laid foundational skills in research methodology, experiment design, and reproducible deep-learning engineering.",
    ],
    stats: [
      { label: "Segmentation accuracy", value: "97.4%" },
      { label: "Dice score", value: "0.79" },
    ],
  },
];
