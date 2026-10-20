/**
 * ELUM Docs: a starting page for each ELUM app, and one for ELUM as a whole. Words only; the
 * pages that show them are in DocsPages.tsx. Keep each step to something people can do today.
 */

export type ProductId = 'write' | 'type' | 'make' | 'browse' | 'account';

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
  id: ProductId;
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
}

type Words = Omit<Product, 'url'>;

export const PRODUCTS: Words[] = [
  {
    id: 'write',
    name: 'Write',
    color: '#f59a52',
    mist: '#fdf0e4',
    kind: 'Documents',
    headline: 'Start writing in Write',
    intro: 'Documents that save as you type, look the same on every device, and are easy to share with the people you work with.',
    steps: [
      { title: 'Start a document', text: 'Open Write and choose New document. It is saved to your ELUM account straight away, so there is no save button to remember.' },
      { title: 'Write and shape it', text: 'Use Title, headings and quotes from the styles menu, add lists, checklists, links, pictures and page breaks, and let Spelling check as you go.' },
      { title: 'Share it', text: 'Choose Share and add anyone with an ELUM account. Leave comments on any part of the text and reply in the thread.' },
    ],
    features: [
      { symbol: 'compose', title: 'Styles and citations', text: 'Set up a first page, then cite journal articles, books and web pages. Write keeps the formatting in step.' },
      { symbol: 'download', title: 'Download and print', text: 'Save a copy as PDF, plain text or a web page, or print it as it looks on screen.' },
      { symbol: 'duplicate', title: 'Make a copy', text: 'Start a new version from any document, and keep the original as it was.' },
      { symbol: 'saved', title: 'Saved everywhere', text: 'Every change is saved to your account. Open the same document on your phone and carry on.' },
    ],
    tips: [
      'Your documents are sorted by Last opened by me. Switch to Shared with me to see what others have sent you.',
      'Open in new tab keeps your list where it was.',
      'The tab shows the Write document symbol while a document is open.',
    ],
  },
  {
    id: 'type',
    name: 'Type',
    color: '#3fc4a0',
    mist: '#e4f7f1',
    kind: 'Messages and email',
    headline: 'Get going with Type',
    intro: 'Messages and email in one calm inbox, with your own ELUM Type address.',
    steps: [
      { title: 'Claim your address', text: 'When you sign up, choose a name for your ELUM Type address. It is yours, and you can sign in with it.' },
      { title: 'Read and reply', text: 'Open a conversation to see it all in one place. Reply, reply to everyone or forward, and attach files from your device.' },
      { title: 'Keep it calm', text: 'Archive what is done, mark as unread to come back later, and mute conversations that keep going without you.' },
    ],
    features: [
      { symbol: 'verified', title: 'From ELUM', text: 'Messages from other ELUM accounts carry the verified symbol, so you know who you are talking to.' },
      { symbol: 'spam', title: 'Spam stays out', text: 'Report spam and it moves out of your inbox. Not spam brings it back.' },
      { symbol: 'archive', title: 'Views for everything', text: 'Inbox, Unread, Archived, Spam and Trash, a click apart. Undo is there if you change your mind.' },
      { symbol: 'private', title: 'Approve new sign-ins', text: 'When approvals are on, Type asks you to pick the matching number before a new device gets in.' },
    ],
    tips: [
      'Contacts gathers the people you write to, with ELUM accounts marked.',
      'The tab shows the Type message symbol while a conversation is open.',
      'Settings links straight to your profile and addresses in ELUM Account.',
    ],
  },
  {
    id: 'make',
    name: 'Make',
    color: '#ec7fa9',
    mist: '#fceaf1',
    kind: 'Slides and posts',
    headline: 'Your first design in Make',
    intro: 'Slides, posters and social posts, designed on a real canvas and shared across ELUM.',
    steps: [
      { title: 'Pick a size', text: 'Start from a presentation, a square or story post, a banner, a poster or a flyer, or from one of the templates.' },
      { title: 'Design it', text: 'Add titles, headings and body text, shapes, lines, arrows and pictures. Guides snap things into line, and layers keep them in order.' },
      { title: 'Present or share', text: 'Present full screen, share with anyone who has an ELUM account, or download a page as PNG or the design as PDF.' },
    ],
    features: [
      { symbol: 'present', title: 'Present', text: 'Fills the screen until you press Esc. Arrows, space or a click move through your pages.' },
      { symbol: 'duplicate', title: 'Pages', text: 'Duplicate, reorder and delete pages, with speaker notes for each.' },
      { symbol: 'private', title: 'Lock what is done', text: 'Lock an element so it stays put while you work around it.' },
      { symbol: 'saved', title: 'Undo covers everything', text: 'Every change is saved as you go, and undo takes back any of them.' },
    ],
    tips: [
      'Hold Shift while drawing a line or arrow to keep it to 45° steps.',
      'The tab shows the Make design symbol while a design is open.',
      'Make a copy of a design to try an idea without losing the original.',
    ],
  },
  {
    id: 'browse',
    name: 'Browse',
    color: '#9b84ee',
    mist: '#f2eefd',
    kind: 'Search',
    headline: 'Search with Browse',
    intro: 'Search the web with results from Google. Results that lead to AI chat products are left out.',
    steps: [
      { title: 'Search', text: 'Type what you are looking for and press Enter. Press / from anywhere on the page to jump to the search box.' },
      { title: 'Look through the results', text: 'Switch between All and Images. Browse tells you when it left a result out.' },
      { title: 'Make it yours', text: 'Turn SafeSearch on or off, and choose whether this device remembers your recent searches.' },
    ],
    features: [
      { symbol: 'visible', title: 'Just the web', text: 'Results from Google, without AI Overviews or Gemini.' },
      { symbol: 'private', title: 'Your searches, your device', text: 'Recent searches stay on this device only. Forget one, or all of them, at any time.' },
      { symbol: 'open', title: 'ELUM apps, right here', text: 'Type write, type, make or account, or an address such as make.elum.services, and the app opens in a Browse tab. Open in new window gives it a window of its own.' },
      { symbol: 'visible', title: 'Pages open in Browse', text: 'Results and typed addresses open in a Browse tab. Sites that refuse to be shown inside other sites open as a clean reading view, with the original a click away.' },
      { symbol: 'star', title: 'Tabs and groups', text: 'Keep searches and apps open side by side. Right-click a tab to group it, then give the group a name, a colour and a symbol.' },
    ],
    tips: [
      'Recent searches appear as you type. Use the arrow keys to pick one.',
      'Want the web instead? Pick Search the web under the box when your words name an ELUM app.',
      'Click a group to fold it away; your tabs and groups are still there next time.',
      'Is ELUM working? Browse’s Status page checks every app.',
    ],
  },
  {
    id: 'account',
    name: 'Account',
    color: '#94c858',
    mist: '#eef7e4',
    kind: 'You, everywhere',
    headline: 'Set up your ELUM Account',
    intro: 'One account for every ELUM app: your name and picture, the people you know, and how you sign in.',
    steps: [
      { title: 'Create your account', text: 'Sign up once with your email or an ELUM Type address. It works in Write, Type, Make and Browse.' },
      { title: 'Make it yours', text: 'Add your name and picture, your addresses, and the people you know, in circles such as Family, Friends and Work.' },
      { title: 'Keep it safe', text: 'Under Security, turn on approvals for new sign-ins, and sign out any device you no longer use.' },
    ],
    features: [
      { symbol: 'private', title: 'Approve new sign-ins', text: 'A new device waits until you pick its number on one you are already signed in to.' },
      { symbol: 'invite', title: 'People and circles', text: 'Sort the people you know into circles such as Family, Friends and Work, and block anyone you would rather not hear from.' },
      { symbol: 'star', title: 'Preferences', text: 'Choose 12 or 24 hour time, the first day of the week, the app you start in, and how much motion you like.' },
      { symbol: 'warning', title: 'You stay in charge', text: 'Under Privacy, choose who can see your picture, find you by name and message you in Type. Delete your account whenever you choose.' },
    ],
    tips: [
      'Signing in to one ELUM app signs you in to the others.',
      'Notifications from every app collect in one place.',
    ],
  },
];

/** The basics that hold across every app, for the docs home. */
export const BASICS: Feature[] = [
  { symbol: 'verified', title: 'One account', text: 'Your ELUM Account works in every app, with the same name, picture and people.' },
  { symbol: 'open', title: 'Sign in once', text: 'Sign in to one ELUM app and the others open signed in too.' },
  { symbol: 'link', title: 'The apps window', text: 'The dots at the top of every app open ELUM’s apps. Jump between them in one click.' },
  { symbol: 'new', title: 'What’s new', text: 'After an update, each app shows a short tour. Replay it from your account menu.' },
];
