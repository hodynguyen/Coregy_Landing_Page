import { IconType } from 'react-icons'
import { FiFileText, FiShield, FiShoppingCart } from 'react-icons/fi'

import { Industry } from './pilot'

export type SolutionSlug = 'quotes' | 'documents' | 'software-teams'

export interface Solution {
  slug: SolutionSlug
  name: string
  icon: IconType
  // Home page card
  summary: string
  audience: string
  // Solution page
  metaTitle: string
  metaDescription: string
  headline: string
  sub: string
  before: string[]
  after: string[]
  steps: Array<{ title: string; description: string }>
  integrations: string[]
  faq: Array<{ q: string; a: string }>
  // Preselected in the pilot form; omit to leave the select empty
  industry?: Industry
}

export const solutions: Solution[] = [
  {
    slug: 'quotes',
    name: 'Quote & Order Agent',
    icon: FiShoppingCart,
    summary:
      'Turns customer requests from email into accurate draft quotes from your price list, and follows up on quotes nobody answered.',
    audience: 'For distributors, manufacturers and trade businesses.',
    metaTitle: 'Quote & Order Agent',
    metaDescription:
      'An AI agent that turns emailed customer requests into accurate draft quotes from your price list and follows up on unanswered quotes.',
    headline: 'Send accurate quotes in minutes, not days.',
    sub: 'The agent reads customer requests from your inbox, matches each item against your price list and drafts a quote for your team to check and send. Quotes nobody replied to get a follow-up.',
    before: [
      'Requests land in a shared inbox and wait for someone to pick them up.',
      'Someone looks up every item, price and discount by hand.',
      'The quote is retyped into a template, and small errors slip through.',
      'Sent quotes are forgotten unless someone remembers to chase them.',
    ],
    after: [
      'Every request is picked up and turned into a draft quote straight away.',
      'Items, prices and customer terms come from your own price list.',
      'Your team reviews, adjusts if needed, and sends.',
      'Unanswered quotes get a follow-up on the schedule you choose.',
    ],
    steps: [
      {
        title: 'Read the request',
        description:
          'The agent reads incoming emails and attachments and pulls out products, quantities and delivery details.',
      },
      {
        title: 'Draft the quote',
        description:
          'It matches each line against your price list and customer terms, and flags anything it cannot match instead of guessing.',
      },
      {
        title: 'Approve and follow up',
        description:
          'A person on your team approves the draft. The agent sends it and follows up if there is no reply.',
      },
    ],
    integrations: [
      'Gmail',
      'Outlook / Microsoft 365',
      'Google Sheets',
      'Excel price lists',
      'Xero',
      'QuickBooks',
      'Your CRM (via API)',
    ],
    faq: [
      {
        q: "What if a product isn't in our price list?",
        a: 'The agent flags the line and leaves it for your team. It does not invent prices.',
      },
      {
        q: 'Can it handle customer-specific pricing?',
        a: 'Yes, as long as those terms live somewhere we can read, such as a spreadsheet or your accounting system. We map them during the pilot.',
      },
      {
        q: 'Will it send quotes on its own?',
        a: 'Not until you decide it should. By default a person approves every quote before it goes out.',
      },
    ],
    industry: 'Distribution',
  },
  {
    slug: 'documents',
    name: 'Back-office Document Agent',
    icon: FiFileText,
    summary:
      "Reads invoices and receipts, matches them against bank transactions, and pushes clean entries to Xero or QuickBooks. Flags anything that doesn't add up.",
    audience: 'For finance and admin teams in small and mid-sized businesses.',
    metaTitle: 'Back-office Document Agent',
    metaDescription:
      'An AI agent that reads invoices and receipts, matches them to bank transactions and creates clean draft entries in Xero or QuickBooks.',
    headline: 'Stop typing invoices into Xero.',
    sub: "The agent reads supplier invoices and receipts, matches them to your bank transactions and creates clean entries in Xero or QuickBooks. Anything that doesn't add up is flagged for a person to check.",
    before: [
      'Invoices arrive by email as PDFs, photos and scans.',
      'Someone keys each one into the accounting system line by line.',
      'Reconciling against the bank feed turns into a month-end scramble.',
      'Mistakes and duplicates surface at month-end or tax time.',
    ],
    after: [
      'Invoices and receipts are read as soon as they arrive.',
      'Supplier, amounts, tax and due dates are extracted and checked.',
      'Each document is matched to a bank transaction and entered as a draft.',
      'Mismatches, duplicates and missing documents are flagged for review.',
    ],
    steps: [
      {
        title: 'Collect',
        description:
          'The agent watches the inbox or shared folder where your bills and receipts already arrive.',
      },
      {
        title: 'Extract and check',
        description:
          'It reads the key fields, checks that totals and tax add up, and spots likely duplicates.',
      },
      {
        title: 'Match and post',
        description:
          'It matches each document to a bank transaction and creates a draft bill or entry in Xero or QuickBooks for approval.',
      },
    ],
    integrations: [
      'Xero',
      'QuickBooks Online',
      'Gmail',
      'Outlook / Microsoft 365',
      'Google Drive',
      'OneDrive / SharePoint',
    ],
    faq: [
      {
        q: 'Will it post entries without review?',
        a: "No. Entries are created as drafts until you're satisfied with the accuracy on your own documents.",
      },
      {
        q: 'Can our bookkeeper or accountant see what it did?',
        a: 'Yes. Every entry links back to its source document, and there is a log of what was matched and why.',
      },
      {
        q: 'What about handwritten or poor-quality scans?',
        a: 'When the agent is not confident about a document, it says so and leaves it for a person.',
      },
    ],
  },
  {
    slug: 'software-teams',
    name: 'Scope Guard',
    icon: FiShield,
    summary:
      'Watches Jira tickets and comments, compares requests against your signed scope, and drafts change requests before free work eats your margin.',
    audience: 'For software agencies and studios running fixed-scope projects.',
    metaTitle: 'Scope Guard for software agencies',
    metaDescription:
      'An AI agent that watches Jira tickets and comments, compares requests against your signed scope and drafts change requests.',
    headline:
      'Stop doing free work. Catch out-of-scope requests in Jira before they eat your margin.',
    sub: 'Scope Guard watches Jira tickets and comments, compares each request against your signed scope and drafts a change request when something falls outside it. Your project manager decides what to send.',
    before: [
      'Small extra requests arrive in comments and calls, one at a time.',
      'Nobody has time to check each one against the statement of work.',
      'The team builds it anyway to keep the client happy.',
      "Overruns show up at the end of the project, when it's too late to bill.",
    ],
    after: [
      'Every new ticket and comment is checked against the signed scope.',
      'Likely out-of-scope requests are flagged with the clause they relate to.',
      'A draft change request is ready for your project manager.',
      'You decide what to raise before the work starts.',
    ],
    steps: [
      {
        title: 'Load your scope',
        description:
          'We give the agent the statement of work, proposal or contract for each project.',
      },
      {
        title: 'Watch Jira',
        description:
          'It reads new tickets and comments as they come in and compares them with that scope.',
      },
      {
        title: 'Flag and draft',
        description:
          'Possible scope changes are flagged to your team, with a draft change request ready to review.',
      },
    ],
    integrations: [
      'Jira',
      'Confluence',
      'Slack',
      'Microsoft Teams',
      'Google Drive',
      'SharePoint',
    ],
    faq: [
      {
        q: 'Will it comment on tickets our client can see?',
        a: 'No. Flags go to your internal team only, unless you choose otherwise.',
      },
      {
        q: 'What if our scope documents are vague?',
        a: 'The agent shows which clause it relied on and says when it is unsure, so your project manager makes the call.',
      },
      {
        q: 'Do you need access to our code?',
        a: 'No. Scope Guard only reads Jira issues, comments and the scope documents you share.',
      },
    ],
    industry: 'Software agency',
  },
]

export const getSolution = (slug: string) =>
  solutions.find((solution) => solution.slug === slug)
