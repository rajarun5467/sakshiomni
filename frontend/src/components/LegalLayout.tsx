import type { ReactNode } from "react";
import Seo from "./Seo";
import PageHero from "./PageHero";
import Breadcrumb from "./Breadcrumb";
import Reveal from "./Reveal";
import { company } from "../data/site";

interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalLayoutProps {
  title: string;
  description: string;
  path: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalLayout({ title, description, path, intro, sections }: LegalLayoutProps) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <PageHero eyebrow="Legal" title={title} subtitle={intro} icon="shield" />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: title }]} />

      <section className="container-narrow py-16 lg:py-24">
        <div className="space-y-10">
          {sections.map((s, i) => (
            <Reveal key={i} as="article">
              <h2 className="h3">{s.heading}</h2>
              <div className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{s.body}</div>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 border-t border-brand-line pt-6 text-xs text-slate-400">
          For any questions regarding this document, contact us at{" "}
          <a href={`mailto:${company.email}`} className="font-semibold text-brand-royal">{company.email}</a>.
        </p>
      </section>
    </>
  );
}
