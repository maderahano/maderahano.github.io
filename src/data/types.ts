/* Resume data model. The UI renders exclusively from these shapes. */

export type SkillCategoryId =
  | 'languages'
  | 'backend'
  | 'cloud'
  | 'data'
  | 'observability'
  | 'cicd'
  | 'practices';

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategoryId;
  /** Sub-services / related tools that sit under this skill (e.g. AWS → RDS, ECS). */
  children?: string[];
  /** Mark the handful of technologies that define the profile. */
  core?: boolean;
}

export interface FlowNode {
  label: string;
  sub?: string;
  /** Visually emphasised node (the thing that changed / the key component). */
  accent?: boolean;
}

export interface Flow {
  title?: string;
  nodes: FlowNode[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'Full-time' | 'Internship';
  /** ISO month, e.g. "2024-04". `end` null = present. */
  start: string;
  end: string | null;
  location: string;
  summary: string;
  highlights: string[];
  /** Skill ids used in this role. */
  tech: string[];
  /** Project ids delivered in this role. */
  projects: string[];
  /** A small before → after (or linear) visual summarising the impact. */
  impact?: Flow[];
}

export interface Project {
  id: string;
  title: string;
  org: string;
  period: string;
  experienceId: string;
  tagline: string;
  problem: string;
  solution: string;
  result: string;
  contribution: string;
  tech: string[];
  /** One flow = linear architecture; two flows = before / after. */
  architecture: Flow[];
}

export interface Education {
  institution: string;
  degree: string;
  start: string;
  end: string;
  location: string;
}

export interface Interest {
  title: string;
  text: string;
}

export interface ContactLink {
  id: 'email' | 'linkedin' | 'github';
  label: string;
  value: string;
  href: string;
}

export interface Resume {
  profile: {
    name: string;
    shortName: string;
    title: string;
    company: string;
    location: string;
    summary: string;
    intro: string;
    keywords: string[];
    /** Values the current role is explicitly about. */
    principles: { title: string; text: string }[];
    /** Areas of expertise — rendered as a connected chain. */
    focus: { label: string; sub: string }[];
    photo: string;
    resumePdf: string;
  };
  contacts: ContactLink[];
  skillCategories: SkillCategory[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  interests: Interest[];
}
