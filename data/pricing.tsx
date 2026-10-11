import { PricingPlan } from '#components/pricing/pricing'

const pricing: {
  title: string
  description: string
  note: string
  plans: PricingPlan[]
} = {
  title: 'Pricing',
  description: 'Start free. Pay only once the agent has proven itself.',
  note: 'Prices in USD. Exact quote after the pilot call.',
  plans: [
    {
      id: 'pilot',
      title: 'Free Pilot',
      description: 'See it working on your own workflow first.',
      price: '$0',
      isRecommended: true,
      features: [
        { title: '2 weeks' },
        { title: 'One workflow' },
        { title: 'Results report' },
      ],
      action: {
        href: '#pilot',
        label: 'Book a free pilot',
      },
    },
    {
      id: 'setup',
      title: 'Setup',
      description: 'Turn the pilot into a production agent.',
      price: 'From $1,500',
      features: [
        { title: 'Build' },
        { title: 'Integrate with your tools' },
        { title: 'Test on your data' },
        { title: 'Hand-over' },
      ],
    },
    {
      id: 'run',
      title: 'Run & Improve',
      description: 'We keep the agent running and getting better.',
      price: 'From $400/month',
      features: [
        { title: 'Hosting' },
        { title: 'Monitoring' },
        { title: 'Fixes' },
        { title: 'Monthly ROI report' },
      ],
    },
  ],
}

export default pricing
