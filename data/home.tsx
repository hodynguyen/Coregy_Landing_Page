import {
  FiClock,
  FiCode,
  FiLock,
  FiTool,
  FiUserCheck,
  FiZap,
} from 'react-icons/fi'

const home = {
  hero: {
    eyebrow: 'AI agents for small & mid-sized businesses',
    title:
      'Hand one repetitive workflow to an AI agent. See results in two weeks.',
    sub: 'We build, run and maintain production-grade AI agents for quoting, back-office paperwork and project operations, so your team can stop copy-pasting and get back to customers.',
    primaryCta: 'Book a free pilot',
    secondaryCta: 'See what we automate',
    points: [
      'Free 2-week pilot',
      'Your data stays in your accounts',
      'APAC time zone',
    ],
  },
  problem: {
    title:
      "You know AI could help. You don't know where to start, or who to trust.",
    items: [
      {
        icon: FiZap,
        title: 'Too many tools, no clear payoff',
        description:
          'Everyone says use AI, but nobody shows you what it saves in hours or dollars.',
      },
      {
        icon: FiTool,
        title: 'No-code flows that break',
        description:
          'Duct-taped automations work in the demo and fail on real data.',
      },
      {
        icon: FiClock,
        title: 'No time to figure it out',
        description:
          "You run a business. You can't spend months experimenting.",
      },
    ],
  },
  solutions: {
    title: 'What we automate',
    description:
      'Each agent takes over one job from start to finish. Start with the one that costs your team the most time.',
    linkLabel: 'Learn more',
  },
  howItWorks: {
    title: 'How it works',
    description: 'From first call to a running agent, in four steps.',
    steps: [
      {
        title: 'Pick one workflow',
        description:
          'A 30-minute call to find the task costing you the most time.',
      },
      {
        title: '2-week pilot',
        description: 'We build the agent on your real (or sample) data.',
      },
      {
        title: 'Measure',
        description:
          'You see hours saved and error rates before paying anything.',
      },
      {
        title: 'Keep it running',
        description: 'We host, monitor and improve it every month.',
      },
    ],
  },
  why: {
    title: 'Why Coregy',
    items: [
      {
        icon: FiCode,
        title: 'Real engineers, not glued-together no-code flows',
        description:
          'Custom code, tests and monitoring, built to the same standards as enterprise workflow systems.',
      },
      {
        icon: FiLock,
        title: 'Your data stays yours',
        description:
          'We connect to your existing tools. Nothing is resold or used to train public models.',
      },
      {
        icon: FiUserCheck,
        title: 'Human in the loop',
        description:
          'The agent drafts, your team approves, until you trust it.',
      },
      {
        icon: FiClock,
        title: 'APAC time zone',
        description:
          'Same working hours as Australia, New Zealand and Singapore.',
      },
    ],
  },
  founder: {
    title: "Who you'll work with",
    name: 'Hody Nguyen',
    role: 'Founder & Lead Engineer',
    // TODO(hody): add founder photo under /public/static/images and set the path here. Initials ("HN") are shown while empty.
    photo: '',
    bio: "I'm a backend engineer who builds workflow automation systems for enterprise teams. I started Coregy to bring the same engineering standards to small businesses: AI agents that are tested, monitored and actually hold up on real data, not demos that break in week two.",
  },
  proof: {
    title: 'What our clients say',
    // TODO(hody): add real, approved testimonials or case studies, then set flags.showProof in data/config.tsx
    items: [] as Array<{
      name: string
      role: string
      company: string
      avatar?: string
      quote: string
    }>,
  },
}

export default home
