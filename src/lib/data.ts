// ============================================================
// SITE DATA — Single source of truth for all content
// ============================================================

export const siteConfig = {
  name: "ARTH AGRAWAL",
  handle: "ARTH",
  tagline: "AI Engineer · Full-Stack Developer · Creative Technologist",
  email: "arth.agrawal53@nmims.in",
  location: "Mumbai, India",
  bio: [
    "Building intelligent systems at the intersection of AI and human experience.",
    "NMIMS Mumbai · MBA Tech (B.Tech + MBA) · Computer Engineering",
    "From neural architectures to immersive interfaces — I craft what doesn't exist yet.",
  ],
  social: {
    github: "https://github.com/arth-1",
    linkedin: "https://linkedin.com/in/arthagrawal",
  },
};

export const projects = [
  {
    id: "01",
    title: "Emotional AI Speech Assistant",
    subtitle: "Speech-to-Speech Emotional Intelligence",
    description:
      "End-to-end emotional speech AI pipeline. Understands emotional context in voice, generates human-like responses with matched emotional tone. Context-aware conversational workflow built on NLP + deep learning architectures.",
    tags: ["Python", "NLP", "Deep Learning", "OpenAI API", "LangChain", "Speech Processing"],
    category: "AI / ML",
    status: "COMPLETED",
    color: "#7ef9ff",
  },
  {
    id: "02",
    title: "Edu-GPT",
    subtitle: "Transformer-Based Educational Language Model",
    description:
      "GPT-style educational model trained on EduFineWeb dataset. Custom transformer architecture implementation from fundamentals — tokenization, attention mechanisms, training pipeline, and evaluation.",
    tags: ["Python", "PyTorch", "Transformers", "NLP", "Custom Model Training"],
    category: "AI / ML",
    status: "COMPLETED",
    color: "#a78bfa",
  },
  {
    id: "03",
    title: "Real Estate AI SaaS",
    subtitle: "Full-Stack AI Client Management Platform",
    description:
      "Enterprise AI SaaS platform for real estate teams. Features AI call summarization, performance scoring, translation, ticket management, and workflow automation — built on Next.js + Supabase.",
    tags: ["Next.js", "Supabase", "TypeScript", "OpenAI API", "LangChain", "PostgreSQL"],
    category: "FULL STACK · AI",
    status: "COMPLETED",
    color: "#f472b6",
  },
  {
    id: "04",
    title: "Mythril AI",
    subtitle: "Startup Advisor Companion",
    description:
      "AI-powered startup advisory platform with conversational AI, CSV data visualization, AI-generated strategic content, and integrated image generation. Built for founders who need instant intelligence.",
    tags: ["Python", "Streamlit", "OpenAI API", "LangChain", "Data Visualization"],
    category: "AI / PRODUCT",
    status: "COMPLETED",
    color: "#fb923c",
  },
  {
    id: "05",
    title: "MusicPlus",
    subtitle: "Full-Stack Music Streaming Platform",
    description:
      "A complete Spotify-like music streaming platform. Full backend + frontend integration with playlist management, streaming architecture, and responsive design across all devices.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "REST APIs"],
    category: "FULL STACK",
    status: "COMPLETED",
    color: "#34d399",
  },
];

export const skills = [
  {
    domain: "AI / ML",
    items: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "RAG Systems", "LLM Integration", "Prompt Engineering", "OpenAI API", "LangChain"],
  },
  {
    domain: "FULL STACK",
    items: ["React.js", "Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Supabase", "Firebase", "REST APIs"],
  },
  {
    domain: "3D / CREATIVE",
    items: ["Three.js", "React Three Fiber", "GSAP", "Framer Motion", "WebGL", "Shader Programming"],
  },
  {
    domain: "SYSTEMS",
    items: ["Python", "Go", "Rust", "Docker", "Git", "Data Structures", "Backend Architecture"],
  },
  {
    domain: "OTHER",
    items: ["React Native", "Figma", "Arduino", "Unity / Godot", "AI Automation", "Cloud Systems"],
  },
];

export const experience = [
  {
    role: "AI/ML Intern",
    company: "SoulYatri",
    period: "2024",
    highlights: [
      "Built end-to-end emotional speech-to-speech AI assistant",
      "Designed conversational AI pipelines with context awareness",
      "Integrated NLP + deep learning systems into production workflows",
    ],
  },
];

export const leadership = [
  { role: "Head of Tech", org: "4C Marketing Cell" },
  { role: "Sub Head — AI/ML", org: "Google Developer Group" },
  { role: "Executive", org: "Tech & Research Cell" },
  { role: "Executive", org: "IEEE Robotics & Automation Society" },
];

export const achievements = [
  "Finalist — Taqneeq Cyber Cypher ML Hackathon",
  "IBM Datathon Participant",
  "GOI Statathon 2025",
  "Built RAG-based API gateway system",
];

export const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
];

export const philosophyCards = [
  {
    id: "01",
    title: "INTELLIGENCE",
    body: "I build systems that think. Not demos — production-grade AI pipelines that understand context, emotion, and intent.",
    code: "model.understand(human_intent)",
  },
  {
    id: "02",
    title: "CRAFT",
    body: "Every pixel, every interaction, every animation is intentional. I obsess over the gap between good and extraordinary.",
    code: "while (gap > 0) { iterate(); }",
  },
  {
    id: "03",
    title: "SYSTEMS",
    body: "From transformer architectures to streaming platforms — I think in systems. Scalable, resilient, and alive.",
    code: "architecture.scale(∞)",
  },
  {
    id: "04",
    title: "VISION",
    body: "The most interesting problems don't have solutions yet. I build at the frontier — where code meets imagination.",
    code: "reality = code + creativity",
  },
];
