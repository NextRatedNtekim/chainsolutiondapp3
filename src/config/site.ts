// All school-specific content lives here. Update copy and contact details as the school requires.
export const site = {
  name: "Brightpath Secondary School",
  logo: "Official student support portal",
  description:
    "Raise a concern, confirm your class, and get routed to the right staff member — without creating an account or sharing anything sensitive.",
  history:
    "Founded in 2005, Brightpath grew from a single block of classrooms into a full secondary school serving JSS 1 through SS 2, built on the belief that every student deserves to be heard quickly.",
  mission:
    "To give every student a fast, simple way to raise concerns and be understood — and to give staff the context they need to respond well.",
  vision:
    "A school where no complaint goes unheard and no student feels unsure of who to turn to.",
  academics:
    "From JSS 1 to SS 2, students follow a structured curriculum aligned with national standards, with dedicated subject teachers and regular assessments.",
  features: [
    "Small class sizes with dedicated subject teachers",
    "WAEC and NECO exam preparation built into the curriculum",
    "A support desk that responds to every student within 48 hours",
  ],
  support:
    "Whether it's a classroom issue, a facilities concern, or something you're not sure who to tell — start with a complaint and we'll route it to the right person.",
  extra:
    "Every submission through this portal is anonymous: we don't ask for your name, and complaints and subject details are stored as separate, unlinked records.",
  contact: {
    address: "15 Independence Layout, Enugu, Nigeria",
    phone: "+234 801 234 5678",
    email: "support@brightpathss.edu.ng",
  },
  care: {
    title: "We're listening",
    intro:
      "Tell us what's going on. Once we have your complaint, a quick class check helps us route it to the right staff member — no account, no sign-up.",
  },
  classes: [
    { id: "class-1", label: "JSS 1", icon: "●" },
    { id: "class-2", label: "JSS 2", icon: "■" },
    { id: "class-3", label: "SS 1", icon: "▲" },
    { id: "class-4", label: "SS 2", icon: "◆" },
  ],
  subjectCounts: [12, 15, 18, 21, 24],
  privacy: [
    {
      title: "What information is collected",
      body: "Just the text of your complaint, and — if you complete the class check — your class level and the list of subjects you offer. We never ask for your name, student ID, or contact details.",
    },
    {
      title: "Why it is collected",
      body: "Your complaint lets staff know what's wrong. Your class and subjects help us route it to the teacher or department best placed to help.",
    },
    {
      title: "How verification information is used",
      body: "The class check exists only to route your complaint correctly. \"Verify from school app\" is an optional automatic path; if it's unavailable, entering your class and subjects yourself works just as well.",
    },
    {
      title: "Where it is stored",
      body: "Submissions are stored in the school's database as two separate, unlinked tables — complaints and subject submissions carry no identifying information connecting them to each other or to you.",
    },
    {
      title: "How it is protected",
      body: "The site runs over HTTPS, limits how many submissions can be made from one connection in a short time, and restricts the admin dashboard to signed-in staff accounts protected by hashed passwords.",
    },
    {
      title: "Who can access it",
      body: "Only staff with an admin account can view submitted complaints and subject lists, through the sign-in-protected dashboard.",
    },
    {
      title: "How long it is kept",
      body: "Submissions are retained for one academic year to allow follow-up, then removed.",
    },
    {
      title: "Third-party sharing",
      body: "Submissions are never sold or shared outside the school. The only third-party service used is the database provider that stores the data on the school's behalf.",
    },
    {
      title: "Your rights",
      body: "Since submissions are anonymous, we can't look up or delete an individual submission after the fact. You're free to leave out any detail you'd rather not share.",
    },
    {
      title: "Privacy questions",
      body: "Contact the school office at support@brightpathss.edu.ng with any questions about this policy.",
    },
  ],
  appVerify: { unavailable: "The school app isn't connected yet", loadingSeconds: 10 },
} as const;
