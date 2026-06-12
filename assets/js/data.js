/*==================================================================
  Portfolio content — single source of truth.
  Edit anything here; the UI renders from these objects.
  Skill `level` = self-rated proficiency % (drives the progress bars).
  Devicon classes power the tech logos (https://devicon.dev).
==================================================================*/

/* Hero typing-effect roles */
const TYPED_ROLES = [
  'Software Engineer',
  'Backend Developer',
  'Infrastructure & DevOps Engineer',
  'Cloud Enthusiast',
  'Problem Solver',
];

/* About section — quick highlight chips + fun-fact cards */
const ABOUT_CHIPS = ['Go', 'Java', 'Python', 'AWS', 'Kubernetes', 'Terraform', 'PostgreSQL'];

const ABOUT_CARDS = [
  { icon: 'uil-server-network', title: 'Backend & Infra', text: 'Scalable services, IaC, and CI/CD that ship safely.' },
  { icon: 'uil-cloud-data-connection', title: 'Cloud Native', text: 'AWS, Docker & Kubernetes in production.' },
  { icon: 'uil-rocket', title: 'Performance', text: 'Cost-efficient systems and faster pipelines.' },
  { icon: 'uil-graduation-cap', title: 'Always Learning', text: 'Currently exploring distributed systems & AI/ML.' },
];

const FUN_FACTS = [
  '☕ Runs on coffee and clean commit history',
  '🐧 Daily-drives Linux and lives in the terminal',
  '🎮 Builds little games for fun (try the ones below!)',
  '🏎️  Reduced a deployment pipeline by migrating to GitHub Actions',
];

