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
      { name: 'Go', icon: 'devicon-go-original-wordmark'},
      { name: 'Java / Spring Boot', icon: 'devicon-spring-plain'},
      { name: 'Python', icon: 'devicon-python-plain'},
      { name: 'PHP / Laravel', icon: 'devicon-laravel-plain'},
      { name: 'C', icon: 'devicon-c-plain'},
    ],
  },
  {
    title: 'Databases',
    icon: 'uil-database',
    items: [
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain'},
      { name: 'MySQL', icon: 'devicon-mysql-plain'},
      { name: 'Redis', icon: 'devicon-redis-plain'},
      { name: 'MongoDB', icon: 'devicon-mongodb-plain'},
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: 'uil-cloud',
    items: [
      { name: 'Docker', icon: 'devicon-docker-plain'},
      { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark'},
      { name: 'Kubernetes', icon: 'devicon-kubernetes-plain'},
      { name: 'Terraform', icon: 'devicon-terraform-plain'},
      { name: 'GitHub Actions / CI-CD', icon: 'devicon-githubactions-plain'},
      { name: 'Ansible', icon: 'devicon-ansible-plain'},
    ],
  },
  // {
  //   title: 'Frontend',
  //   icon: 'uil-web-grid',
  //   items: [
  //     { name: 'HTML5', icon: 'devicon-html5-plain'},
  //     { name: 'CSS3', icon: 'devicon-css3-plain'},
  //     { name: 'JavaScript', icon: 'devicon-javascript-plain'},
  //     { name: 'React', icon: 'devicon-react-original'},
  //   ],
  // },
  {
    title: 'Tools & Workflow',
    icon: 'uil-wrench',
    items: [
      { name: 'Git', icon: 'devicon-git-plain'},
      { name: 'Linux', icon: 'devicon-linux-plain'},
      { name: 'Postman', icon: 'devicon-postman-plain'},
      { name: 'Jira', icon: 'devicon-jira-plain'},
      { name: 'Grafana / Prometheus', icon: 'devicon-grafana-original'},
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
  // {
  //   title: 'Certifications & Training',
  //   place: 'Continuous professional development',
  //   date: 'Ongoing',
  //   icon: 'uil-award',
  //   desc: 'Self-directed and program-based training in cloud infrastructure, container orchestration, and backend system design.',
  //   tags: ['AWS', 'Kubernetes', 'Terraform', 'Backend Design'],
  // },
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
    desc: 'A small collection of vanilla-JS games — Snake, Memory Match and an offline-style Dino Run — built without any framework, with LocalStorage high-scores.',
    tags: ['JavaScript', 'Canvas', 'LocalStorage'],
    github: 'https://github.com/maderahano',
    demo: '#games',
  },
];

/* Testimonials carousel */
const TESTIMONIALS = [
  {
    text: 'I highly recommend Rahano as an outstanding professional in the fields of DevOps and backend development. Rahano is quick to learn, adept at focusing on the root of problems, and always up-to-date with the latest technologies related to DevOps. His exceptional problem-solving skills make him a valuable asset to any team. Rahano is also great at engaging in technical discussions and planning projects, both in terms of problem-solving and technical implementation. I wholeheartedly endorse Rahano for any team or company in need of strong technical and interpersonal skills.',
    name: 'Anistya Dwi Setiawan',
    role: 'Backend Developer',
    img: 'assets/img/testimonial1.jpg',
  },
  {
    text: 'Rahano is a smart, hard-working, and reliable person. He gets along with everyone, which makes him great to work with. His ability to adapt to changing circumstances are remarkable. What a cool teammate 😎',
    name: 'Ryan Garnet Andrianto',
    role: 'Software Expert',
    img: 'assets/img/testimonial2.jpg',
  },
  {
    text: "Rahano was my mentee during Kampus Merdeka internship program at Traveloka, During the collaboration, Rahano helped us a lot, not just about our projects but sometimes fix the tech debt also. He showed a good commitment to our projects, his weekly tasks always on track & finished on time. In day to day collaboration, any discussion between us is done smoothly. He's a good learner and have good communication skill, very recommend to work with Rahano. Thank you Rahano.",
    name: 'Harits Rahman Mazayamusthafa',
    role: 'Site Reliability Engineer',
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
