export interface ServiceDetail {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  hero: string;
  overview: string[];
  whoCanApply: string[];
  typicalRequirements: string[];
  process: { title: string; text: string }[];
  documents: string[];
  faqs: { q: string; a: string }[];
  highlights: { label: string; value: string }[];
}

const baseProcess = [
  { title: "Share Your Requirement", text: "Tell us your financing need through our enquiry form or call." },
  { title: "Expert Consultation", text: "We understand your profile and discuss suitable financing options." },
  { title: "Documentation & Application", text: "We help you organise documents and submit the application to the lender." },
  { title: "Financing Decision", text: "The lender evaluates and communicates the decision as per their policies." },
];

const baseDocuments = [
  "Identity proof (PAN / Aadhaar / Passport / Driving licence)",
  "Address proof (Aadhaar / Voter ID / Utility bill)",
  "Income proof (Salary slips / ITR / Form 16 / P&L statement)",
  "Bank statements (generally last 6 months)",
  "Property documents (where applicable)",
  "Recent passport-size photographs",
  "Other documents as applicable based on lender and loan type",
];

export const services: ServiceDetail[] = [
  {
    slug: "home-loan",
    title: "Home Loan",
    short: "Financing assistance for purchasing, constructing or refinancing your home.",
    description:
      "Assistance for home loans across purchase, construction, renovation and refinance requirements.",
    icon: "home",
    hero: "Home Loan Assistance",
    overview: [
      "Home loan assistance for purchasing a ready, under-construction or resale property.",
      "Support for construction, extension, renovation or refinancing of an existing home loan.",
      "Guidance on eligibility, documentation and lender processes for a smoother experience.",
    ],
    whoCanApply: [
      "Salaried individuals with stable income",
      "Self-employed professionals and business owners",
      "Indian residents and eligible NRIs (subject to lender policy)",
      "Applicants meeting the lender's age and income criteria",
    ],
    typicalRequirements: [
      "Stable monthly income",
      "Acceptable credit profile",
      "Property with clear title and required approvals",
      "Age and residency as per lender norms",
    ],
    process: baseProcess,
    documents: baseDocuments,
    faqs: [
      { q: "Can I get a home loan for an under-construction property?", a: "Yes, many lenders offer home loans for under-construction properties, subject to the project and lender's approved list and eligibility criteria." },
      { q: "Is pre-payment allowed on home loans?", a: "Pre-payment terms vary by lender and loan type. We can help you understand the applicable terms before applying." },
      { q: "Do you decide the interest rate?", a: "No. Interest rates are decided by the lender based on your profile, credit history, loan amount, tenure and prevailing policies." },
    ],
    highlights: [
      { label: "Purpose", value: "Purchase / Construction / Refinance" },
      { label: "Tenure", value: "As per lender policy" },
      { label: "Process", value: "Guided documentation" },
    ],
  },
  {
    slug: "property-loan",
    title: "Property Loan",
    short: "Explore funding options against eligible residential or commercial property.",
    description:
      "Loan against property assistance for personal or business needs backed by eligible property.",
    icon: "building",
    hero: "Loan Against Property Assistance",
    overview: [
      "Funding assistance against eligible residential or commercial property.",
      "Suitable for business expansion, working capital, education, marriage or other requirements.",
      "Help understanding lender eligibility, valuation and documentation.",
    ],
    whoCanApply: [
      "Salaried and self-employed individuals",
      "Business owners and professionals",
      "Applicants with eligible property and clear title",
      "Entities meeting lender's credit and income criteria",
    ],
    typicalRequirements: [
      "Owned property with marketable title",
      "Acceptable credit profile",
      "Stable income to service the loan",
      "Property valuation acceptable to the lender",
    ],
    process: baseProcess,
    documents: baseDocuments,
    faqs: [
      { q: "What types of property can be used as security?", a: "Residential, commercial or industrial property with clear title may be considered, subject to the lender's policies and valuation." },
      { q: "How is the loan amount decided?", a: "The eligible amount depends on the property's valuation, your income, repayment capacity and the lender's loan-to-value policy." },
    ],
    highlights: [
      { label: "Security", value: "Residential / Commercial property" },
      { label: "End-use", value: "Business / Personal" },
      { label: "Tenure", value: "As per lender policy" },
    ],
  },
  {
    slug: "business-loan",
    title: "Business Loan",
    short: "Flexible financing solutions to support business growth and working capital needs.",
    description:
      "Business loan assistance for working capital, expansion, equipment and growth requirements.",
    icon: "briefcase",
    hero: "Business Loan Assistance",
    overview: [
      "Assistance with business loans for working capital, expansion, inventory and equipment.",
      "Support for self-employed professionals, proprietors, partnerships and companies.",
      "Help organising financials and documents for a structured application.",
    ],
    whoCanApply: [
      "Proprietorships, partnerships and private limited companies",
      "Self-employed professionals (CA, doctors, architects, etc.)",
      "Businesses with a defined vintage as per lender norms",
      "Entities with acceptable turnover and profitability",
    ],
    typicalRequirements: [
      "Business vintage as required by the lender",
      "GST and income tax filings",
      "Healthy banking and turnover pattern",
      "Acceptable credit profile of the entity/promoters",
    ],
    process: baseProcess,
    documents: baseDocuments,
    faqs: [
      { q: "Can a new business apply?", a: "Most lenders require a minimum business vintage. We can help identify lenders whose criteria match your profile." },
      { q: "Is collateral always required?", a: "Some lenders offer unsecured business loans based on profile, while others may require collateral. Eligibility depends on the lender." },
    ],
    highlights: [
      { label: "Purpose", value: "Working Capital / Growth" },
      { label: "For", value: "MSMEs & Professionals" },
      { label: "Tenure", value: "As per lender policy" },
    ],
  },
  {
    slug: "od-cc-limit",
    title: "OD/CC Limit",
    short: "Assistance with overdraft and cash-credit financing requirements.",
    description:
      "Overdraft and cash-credit limit assistance for flexible working capital access.",
    icon: "credit",
    hero: "OD / CC Limit Assistance",
    overview: [
      "Assistance with Overdraft (OD) and Cash Credit (CC) facilities for working capital.",
      "Flexible funding where interest is typically charged on utilised amount.",
      "Help understanding drawing power, security and renewal requirements.",
    ],
    whoCanApply: [
      "Businesses with regular banking turnover",
      "Entities holding eligible current assets / stock / receivables",
      "Applicants with acceptable credit profile",
      "Businesses meeting lender's vintage criteria",
    ],
    typicalRequirements: [
      "Consistent business turnover reflected in bank statements",
      "Stock and book-debt statements (for CC)",
      "Acceptable security as per lender policy",
      "GST and tax compliance",
    ],
    process: baseProcess,
    documents: baseDocuments,
    faqs: [
      { q: "What is the difference between OD and CC?", a: "An Overdraft is generally a flexible limit on a current account, while a Cash Credit facility is typically secured against stock and receivables. Terms vary by lender." },
      { q: "How is the limit renewed?", a: "OD/CC limits are usually reviewed annually by the lender based on performance and updated financials." },
    ],
    highlights: [
      { label: "Type", value: "Overdraft / Cash Credit" },
      { label: "Use", value: "Working Capital" },
      { label: "Review", value: "Periodic, as per lender" },
    ],
  },
  {
    slug: "industrial-loan",
    title: "Industrial Loan",
    short: "Financing assistance for industrial and business infrastructure requirements.",
    description:
      "Industrial loan assistance for plant, machinery, infrastructure and expansion.",
    icon: "factory",
    hero: "Industrial Loan Assistance",
    overview: [
      "Assistance with industrial loans for plant, machinery and infrastructure.",
      "Support for greenfield projects, expansion and modernisation.",
      "Help structuring project reports and documentation for lenders.",
    ],
    whoCanApply: [
      "Manufacturing and processing units",
      "Industrial enterprises meeting lender vintage criteria",
      "Entities with viable project plans",
      "Applicants with acceptable credit and collateral profile",
    ],
    typicalRequirements: [
      "Detailed project report / business plan",
      "Approvals and clearances as applicable",
      "Collateral and promoter contribution",
      "Financial statements and projections",
    ],
    process: baseProcess,
    documents: baseDocuments,
    faqs: [
      { q: "Do you help with project reports?", a: "We can guide you on the information typically required in a project report, while the report itself is prepared based on your project specifics." },
      { q: "Are industrial loans long-tenure?", a: "Tenure depends on the lender, project type and repayment plan. We help you understand the options available." },
    ],
    highlights: [
      { label: "Purpose", value: "Plant / Machinery / Expansion" },
      { label: "For", value: "Industrial units" },
      { label: "Tenure", value: "Project-based, per lender" },
    ],
  },
];

export const serviceSummaries = services.map((s) => ({
  slug: s.slug,
  title: s.title,
  short: s.short,
  icon: s.icon,
}));

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
