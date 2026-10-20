import type { ProductId } from './content';

/**
 * ELUM Docs, in depth: step-by-step guides and troubleshooting for every ELUM app, and the
 * problems that can happen in any of them. Words only; DocsPages.tsx shows them. Quote messages
 * exactly as the apps show them, so people can find them by what they see on screen. Describe only
 * what the apps do today.
 */

export interface Guide {
  title: string;
  /** Steps or facts, one per line, in order. */
  items: string[];
}

export interface Trouble {
  /** The problem as people would put it. */
  problem: string;
  /** The message the app shows, word for word, if there is one. */
  says?: string;
  /** Why it happens. */
  why: string;
  /** What to do, in order. */
  fix: string[];
}

export const GUIDES: Record<ProductId, Guide[]> = {
  write: [
    {
      title: 'Your documents',
      items: [
        'New document starts a blank page; it is saved to your ELUM account straight away.',
        'The list is sorted by Last opened by me. Shared with me shows documents other people have shared with you.',
        'Search the list by title or by the owner’s name.',
        'Each document’s menu lets you rename it, make a copy, open it in a new tab or delete it.',
        'Only the owner can delete a document. Deleting it removes it for everyone it was shared with.',
      ],
    },
    {
      title: 'Writing and formatting',
      items: [
        'Pick Title, a heading, a quote or body text from the styles menu.',
        'Add bulleted and numbered lists, checklists, links, pictures and page breaks from the toolbar.',
        'The dock sets the font and size, and line, paragraph and letter spacing.',
        'Spelling underlines words it does not know as you type.',
        'Pictures can be PNG, JPEG, GIF, WebP, AVIF, SVG or BMP.',
      ],
    },
    {
      title: 'Citations',
      items: [
        'Set up the first page (your name, the course or publication, the date) from the citations panel.',
        'Cite journal articles, books and web pages. Fill in the title first to see the entry.',
        'Choose the style your reader expects; every citation in the document follows it.',
      ],
    },
    {
      title: 'Sharing and comments',
      items: [
        'Choose Share and add people by their ELUM address or email. They get a notification in every ELUM app.',
        'Someone without an ELUM account is invited: they get access once they sign up and confirm that address.',
        'People can be viewers, commenters or editors. The owner and editors can add and remove people and cancel invites; the owner always keeps full access.',
        'Copy link gives you the document’s address. Only people with access can open it.',
        'Select some text, then choose Comment. Comments can be up to 4,000 characters, and anyone with access can reply.',
      ],
    },
    {
      title: 'Download and print',
      items: [
        'Download a copy as PDF, plain text or a web page.',
        'For PDF, Write opens the print window: choose “Save as PDF” as the destination.',
        'Print sends the document to your printer as it looks on screen.',
      ],
    },
  ],
  type: [
    {
      title: 'Your ELUM Type address',
      items: [
        'When you sign up, choose Get an ELUM Type address and pick a name: you become name@type.elum.services.',
        'Names start and end with a letter or number and do not put two symbols in a row.',
        'Add a recovery email at sign-up so you can be reached if you lose access.',
        'Sign in with the whole address, or with just the name.',
        'An account made with your own email can message ELUM people. To email people outside ELUM, you need an ELUM Type address.',
      ],
    },
    {
      title: 'Reading and writing',
      items: [
        'Open a conversation to see every message in it, newest at the bottom.',
        'Reply, Reply all or Forward from any message.',
        'Compose writes a new message. Type suggests ELUM people and contacts as you type a name.',
        'Attachments can add up to 25 MB per message. Save the message as a draft first, then attach files.',
        'Messages between ELUM people arrive the moment they are sent. Email to outside addresses goes out a moment later.',
      ],
    },
    {
      title: 'Keeping the inbox calm',
      items: [
        'Inbox, Unread, Archived, Spam and Trash are a click apart.',
        'Archive clears a conversation from your inbox; a new message brings it back.',
        'Mark as unread to come back to something later.',
        'Report spam moves a conversation to Spam, where it never rings the bell. Not spam brings it back.',
        'Deleted conversations wait in Trash. Undo is there straight after you act.',
      ],
    },
    {
      title: 'Contacts, signature and away reply',
      items: [
        'Contacts gathers the people you write to. Messages from ELUM accounts carry the verified symbol.',
        'In Settings, set your signature and your sending address, and turn on Away reply to answer new messages for you until you turn it off.',
        'Who may message you at all is set in ELUM Account, under Privacy.',
      ],
    },
  ],
  make: [
    {
      title: 'Starting a design',
      items: [
        'Pick a size: presentation, square or story post, banner, poster or flyer. Pages can be 100 to 8000 pixels on each side.',
        'Or start from a template: Pitch deck, Lesson slides, Event poster or Quote post.',
        'Templates in ELUM Store open straight in Make with Use in Make.',
        'Designs save as you work, to your ELUM account, so they are on every device you sign in to.',
      ],
    },
    {
      title: 'Text, shapes and pictures',
      items: [
        'Add a title, heading or body text, a shape, a line or arrow, or a picture from the toolbar.',
        'Double-click any text to edit it. Click outside it, or press Esc, when you are done.',
        'Pictures can be up to 15 MB.',
        'Hold Shift while drawing a line or arrow to keep it to 45° steps.',
        'Guides appear as you drag and snap things into line with the page and each other.',
      ],
    },
    {
      title: 'Colours',
      items: [
        'Pick a colour from the ELUM swatches, the colour wheel, or type its code (such as #ec7fa9).',
        'Your colours keeps the last eight you chose, on this device, so you can use them again.',
      ],
    },
    {
      title: 'Pages and layers',
      items: [
        'The pages strip adds, duplicates, reorders and deletes pages. Each page has speaker notes.',
        'Layers lists everything on the page, top first. Drag to reorder.',
        'Lock an element to keep it in place while you work around it; unlock it in Layers.',
        'Undo and redo cover every change.',
      ],
    },
    {
      title: 'Present, share and download',
      items: [
        'Present fills the screen until you press Esc. Arrows, space or a click move through the pages.',
        'Share adds anyone with an ELUM account. They get a notification, and the design appears in their Make.',
        'Download a page as PNG, or the whole design as PDF.',
        'Deleting a design you own deletes it, and its pictures, for everyone. A design shared with you is only removed from your list.',
      ],
    },
  ],
  browse: [
    {
      title: 'Searching',
      items: [
        'Type what you are looking for and press Enter. Press / anywhere to jump to the search box.',
        'Switch between All and Images. SafeSearch is on unless you turn it off.',
        'Recent searches stay on this device. Forget one, or all of them, at any time.',
        'Results come from Google without AI Overviews or Gemini, and results that lead to AI chat products are left out.',
      ],
    },
    {
      title: 'Pages in Browse',
      items: [
        'Clicking a result, or typing an address such as wikipedia.org, opens the page in a Browse tab.',
        'Sites that allow it show as themselves. Sites that refuse to be shown inside other sites open as a clean reading view.',
        'Links in the reading view open in the same tab. Open in new window always shows the original.',
        'Google’s own pages and ads always open in a new window.',
      ],
    },
    {
      title: 'ELUM apps in Browse',
      items: [
        'Type write, type, make, store or account, or an address such as make.elum.services, and the app opens in a Browse tab.',
        'The address bar shows the app’s elum.services address.',
        'Open in new window gives the app a window of its own, still signed in.',
        'Want to search the web for those words instead? Pick Search the web under the box.',
      ],
    },
    {
      title: 'Tabs and groups',
      items: [
        'Keep searches, pages and apps open side by side in tabs.',
        'Right-click a tab to duplicate it, move it to a new window, add it to a group, or close it and others.',
        'Give a group a name, a colour and a symbol. Click the group to fold it away.',
        'Tabs and groups stay in this browser, ready for next time.',
      ],
    },
    {
      title: 'Status',
      items: [
        'The Status page checks every ELUM app, sign-in, the database, file storage, ELUM’s server functions and Google search.',
        'It checks again every minute while it is open.',
      ],
    },
  ],
  store: [
    {
      title: 'Finding apps',
      items: [
        'The home page shows what is new, your apps, every ELUM app, and templates for Make.',
        'Each app’s page says what it does, what is new, whether it is a beta, and whether it is working right now.',
        'Search finds apps and templates by any word, such as slides, mail or poster. Press / to jump to it.',
      ],
    },
    {
      title: 'Getting and opening apps',
      items: [
        'Get adds the app to your ELUM account. Every ELUM app is free.',
        'Signed out, Get asks you to sign in first, then finishes getting the app.',
        'Open takes you to the app already signed in. The arrow beside it opens the app in a Browse tab or a new window.',
        'ELUM Account comes with every account, so it shows as Included.',
        'Each app you get lights up its colour in the ring around your picture in ELUM Account.',
      ],
    },
    {
      title: 'Templates and your apps',
      items: [
        'Use in Make opens Make with that template ready to edit. Each click makes one design.',
        'Your apps lists the apps in your account and when you last used each.',
      ],
    },
  ],
  account: [
    {
      title: 'Profile',
      items: [
        'Your name, picture and colour show in every ELUM app.',
        'Pictures can be PNG, JPEG, WebP, GIF or AVIF, up to 2 MB. Without a picture, people see your initials on your colour.',
        'Set your language and time zone here too.',
      ],
    },
    {
      title: 'Addresses',
      items: [
        'Your sign-in address and your ELUM Type address are always on your account.',
        'Add more addresses: ELUM sends a code to each one, and you enter it to confirm the address is yours.',
        'Only added addresses can be removed.',
      ],
    },
    {
      title: 'People and privacy',
      items: [
        'Sort the people you know into Family, Friends and Work. Block anyone you would rather not hear from.',
        'Under Privacy, choose who may see your picture, find you by name, and message you: everyone, people you know, or no one.',
        'Blocked people cannot find you, see your picture or message you.',
      ],
    },
    {
      title: 'Security',
      items: [
        'Change your password. For your safety, ELUM may ask you to sign in again first.',
        'Turn on approvals: a new device then waits until you pick its number on a device you are already signed in to.',
        'See every signed-in device, and sign out any you do not recognise. Recent activity lists what changed and when.',
      ],
    },
    {
      title: 'Preferences, notifications and your apps',
      items: [
        'Preferences: 12 or 24 hour time, the first day of the week, the app you start in, and how much motion you like.',
        'Notifications: choose what reaches you inside the apps and outside them, for each kind of event.',
        'Your home screen rings your picture with the colour of each ELUM app in your account: Write, Type, Make, Browse and Store.',
        'Delete your account at any time from the Delete page. Every ELUM app cleans up after it.',
      ],
    },
  ],
};

