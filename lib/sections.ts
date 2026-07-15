export type SectionMeta = {
  id: string;
  index: string;
  label: string;
};

export const SECTIONS: SectionMeta[] = [
  { id: "hero", index: "01", label: "Profile" },
  { id: "education", index: "02", label: "Education" },
  { id: "research", index: "03", label: "Research" },
  { id: "publications", index: "04", label: "Publications" },
  { id: "contact", index: "05", label: "Contact" },
];
