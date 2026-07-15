export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  status: "Under Peer-Review" | "Published";
  abstract: string;
  bibtex: string;
  links: { label: string; href: string; disabled?: boolean }[];
};

export const PUBLICATIONS: Publication[] = [
  {
    id: "dynamic-query-routing",
    title:
      "Dynamic Query Routing with Aleatoric and Epistemic Uncertainty Handling for Virtual Assistants: A Hybrid Approach in Retrieval-Augmented Generation",
    authors: "Giri, A. et al.",
    venue: "Pre-print · ResearchGate",
    year: "2025",
    status: "Under Peer-Review",
    abstract:
      "A query-routing framework that decides, before generation, whether to trust retrieved context, the model's own parametric knowledge, or neither. The framework reaches 91% routing accuracy, an Expected Calibration Error of 0.06, and a 95% Uncertainty-Handled Query Success Rate. A key finding is negative: standard uncertainty estimates behave as proxies rather than principled measures, motivating a move toward semantic entropy and mutual-information estimators for decomposing aleatoric from epistemic uncertainty.",
    bibtex: `@misc{giri2025dynamicqueryrouting,
  title        = {Dynamic Query Routing with Aleatoric and Epistemic Uncertainty
                  Handling for Virtual Assistants: A Hybrid Approach in
                  Retrieval-Augmented Generation},
  author       = {Giri, Ayush and others},
  year         = {2025},
  note         = {Pre-print, under peer review},
  howpublished = {ResearchGate},
}`,
    links: [
      {
        label: "ResearchGate",
        href: "https://www.researchgate.net/publication/394584927_Dynamic_Query_Routing_with_Aleatoric_and_Epistemic_Uncertainty_Handling_for_Virtual_Assistants_A_Hybrid_Approach_in_Retrieval-Augmented_Generation",
      },
      { label: "PDF", href: "#", disabled: true },
      { label: "DOI", href: "#", disabled: true },
      { label: "Code", href: "#", disabled: true },
    ],
  },
  {
    id: "resuhybridnet",
    title:
      "Harnessing ResUHybridNet with Federated Learning: A New Paradigm in Brain Tumour Segmentation",
    authors: "Giri, A., Thapa, P., Banu, J. S., Poudyal, S., Rijal, B., Karki, S.",
    venue: "Revue d'Intelligence Artificielle (IIETA)",
    year: "2024",
    status: "Published",
    abstract:
      "A privacy-preserving hybrid CNN architecture (ResNet + U-Net) for decentralized brain-tumour MRI segmentation. Imaging data is partitioned across simulated hospital nodes to mimic a federated, data-preserving deployment — local training with weight-only aggregation closes the cross-institution generalization gap without any data sharing, reaching ~97.4% accuracy and a 0.79 Dice score, outperforming standalone baselines.",
    bibtex: `@article{giri2024resuhybridnet,
  title     = {Harnessing ResUHybridNet with Federated Learning: A New Paradigm
               in Brain Tumour Segmentation},
  author    = {Giri, Ayush and Thapa, Prashna and Banu, J. Saira and
               Poudyal, Shashwat and Rijal, Baibhav and Karki, Siddhant},
  journal   = {Revue d'Intelligence Artificielle},
  publisher = {IIETA},
  volume    = {38},
  number    = {3},
  pages     = {765--775},
  year      = {2024},
  doi       = {10.18280/ria.380303},
}`,
    links: [
      {
        label: "Semantic Scholar",
        href: "https://www.semanticscholar.org/paper/Harnessing-ResUHybridNet-with-Federated-Learning:-A-Giri-Thapa/2c5e6632cc64e26be26fc4c52dd80e87718b2759",
      },
      { label: "DOI", href: "https://doi.org/10.18280/ria.380303" },
      { label: "Code", href: "#", disabled: true },
    ],
  },
];
