export type SkillHead = {
  id: string;
  name: string;
  description: string;
  tools: string[];
};

export const SKILL_HEADS: SkillHead[] = [
  {
    id: "interpretability",
    name: "Interpretability",
    description: "Localizing and explaining what's happening inside the model.",
    tools: [
      "TransformerLens",
      "Activation Patching",
      "Causal Mediation Analysis",
      "Sparse Autoencoders",
      "Probing Classifiers",
      "Representation Analysis",
    ],
  },
  {
    id: "reliability",
    name: "Reliability",
    description: "Making generation trustworthy and quantifying what the model doesn't know.",
    tools: [
      "Uncertainty Quantification",
      "Entropy-aware Decoding",
      "RL & Alignment Science",
      "Constrained Generation",
      "RAG Architecture & Failure-mode Analysis",
    ],
  },
  {
    id: "ml-dl",
    name: "ML / DL",
    description: "Core modeling stack for training, adapting, and serving models.",
    tools: [
      "PyTorch",
      "HuggingFace Transformers",
      "TensorFlow",
      "Scikit-learn",
      "vLLM",
      "LangChain",
      "FAISS",
      "Milvus",
      "Pinecone",
      "LoRA / QLoRA",
      "Quantization",
      "SFT",
      "RL",
    ],
  },
  {
    id: "agentic-ops",
    name: "Agentic / Ops",
    description: "Shipping and operating agentic systems in production.",
    tools: [
      "Multi-agent Frameworks",
      "LLMOps",
      "W&B",
      "Docker",
      "FastAPI",
      "GitLab CI",
      "Grafana / Prometheus",
    ],
  },
];
