import { Hero } from "@/components/sections/hero";
import { Education } from "@/components/sections/education";
import { Research } from "@/components/sections/research";
import { Publications } from "@/components/sections/publications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <Education />
      <Research />
      <Publications />
      <Contact />
    </div>
  );
}
