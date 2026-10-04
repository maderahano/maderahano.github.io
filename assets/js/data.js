/*==================================================================
  Portfolio content — single source of truth.
  Edit anything here; the UI renders from these objects.
  Unicons classes (uil-*) power the UI icons; Devicon SVGs power tech logos.
==================================================================*/

/* Hero + identity */
const HERO = {
  name: 'Made Rahano',
  fullName: 'Made Rahano Satryani Widhi',
  handle: 'maderahano',
  role: 'Backend Infrastructure Engineer',
  company: 'Traveloka',
  location: 'Jakarta, Indonesia',
  timezone: 'UTC+7',
  headline: 'I build and automate the infrastructure behind backend systems.',
  intro:
    'Software engineer with 3+ years across backend and infrastructure — Java, Go and Python on AWS, with Terraform, Kubernetes and CI/CD that keep services reliable and easy to evolve.',
  /* "key: value" lines for the system card */
  facts: [
    { key: 'focus', value: 'Backend · Infrastructure · DevOps' },
    { key: 'stack', value: 'Java 21 · Spring Boot 3 · Go · Python' },
    { key: 'cloud', value: 'AWS · Terraform · Kubernetes · GitHub Actions' },
    { key: 'data', value: 'PostgreSQL · MySQL · Redis' },
  ],
  /* Delivery pipeline shown in the hero card — the stack he actually runs */
  pipeline: [
    { icon: 'uil-code-branch', label: 'Code', sub: 'Java · Go' },
    { icon: 'uil-process', label: 'CI/CD', sub: 'GitHub Actions' },
    { icon: 'uil-layer-group', label: 'Infra as Code', sub: 'Terraform' },
    { icon: 'uil-cloud', label: 'Cloud', sub: 'AWS · Kubernetes' },
  ],
  resume: 'assets/pdf/Made-Rahano-CV.pdf',
  email: 'maderahano@gmail.com',
  socials: [
    { label: 'GitHub', icon: 'uil-github-alt', href: 'https://github.com/maderahano' },
    { label: 'LinkedIn', icon: 'uil-linkedin-alt', href: 'https://www.linkedin.com/in/maderahano/' },
    { label: 'Instagram', icon: 'uil-instagram', href: 'https://www.instagram.com/md.rahano/' },
  ],
};

/* About section */
const ABOUT = {
  paragraphs: [
    'I\'m a <strong>Software Engineer</strong> with 3+ years of experience specializing in backend development, DevOps practices and cloud infrastructure. My core expertise lives in <strong>Java, Go and Python</strong>, complemented by hands-on cloud and infrastructure-as-code work.',
    'I care about systems that are reliable, observable and easy to evolve — and about keeping the developer experience around them sharp. I\'m continuously exploring distributed systems, Kubernetes and how AI/ML fits into production.',
  ],
  chips: ['Go', 'Java', 'Python', 'AWS', 'Kubernetes', 'Terraform', 'PostgreSQL'],
  stats: [
    { value: 3, suffix: '+', label: 'Years of experience' },
    { value: 3, suffix: '', label: 'Companies' },
    { value: 4, suffix: '', label: 'Engineering roles' },
  ],
  cards: [
    { icon: 'uil-server-network', title: 'Backend & Infra', text: 'Scalable services, IaC, and CI/CD that ship safely.' },
    { icon: 'uil-cloud-data-connection', title: 'Cloud Native', text: 'AWS, Docker & Kubernetes in production.' },
    { icon: 'uil-tachometer-fast-alt', title: 'Efficiency', text: 'Cost-efficient systems and faster pipelines.' },
    { icon: 'uil-graduation-cap', title: 'Always Learning', text: 'Currently exploring distributed systems & AI/ML.' },
  ],
};

/* Skills — grouped.
   `logo` is a Devicon SVG path (https://devicon.dev), e.g. 'go/go-original'.
   `mono: true` marks black-on-transparent logos so they invert on the dark theme. */