/* Skills — grouped, with proficiency levels */
const SKILLS = [
  {
    title: 'Backend',
    icon: 'uil-brackets-curly',
    items: [
      { name: 'Go', icon: 'devicon-go-original-wordmark', level: 90 },
      { name: 'Java / Spring Boot', icon: 'devicon-spring-plain', level: 88 },
      { name: 'Python', icon: 'devicon-python-plain', level: 82 },
      { name: 'PHP / Laravel', icon: 'devicon-laravel-plain', level: 80 },
      { name: 'C', icon: 'devicon-c-plain', level: 70 },
    ],
  },
  {
    title: 'Databases',
    icon: 'uil-database',
    items: [
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', level: 88 },
      { name: 'MySQL', icon: 'devicon-mysql-plain', level: 85 },
      { name: 'Redis', icon: 'devicon-redis-plain', level: 80 },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain', level: 72 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: 'uil-cloud',
    items: [
      { name: 'Docker', icon: 'devicon-docker-plain', level: 90 },
      { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark', level: 85 },
      { name: 'Kubernetes', icon: 'devicon-kubernetes-plain', level: 78 },
      { name: 'Terraform', icon: 'devicon-terraform-plain', level: 84 },
      { name: 'GitHub Actions / CI-CD', icon: 'devicon-githubactions-plain', level: 86 },
      { name: 'Ansible', icon: 'devicon-ansible-plain', level: 75 },
    ],
  },
  {
    title: 'Frontend',
    icon: 'uil-web-grid',
    items: [
      { name: 'HTML5', icon: 'devicon-html5-plain', level: 85 },
      { name: 'CSS3', icon: 'devicon-css3-plain', level: 82 },
      { name: 'JavaScript', icon: 'devicon-javascript-plain', level: 80 },
      { name: 'React', icon: 'devicon-react-original', level: 70 },
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: 'uil-wrench',
    items: [
      { name: 'Git', icon: 'devicon-git-plain', level: 92 },
      { name: 'Linux', icon: 'devicon-linux-plain', level: 88 },
      { name: 'Postman', icon: 'devicon-postman-plain', level: 85 },
      { name: 'Jira', icon: 'devicon-jira-plain', level: 80 },
      { name: 'Grafana / Prometheus', icon: 'devicon-grafana-original', level: 78 },
    ],
  },
];

/* Work experience timeline */
const EXPERIENCE = [
  {
    role: 'Backend Infrastructure Engineer',
    company: 'Traveloka',
    location: 'South Tangerang, ID',
    date: 'Apr 2024 — Present',
    icon: 'uil-cloud-computing',
    summary: 'Building infrastructure solutions that improve system efficiency, maintainability, and security across services.',
    points: [
      'Upgraded core services to Java 21 and Spring Boot 3.',
      'Migrated CI/CD from AWS CodeBuild & CodePipeline to GitHub Actions.',
      'Implemented RDS IAM Authentication to harden database access.',
    ],
    tags: ['Java 21', 'Spring Boot 3', 'AWS', 'GitHub Actions', 'Terraform'],
  },
  {
    role: 'Software Engineer',
    company: 'Jatis Mobile',
    location: 'Jakarta, ID',
    date: 'May 2023 — Apr 2024',
    icon: 'uil-code-branch',
    summary: 'Developed and maintained back-office applications in a fast-paced, multi-industry tech environment.',
    points: [
      'Delivered client-requested features with PHP (Laravel) and Go (Echo, Gin).',
      'Applied Domain-Driven Design to improve application architecture.',
      'Collaborated cross-functionally to ship reliable releases.',
    ],
    tags: ['Go', 'Laravel', 'PHP', 'DDD', 'PostgreSQL'],
  },
  {
    role: 'Backend Engineer Intern',
    company: 'Traveloka',
    location: 'South Tangerang, ID',
    date: 'Aug 2022 — Dec 2022',
    icon: 'uil-server',
    summary: 'Joined the Infrastructure team to optimize AWS resource usage and reduce operational cost.',
    points: [
      'Migrated services from EC2 to ECS using Terraform.',
      'Delivered a more cost-efficient, scalable infrastructure setup.',
    ],
    tags: ['AWS', 'ECS', 'Terraform', 'Docker'],
  },
  {
    role: 'Web Developer Intern',
    company: 'PT. PAL Indonesia',
    location: 'Surabaya, ID',
    date: 'Oct 2021 — Jan 2022',
    icon: 'uil-window',
    summary: 'Built an online internship registration system for the Human Capital Management division.',
    points: [
      'Developed the platform with Laravel, replacing an on-site paper process.',
      'Streamlined applications so students could apply digitally.',
    ],
    tags: ['Laravel', 'PHP', 'MySQL'],
  },
];

/* Education + certifications/training */
const EDUCATION = [
  {
    title: 'B.A.Sc. in Informatics Engineering',
    place: 'Politeknik Elektronika Negeri Surabaya (PENS)',
    date: 'Jul 2019 — Sep 2023',
    icon: 'uil-graduation-cap',
    desc: 'Focused on software engineering, data structures & algorithms, and system programming. Hands-on with microservices, cloud computing, and DevOps practices.',
    tags: ['Software Engineering', 'Algorithms', 'Cloud Computing'],
  },
  {
    title: 'Certifications & Training',
    place: 'Continuous professional development',
    date: 'Ongoing',
    icon: 'uil-award',
    desc: 'Self-directed and program-based training in cloud infrastructure, container orchestration, and backend system design.',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'Backend Design'],
  },
];

/* Portfolio projects — category drives the filter chips.
   Categories: 'backend' | 'frontend' | 'fullstack' | 'personal' */
const PROJECTS = [
  {
    title: 'Microservice Platform',
    category: 'backend',
    img: 'assets/img/portfolio1.jpg',
    desc: 'A scalable microservice architecture built with Go, gRPC and Kubernetes for high-throughput, low-latency processing. Service discovery, health checks, and graceful shutdowns included.',
    tags: ['Go', 'gRPC', 'Kubernetes', 'PostgreSQL'],
    github: 'https://github.com/maderahano',
    demo: '',
  },
  {
    title: 'Infrastructure Automation',
    category: 'backend',
    img: 'assets/img/portfolio2.jpg',
    desc: 'Automated cloud provisioning using reusable Terraform modules and Ansible playbooks on AWS. One command spins up a reproducible environment from scratch.',
    tags: ['Terraform', 'AWS', 'Ansible', 'CI/CD'],
    github: 'https://github.com/maderahano',
    demo: '',
  },
  {
    title: 'CI/CD Pipeline Migration',
    category: 'fullstack',
    img: 'assets/img/portfolio3.jpg',
    desc: 'Migrated deployment pipelines from AWS CodeBuild/CodePipeline to GitHub Actions, cutting build times and simplifying maintenance with reusable workflows.',
    tags: ['GitHub Actions', 'Docker', 'AWS', 'Bash'],
    github: 'https://github.com/maderahano',
    demo: '',
  },
  {
    title: 'Internship Registration System',
    category: 'fullstack',
    img: 'assets/img/project.png',
    desc: 'A web platform built with Laravel that digitized an on-site internship application process for a Human Capital division, end-to-end from form to approval.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/maderahano',
    demo: '',
  },
  {
    title: 'Personal Portfolio',
    category: 'frontend',
    img: 'assets/img/profil.png',
    desc: 'This site — a fully static, animated portfolio with dark/light themes, particles, a custom cursor, mini-games and easter eggs. Pure HTML, CSS and JavaScript.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Canvas'],
    github: 'https://github.com/maderahano/maderahano.github.io',
    demo: 'https://maderahano.github.io',
  },
  {
    title: 'Browser Mini-Games',
    category: 'personal',
    img: 'assets/img/portfolio1.jpg',
    desc: 'A small collection of vanilla-JS games — Snake, Memory Match and a coding quiz — built without any framework, with LocalStorage high-scores.',
    tags: ['JavaScript', 'Canvas', 'LocalStorage'],
    github: 'https://github.com/maderahano',
    demo: '#games',
  },
];

/* Testimonials carousel */
const TESTIMONIALS = [
  {
    text: 'Made is an exceptional engineer who brings both technical depth and creative problem-solving to every project. His work on our backend systems significantly improved performance and reliability.',
    name: 'Sara Smith',
    role: 'Engineering Manager',
    img: 'assets/img/testimonial1.jpg',
  },
  {
    text: 'Working with Made was a great experience. He delivered high-quality code on time and communicated effectively throughout the project. Highly recommended for any backend work.',
    name: 'Matt Robinson',
    role: 'Tech Lead',
    img: 'assets/img/testimonial2.jpg',
  },
  {
    text: "Made's expertise in DevOps and infrastructure automation helped us cut deployment time dramatically. His proactive approach and attention to detail make him a valuable team member.",
    name: 'Raul Harris',
    role: 'Product Owner',
    img: 'assets/img/testimonial3.jpg',
  },
];

/* Coding quiz questions */
const QUIZ = [
  {
    q: 'In Go, what does the `defer` keyword do?',
    options: ['Runs a function immediately', 'Schedules a call to run when the surrounding function returns', 'Creates a goroutine', 'Declares a constant'],
    answer: 1,
  },
  {
    q: 'Which HTTP status code means "Too Many Requests"?',
    options: ['401', '404', '429', '503'],
    answer: 2,
  },
  {
    q: 'In Docker, which instruction creates a new layer that runs a command at build time?',
    options: ['CMD', 'RUN', 'ENTRYPOINT', 'EXPOSE'],
    answer: 1,
  },
  {
    q: 'What is the time complexity of a binary search on a sorted array?',
    options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'],
    answer: 2,
  },
  {
    q: 'In Kubernetes, what is the smallest deployable unit?',
    options: ['Node', 'Pod', 'Container', 'Deployment'],
    answer: 1,
  },
  {
    q: 'Which SQL clause filters rows AFTER aggregation (GROUP BY)?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
    answer: 1,
  },
  {
    q: 'In Git, which command moves commits from one branch onto another, rewriting history?',
    options: ['git merge', 'git rebase', 'git cherry-pick', 'git reset'],
    answer: 1,
  },
];

/* Memory game icons (8 pairs) */
const MEMORY_ICONS = ['🐳', '🚀', '⚙️', '🐧', '☁️', '🔑', '🧩', '⚡'];

/* Expose to other scripts */
window.PORTFOLIO_DATA = {
  TYPED_ROLES, ABOUT_CHIPS, ABOUT_CARDS, FUN_FACTS, SKILLS,
  EXPERIENCE, EDUCATION, PROJECTS, TESTIMONIALS, QUIZ, MEMORY_ICONS,
};
