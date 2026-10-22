/**
 * ELUM Docs: a starting page for each ELUM app, and one for ELUM as a whole. Words only; the
 * pages that show them are in DocsPages.tsx. Keep each step to something people can do today.
 */

export type ProductId = 'write' | 'type' | 'make' | 'browse' | 'store' | 'account';

/** Every app with a page in the docs, including the ones still on the way. */
export type DocsId = ProductId | 'tune';

/** Which ELUM symbol a feature card shows (see components/icons/ElumIcons.tsx). */
export type Symbol =
  | 'new'
  | 'share'
  | 'download'
  | 'rename'
  | 'duplicate'
  | 'archive'
  | 'spam'
  | 'unread'
  | 'reply'
  | 'attach'
  | 'send'
  | 'present'
  | 'visible'
  | 'private'
  | 'verified'
  | 'saved'
  | 'invite'
  | 'star'
  | 'link'
  | 'compose'
  | 'warning'
  | 'open';

export interface Step {
  title: string;
  text: string;
}

export interface Feature {
  symbol: Symbol;
  title: string;
  text: string;
}

export interface Product {
  id: DocsId;
  name: string;
  /** The app's brand colour, and its pale wash. */
  color: string;
  mist: string;
  /** What it is, in a few words. */
  kind: string;
  headline: string;
  intro: string;
  /** Where the app lives; filled in from lib/elum.ts. */
  url: string;
  steps: Step[];
  features: Feature[];
  tips: string[];
  /** Not open yet: the page says Coming soon, with no steps or features. */
  soon?: boolean;
}

type Words = Omit<Product, 'url'>;