export const TROUBLES: Record<ProductId, Trouble[]> = {
  write: [
    {
      problem: 'My changes did not appear, or the document jumped',
      says: 'This document changed somewhere else.',
      why: 'The same document was edited in another tab, on another device or by someone you shared it with, and Write loaded the newer version.',
      fix: ['Read the document again: the newest version is the one shown.', 'Keep one tab per document open on each device.', 'If something is missing, use Undo in the tab where you made the change.'],
    },
    {
      problem: 'I cannot open a document',
      says: 'This document does not exist or was deleted.',
      why: 'The owner deleted it, or removed you from it, or the link is wrong.',
      fix: ['Ask the owner to share it with you again.', 'Check that you are signed in with the address it was shared to.'],
    },
    {
      problem: 'Someone I shared with cannot see the document',
      says: 'No account yet. They get access once they sign up and confirm this address.',
      why: 'The address has no ELUM account yet, so Write keeps an invite waiting for it.',
      fix: ['Ask them to sign up with exactly that address and confirm it.', 'Once confirmed, the document appears under Shared with me.'],
    },
    {
      problem: 'I cannot add or remove people',
      says: 'Only the owner and editors can add people.',
      why: 'You are a viewer or commenter on this document; only its owner and editors manage who has it.',
      fix: ['Ask the owner to share it, or to make you an editor.'],
    },
    {
      problem: 'I cannot delete a document',
      says: 'Only the owner can delete this document.',
      why: 'Deleting removes it for everyone, so only the owner may.',
      fix: ['Ask the owner, or ask them to remove you from it.'],
    },
    {
      problem: 'Comment does nothing',
      says: 'Select the text you want to comment on first.',
      why: 'Comments attach to a part of the text.',
      fix: ['Select a word or passage, then choose Comment.', 'Keep comments under 4,000 characters.'],
    },
    {
      problem: 'A picture will not upload',
      says: 'Choose an image file: PNG, JPEG, GIF, WebP, AVIF, SVG or BMP.',
      why: 'The file is another kind, or it did not finish uploading.',
      fix: ['Save the picture as PNG or JPEG and try again.', 'If it says “That image could not be uploaded.”, check your connection and try again.'],
    },
    {
      problem: 'PDF download opens a print window',
      why: 'Write makes PDFs with your browser’s print window, so the PDF looks exactly like the page.',
      fix: ['In the print window, choose “Save as PDF” as the destination.', 'If it says “The print copy did not load.”, allow pop-ups for Write and try again.'],
    },
    {
      problem: 'Spelling is not underlining anything',
      says: 'The dictionary is not loaded.',
      why: 'The dictionary downloads the first time you write, and the download did not finish.',
      fix: ['Check your connection, then reload the page.'],
    },
  ],
  type: [
    {
      problem: 'I cannot email someone outside ELUM',
      says: 'Get an ELUM address to email people outside ELUM.',
      why: 'Email to the wider internet goes out from an ELUM Type address. Accounts made with your own email can message ELUM people only.',
      fix: ['Make an account with an ELUM Type address, or message the person from your own email service.'],
    },
    {
      problem: 'Type cannot find the person I am writing to',
      says: 'Check the spelling, or write to their email address.',
      why: 'No ELUM account matches that name, or they chose not to be found (ELUM Account > Privacy).',
      fix: ['Write to their full email or ELUM address instead of their name.'],
    },
    {
      problem: 'My message to someone did not arrive',
      why: 'They may only accept messages from people they know, or may have blocked you. Outside email can also land in their spam folder.',
      fix: ['Ask them to add you under People in ELUM Account.', 'For outside email, ask them to check their spam folder.'],
    },
    {
      problem: 'I cannot attach a file',
      says: 'Save the message first, then attach files.',
      why: 'Attachments belong to a saved draft.',
      fix: ['Save the draft, then attach.', 'Keep attachments under 25 MB in total. “Attachments can add up to 25 MB.” means the message is over.'],
    },
    {
      problem: 'My email says “Sending” for a while',
      says: 'Sending. Outside email goes out in a moment.',
      why: 'Email to outside addresses goes out in the background, usually within a minute.',
      fix: ['Leave it; it sends on its own. If it is still waiting after a few minutes, reload Type.'],
    },
    {
      problem: 'A message I expected is missing',
      why: 'It may be in Spam, Archived or Trash.',
      fix: ['Look in Spam, then Archived, then Trash.', 'Choose Not spam to bring a message back to the inbox.'],
    },
    {
      problem: 'My draft changed by itself',
      says: 'This draft changed on another device.',
      why: 'The same draft was being edited somewhere else, and Type loaded the newer version.',
      fix: ['Finish the draft on one device at a time.'],
    },
    {
      problem: 'Type says to wait',
      says: 'Too many requests. Wait a little and try again.',
      why: 'Type limits how fast messages can be sent, to keep spam out.',
      fix: ['Wait a minute, then send again.'],
    },
  ],
  make: [
    {
      problem: 'I cannot edit the text',
      why: 'Text edits with a double-click, and locked elements cannot be changed.',
      fix: ['Double-click the text.', 'If it still will not change, open Layers and unlock it.'],
    },
    {
      problem: 'A picture will not add',
      says: 'Pictures can be up to 15 MB.',
      why: 'The picture is too large, or it could not be read.',
      fix: ['Make the picture smaller, or save it as PNG or JPEG.', '“That picture could not be uploaded.” means the upload stopped: check your connection and try again.'],
    },
    {
      problem: 'Download did not work',
      says: 'That export did not work. Try again, or try a smaller design.',
      why: 'Very large pages or many large pictures take more memory than the browser allowed.',
      fix: ['Try again.', 'Download one page as PNG, or make the page size smaller.'],
    },
    {
      problem: 'Present does not fill the screen',
      why: 'The browser asks before a page goes full screen, and some browsers block it inside frames.',
      fix: ['Allow full screen when the browser asks.', 'In a Browse tab, choose Open in new window first, then Present.', 'Press Esc to stop presenting.'],
    },
    {
      problem: 'The design changed while I was looking at it',
      says: 'Someone else changed this design. Your view was updated.',
      why: 'Someone you shared with is editing it too.',
      fix: ['Carry on: your view shows the latest version.'],
    },
    {
      problem: 'I cannot open a design',
      says: 'This design does not exist, or it has not been shared with you.',
      why: 'The owner deleted it, removed you, or the link is wrong.',
      fix: ['Ask the owner to share it with you again.'],
    },
    {
      problem: 'Deleting a design only removes it from my list',
      says: 'Remove it from your designs?',
      why: 'The design belongs to someone else. Only the owner can delete it for everyone.',
      fix: ['Removing it is safe; the owner keeps it.'],
    },
    {
      problem: 'A template from Store opened Make’s home page',
      says: 'That template is not in Make. Pick one below.',
      why: 'The link named a template Make does not have, or that click already made its design.',
      fix: ['Pick the template on Make’s home page.', 'Your design from the first click is at the top of your designs.'],
    },
    {
      problem: 'My saved colours are gone',
      why: 'Your colours are kept in this browser, on this device only.',
      fix: ['Type the colour’s code (such as #ec7fa9) to use it again; it joins Your colours.'],
    },
  ],
  browse: [
    {
      problem: 'Google found nothing',
      says: 'Browse searches through your ELUM search engine, which may only cover some sites.',
      why: 'Browse’s Google search engine may be set to cover a list of sites, and your words matched none of them. Google can also turn a search away.',
      fix: ['Try other words.', 'Choose See this search on Google: it opens Google’s web-only results, without an AI Overview.'],
    },
    {
      problem: 'Results never appear',
      why: 'Google’s results load from cse.google.com. Ad and tracker blockers often block it.',
      fix: ['Allow cse.google.com in your blocker, or pause it on Browse, then search again.', 'If Google does not answer in 10 seconds, Browse says so and offers the search on Google.'],
    },
    {
      problem: 'A page opened as a reading view',
      why: 'The site does not allow other sites to show it, so Browse shows the article itself instead.',
      fix: ['Read it there, or choose Open the original in a new window.'],
    },
    {
      problem: 'A page cannot be shown',
      says: 'This page cannot be shown here',
      why: 'The site refuses to be shown inside Browse and is not an article, or it needs you to sign in or prove you are a person.',
      fix: ['Choose Open in new window.'],
    },
    {
      problem: 'A page did not open',
      says: 'That page did not answer. Try again, or open it in a new window.',
      why: 'The site was slow or down.',
      fix: ['Reload the tab.', 'Choose Open in new window.', 'If it says “That is a lot of pages.”, wait a little before opening more.'],
    },
    {
      problem: 'An address will not open',
      says: 'Browse can only open public web addresses.',
      why: 'Browse does not open addresses on private networks, IP addresses, unusual ports or addresses with a password in them.',
      fix: ['Open it in your own browser instead.'],
    },
    {
      problem: 'Typing an app name searched the web instead',
      why: 'Words with spaces, such as “make bread”, are searches. One word, such as “make”, opens the app.',
      fix: ['Type the app’s name on its own, or its elum.services address.'],
    },
    {
      problem: 'An ELUM app in a tab asks for a site password, or to sign in',
      why: 'While ELUM is being tested, its sites can be protected by a site password, which is separate from your ELUM account. Some browsers also block sign-in inside frames.',
      fix: ['Choose Open in new window, enter the site password there, then reload the tab.', 'If the app asks you to sign in, sign in with your ELUM account.'],
    },
    {
      problem: 'My tabs disappeared',
      why: 'Tabs and groups are kept in this browser. Private windows, clearing site data, or another browser start fresh.',
      fix: ['Open Browse in the same browser, outside a private window.'],
    },
  ],
  store: [
    {
      problem: 'Get says Coming soon',
      why: 'The app is not open to everyone yet.',
      fix: ['Check back soon; it appears in What’s new when it opens.'],
    },
    {
      problem: 'Get keeps asking me to sign in',
      why: 'Getting an app needs your ELUM account. Signing in goes through ELUM Account, and Store tries that at most once a minute so it never loops.',
      fix: ['Sign in, and Store finishes getting the app.', 'If it does not, wait a minute, then choose Get again.', 'Allow cookies for the ELUM sites.'],
    },
    {
      problem: 'Open asked me to sign in to the app',
      why: 'Store passes your sign-in on through ELUM Account. If that hand-over fails, the app opens signed out.',
      fix: ['Sign in to the app with the same ELUM account.'],
    },
    {
      problem: 'An app I got is not in Your apps or the ring',
      why: 'The page was opened before the app was added.',
      fix: ['Reload Store or ELUM Account.'],
    },
    {
      problem: 'Your apps does not load',
      says: 'Store could not find your apps',
      why: 'The connection dropped while Store was asking.',
      fix: ['Choose Try again.'],
    },
    {
      problem: 'Use in Make did not make a design',
      why: 'Make makes one design per click. Going back to the same link does not make another.',
      fix: ['Choose Use in Make again in Store.', 'Or pick the template on Make’s home page.'],
    },
  ],
  account: [
    {
      problem: 'My code does not work',
      says: 'That code does not match. Check it and try again.',
      why: 'The code was typed wrong, or a newer code was sent.',
      fix: ['Use the most recent code in that inbox.', 'If it says “That code has expired. Ask for a new one.”, ask for a new code.'],
    },
    {
      problem: 'I cannot add an address',
      says: 'That address belongs to another account.',
      why: 'Each address belongs to one ELUM account.',
      fix: ['Sign in to that other account and remove the address there first, or use a different address.'],
    },
    {
      problem: 'I cannot remove an address',
      says: 'Only added addresses can be removed. Your sign-in and Type addresses stay.',
      why: 'You sign in with those addresses, so they stay on the account.',
      fix: ['Remove only the addresses you added.'],
    },
    {
      problem: 'I cannot change my password',
      says: 'For your safety, sign in again before changing your password.',
      why: 'Changing a password needs a recent sign-in.',
      fix: ['Sign out, sign in again, then change the password straight away.'],
    },
    {
      problem: 'I picked the wrong number when approving a sign-in',
      says: 'That was not the number, so we stopped that sign-in.',
      why: 'A wrong number stops the sign-in, in case it was not you.',
      fix: ['Sign in again on the new device, and pick the number it shows.', 'A request lasts ten minutes: “The request lasts ten minutes. Sign in again to send a new one.”'],
    },
    {
      problem: 'I have approvals on and no other signed-in device',
      why: 'Approvals need a device you are already signed in to. ELUM does not offer a Forgot password link yet.',
      fix: ['Keep at least one device signed in while approvals are on.', 'Before signing out everywhere, turn approvals off under Security.'],
    },
    {
      problem: 'My picture will not upload',
      says: 'Pictures can be up to 2 MB.',
      why: 'The picture is too large, or it is not one of the kinds ELUM takes.',
      fix: ['Choose a PNG, JPEG, WebP, GIF or AVIF under 2 MB.', '“This browser cannot resize pictures.” means your browser is out of date: update it, or use another.'],
    },
    {
      problem: 'Someone cannot find me or message me',
      why: 'Your Privacy settings decide who may find you and message you.',
      fix: ['Under Privacy, choose Everyone, or add them under People and choose People you know.', 'Check they are not under Blocked.'],
    },
    {
      problem: 'An app says “That ELUM app is not open yet.”',
      why: 'The app is not open to everyone yet.',
      fix: ['Check ELUM Store for the apps that are open.'],
    },
  ],
};

