/* Derived lookups — relationships between skills, experience and projects are
   computed once from resume data so nothing is duplicated by hand. */
import { resume } from '../data/resume';
import type { Experience, Project, Skill, SkillCategoryId } from '../data/types';
import { monthsBetween, yearsSince } from './dates';

export const skillById = new Map<string, Skill>(resume.skills.map((s) => [s.id, s]));
export const experienceById = new Map<string, Experience>(resume.experience.map((e) => [e.id, e]));
export const projectById = new Map<string, Project>(resume.projects.map((p) => [p.id, p]));

export function skillName(id: string): string {
  return skillById.get(id)?.name ?? id;
}

export function skillsInCategory(category: SkillCategoryId): Skill[] {
  return resume.skills.filter((s) => s.category === category);
}

/** Experience entries whose tech list contains the skill (newest first). */
export function experienceForSkill(skillId: string): Experience[] {
  return [...resume.experience].reverse().filter((e) => e.tech.includes(skillId));
}

/** Projects that used the skill, directly or via their parent experience's tech list. */
export function projectsForSkill(skillId: string): Project[] {
  return resume.projects.filter((p) => p.tech.includes(skillId));
}

export function projectsForExperience(experienceId: string): Project[] {
  return resume.projects.filter((p) => p.experienceId === experienceId);
}

/* Headline numbers — computed from the dates in the resume, never typed in.
   `yearsExperience` sums the actual months worked across roles (internships included),
   which is more conservative than the calendar span since the first role. */
const totalMonths = resume.experience.reduce((acc, e) => acc + monthsBetween(e.start, e.end), 0);
export const stats = {
  yearsExperience: Math.floor(totalMonths / 12),
  yearsSinceFirstRole: yearsSince(resume.experience[0].start),
  roles: resume.experience.length,
  companies: new Set(resume.experience.map((e) => e.company)).size,
  projects: resume.projects.length,
  totalMonths,
};
