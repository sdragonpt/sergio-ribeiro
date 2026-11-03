import type { Dictionary } from '@/lib/i18n'

const pt: Dictionary = {
  meta: {
    title: 'Sérgio Ribeiro — Desenvolvedor Web',
    description:
      'Desenvolvedor Web · Mestrando em Tecnologias Multimédia (UTAD) · Vila Real, Portugal',
    pages: {
      about: 'Sobre',
      projects: 'Projetos',
      experience: 'Experiência',
      contact: 'Contacto',
    },
  },

  nav: {
    about: 'Sobre',
    projects: 'Projetos',
    experience: 'Experiência',
    contact: 'Contacto',
    home: 'Início',
    themeToggle: 'Alternar tema claro/escuro',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    menuTitle: 'navegação',
  },

  profile: {
    role: 'Desenvolvedor Web',
    location: 'Vila Real, Portugal',
    intro:
      'Bem-vindo ao meu site, onde reúno alguns dos meus trabalhos. O desenvolvimento web é a área onde trabalho todos os dias — a tecnologia, no geral, é a minha verdadeira paixão.',
  },

  hero: {
    greeting: 'olá, eu sou o',
    ctaContact: 'Entrar em contacto',
    ctaWork: 'Ver os meus trabalhos',
  },

  home: {
    featuredTitle: 'Projetos em destaque',
    featuredSub: 'Uma seleção de trabalhos recentes em desenvolvimento web e mobile.',
    viewAllProjects: 'Ver todos os projetos',
    experienceTitle: 'Experiência recente',
    experienceSub: 'O meu percurso profissional até aqui.',
    viewFullExperience: 'Ver percurso completo',
    ctaTitle: 'Vamos trabalhar juntos',
    ctaText:
      'Tens um projeto em mente ou uma oportunidade? Estou disponível para freelance, projetos de longo prazo e propostas de emprego.',
    ctaButton: 'Enviar mensagem',
  },

  about: {
    title: 'Sobre mim',
    paragraphs: [
      'Sou o Sérgio, licenciado em Comunicação e Multimédia e, atualmente, mestrando em Tecnologias Multimédia na UTAD. Gosto de estar sempre a experimentar ferramentas novas e a levar as minhas ideias do conceito ao produto.',
      'A base em comunicação e multimédia ajuda-me a pensar primeiro na pessoa que vai usar o que construo — e só depois no código. Interessa-me criar experiências digitais rápidas, claras e com bom aspeto.',
    ],
    photoAlt: 'Retrato de Sérgio Ribeiro',
    photoCaption: '// Vila Real, Portugal',
    skillsTitle: 'Competências',
    skillsNote: 'As tecnologias com que trabalho, por área. As destacadas são as que uso com mais frequência.',
    educationTitle: 'Educação',
    languagesTitle: 'Idiomas',
  },

  skills: {
    core: ['React', 'JavaScript', 'HTML/CSS'],
    categories: [
      {
        name: 'Frontend',
        items: ['React', 'React Native', 'Vue.js', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap'],
      },
      {
        name: 'Backend & Dados',
        items: ['PHP', 'Laravel', 'Python', 'MySQL', 'Firebase'],
      },
      {
        name: 'Design & Multimédia',
        items: ['UI/UX Design', 'Fotografia', 'Vídeo', 'WordPress'],
      },
    ],
  },

  languages: [
    { name: 'Português', level: 'Nativo' },
    { name: 'Inglês', level: 'Fluente' },
    { name: 'Espanhol', level: 'Intermédio' },
  ],

  education: [
    {
      title: 'Mestrado em Tecnologias Multimédia',
      place: 'Universidade de Trás-os-Montes e Alto Douro',
      period: '2025 – Presente',
      description:
        'Continuação do percurso na UTAD, com foco em tecnologias interativas, produção multimédia e desenvolvimento de aplicações.',
    },
    {
      title: 'Licenciatura em Comunicação e Multimédia',
      place: 'Universidade de Trás-os-Montes e Alto Douro',
      period: '2020 – 2024',
      description:
        'Base sólida em média digital, design e estratégias de comunicação, com componente prática em tecnologias web.',
    },
  ],

  experience: {
    title: 'Experiência',
    intro: 'O meu percurso profissional até aqui.',
    educationTitle: 'Educação',
    items: [
      {
        company: 'UTAD',
        role: 'Técnico Superior',
        kind: 'Tempo inteiro',
        period: 'Fevereiro 2025 – Presente',
        description:
          'Membro do Núcleo de Inovação Pedagógica, ao abrigo do Projeto UTAD+Sucesso. Trabalho sobretudo nas áreas de design, fotografia/vídeo e desenvolvimento web, apoiando iniciativas de apoio ao sucesso académico.',
        tags: ['Design', 'Fotografia', 'Vídeo', 'Desenvolvimento Web'],
      },
      {
        company: 'XPlora',
        role: 'Desenvolvedor Back-end',
        kind: 'Estágio',
        period: 'Fevereiro 2024 – Julho 2024',
        description:
          'O meu primeiro passo no desenvolvimento web profissional, a apoiar a equipa de back-end no desenvolvimento de um novo backoffice.',
        tags: ['PHP', 'Laravel', 'MySQL', 'APIs'],
      },
      {
        company: 'JME',
        role: 'Web Designer',
        kind: 'Estágio',
        period: 'Junho 2023 – Agosto 2023',
        description:
          'O meu primeiro contacto com o mundo do trabalho, onde ajudei a empresa a desenhar e desenvolver o seu novo site.',
        tags: ['Web Design', 'HTML/CSS', 'UI/UX', 'WordPress'],
      },
    ],
  },

  projectsPage: {
    title: 'Projetos',
    intro:
      'Uma mistura de trabalho para clientes, projetos de estágio e coisas que construo para aprender. Alguns ainda estão em andamento.',
    empty: 'Nenhum projeto nesta categoria.',
    filters: {
      all: 'Todos',
      ongoing: 'Em andamento',
      completed: 'Concluídos',
      'Web Dev': 'Web Dev',
      Mobile: 'Mobile',
    },
  },

  projectCard: {
    ongoing: 'Em andamento',
    completed: 'Concluído',
    view: 'Ver',
    code: 'Código',
  },

  projects: [
    {
      id: 'nonato-service',
      title: 'Nonato Service',
      description:
        'Aplicação mobile e web para gestão empresarial, construída sobre o Google Firebase.',
      period: 'Dezembro 2024 – Presente',
      status: 'ongoing',
      categories: ['Mobile', 'Web Dev'],
      tags: ['React.js', 'Capacitor', 'Firebase'],
      featured: true,
      links: { live: 'https://app.nonatoservice.pt' },
    },
    {
      id: 'nonato-website',
      title: 'Website Nonato Service',
      description:
        'O novo site público da Nonato Service: rápido, estático e preparado para motores de pesquisa, feito com Astro e Tailwind CSS.',
      period: 'Setembro 2026 – Outubro 2026',
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
        'Redesign completo do site Crewards para um criador de YouTube, com novas funcionalidades e melhor desempenho.',
      period: 'Outubro 2024 – Dezembro 2024',
      status: 'completed',
      categories: ['Web Dev'],
      tags: ['Vue.js', 'Tailwind CSS', 'Integração de API'],
      links: { live: 'https://crewards-v2.netlify.app/' },
    },
    {
      id: 'civica-website',
      title: 'Reforma do site Civica',
      description:
        'Reforma do site da Civica e criação de uma área tipo loja, com PHP na base e Bootstrap na interface.',
      period: 'Agosto 2024 – Presente',
      status: 'ongoing',
      categories: ['Web Dev'],
      tags: ['PHP', 'Bootstrap', 'MySQL', 'phpMyAdmin'],
      featured: true,
    },
    {
      id: 'civica-database',
      title: 'Base de dados Civica',
      description: 'O meu primeiro projeto em Python: uma base de dados para a empresa Civica.',
      period: 'Setembro 2024',
      status: 'completed',
      categories: ['Web Dev'],
      tags: ['Python', 'Modelação de dados', 'SQL'],
    },
    {
      id: 'crewards',
      title: 'Crewards',
      description:
        'O meu primeiro projeto web: um front-end simples para o site de um criador de YouTube.',
      period: 'Fevereiro 2023',
      status: 'completed',
      categories: ['Web Dev'],
      tags: ['HTML', 'CSS', 'JavaScript'],
      links: { live: 'https://crewards-v1.netlify.app/' },
    },
    {
      id: 'pedro-ribeiro-atleta',
      title: 'Pedro Ribeiro · Atleta',
      description: 'Site informativo em WordPress para um atleta de atletismo, com tema personalizado.',
      period: 'Janeiro 2023',
      status: 'completed',
      categories: ['Web Dev'],
      tags: ['WordPress', 'Tema personalizado', 'Design responsivo'],
      links: { live: 'https://pedroribeiroatleta.pt/' },
    },
  ],

  contact: {
    title: 'Contacto',
    intro:
      'Estou disponível para freelance, projetos de longo prazo e oportunidades de emprego. Envia uma mensagem — abre no teu cliente de email — ou contacta-me diretamente.',
    formName: 'Nome',
    formEmail: 'Email',
    formSubject: 'Assunto',
    formMessage: 'Mensagem',
    formSend: 'Enviar mensagem',
    directTitle: 'Direto',
    mailSubjectFallback: 'Contacto de',
    mailSomeone: 'alguém',
  },

  notFound: {
    title: 'Página não encontrada',
    eyebrow: 'Erro 404',
    heading: 'página não encontrada',
    text: 'O endereço pode ter mudado ou nunca ter existido. Volta ao início ou espreita os meus projetos.',
    pathNote: 'não existe',
    ctaHome: 'Voltar ao início',
    ctaProjects: 'Ver projetos',
  },

  footer: {
    navTitle: 'Navegação',
    contactTitle: 'Contacto',
    rights: 'Todos os direitos reservados.',
  },
}

export default pt
