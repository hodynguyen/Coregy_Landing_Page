export const industries = [
  'Distribution',
  'Manufacturing',
  'Trades & services',
  'Professional services',
  'Accounting & bookkeeping',
  'Software agency',
  'Other',
] as const

export type Industry = (typeof industries)[number]

const pilot = {
  title: 'Book a free 2-week pilot',
  description:
    "Tell us which task eats most of your team's time. We'll reply to set up a 30-minute call, and if it's a good fit we build the agent on your real or sample data.",
  points: [
    'Free 2-week pilot',
    'Your data stays in your accounts',
    'APAC time zone',
  ],
  fields: {
    name: 'Name',
    email: 'Work email',
    website: 'Company website',
    industry: 'Industry',
    task: "Which task eats the most of your team's time?",
    tools: 'Tools you use today',
  },
  submit: 'Request my pilot',
  bookingLabel: 'Or pick a time directly',
  success:
    "Thanks, we've got your request. We'll email you to set up a 30-minute call.",
  mailto:
    'Your email app should have opened with your details filled in. Send that email and we will get back to you.',
  error: 'Something went wrong sending your request. Please try again or email',
}

export default pilot
