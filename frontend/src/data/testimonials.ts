import type { Testimonial } from "../components/TestimonialsSlider";

/**
 * TESTIMONIALS DATA
 * -----------------
 * These are placeholder testimonials for UI demonstration.
 * Replace each entry with a REAL, verified customer testimonial
 * before going live. Do NOT publish fabricated reviews as real.
 *
 * Avatar images are loaded from pravatar.cc (placeholder face photos).
 * Replace `image` with real customer photos (with permission) before launch.
 *
 * To add a real testimonial:
 * 1. Get verified feedback from an actual customer.
 * 2. Replace the `quote`, `name`, `role`, `loanType`, and `rating` below.
 * 3. Replace `image` with the customer's photo (with their permission).
 */
export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Verma",
    role: "Business Owner",
    loanType: "Home Loan",
    rating: 5,
    quote:
      "The team at Sakshionmi Group made the home loan process very easy for me. From documentation to coordination with the lender, I received complete assistance. Transparent and professional service.",
    image: "https://i.pravatar.cc/120?img=12",
    avatarBg: "from-brand-navy to-brand-royal",
  },
  {
    name: "Priya Sharma",
    role: "Salaried Professional",
    loanType: "Property Loan",
    rating: 5,
    quote:
      "They helped me explore multiple options for my property loan. Communication was clear at every step and the process was smooth. Highly recommended for financial guidance.",
    image: "https://i.pravatar.cc/120?img=45",
    avatarBg: "from-brand-orange to-brand-orangeDark",
  },
  {
    name: "Amit Gupta",
    role: "Entrepreneur",
    loanType: "Business Loan",
    rating: 5,
    quote:
      "I received the right guidance for my business loan. The team understood my profile and suggested suitable options. They really helped with my working capital arrangement.",
    image: "https://i.pravatar.cc/120?img=33",
    avatarBg: "from-brand-green to-brand-greenDark",
  },
  {
    name: "Sunita Singh",
    role: "Property Investor",
    loanType: "Property Sale & Purchase",
    rating: 5,
    quote:
      "They assisted me with both property sale and purchase. The team provided end-to-end support — from understanding my requirement to documentation. I am very satisfied.",
    image: "https://i.pravatar.cc/120?img=47",
    avatarBg: "from-brand-royal to-brand-accent",
  },
  {
    name: "Vikram Yadav",
    role: "Manufacturing Unit Owner",
    loanType: "Industrial Loan",
    rating: 5,
    quote:
      "I received proper guidance on project report and documentation for my industrial loan. Coordination with the lender was also handled well. A truly professional approach.",
    image: "https://i.pravatar.cc/120?img=51",
    avatarBg: "from-brand-navy to-brand-accent",
  },
  {
    name: "Neeraj Kumar",
    role: "Trader",
    loanType: "OD/CC Limit",
    rating: 5,
    quote:
      "The team helped me well with my OD limit setup. They explained drawing power and all documentation clearly. I also receive support during periodic reviews. Very helpful.",
    image: "https://i.pravatar.cc/120?img=60",
    avatarBg: "from-brand-orangeDark to-brand-orange",
  },
];
