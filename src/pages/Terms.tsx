import LegalLayout from "../components/LegalLayout";
import { company } from "../data/site";

export default function Terms() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      description="Terms and conditions for using the Sakshionmi Group website and services."
      path="/terms"
      intro="Please read these Terms & Conditions carefully before using our website or services."
      sections={[
        {
          heading: "1. About Us",
          body: (
            <p>
              {company.name} is an independent financial advisory service. We are not a bank, NBFC or lender,
              and we do not lend money or guarantee loan approvals. We assist customers in exploring financing
              options available through various banks, NBFCs and financial institutions.
            </p>
          ),
        },
        {
          heading: "2. Use of This Website",
          body: (
            <p>
              You agree to use this website lawfully and not to misuse, disrupt or attempt to gain unauthorised
              access to any part of it. Content on this website is provided for general information only.
            </p>
          ),
        },
        {
          heading: "3. No Guarantee of Approval",
          body: (
            <p>
              Loan approval, interest rates, tenure, fees and disbursement are decided solely by the respective
              lender based on eligibility, documentation, credit profile and lender policies. We do not
              guarantee approval or any specific terms.
            </p>
          ),
        },
        {
          heading: "4. Information Accuracy",
          body: (
            <p>
              We strive to keep information on this website accurate and up to date. However, we do not warrant
              that all information is complete, current or error-free. You should verify critical details with
              the relevant lender before making decisions.
            </p>
          ),
        },
        {
          heading: "5. Third-Party References",
          body: (
            <p>
              Names and references to banks, NBFCs and financial institutions are provided for reference only
              and belong to their respective owners. We do not claim official partnership or authorisation
              unless explicitly verified and stated.
            </p>
          ),
        },
        {
          heading: "6. Enquiries & Applications",
          body: (
            <p>
              Submitting an enquiry or application does not constitute a loan approval or a binding agreement.
              Our role is limited to advisory and assistance services.
            </p>
          ),
        },
        {
          heading: "7. Limitation of Liability",
          body: (
            <p>
              To the extent permitted by law, {company.name} shall not be liable for any indirect, incidental or
              consequential damages arising from the use of this website or our services.
            </p>
          ),
        },
        {
          heading: "8. Changes to These Terms",
          body: <p>We may update these Terms & Conditions from time to time. Continued use of the website constitutes acceptance of the updated terms.</p>,
        },
      ]}
    />
  );
}