const SKILLS = [
  {
    title: 'Backend',
    icon: 'uil-brackets-curly',
    items: [
      { name: 'Go', logo: 'go/go-original-wordmark' },
      { name: 'Java / Spring Boot', logo: 'spring/spring-original' },
      { name: 'Python', logo: 'python/python-original' },
      { name: 'PHP / Laravel', logo: 'laravel/laravel-original' },
      { name: 'C', logo: 'c/c-original' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: 'uil-cloud',
    items: [
      { name: 'AWS', logo: 'amazonwebservices/amazonwebservices-plain-wordmark' },
      { name: 'Terraform', logo: 'terraform/terraform-original' },
      { name: 'Kubernetes', logo: 'kubernetes/kubernetes-plain' },
      { name: 'Docker', logo: 'docker/docker-original' },
      { name: 'GitHub Actions / CI-CD', logo: 'githubactions/githubactions-original' },
      { name: 'Ansible', logo: 'ansible/ansible-original', mono: true },
    ],
  },
  {
    title: 'Databases',
    icon: 'uil-database',
    items: [
      { name: 'PostgreSQL', logo: 'postgresql/postgresql-original' },
      { name: 'MySQL', logo: 'mysql/mysql-original' },
      { name: 'Redis', logo: 'redis/redis-original' },
      { name: 'MongoDB', logo: 'mongodb/mongodb-original' },
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: 'uil-wrench',
    items: [
      { name: 'Git', logo: 'git/git-original' },
      { name: 'Linux', logo: 'linux/linux-plain', mono: true },
      { name: 'Grafana / Prometheus', logo: 'grafana/grafana-original' },
      { name: 'Postman', logo: 'postman/postman-original' },
      { name: 'Jira', logo: 'jira/jira-original' },
    ],
  },
];

/* Work experience */
const EXPERIENCE = [
  {
    role: 'Backend Infrastructure Engineer',
    company: 'Traveloka',
    location: 'South Tangerang, ID',
    date: 'Apr 2024 — Present',
    current: true,
    summary: 'Building infrastructure solutions that improve system efficiency, maintainability and security across services.',
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
    summary: 'Built an online internship registration system for the Human Capital Management division.',
    points: [
      'Developed the platform with Laravel, replacing an on-site paper process.',
      'Streamlined applications so students could apply digitally.',
    ],
    tags: ['Laravel', 'PHP', 'MySQL'],
  },
];

/* Education */
const EDUCATION = [
  {
    title: 'B.A.Sc. in Informatics Engineering',
    place: 'Politeknik Elektronika Negeri Surabaya (PENS)',
    location: 'Surabaya, ID',
    date: 'Jul 2019 — Sep 2023',
    desc: 'Focused on software engineering, data structures & algorithms, and system programming. Hands-on with microservices, cloud computing and DevOps practices.',
    tags: ['Software Engineering', 'Algorithms', 'Cloud Computing'],
  },
];

/* Projects.
   `featured` projects render as case studies with an architecture preview.
   `diagram` nodes are limited to the technologies named in the description/tags.
   Diagram shape: { nodes: [{ label, sub?, icon? }], ... } rendered left → right;
   an optional `wrap` label draws a container (e.g. "Kubernetes") around given node indexes. */
const PROJECTS = [
  {
    title: 'CI/CD Pipeline Migration',
    kind: 'Work · Traveloka',
    category: 'Infrastructure',
    featured: true,
    desc: 'Migrated deployment pipelines from AWS CodeBuild/CodePipeline to GitHub Actions, cutting build times and simplifying maintenance with reusable workflows.',
    context: 'Service deployments ran on AWS CodeBuild and CodePipeline, with pipeline logic that was hard to share and maintain across services.',
    approach: 'Rebuilt the pipelines on GitHub Actions using reusable workflows, Docker-based builds and Bash tooling, deploying to AWS.',
    outcome: 'Shorter build times and a single shared pipeline definition that is simpler to maintain.',
    tags: ['GitHub Actions', 'Docker', 'AWS', 'Bash'],
    diagram: {
      nodes: [
        { label: 'git push', icon: 'uil-code-branch' },
        { label: 'GitHub Actions', sub: 'reusable workflows', icon: 'uil-process', accent: true },
        { label: 'Docker build', icon: 'uil-box' },
        { label: 'AWS', sub: 'deploy', icon: 'uil-cloud-upload' },
      ],
      before: 'AWS CodeBuild · CodePipeline',
    },
    github: 'https://github.com/maderahano',
  },
  {
    title: 'Infrastructure Automation',
    kind: 'Infrastructure as Code',
    category: 'Infrastructure',
    featured: true,
    desc: 'Automated cloud provisioning using reusable Terraform modules and Ansible playbooks on AWS. One command spins up a reproducible environment from scratch.',
    context: 'Goal: make a full AWS environment reproducible instead of hand-provisioned and drift-prone.',
    approach: 'Reusable Terraform modules for the AWS resources, Ansible playbooks for machine configuration, wired into CI/CD.',
    outcome: 'A complete environment can be created from scratch with a single command, the same way every time.',
    tags: ['Terraform', 'AWS', 'Ansible', 'CI/CD'],
    diagram: {
      nodes: [
        { label: 'CI/CD', sub: 'one command', icon: 'uil-play' },
        { label: 'Terraform', sub: 'reusable modules', icon: 'uil-layer-group', accent: true },
        { label: 'AWS', sub: 'environment', icon: 'uil-cloud' },
        { label: 'Ansible', sub: 'configuration', icon: 'uil-setting' },
      ],
    },
    github: 'https://github.com/maderahano',
  },
  {
    title: 'Microservice Platform',
    kind: 'Backend Architecture',
    category: 'Backend',
    featured: true,
    desc: 'A scalable microservice architecture built with Go, gRPC and Kubernetes for high-throughput, low-latency processing. Service discovery, health checks and graceful shutdowns included.',
    context: 'High-throughput, low-latency processing split across independently deployable services.',
    approach: 'Go services communicating over gRPC, deployed on Kubernetes and backed by PostgreSQL.',
    outcome: 'Service discovery, health checks and graceful shutdowns built in from the start.',
    tags: ['Go', 'gRPC', 'Kubernetes', 'PostgreSQL'],
    diagram: {
      nodes: [
        { label: 'Client', icon: 'uil-desktop' },
        { label: 'Go service', sub: 'gRPC', icon: 'uil-server', accent: true },
        { label: 'Go service', sub: 'gRPC', icon: 'uil-server', accent: true },
        { label: 'PostgreSQL', icon: 'uil-database' },
      ],
      wrap: { label: 'Kubernetes', from: 1, to: 2 },
    },
    github: 'https://github.com/maderahano',
  },
  {
    title: 'Internship Registration System',
    kind: 'Work · PT. PAL Indonesia',
    category: 'Full Stack',
    icon: 'uil-file-check-alt',
    desc: 'A Laravel web platform that digitized an on-site internship application process for a Human Capital division — end-to-end from form to approval.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/maderahano',
  },
  {
    title: 'Personal Portfolio',
    kind: 'Personal',
    category: 'Frontend',
    icon: 'uil-window',
    desc: 'This site — a fully static portfolio with dark/light themes, data-driven sections, mini-games and easter eggs. Pure HTML, CSS and JavaScript; no build step.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Canvas'],
    github: 'https://github.com/maderahano/maderahano.github.io',
    demo: 'https://maderahano.github.io',
  },
  {
    title: 'Browser Mini-Games',
    kind: 'Personal',
    category: 'Playground',
    icon: 'uil-game-structure',
    desc: 'A small collection of vanilla-JS games — Snake, Memory Match and Cube Run — built without a framework, with LocalStorage high-scores.',
    tags: ['JavaScript', 'Canvas', 'LocalStorage'],
    github: 'https://github.com/maderahano',
    demo: '#games',
    demoLabel: 'Play below',
  },
];

/* Testimonials */
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
    text: "Rahano was my mentee during Kampus Merdeka internship program at Traveloka. During the collaboration, Rahano helped us a lot, not just about our projects but sometimes fix the tech debt also. He showed a good commitment to our projects, his weekly tasks always on track & finished on time. In day to day collaboration, any discussion between us is done smoothly. He's a good learner and have good communication skill, very recommend to work with Rahano. Thank you Rahano.",
    name: 'Harits Rahman Mazayamusthafa',
    role: 'Site Reliability Engineer',
    img: 'assets/img/testimonial3.jpg',
  },
];

/* Memory game icons (8 pairs) */
const MEMORY_ICONS = ['🐳', '🚀', '⚙️', '🐧', '☁️', '🔑', '🧩', '⚡'];

/* Expose to other scripts */
window.PORTFOLIO_DATA = {
  HERO, ABOUT, SKILLS, EXPERIENCE, EDUCATION, PROJECTS, TESTIMONIALS, MEMORY_ICONS,
};
