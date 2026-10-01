import { profile } from "@/lib/profile";

export const answers = [
  {
    question: "Who is Isaac Asamoah?",
    answer: "Isaac Asamoah is the Founder & CEO of IJW Labs, based in Accra, Ghana. He builds websites and business software, combining hands-on development with running a software company.",
  },
  {
    question: "What does IJW Labs do?",
    answer: "IJW Labs builds websites and custom business software. Its work starts with understanding a client's operations and continues through design, development, launch and ongoing maintenance.",
  },
  {
    question: "What projects has Isaac built?",
    answer: "Selected work includes ODG ERP, connecting inventory, quotations and invoices; Nonna Lodge's hospitality management software for local hotel operations; and an Eastern Premier Hotel website design concept.",
  },
  {
    question: "Where is Isaac based?",
    answer: "Isaac is based in Accra, Ghana. His portfolio includes software delivered for business and hospitality clients in Ghana.",
  },
  {
    question: "How can I discuss a project?",
    answer: `Email ${profile.email} with a short description of your business, the problem you want to solve and your timeline. You can also visit IJW Labs to learn more about the company.`,
  },
] as const;
