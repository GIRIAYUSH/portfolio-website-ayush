export type ResearchNode = {
  id: string;
  label: string;
  description: string;
  connections: string[];
};

export const RESEARCH_NODES: ResearchNode[] = [
  {
    id: "mechanistic-interpretability",
    label: "Mechanistic Interpretability",
    description:
      "Localizing confabulations across layers, attention circuits, and residual-stream subspaces via activation patching, causal intervention, and sparse autoencoders.",
    connections: ["representation-learning", "hallucination"],
  },
  {
    id: "representation-learning",
    label: "Parametric Memory vs. Retrieved Context",
    description:
      "Understanding how attention patterns and residual-stream states mediate the competition between parametric priors and in-context evidence in RAG systems.",
    connections: ["mechanistic-interpretability", "hallucination", "evaluation"],
  },
  {
    id: "reliability",
    label: "Reliability through Controllable Generation",
    description:
      "Exploring entropy-aware decoding and tractable probabilistic circuits to make generation reliable by construction rather than by post-hoc filtering.",
    connections: ["hallucination", "alignment"],
  },
  {
    id: "hallucination",
    label: "Evaluation & Detection of Faithfulness",
    description:
      "Building evaluation frameworks for hallucination detection and contextual faithfulness — LLM-as-Judge protocols, semantic entropy, and human-aligned benchmarks under controlled knowledge conflicts.",
    connections: ["representation-learning", "reliability", "evaluation"],
  },
  {
    id: "alignment",
    label: "Alignment Science & Training Dynamics",
    description:
      "Understanding how RLHF and RL-based fine-tuning shape factual reliability and knowledge-source preference, and whether instruction-tuned models resolve internal conflicts differently than base pre-trained models.",
    connections: ["reliability", "mechanistic-interpretability"],
  },
  {
    id: "evaluation",
    label: "Safety & Evaluation",
    description:
      "Deployment-oriented AI safety: designing evaluation frameworks that accurately measure faithfulness and catch failures before they reach production, especially in regulated environments.",
    connections: ["hallucination", "representation-learning"],
  },
];