/** Problems that can happen in any ELUM app. */
export const COMMON_TROUBLES: Trouble[] = [
  {
    problem: 'I am signed in to one ELUM app but not another',
    why: 'Each ELUM app is its own site, so they cannot share a sign-in by themselves. ELUM Account hands your sign-in over when you move between apps.',
    fix: [
      'Open the other app from the apps window (the dots at the top of every app): it opens signed in.',
      'If it asks you to sign in, sign in with the same ELUM account.',
      'If it keeps sending you round, wait a minute: apps try the hand-over at most once a minute.',
    ],
  },
  {
    problem: 'My confirmation email never arrived',
    says: 'Confirm your email first. We sent you a link when you signed up.',
    why: 'The email may be in spam, or still on its way.',
    fix: ['Look in your spam folder.', 'Choose Send the link again. If it says “A link was sent a moment ago. Wait a minute and try again.”, wait a minute first.'],
  },
  {
    problem: 'A sign-in or confirmation link does not work',
    says: 'That sign-in link has expired or was already used. Sign in again.',
    why: 'Each link works once, for a limited time.',
    fix: ['Sign in with your password, or send yourself a new link.'],
  },
  {
    problem: 'An ELUM app says my session has ended',
    says: 'Your session has ended. Sign in again.',
    why: 'You signed out on another device, or signed out everywhere, or the session ran out.',
    fix: ['Sign in again. Your work is saved to your account.'],
  },
  {
    problem: 'A new sign-in is waiting for approval',
    says: 'Approve this sign-in on a device you are already signed in to.',
    why: 'Approvals are on (ELUM Account > Security).',
    fix: ['Open any ELUM app on a device you are already signed in to. When it asks “Is this you signing in?”, pick the number the new device shows.', 'Choose “No, it’s not me” if you are not signing in.'],
  },
  {
    problem: 'An app says it has been updated',
    says: 'Reload the page to carry on. Your saved work is safe.',
    why: 'A new version of the app came out while it was open.',
    fix: ['Reload the page.'],
  },
  {
    problem: 'Something went wrong',
    says: 'Something went wrong. Please try again.',
    why: 'A service did not answer as expected.',
    fix: ['Try again, then reload the page.', 'Check ELUM Status in Browse to see whether a service is down.'],
  },
  {
    problem: 'An ELUM site asks for a password before it loads',
    why: 'While ELUM is being tested, its sites can be protected by a site password, which is separate from your ELUM account.',
    fix: ['Enter the site password you were given, then sign in with your ELUM account.'],
  },
  {
    problem: 'The app looks too dark or too light, or moves too much',
    why: 'ELUM follows your device’s light or dark setting until you choose.',
    fix: ['Use the sun and moon button at the top of any app.', 'Turn motion down under Preferences in ELUM Account, or with your device’s reduce motion setting.'],
  },
  {
    problem: 'Which browsers does ELUM work in?',
    why: 'ELUM uses features of up-to-date browsers.',
    fix: ['Use a current Chrome, Edge, Firefox or Safari, on a computer, iPhone, iPad or Android.', 'Keep your browser up to date.'],
  },
];

/** Every problem, with the app it belongs to (null for every app), for searching. */
export function allTroubles(): { product: ProductId | null; trouble: Trouble }[] {
  return [
    ...COMMON_TROUBLES.map((trouble) => ({ product: null, trouble })),
    ...(Object.keys(TROUBLES) as ProductId[]).flatMap((product) => TROUBLES[product].map((trouble) => ({ product, trouble }))),
  ];
}

/** Problems whose words, message, cause or fix contain every word of the query. */
export function searchTroubles(query: string): { product: ProductId | null; trouble: Trouble }[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const all = allTroubles();
  if (!words.length) return all;
  return all.filter(({ trouble: t }) => {
    const text = [t.problem, t.says ?? '', t.why, ...t.fix].join(' ').toLowerCase();
    return words.every((w) => text.includes(w));
  });
}
