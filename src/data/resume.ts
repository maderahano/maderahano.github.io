/*==================================================================
  Resume content — single source of truth for the whole site.
  Everything here is taken from Made-Rahano-CV.pdf (wording lightly
  adapted for the web). Edit this file to update the portfolio.
==================================================================*/
import type { Resume } from './types';

export const resume: Resume = {
  profile: {
    name: 'Made Rahano Satryani Widhi',
    shortName: 'Made Rahano',
    title: 'Backend Infrastructure Engineer',
    company: 'Traveloka',
    location: 'South Tangerang, Indonesia',
    summary:
      'Software Engineer experienced in Java, Golang, Python and C, with a strong foundation in software development and expertise in DevOps engineering — using Terraform and Kubernetes to streamline deployment, and working with cloud services such as AWS.',
    intro:
      'I build and automate the infrastructure behind backend systems — upgrading service platforms, moving CI/CD pipelines, and hardening database access so that services stay efficient, maintainable and secure.',
    keywords: ['Java', 'Golang', 'Python', 'AWS', 'Terraform', 'Kubernetes', 'Spring Boot', 'CI/CD'],
    principles: [
      { title: 'Efficiency', text: 'Right-size infrastructure and remove overhead — from EC2 → ECS cost savings to simpler pipelines.' },
      { title: 'Maintainability', text: 'Keep platforms current (Java 21, Spring Boot 3) and architectures clean (DDD) so systems stay easy to evolve.' },
      { title: 'Security', text: 'Harden the data layer — RDS IAM Authentication across services instead of long-lived credentials.' },
    ],
    focus: [
      { label: 'Backend Engineering', sub: 'Java · Go · Python · Spring Boot · Laravel' },
      { label: 'Infrastructure as Code', sub: 'Terraform · Docker · Kubernetes' },
      { label: 'Cloud', sub: 'AWS — ECS · RDS · IAM' },
      { label: 'Delivery', sub: 'CI/CD · GitHub Actions · Microservices' },
      { label: 'Reliability & Security', sub: 'Datadog · IAM auth · maintainable platforms' },
    ],
    photo: '/assets/img/profile.jpg',
    resumePdf: '/assets/pdf/Made-Rahano-CV.pdf',
  },

  contacts: [
    { id: 'email', label: 'Email', value: 'maderahano@gmail.com', href: 'mailto:maderahano@gmail.com' },
    { id: 'linkedin', label: 'LinkedIn', value: 'in/maderahano', href: 'https://www.linkedin.com/in/maderahano/' },
    { id: 'github', label: 'GitHub', value: '@maderahano', href: 'https://github.com/maderahano' },
  ],

  skillCategories: [
    { id: 'languages', label: 'Languages', description: 'Languages I ship production code in.' },
    { id: 'backend', label: 'Backend', description: 'Frameworks used to build services and back-office applications.' },
    { id: 'cloud', label: 'Cloud & Infrastructure', description: 'Where the systems run, and how they are provisioned.' },
    { id: 'data', label: 'Data', description: 'Databases and version control.' },
    { id: 'observability', label: 'Observability', description: 'Seeing what production is doing.' },
    { id: 'cicd', label: 'CI/CD', description: 'Pipelines I have built, migrated and maintained.' },
    { id: 'practices', label: 'Practices', description: 'Engineering approaches behind the code.' },
  ],

  skills: [
    // Languages
    { id: 'java', name: 'Java', category: 'languages', core: true },
    { id: 'go', name: 'Golang', category: 'languages', core: true },
    { id: 'python', name: 'Python', category: 'languages', core: true },
    { id: 'c', name: 'C', category: 'languages' },
    { id: 'cpp', name: 'C++', category: 'languages' },
    { id: 'php', name: 'PHP', category: 'languages' },
    { id: 'bash', name: 'Bash Shell Script', category: 'languages' },
    // Backend
    { id: 'spring', name: 'Spring Boot', category: 'backend', core: true },
    { id: 'laravel', name: 'Laravel', category: 'backend' },
    { id: 'echo', name: 'Echo', category: 'backend' },
    { id: 'gin', name: 'Gin', category: 'backend' },
    // Cloud & Infrastructure
    { id: 'aws', name: 'AWS', category: 'cloud', core: true, children: ['EC2', 'ECS', 'RDS', 'IAM', 'CodeBuild', 'CodePipeline'] },
    { id: 'terraform', name: 'Terraform', category: 'cloud', core: true },
    { id: 'docker', name: 'Docker', category: 'cloud' },
    { id: 'kubernetes', name: 'Kubernetes', category: 'cloud', core: true },
    // Data
    { id: 'postgres', name: 'Postgres', category: 'data' },
    { id: 'git', name: 'Git', category: 'data' },
    // Observability
    { id: 'datadog', name: 'Datadog', category: 'observability' },
    // CI/CD
    { id: 'gha', name: 'GitHub Actions', category: 'cicd', core: true },
    { id: 'codebuild', name: 'AWS CodeBuild', category: 'cicd' },
    { id: 'codepipeline', name: 'AWS CodePipeline', category: 'cicd' },
    // Practices
    { id: 'iac', name: 'Infrastructure as Code', category: 'practices' },
    { id: 'microservices', name: 'Microservices', category: 'practices' },
    { id: 'cicd', name: 'CI/CD', category: 'practices' },
    { id: 'ddd', name: 'Domain-Driven Design', category: 'practices' },
    { id: 'dsa', name: 'Data Structures & Algorithms', category: 'practices' },
    { id: 'sdlc', name: 'SDLC', category: 'practices' },
  ],

  /* Chronological — the site tells the story oldest → current. */
  experience: [
    {
      id: 'pal',
      company: 'PT. PAL',
      role: 'Web Developer Intern',
      type: 'Internship',
      start: '2021-10',
      end: '2022-01',
      location: 'Surabaya',
      summary: 'Developed an online internship registration system for the Human Capital Management division.',
      highlights: [
        'Built the platform with Laravel so students could apply digitally instead of on-site.',
        'Streamlined the whole application process for the HCM division.',
      ],
      tech: ['php', 'laravel', 'sdlc'],
      projects: ['internship-system'],
      impact: [
        { nodes: [{ label: 'On-site application', sub: 'paper, in person' }, { label: 'Laravel web platform', accent: true }, { label: 'Digital applications', sub: 'streamlined process' }] },
      ],
    },
    {
      id: 'traveloka-intern',
      company: 'Traveloka',
      role: 'Backend Engineer Intern',
      type: 'Internship',
      start: '2022-08',
      end: '2022-12',
      location: 'South Tangerang',
      summary: 'Joined the Infrastructure team to optimize AWS resource usage.',
      highlights: [
        'Reduced operational costs by migrating services from EC2 to ECS using Terraform.',
        'Delivered a more cost-efficient and scalable infrastructure solution.',
      ],
      tech: ['aws', 'terraform', 'docker', 'iac'],
      projects: ['ec2-to-ecs'],
      impact: [
        { nodes: [{ label: 'Services on EC2' }, { label: 'Terraform', sub: 'infrastructure as code', accent: true }, { label: 'Services on ECS', sub: 'lower cost · scalable' }] },
      ],
    },
    {
      id: 'jatis',
      company: 'Jatis Mobile',
      role: 'Software Engineer',
      type: 'Full-time',
      start: '2023-05',
      end: '2024-04',
      location: 'Jakarta',
      summary: 'Developed and maintained back-office applications in a fast-paced, multi-industry tech environment.',
      highlights: [
        'Collaborated with cross-functional teams to deliver client-requested features using PHP (Laravel) and Go (Echo, Gin).',
        'Applied Domain-Driven Design principles to enhance application architecture.',
        'Ensured timely delivery across diverse development projects.',
      ],
      tech: ['php', 'laravel', 'go', 'echo', 'gin', 'ddd', 'sdlc'],
      projects: ['back-office'],
      impact: [
        { nodes: [{ label: 'Client requests', sub: 'multiple industries' }, { label: 'Laravel · Go (Echo, Gin)', sub: 'Domain-Driven Design', accent: true }, { label: 'Features delivered on time' }] },
      ],
    },
    {
      id: 'traveloka',
      company: 'Traveloka',
      role: 'Backend Infrastructure Engineer',
      type: 'Full-time',
      start: '2024-04',
      end: null,
      location: 'South Tangerang',
      summary: 'Implementing infrastructure solutions that improve system efficiency, maintainability and security across Traveloka services.',
      highlights: [
        'Upgrading services to Java 21 and Spring Boot 3 for performance, long-term support and framework compatibility.',
        'Migrating CI/CD pipelines from AWS CodeBuild & CodePipeline to GitHub Actions to reduce infrastructure overhead and streamline deployments.',
        'Implementing RDS IAM Authentication to enhance database security across services.',
      ],
      tech: ['java', 'spring', 'aws', 'gha', 'codebuild', 'codepipeline', 'terraform', 'postgres', 'datadog', 'cicd', 'microservices'],
      projects: ['java21', 'cicd-migration', 'rds-iam'],
      impact: [
        { title: 'Platform', nodes: [{ label: 'Services' }, { label: 'Java 21 · Spring Boot 3', accent: true }, { label: 'Performance · LTS · compatibility' }] },
        { title: 'Delivery', nodes: [{ label: 'CodeBuild · CodePipeline' }, { label: 'GitHub Actions', accent: true }, { label: 'Less overhead · faster deploys' }] },
        { title: 'Security', nodes: [{ label: 'Services' }, { label: 'RDS IAM Authentication', accent: true }, { label: 'Hardened database access' }] },
      ],
    },
  ],

  projects: [
    {
      id: 'cicd-migration',
      title: 'CI/CD Pipeline Migration',
      org: 'Traveloka',
      period: '2024 — present',
      experienceId: 'traveloka',
      tagline: 'From AWS CodeBuild & CodePipeline to GitHub Actions.',
      problem: 'Deployment pipelines ran on AWS CodeBuild and CodePipeline — extra infrastructure to run and maintain alongside the services themselves.',
      solution: 'Migrate the pipelines to GitHub Actions, so build and deployment run next to the code with less moving infrastructure.',
      result: 'Reduced infrastructure overhead and streamlined deployment processes.',
      contribution: 'Driving the migration of service pipelines as part of the Backend Infrastructure team.',
      tech: ['gha', 'codebuild', 'codepipeline', 'aws', 'cicd'],
      architecture: [
        { title: 'Before', nodes: [{ label: 'Code', sub: 'GitHub' }, { label: 'AWS CodePipeline' }, { label: 'AWS CodeBuild' }, { label: 'Deployment' }] },
        { title: 'After', nodes: [{ label: 'Code', sub: 'GitHub' }, { label: 'GitHub Actions', accent: true }, { label: 'Deployment' }] },
      ],
    },
    {
      id: 'java21',
      title: 'Java 21 & Spring Boot 3 Upgrade',
      org: 'Traveloka',
      period: '2024 — present',
      experienceId: 'traveloka',
      tagline: 'Bringing services onto a current, long-term-supported platform.',
      problem: 'Services on older Java and Spring Boot versions carry performance limits, shorter support windows and compatibility friction with the wider framework ecosystem.',
      solution: 'Upgrade services to Java 21 and Spring Boot 3, working through runtime and framework changes service by service.',
      result: 'Improved performance, long-term support and framework compatibility.',
      contribution: 'Actively contributing to the upgrade programme across Traveloka services.',
      tech: ['java', 'spring', 'microservices'],
      architecture: [
        { nodes: [{ label: 'Service', sub: 'existing codebase' }, { label: 'Java 21', sub: 'runtime', accent: true }, { label: 'Spring Boot 3', sub: 'framework', accent: true }, { label: 'Production', sub: 'faster · supported · compatible' }] },
      ],
    },
    {
      id: 'rds-iam',
      title: 'RDS IAM Authentication',
      org: 'Traveloka',
      period: '2024 — present',
      experienceId: 'traveloka',
      tagline: 'Hardening database access across services.',
      problem: 'Database access needed stronger, centrally managed authentication across many services.',
      solution: 'Implement RDS IAM Authentication so services authenticate to the database through AWS IAM.',
      result: 'Enhanced database security across Traveloka services.',
      contribution: 'Implementing the authentication change as part of the infrastructure security work.',
      tech: ['aws', 'postgres', 'java', 'spring'],
      architecture: [
        { nodes: [{ label: 'Service' }, { label: 'AWS IAM', sub: 'authentication', accent: true }, { label: 'Amazon RDS', sub: 'database' }] },
      ],
    },
    {
      id: 'ec2-to-ecs',
      title: 'EC2 → ECS Migration with Terraform',
      org: 'Traveloka · Infrastructure team',
      period: 'Aug — Dec 2022',
      experienceId: 'traveloka-intern',
      tagline: 'Cutting operational cost by containerising services.',
      problem: 'Services running on EC2 instances used AWS resources inefficiently, driving up operational cost.',
      solution: 'Migrate the services to ECS, with the infrastructure defined and provisioned through Terraform.',
      result: 'Reduced operational costs with a more cost-efficient and scalable infrastructure.',
      contribution: 'Carried out the migration as a Backend Engineer Intern on the Infrastructure team.',
      tech: ['aws', 'terraform', 'docker', 'iac'],
      architecture: [
        { title: 'Before', nodes: [{ label: 'Services' }, { label: 'EC2 instances' }, { label: 'AWS' }] },
        { title: 'After', nodes: [{ label: 'Services', sub: 'containers' }, { label: 'ECS', accent: true }, { label: 'AWS', sub: 'provisioned by Terraform' }] },
      ],
    },
    {
      id: 'back-office',
      title: 'Back-Office Applications',
      org: 'Jatis Mobile',
      period: 'May 2023 — Apr 2024',
      experienceId: 'jatis',
      tagline: 'Client features across industries, built on Laravel and Go.',
      problem: 'Clients across multiple industries needed new back-office features delivered quickly and reliably.',
      solution: 'Develop and maintain the applications with PHP (Laravel) and Go (Echo, Gin), applying Domain-Driven Design to keep the architecture coherent.',
      result: 'Enhanced application architecture and timely delivery across diverse projects.',
      contribution: 'Software Engineer collaborating with cross-functional teams on feature delivery.',
      tech: ['php', 'laravel', 'go', 'echo', 'gin', 'ddd'],
      architecture: [
        { nodes: [{ label: 'Client teams' }, { label: 'Back-office apps', sub: 'Laravel · Go (Echo, Gin)', accent: true }, { label: 'Domain model', sub: 'DDD' }, { label: 'Delivered features' }] },
      ],
    },
    {
      id: 'internship-system',
      title: 'Online Internship Registration System',
      org: 'PT. PAL · Human Capital Management',
      period: 'Oct 2021 — Jan 2022',
      experienceId: 'pal',
      tagline: 'Replacing on-site applications with a web platform.',
      problem: 'Students had to apply for internships on-site, which made the process slow for applicants and the HCM division.',
      solution: 'Build an online registration system with Laravel where students submit applications digitally.',
      result: 'A streamlined application process — students apply digitally instead of in person.',
      contribution: 'Developed the platform end to end as a Web Developer Intern.',
      tech: ['php', 'laravel'],
      architecture: [
        { nodes: [{ label: 'Students' }, { label: 'Registration web app', sub: 'Laravel', accent: true }, { label: 'HCM division', sub: 'reviews applications' }] },
      ],
    },
  ],

  education: [
    {
      institution: 'Politeknik Elektronika Negeri Surabaya',
      degree: 'Bachelor of Applied Science in Informatics Engineering',
      start: '2019-07',
      end: '2023-09',
      location: 'Surabaya',
    },
  ],

  /* Not part of the PDF — carried over from the previous version of this portfolio. */
  interests: [
    { title: 'Distributed systems', text: 'Continuously exploring how services coordinate, fail and recover at scale.' },
    { title: 'Kubernetes & platforms', text: 'Digging deeper into orchestration beyond the day job.' },
    { title: 'Building small games', text: 'Side projects in plain JavaScript and canvas — Snake, memory games and endless runners.' },
  ],
};