export const PRODUCTS: Words[] = [
  {
    id: 'write',
    name: 'Write',
    color: '#f59a52',
    mist: '#fdf0e4',
    kind: 'Documents',
    headline: 'Getting started with Write',
    intro: 'Write is where your documents live. Everything saves as you type, looks the same on every device, and is easy to share.',
    steps: [
      { title: 'Start a document', text: 'Open Write and choose New document. It’s saved to your ELUM account right away, so there’s no save button to remember.' },
      { title: 'Shape it your way', text: 'Pick a title, headings or quotes from the styles menu. Add lists, checklists, links, pictures and page breaks, and spelling checks as you go.' },
      { title: 'Share it', text: 'Choose Share and add anyone with an ELUM account. You can comment on any part of the text and reply to each other.' },
    ],
    features: [
      { symbol: 'compose', title: 'Styles and citations', text: 'Set up a first page, then cite articles, books and websites. Write keeps the formatting consistent for you.' },
      { symbol: 'download', title: 'Download and print', text: 'Save a copy as a PDF, plain text or a web page, or print it exactly as it looks on screen.' },
      { symbol: 'duplicate', title: 'Make a copy', text: 'Start a new version from any document and keep the original just as it was.' },
      { symbol: 'saved', title: 'Saved everywhere', text: 'Every change is saved to your account, so you can pick up on your phone where you left off.' },
    ],
    tips: [
      'Your newest documents come first. Switch to Shared with me to see what other people have sent you.',
      'Open in new tab keeps your list right where it was.',
      'While a document is open, your browser tab shows the Write document symbol.',
    ],
  },
  {
    id: 'type',
    name: 'Type',
    color: '#3fc4a0',
    mist: '#e4f7f1',
    kind: 'Messages and email',
    headline: 'Getting started with Type',
    intro: 'Type brings your messages and email into one calm inbox, with an ELUM address that’s all yours.',
    steps: [
      { title: 'Pick your address', text: 'When you sign up, choose a name for your ELUM Type address. It’s yours to keep, and you can sign in with it.' },
      { title: 'Read and reply', text: 'Open a conversation to see every message together. Reply, reply to everyone or forward, and attach files from your device.' },
      { title: 'Keep things calm', text: 'Archive what’s done, mark things unread to come back to later, and mute conversations that carry on without you.' },
    ],
    features: [
      { symbol: 'verified', title: 'Know who it’s from', text: 'Messages from other ELUM accounts show the verified symbol, so you know who you’re talking to.' },
      { symbol: 'spam', title: 'Spam stays out', text: 'Report spam and it leaves your inbox. Change your mind and Not spam brings it back.' },
      { symbol: 'archive', title: 'Everything in its place', text: 'Inbox, Unread, Archived, Spam and Trash are one click apart, and Undo is there if you need it.' },
      { symbol: 'private', title: 'Approve new sign-ins', text: 'With approvals on, a new device can’t get in until you pick its number on a device you trust.' },
    ],
    tips: [
      'Contacts collects the people you write to, and marks the ones on ELUM.',
      'While a conversation is open, your browser tab shows the Type message symbol.',
      'Settings takes you straight to your profile and addresses in ELUM Account.',
    ],
  },
  {
    id: 'make',
    name: 'Make',
    color: '#ec7fa9',
    mist: '#fceaf1',
    kind: 'Slides and posts',
    headline: 'Getting started with Make',
    intro: 'Make is for slides, posters and social posts. Design them on a real canvas and share them with anyone on ELUM.',
    steps: [
      { title: 'Pick a size', text: 'Start with a presentation, a square or story post, a banner, a poster or a flyer, or begin from a template.' },
      { title: 'Design it', text: 'Add text, shapes, lines, arrows and pictures. Guides help you line things up, and layers keep everything in order.' },
      { title: 'Present or share', text: 'Present full screen, share with anyone who has an ELUM account, or download a page as a PNG or the whole design as a PDF.' },
    ],
    features: [
      { symbol: 'present', title: 'Present', text: 'Your slides fill the screen until you press Esc. Use the arrow keys, the space bar or a click to move on.' },
      { symbol: 'duplicate', title: 'Pages', text: 'Duplicate, reorder and delete pages, and add speaker notes to each one.' },
      { symbol: 'private', title: 'Lock what’s finished', text: 'Lock anything you’re happy with so it stays put while you work around it.' },
      { symbol: 'saved', title: 'Undo anything', text: 'Every change saves as you go, and Undo can take any of them back.' },
    ],
    tips: [
      'Hold Shift while you draw a line or arrow to keep it straight or at 45°.',
      'While a design is open, your browser tab shows the Make design symbol.',
      'Want to try an idea? Make a copy first and the original stays safe.',
    ],
  },
  {
    id: 'browse',
    name: 'Browse',
    color: '#9b84ee',
    mist: '#f2eefd',
    kind: 'Search',
    headline: 'Getting started with Browse',
    intro: 'Browse searches the web with results from Google, without the AI. Results that lead to AI chat products are left out.',
    steps: [
      { title: 'Search', text: 'Type what you’re looking for and press Enter. You can press / from anywhere on the page to jump to the search box.' },
      { title: 'Look through the results', text: 'Switch between All and Images. If Browse leaves a result out, it tells you.' },
      { title: 'Make it yours', text: 'Turn SafeSearch on or off, and choose whether this device remembers your recent searches.' },
    ],
    features: [
      { symbol: 'visible', title: 'Just the web', text: 'You get Google’s results without AI Overviews or Gemini.' },
      { symbol: 'private', title: 'Your searches stay with you', text: 'Recent searches are kept on this device only, and you can clear one or all of them whenever you like.' },
      { symbol: 'open', title: 'Your ELUM apps, right here', text: 'Type write, type, make, store or account, or an address like make.elum.services, and the app opens in a Browse tab. Open in new window gives it a window of its own.' },
      { symbol: 'visible', title: 'Pages open in Browse', text: 'Results and addresses you type open in a Browse tab. If a site won’t let other sites show it, you get a clean reading view instead, with the original one click away.' },
      { symbol: 'star', title: 'Tabs and groups', text: 'Keep searches and apps open side by side. Right-click a tab to group it, then give the group a name, a colour and a symbol.' },
    ],
    tips: [
      'Your recent searches show up as you type. Use the arrow keys to pick one.',
      'Meant to search the web, not open an app? Choose Search the web under the box.',
      'Click a group to fold it away. Your tabs and groups will still be there next time.',
      'Wondering if ELUM is working? The Status page checks every app.',
    ],
  },
  {
    id: 'store',
    name: 'Store',
    color: '#e9b949',
    mist: '#fcf5e1',
    kind: 'Apps and more',
    headline: 'Getting started with Store',
    intro: 'Store is where you find every ELUM app. They’re all free with your ELUM account, and there are templates that open straight in Make.',
    steps: [
      { title: 'Have a look around', text: 'Every app has a page that explains what it does, what’s new, and whether it’s working right now. Search finds apps and templates.' },
      { title: 'Get an app', text: 'Choose Get and the app is added to your ELUM account. If you’re not signed in, Store asks you to sign in first and then finishes the job.' },
      { title: 'Open it', text: 'Open takes you straight to the app, already signed in. The arrow next to it opens the app in a Browse tab or its own window.' },
    ],
    features: [
      { symbol: 'new', title: 'Templates for Make', text: 'Pick a pitch deck, lesson slides, a poster or a post, and Make opens with it ready to edit.' },
      { symbol: 'saved', title: 'Your apps', text: 'See which apps are in your account and when you last used each one, on any device.' },
      { symbol: 'verified', title: 'Free with your account', text: 'Every ELUM app is free, and ELUM Account comes with every account.' },
      { symbol: 'visible', title: 'Is it working?', text: 'Each app shows whether it’s working right now, using the same check as the Status page.' },
    ],
    tips: ['Press / to jump to Store’s search box.', 'Type store in Browse to open Store in a Browse tab.'],
  },
  {
    id: 'account',
    name: 'Account',
    color: '#94c858',
    mist: '#eef7e4',
    kind: 'You, everywhere',
    headline: 'Getting started with your ELUM Account',
    intro: 'One account for every ELUM app. It holds your name and picture, the people you know, and how you sign in.',
    steps: [
      { title: 'Create your account', text: 'Sign up once with your own email or a new ELUM Type address. The same account works in every ELUM app.' },
      { title: 'Make it yours', text: 'Add your name and picture, your other addresses, and the people you know, sorted into circles like Family, Friends and Work.' },
      { title: 'Keep it safe', text: 'Under Security, turn on approvals for new sign-ins and sign out any device you don’t use any more.' },
    ],
    features: [
      { symbol: 'private', title: 'Approve new sign-ins', text: 'A new device has to wait until you pick its number on a device you’re already signed in to.' },
      { symbol: 'invite', title: 'People and circles', text: 'Sort the people you know into circles like Family, Friends and Work, and block anyone you’d rather not hear from.' },
      { symbol: 'star', title: 'Preferences', text: 'Choose 12 or 24 hour time, the first day of your week, the app you start in, and how much motion you like.' },
      { symbol: 'warning', title: 'You’re in charge', text: 'Under Privacy, decide who can see your picture, find you by name and message you in Type. You can delete your account whenever you want.' },
    ],
    tips: [
      'Sign in to one ELUM app and you’re signed in to all of them.',
      'Notifications from every app come together in one place.',
      'The ring around your picture shows which ELUM apps are in your account.',
    ],
  },
  {
    id: 'tune',
    name: 'Tune',
    color: '#48bfe3',
    mist: '#e3f5fb',
    kind: 'Music',
    headline: 'Tune is on the way',
    intro: 'Tune is ELUM’s music service. It isn’t open yet, and this page will show you how to get started as soon as it is.',
    steps: [],
    features: [],
    tips: ['Keep an eye on ELUM Store. Tune will show up there, with a Get button, the day it opens.'],
    soon: true,
  },
];

/** An app that is open today, with guides and troubleshooting. */
export type LiveProduct = Words & { id: ProductId };

export const LIVE_PRODUCTS = PRODUCTS.filter((p): p is LiveProduct => !p.soon);

/** The basics that hold across every app, for the docs home. */
export const BASICS: Feature[] = [
  { symbol: 'verified', title: 'One account', text: 'Your ELUM Account works in every app, with the same name, picture and people.' },
  { symbol: 'open', title: 'Sign in once', text: 'Sign in to one ELUM app, and the others open already signed in when you move to them from the apps window.' },
  { symbol: 'link', title: 'The apps window', text: 'The dots at the top of every app open your ELUM apps, so you can jump between them in one click.' },
  { symbol: 'new', title: 'What’s new', text: 'After an update, each app shows you a short tour. You can watch it again from your account menu.' },
];
