import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Breadcrumb from "../components/Breadcrumb";
import ApplicationForm from "../components/ApplicationForm";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { lenderDisclaimer } from "../data/site";

const benefits = [
  { icon: "clock", title: "Quick Enquiry", text: "Submit your details in a few minutes." },
  { icon: "users", title: "Expert Follow-up", text: "Our team contacts you to understand your needs." },
  { icon: "doc", title: "Guided Documentation", text: "We help organise documents for the lender." },
  { icon: "chart", title: "Multiple Options", text: "Explore financing options across banks & NBFCs." },
];

export default function Apply() {
  return (
    <>
      <Seo
        title="Apply for Loan | Sakshionmi Group"
        description="Submit your loan enquiry online. Sakshionmi Group will help you explore suitable financing options across banks and NBFCs."
        path="/apply"
      />
      <PageHero
        eyebrow="Apply for Loan"
        title="Start Your Loan Application"
        subtitle="Share your details in a few quick steps. Our team will get in touch to guide you on suitable financing options."
        icon="doc"
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Apply for Loan" }]} />

      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow"><Icon name="sparkles" className="h-3.5 w-3.5" /> Why Apply With Us</span>
              <h2 className="mt-4 h2">A Simple, Guided Application</h2>
              <p className="lead mt-4">
                We don't promise instant approval. Instead, we help you present your requirement clearly and
                guide you through documentation so the lender can make an informed decision.
              </p>
              <div className="mt-8 space-y-4">
                {benefits.map((b) => (
                  <div key={b.title} className="flex items-start gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-royal text-white">
                      <Icon name={b.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-brand-navy">{b.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-xl bg-brand-mist px-5 py-3 text-xs leading-relaxed text-slate-500">
                {lenderDisclaimer}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <ApplicationForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
