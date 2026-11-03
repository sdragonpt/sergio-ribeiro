import type { Dictionary } from '@/lib/i18n'

const en: Dictionary = {
  meta: {
    title: 'Sérgio Ribeiro — Web Developer',
    description:
      "Web Developer · Master's student in Multimedia Technologies (UTAD) · Vila Real, Portugal",
    pages: {
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
  },

  nav: {
    about: 'About',
    projects: 'Projects',
    experience: 'Experience',
    contact: 'Contact',
    themeToggle: 'Toggle light/dark theme',
    openMenu: 'Open menu',
  },

  profile: {
    role: 'Web Developer',
    location: 'Vila Real, Portugal',
    intro:
      'Welcome to my site, where I gather some of my work. Web development is what I do day to day — technology in general is where my real passion lies.',
  },

  hero: {
    greeting: "hi, I'm",
    ctaContact: 'Get in touch',
    ctaWork: 'See my work',
  },

  home: {
    featuredTitle: 'Featured projects',
    featuredSub: 'A selection of recent work in web and mobile development.',
    viewAllProjects: 'View all projects',
    experienceTitle: 'Recent experience',
    experienceSub: 'My professional journey so far.',
    viewFullExperience: 'See full journey',
    ctaTitle: "Let's work together",
    ctaText:
      "Got a project in mind or an opportunity? I'm available for freelance, long-term projects and job offers.",
    ctaButton: 'Send a message',
  },

  about: {
    title: 'About me',
    paragraphs: [
      "I'm Sérgio, with a bachelor's in Communication and Multimedia and currently a master's student in Multimedia Technologies at UTAD. I like to keep experimenting with new tools and taking ideas from concept to product.",
      'My background in communication and multimedia means I think about the person using what I build first, and the code second. I care about digital experiences that are fast, clear and good-looking.',
    ],
    photoAlt: 'Portrait of Sérgio Ribeiro',
    photoCaption: '// Vila Real, Portugal',
    skillsTitle: 'Skills',
    skillsNote: 'The technologies I work with, grouped by area. Highlighted ones are the tools I reach for most.',
    educationTitle: 'Education',
    languagesTitle: 'Languages',
  },

  skills: {
    core: ['React', 'JavaScript', 'HTML/CSS'],
    categories: [
      {
        name: 'Frontend',
        items: ['React', 'React Native', 'Vue.js', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap'],
      },
      {
        name: 'Backend & Data',
        items: ['PHP', 'Laravel', 'Python', 'MySQL', 'Firebase'],
      },
      {
        name: 'Design & Multimedia',
        items: ['UI/UX Design', 'Photography', 'Video', 'WordPress'],
      },
    ],
  },

  languages: [
    { name: 'Portuguese', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Spanish', level: 'Intermediate' },
  ],

  education: [
    {
      title: "Master's in Multimedia Technologies",
      place: 'University of Trás-os-Montes and Alto Douro (UTAD)',
      period: '2025 – Present',
      description:
        'Continuing my studies at UTAD, focused on interactive technologies, multimedia production and application development.',
    },
    {
      title: "Bachelor's in Communication and Multimedia",
      place: 'University of Trás-os-Montes and Alto Douro (UTAD)',
      period: '2020 – 2024',
      description:
        'A solid foundation in digital media, design and communication strategy, with hands-on work in web technologies.',
    },
  ],

  experience: {
    title: 'Experience',
    intro: 'My professional journey so far.',
    educationTitle: 'Education',
    items: [
      {
        company: 'UTAD',
        role: 'Technical Officer',
        kind: 'Full-time',
        period: 'February 2025 – Present',
        description:
          'Member of the Pedagogical Innovation Unit, under the UTAD+Sucesso project. I work mostly across design, photography/video and web development, supporting academic-success initiatives.',
        tags: ['Design', 'Photography', 'Video', 'Web Development'],
      },
      {
        company: 'XPlora',
        role: 'Back-end Developer',
        kind: 'Internship',
        period: 'February 2024 – July 2024',
        description:
          'My first step into professional web development, supporting the back-end team in building a new back office.',
        tags: ['PHP', 'Laravel', 'MySQL', 'APIs'],
      },
      {
        company: 'JME',
        role: 'Web Designer',
        kind: 'Internship',
        period: 'June 2023 – August 2023',
        description:
          'My first taste of working life, helping the company design and build its new website.',
        tags: ['Web Design', 'HTML/CSS', 'UI/UX', 'WordPress'],
      },
    ],
  },

  projectsPage: {
    title: 'Projects',
    intro:
      "A mix of client work, internship projects and things I build to learn. Some are still in progress.",
    empty: 'No projects in this category.',
    filters: {
      all: 'All',
      ongoing: 'Ongoing',
      completed: 'Completed',
      'Web Dev': 'Web Dev',
      Mobile: 'Mobile',
    },
  },

  projectCard: {
    ongoing: 'Ongoing',
    completed: 'Completed',
    view: 'View',
    code: 'Code',
  },

  projects: [
    {
      id: 'nonato-service',
      title: 'Nonato Service',
      description:
        'A mobile and web app for business management, built on top of Google Firebase.',
      period: 'December 2024 – Present',
      status: 'ongoing',
      categories: ['Mobile', 'Web Dev'],
      tags: ['React.js', 'Capacitor', 'Firebase'],
      featured: true,
      links: { live: 'https://app.nonatoservice.pt' },
    },
    {
      id: 'nonato-website',
      title: 'Nonato Service website',
      description:
        'The new public website for Nonato Service: fast, static and search-friendly, built with Astro and Tailwind CSS.',
      period: 'September 2026 – October 2026',
      status: 'completed',
      categories: ['Web Dev'],
      tags: ['Astro', 'Tailwind CSS', 'Firebase Hosting'],
      featured: true,
      links: { live: 'https://nonatoservice.pt/' },
    },
    {
      id: 'crewards-v2',
      title: 'Crewards v2',
      description:
        'A full redesign of the Crewards site for a YouTube creator, with new features and better performance.',
      period: 'October 2024 – December 2024',
      status: 'completed',
      categories: ['Web Dev'],
      tags: ['Vue.js', 'Tailwind CSS', 'API integration'],
      links: { live: 'https://crewards-v2.netlify.app/' },
    },
    {
      id: 'civica-website',
      title: 'Civica Website Reform',
      description:
        "Reworking Civica's website and building a shop-style area, with PHP as the base and Bootstrap on the front.",
      period: 'August 2024 – Present',
      status: 'ongoing',
      categories: ['Web Dev'],
      tags: ['PHP', 'Bootstrap', 'MySQL', 'phpMyAdmin'],
      featured: true,
    },
    {
      id: 'civica-database',
      title: 'Civica Database',
      description: 'My first Python project: a database for the company Civica.',
      period: 'September 2024',
      status: 'completed',
      categories: ['Web Dev'],
      tags: ['Python', 'Data modelling', 'SQL'],
    },
    {
      id: 'crewards',
      title: 'Crewards',
      description: 'My first web project: a simple front end for a YouTube creator’s site.',
      period: 'February 2023',
      status: 'completed',
      categories: ['Web Dev'],
      tags: ['HTML', 'CSS', 'JavaScript'],
      links: { live: 'https://crewards-v1.netlify.app/' },
    },
    {
      id: 'pedro-ribeiro-atleta',
      title: 'Pedro Ribeiro · Athlete',
      description: 'An informational WordPress site for a track-and-field athlete, with a custom theme.',
      period: 'January 2023',
      status: 'completed',
      categories: ['Web Dev'],
      tags: ['WordPress', 'Custom theme', 'Responsive design'],
      links: { live: 'https://pedroribeiroatleta.pt/' },
    },
  ],

  contact: {
    title: 'Contact',
    intro:
      "I'm available for freelance, long-term projects and job opportunities. Send a message — it opens in your email client — or reach me directly.",
    formName: 'Name',
    formEmail: 'Email',
    formSubject: 'Subject',
    formMessage: 'Message',
    formSend: 'Send message',
    directTitle: 'Direct',
    mailSubjectFallback: 'Contact from',
    mailSomeone: 'someone',
  },

  notFound: {
    title: 'Page not found',
    eyebrow: 'Error 404',
    heading: 'page not found',
    text: 'The address may have moved or never existed. Head back home or take a look at my projects.',
    pathNote: 'does not exist',
    ctaHome: 'Back to home',
    ctaProjects: 'See projects',
  },

  footer: {
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    rights: 'All rights reserved.',
  },
}

export default en
