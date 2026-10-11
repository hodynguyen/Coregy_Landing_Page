export type LegalDocKey = 'privacy' | 'terms'

export interface LegalDoc {
  title: string
  notice: string
  sections: Array<{ heading: string; body: string }>
}

// TODO(hody): replace with reviewed legal text
const notice =
  'TODO(hody): replace with reviewed legal text. This is a plain-language placeholder and has not been reviewed by a lawyer.'

const legal: Record<LegalDocKey, LegalDoc> = {
  privacy: {
    title: 'Privacy policy',
    notice,
    sections: [
      {
        heading: 'What we collect',
        body: 'When you request a pilot we collect the details you enter in the form: your name, work email, company website, industry, and what you tell us about your workflow and tools.',
      },
      {
        heading: 'How we use it',
        body: 'We use these details only to reply to you and to plan a possible pilot. We do not sell your information.',
      },
      {
        heading: 'Pilot and client data',
        body: 'During a pilot or engagement, agents access your systems with the minimum permissions needed. Your data is not resold or used to train public models.',
      },
      {
        heading: 'Contact',
        body: 'Questions about your data? Email contact@coregy.com.vn.',
      },
    ],
  },
  terms: {
    title: 'Terms of use',
    notice,
    sections: [
      {
        heading: 'About this site',
        body: 'This website describes the services offered by Coregy. Information on it is general and may change without notice.',
      },
      {
        heading: 'Pilots and engagements',
        body: 'Any pilot or paid engagement is governed by a separate written agreement between Coregy and the client.',
      },
      {
        heading: 'Contact',
        body: 'Questions about these terms? Email contact@coregy.com.vn.',
      },
    ],
  },
}

export default legal
