// Plain data only (no components) so it can be imported from server files
// such as app/(marketing)/metadata.ts.

export interface NavItem {
  label: string
  // Section id on the home page, rendered as `/#<id>` and tracked by scrollspy
  id?: string
  href?: string
  children?: Array<{ label: string; href: string; description?: string }>
}

const siteConfig = {
  name: 'Coregy',
  url: 'https://coregy.com.vn',
  contactEmail: 'contact@coregy.com.vn',
  linkedinUrl: 'https://www.linkedin.com/company/coregy',
  seo: {
    title: 'Coregy — AI agents for small & mid-sized businesses',
    titleTemplate: '%s · Coregy',
    description:
      'Production-grade AI agents that take over one repetitive workflow for small and mid-sized businesses. Start with a free 2-week pilot.',
  },
  // Sections that need real proof stay hidden until it exists
  flags: {
    // TODO(hody): set to true once data/home.tsx `proof.items` has real, approved testimonials
    showProof: false,
  },
  header: {
    links: [
      {
        label: 'Solutions',
        children: [
          {
            label: 'Quote & Order Agent',
            href: '/solutions/quotes',
            description: 'Draft quotes from email requests',
          },
          {
            label: 'Back-office Document Agent',
            href: '/solutions/documents',
            description: 'Invoices and receipts into Xero or QuickBooks',
          },
          {
            label: 'Scope Guard',
            href: '/solutions/software-teams',
            description: 'Catch out-of-scope requests in Jira',
          },
        ],
      },
      { id: 'how-it-works', label: 'How it works' },
      { id: 'pricing', label: 'Pricing' },
      { id: 'faq', label: 'FAQ' },
    ] as NavItem[],
    cta: {
      label: 'Book a free pilot',
    },
  },
  footer: {
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
      { href: 'mailto:contact@coregy.com.vn', label: 'Contact' },
      {
        href: 'https://www.linkedin.com/company/coregy',
        label: 'LinkedIn',
        isExternal: true,
      },
    ],
  },
}

export default siteConfig
