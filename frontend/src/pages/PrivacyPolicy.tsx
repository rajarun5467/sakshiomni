import LegalLayout from "../components/LegalLayout";
import { company } from "../data/site";

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="Privacy policy for Sakshionmi Group — how we collect, use and protect your information."
      path="/privacy-policy"
      intro="This Privacy Policy explains how Sakshionmi Group collects, uses and protects information you share with us."
      sections={[
        {
          heading: "1. Information We Collect",
          body: (
            <p>
              When you contact us or submit an enquiry/application, we may collect your name, mobile number,
              email address, city, employment type, loan requirement details and any message you choose to
              share. We do not request sensitive documents at the initial enquiry stage.
            </p>
          ),
        },
        {
          heading: "2. How We Use Your Information",
          body: (
            <p>
              Your information is used to understand your requirement, contact you regarding your enquiry,
              guide you on suitable financing options, and coordinate with lenders or other parties as needed
              for your application. We may also use your contact details to share relevant updates.
            </p>
          ),
        },
        {
          heading: "3. Sharing With Lenders",
          body: (
            <p>
              To assist with your financing requirement, your details and documents may be shared with banks,
              NBFCs or other financial institutions as required for the application process. We share
              information only to the extent necessary to pursue your enquiry.
            </p>
          ),
        },
        {
          heading: "4. Data Security",
          body: (
            <p>
              We take reasonable measures to protect your information against unauthorised access, alteration
              or disclosure. However, no method of transmission or storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          ),
        },
        {
          heading: "5. Cookies & Analytics",
          body: (
            <p>
              This website may use cookies and similar technologies for functionality and analytics. You can
              control cookies through your browser settings.
            </p>
          ),
        },
        {
          heading: "6. Your Rights",
          body: (
            <p>
              You may request access to, correction of, or withdrawal of your information by contacting us at{" "}
              <a href={`mailto:${company.email}`} className="font-semibold text-brand-royal">{company.email}</a>.
            </p>
          ),
        },
        {
          heading: "7. Changes to This Policy",
          body: <p>We may update this Privacy Policy from time to time. Updated versions will be posted on this page.</p>,
        },
      ]}
    />
  );
}
