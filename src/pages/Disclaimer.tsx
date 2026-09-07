import LegalLayout from "../components/LegalLayout";
import { company, lenderDisclaimer } from "../data/site";

export default function Disclaimer() {
  return (
    <LegalLayout
      title="Disclaimer"
      description="Disclaimer for Sakshionmi Group services and website."
      path="/disclaimer"
      intro="Important information about the nature of our services and the limits of our advisory role."
      sections={[
        {
          heading: "Advisory Service, Not a Lender",
          body: (
            <p>
              {company.name} is an independent financial advisory service. We are not a bank, NBFC or lender.
              We do not provide loans directly and we do not guarantee loan approval, interest rates, tenure or
              disbursement. All financing decisions are made by the respective lender.
            </p>
          ),
        },
        {
          heading: "No Guarantee",
          body: (
            <p>
              We do not guarantee approval of any loan, any specific interest rate, tenure, loan amount or
              timeline. {lenderDisclaimer}
            </p>
          ),
        },
        {
          heading: "Third-Party Names & Logos",
          body: (
            <p>
              Any reference to banks, NBFCs or financial institutions (including but not limited to SBI, PNB,
              HDFC Bank, LIC Housing Finance, Aditya Birla Capital, Piramal Finance, Dhanlaxmi Capital and
              other NBFCs/finance companies) is for reference only. All names and logos belong to their
              respective owners. We do not claim to be an official partner or authorised agent of any of these
              institutions unless explicitly verified and stated in writing.
            </p>
          ),
        },
        {
          heading: "Illustrative Tools",
          body: (
            <p>
              The EMI calculator and any other tools on this website provide illustrative estimates only.
              Actual figures may vary based on the lender, your profile and prevailing policies.
            </p>
          ),
        },
        {
          heading: "No Legal or Financial Advice",
          body: (
            <p>
              Information on this website is general in nature and does not constitute legal, tax or financial
              advice. You should consult appropriate professionals before making financial decisions.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              For any clarification, contact us at <a href={`mailto:${company.email}`} className="font-semibold text-brand-royal">{company.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
