import type { ProductId } from './content';

/**
 * ELUM Docs, in depth: step-by-step guides and troubleshooting for every ELUM app, and the
 * problems that can happen in any of them. Words only; DocsPages.tsx shows them. Write the way you
 * would explain it to a friend: plain sentences, "you", no jargon. Quote messages exactly as the
 * apps show them, so people can find them by what they see on screen, and describe only what the
 * apps do today.
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
        'Choose New document to start a blank page. It’s saved to your ELUM account straight away.',
        'Your list shows the documents you opened most recently first. Shared with me shows the ones other people have shared with you.',
        'Search your list by a document’s title or by the name of the person who owns it.',
        'Each document has a menu where you can rename it, make a copy, open it in a new tab or delete it.',
        'Only the owner can delete a document, and deleting it removes it for everyone it was shared with.',
      ],
    },
    {
      title: 'Writing and formatting',
      items: [
        'Use the styles menu to turn a line into a title, a heading, a quote or normal text.',
        'The toolbar adds bulleted and numbered lists, checklists, links, pictures and page breaks.',
        'The dock lets you choose the font and size, and the spacing between lines, paragraphs and letters.',
        'Spelling underlines words it doesn’t recognise as you type.',
        'Pictures can be PNG, JPEG, GIF, WebP, AVIF, SVG or BMP files.',
      ],
    },
    {
      title: 'Citations',
      items: [
        'Open the citations panel to set up your first page: your name, the course or publication, and the date.',
        'Add citations for journal articles, books and websites. Fill in the title first and the entry appears.',
        'Pick the citation style your reader expects, and every citation in the document follows it.',
      ],
    },
    {
      title: 'Sharing and comments',
      items: [
        'Choose Share and add people by their ELUM address or email. They’ll get a notification in every ELUM app.',
        'If someone doesn’t have an ELUM account yet, Write sends them an invite. They get access as soon as they sign up and confirm that address.',
        'People can be viewers, commenters or editors. The owner and editors can add or remove people and cancel invites, and the owner always keeps full access.',
        'Copy link gives you the document’s address. Only people who have access can open it.',
        'To comment, select some text and choose Comment. Comments can be up to 4,000 characters, and anyone with access can reply.',
      ],
    },
    {
      title: 'Downloading and printing',
      items: [
        'Download a copy as a PDF, as plain text or as a web page.',
        'For a PDF, Write opens your browser’s print window. Choose “Save as PDF” as the destination.',
        'Print sends the document to your printer looking exactly as it does on screen.',
      ],
    },
  ],
  type: [
    {
      title: 'Your ELUM Type address',
      items: [
        'When you sign up, choose Get an ELUM Type address and pick a name. Your address becomes name@type.elum.services.',
        'A name has to start and end with a letter or number, and can’t have two symbols in a row.',
        'Add a recovery email when you sign up, so you can still be reached if you lose access.',
        'You can sign in with your whole address or with just the name.',
        'If you signed up with your own email, you can message people on ELUM. To email people outside ELUM, you’ll need an ELUM Type address.',
      ],
    },
    {
      title: 'Reading and writing messages',
      items: [
        'Open a conversation to see all its messages together, with the newest at the bottom.',
        'Every message has Reply, Reply all and Forward.',
        'Choose Compose to write a new message. Start typing a name and Type suggests people on ELUM and in your contacts.',
        'Attachments can add up to 25 MB per message. Save your message as a draft first, then attach your files.',
        'Messages between ELUM people arrive instantly. Email to addresses outside ELUM goes out a moment later.',
      ],
    },
    {
      title: 'Keeping your inbox calm',
      items: [
        'Inbox, Unread, Archived, Spam and Trash are always one click away.',
        'Archive a conversation to clear it from your inbox. If someone replies, it comes back.',
        'Mark something as unread when you want to come back to it later.',
        'Report spam to move a conversation to Spam, where it won’t notify you. Not spam brings it back.',
        'Deleted conversations wait in Trash, and Undo appears right after you act, in case you change your mind.',
      ],
    },
    {
      title: 'Contacts, signature and away reply',
      items: [
        'Contacts collects everyone you write to. Messages from ELUM accounts show the verified symbol.',
        'In Settings you can set your signature and the address you send from, and turn on Away reply to answer new messages for you while you’re away.',
        'Who’s allowed to message you at all is set in ELUM Account, under Privacy.',
      ],
    },
  ],
  make: [
    {
      title: 'Starting a design',
      items: [
        'Pick a size: a presentation, a square or story post, a banner, a poster or a flyer. Pages can be anywhere from 100 to 8000 pixels on each side.',
        'Or start from a template: Pitch deck, Lesson slides, Event poster or Quote post.',
        'In ELUM Store, Use in Make opens a template straight in Make.',
        'Your designs save as you work, to your ELUM account, so they’re on every device you sign in to.',
      ],
    },
    {
      title: 'Text, shapes and pictures',
      items: [
        'Use the toolbar to add a title, a heading, body text, a shape, a line, an arrow or a picture.',
        'To edit text, double-click it. Click somewhere else or press Esc when you’re done.',
        'Pictures can be up to 15 MB.',
        'Hold Shift while you draw a line or arrow to keep it straight or at a 45° angle.',
        'As you drag things around, guides appear to help you line them up with the page and with each other.',
      ],
    },
    {
      title: 'Colours',
      items: [
        'Choose a colour from the ELUM swatches or the colour wheel, or type in its code, like #ec7fa9.',
        'Your colours remembers the last eight colours you used on this device, so they’re easy to use again.',
      ],
    },
    {
      title: 'Pages and layers',
      items: [
        'Use the pages strip to add, duplicate, reorder and delete pages. Each page has room for speaker notes.',
        'Layers lists everything on the page, with the top item first. Drag items to change their order.',
        'Lock anything you don’t want to move by accident. You can unlock it again in Layers.',
        'Undo and Redo work for every change you make.',
      ],
    },
    {
      title: 'Presenting, sharing and downloading',
      items: [
        'Present fills your screen until you press Esc. Use the arrow keys, the space bar or a click to move through your pages.',
        'Share adds anyone with an ELUM account. They get a notification, and the design shows up in their Make.',
        'Download a single page as a PNG, or the whole design as a PDF.',
        'Deleting a design you own deletes it, and its pictures, for everyone. If someone shared a design with you, deleting it just removes it from your list.',
      ],
    },
  ],
  browse: [
    {
      title: 'Searching',
      items: [
        'Type what you’re looking for and press Enter. You can press / anywhere to jump to the search box.',
        'Switch between All and Images. SafeSearch stays on unless you turn it off.',
        'Your recent searches are kept on this device only. You can clear one, or all of them, whenever you like.',
        'Results come from Google, without AI Overviews or Gemini, and results that lead to AI chat products are left out.',
      ],
    },
    {
      title: 'Opening pages in Browse',
      items: [
        'When you click a result or type an address like wikipedia.org, the page opens in a Browse tab.',
        'Most sites show up just as they are. If a site doesn’t allow other sites to show it, Browse shows you a clean reading view of the article instead.',
        'Links in the reading view open in the same tab, and Open in new window always takes you to the original.',
        'Google’s own pages and ads always open in a new window.',
      ],
    },
    {
      title: 'Your ELUM apps in Browse',
      items: [
        'Type write, type, make, store or account, or an address like make.elum.services, and that app opens in a Browse tab.',
        'The address bar shows the app’s elum.services address.',
        'If you’re signed in to Browse, apps open in their tabs already signed in.',
        'Open in new window gives the app a window of its own, still signed in.',
        'If you meant to search the web for those words, choose Search the web under the box.',
      ],
    },
    {
      title: 'Tabs and groups',
      items: [
        'Keep searches, pages and apps open side by side in tabs.',
        'Right-click a tab to duplicate it, move it to a new window, add it to a group, or close it or the others.',
        'Give a group a name, a colour and a symbol, and click the group to fold it away.',
        'Your tabs and groups are saved in this browser, ready for next time.',
      ],
    },
    {
      title: 'Checking that ELUM is working',
      items: [
        'The Status page checks every ELUM app, signing in, the database, file storage, ELUM’s servers and Google search.',
        'While the page is open, it checks again every minute.',
      ],
    },
  ],
  store: [
    {
      title: 'Finding apps',
      items: [
        'The home page shows what’s new, the apps you have, every ELUM app, and templates for Make.',
        'Every app has its own page that explains what it does, what’s new, whether it’s in beta and whether it’s working right now.',
        'Search finds apps and templates by any word, like slides, mail or poster. Press / to jump to the search box.',
      ],
    },
    {
      title: 'Getting and opening apps',
      items: [
        'Choose Get to add an app to your ELUM account. Every ELUM app is free.',
        'If you’re not signed in, Get asks you to sign in first and then finishes adding the app.',
        'Open takes you straight to the app, already signed in. The arrow next to it opens the app in a Browse tab or a window of its own.',
        'ELUM Account comes with every account, so it shows as Included.',
        'Every app you get lights up in its colour in the ring around your picture in ELUM Account.',
      ],
    },
    {
      title: 'Templates and your apps',
      items: [
        'Use in Make opens Make with that template ready to edit. Each click makes one new design.',
        'Your apps lists the apps in your account and when you last used each one.',
      ],
    },
  ],
  account: [
    {
      title: 'Your profile',
      items: [
        'Your name, picture and colour show up in every ELUM app.',
        'Your picture can be a PNG, JPEG, WebP, GIF or AVIF file up to 2 MB. If you don’t add one, people see your initials on your colour.',
        'You can set your language and time zone here too.',
      ],
    },
    {
      title: 'Your addresses',
      items: [
        'The address you sign in with and your ELUM Type address always stay on your account.',
        'You can add more addresses. ELUM sends a code to each new one, and you type it in to show the address is yours.',
        'You can only remove addresses you added yourself.',
      ],
    },
    {
      title: 'People and privacy',
      items: [
        'Sort the people you know into Family, Friends and Work, and block anyone you’d rather not hear from.',
        'Under Privacy, decide who can see your picture, find you by name and message you: everyone, only people you know, or no one.',
        'People you block can’t find you, see your picture or message you.',
      ],
    },
    {
      title: 'Security',
      items: [
        'You can change your password here. To keep you safe, ELUM may ask you to sign in again first.',
        'Turn on approvals and a new device has to wait until you pick its number on a device you’re already signed in to.',
        'You can see every device you’re signed in on and sign out any you don’t recognise. Recent activity shows what changed and when.',
      ],
    },
    {
      title: 'Preferences, notifications and your apps',
      items: [
        'In Preferences, choose 12 or 24 hour time, the first day of your week, the app you start in, and how much motion you like.',
        'In Notifications, choose what reaches you inside the apps and outside them, for each kind of event.',
        'On your home screen, the ring around your picture lights up in the colour of each ELUM app in your account: Write, Type, Make, Browse and Store.',
        'You can delete your account at any time from the Delete page, and every ELUM app tidies up after it.',
      ],
    },
  ],
};

export const TROUBLES: Record<ProductId, Trouble[]> = {
  write: [
    {
      problem: 'My changes disappeared, or the document jumped',
      says: 'This document changed somewhere else.',
      why: 'Someone edited the same document in another tab, on another device, or someone you shared it with made changes, so Write loaded the newest version.',
      fix: ['Read through the document again. What you see now is the newest version.', 'Try to keep each document open in just one tab on each device.', 'If something you wrote is missing, use Undo in the tab where you wrote it.'],
    },
    {
      problem: 'I can’t open a document',
      says: 'This document does not exist or was deleted.',
      why: 'The owner deleted it or took away your access, or the link isn’t quite right.',
      fix: ['Ask the owner to share it with you again.', 'Make sure you’re signed in with the address it was shared with.'],
    },
    {
      problem: 'The person I shared with can’t see the document',
      says: 'No account yet. They get access once they sign up and confirm this address.',
      why: 'That address doesn’t have an ELUM account yet, so Write is holding an invite for it.',
      fix: ['Ask them to sign up with exactly that address and confirm it.', 'Once they do, the document shows up for them under Shared with me.'],
    },
    {
      problem: 'I can’t add or remove people',
      says: 'Only the owner and editors can add people.',
      why: 'You’re a viewer or a commenter on this document. Only the owner and editors can choose who has access.',
      fix: ['Ask the owner to share it for you, or to make you an editor.'],
    },
    {
      problem: 'I can’t delete a document',
      says: 'Only the owner can delete this document.',
      why: 'Deleting a document removes it for everyone, so only its owner can do it.',
      fix: ['Ask the owner to delete it, or to remove you from it.'],
    },
    {
      problem: 'Nothing happens when I choose Comment',
      says: 'Select the text you want to comment on first.',
      why: 'A comment is attached to a specific part of the text.',
      fix: ['Select a word or a passage first, then choose Comment.', 'Keep your comment under 4,000 characters.'],
    },
    {
      problem: 'My picture won’t upload',
      says: 'Choose an image file: PNG, JPEG, GIF, WebP, AVIF, SVG or BMP.',
      why: 'The file isn’t one of the picture types Write accepts, or the upload didn’t finish.',
      fix: ['Save the picture as a PNG or JPEG and try again.', 'If you see “That image could not be uploaded.”, check your connection and try again.'],
    },
    {
      problem: 'Downloading a PDF opens a print window',
      why: 'Write makes PDFs with your browser’s print window, so the PDF looks exactly like your page.',
      fix: ['In the print window, choose “Save as PDF” as the destination.', 'If you see “The print copy did not load.”, allow pop-ups for Write and try again.'],
    },
    {
      problem: 'Spelling isn’t underlining anything',
      says: 'The dictionary is not loaded.',
      why: 'Write downloads its dictionary the first time you start typing, and that download didn’t finish.',
      fix: ['Check your internet connection, then reload the page.'],
    },
  ],
  type: [
    {
      problem: 'I can’t email someone outside ELUM',
      says: 'Get an ELUM address to email people outside ELUM.',
      why: 'Email to the rest of the internet is sent from an ELUM Type address. If you signed up with your own email, you can only message people on ELUM.',
      fix: ['Create an account with an ELUM Type address, or email that person from your usual email service.'],
    },
    {
      problem: 'Type can’t find the person I’m writing to',
      says: 'Check the spelling, or write to their email address.',
      why: 'No ELUM account matches that name, or that person has chosen not to be found (ELUM Account, Privacy).',
      fix: ['Type their full email address or ELUM address instead of their name.'],
    },
    {
      problem: 'My message didn’t reach someone',
      why: 'They might only accept messages from people they know, or they might have blocked you. Email sent outside ELUM can also end up in their spam folder.',
      fix: ['Ask them to add you under People in their ELUM Account.', 'If you emailed them outside ELUM, ask them to check their spam folder.'],
    },
    {
      problem: 'I can’t attach a file',
      says: 'Save the message first, then attach files.',
      why: 'Attachments are added to a saved draft.',
      fix: ['Save your message as a draft, then attach the file.', 'Keep attachments under 25 MB in total. If you see “Attachments can add up to 25 MB.”, the message is over the limit.'],
    },
    {
      problem: 'My email has said “Sending” for a while',
      says: 'Sending. Outside email goes out in a moment.',
      why: 'Email to addresses outside ELUM is sent in the background, usually within a minute.',
      fix: ['You don’t need to do anything; it will send on its own. If it’s still waiting after a few minutes, reload Type.'],
    },
    {
      problem: 'A message I was expecting is missing',
      why: 'It might have landed in Spam, or been archived or deleted.',
      fix: ['Check Spam first, then Archived, then Trash.', 'If it’s in Spam, choose Not spam to move it back to your inbox.'],
    },
    {
      problem: 'My draft changed on its own',
      says: 'This draft changed on another device.',
      why: 'You were editing the same draft somewhere else too, and Type loaded the newest version.',
      fix: ['Finish your draft on one device at a time.'],
    },
    {
      problem: 'Type is asking me to wait',
      says: 'Too many requests. Wait a little and try again.',
      why: 'Type limits how quickly messages can be sent, to help keep spam out.',
      fix: ['Wait about a minute, then try sending again.'],
    },
  ],
  make: [
    {
      problem: 'I can’t edit the text',
      why: 'You edit text by double-clicking it. If it still won’t change, it may be locked.',
      fix: ['Double-click the text.', 'If that doesn’t work, open Layers and unlock it.'],
    },
    {
      problem: 'My picture won’t add',
      says: 'Pictures can be up to 15 MB.',
      why: 'The picture is too big, or Make couldn’t read it.',
      fix: ['Make the picture smaller, or save it as a PNG or JPEG.', 'If you see “That picture could not be uploaded.”, the upload stopped. Check your connection and try again.'],
    },
    {
      problem: 'My download didn’t work',
      says: 'That export did not work. Try again, or try a smaller design.',
      why: 'Very large pages, or lots of large pictures, need more memory than your browser allowed.',
      fix: ['Try again.', 'Download one page at a time as a PNG, or use a smaller page size.'],
    },
    {
      problem: 'Present doesn’t fill my screen',
      why: 'Your browser asks before letting a page go full screen, and some browsers don’t allow it inside another site.',
      fix: ['Allow full screen when your browser asks.', 'If Make is open in a Browse tab, choose Open in new window first, then Present.', 'Press Esc whenever you want to stop presenting.'],
    },
    {
      problem: 'The design changed while I was looking at it',
      says: 'Someone else changed this design. Your view was updated.',
      why: 'Someone you shared it with is working on it at the same time.',
      fix: ['Just carry on. You’re looking at the latest version.'],
    },
    {
      problem: 'I can’t open a design',
      says: 'This design does not exist, or it has not been shared with you.',
      why: 'The owner deleted it or took away your access, or the link isn’t quite right.',
      fix: ['Ask the owner to share it with you again.'],
    },
    {
      problem: 'Deleting a design only takes it off my list',
      says: 'Remove it from your designs?',
      why: 'Someone else owns this design. Only the owner can delete it for everyone.',
      fix: ['It’s fine to remove it. The owner still has it.'],
    },
    {
      problem: 'A template from Store opened Make’s home page instead',
      says: 'That template is not in Make. Pick one below.',
      why: 'The link asked for a template Make doesn’t have, or that click had already made its design.',
      fix: ['Pick the template from Make’s home page.', 'If you clicked before, the design you made is at the top of your designs.'],
    },
    {
      problem: 'My saved colours are gone',
      why: 'Your colours are remembered by this browser, on this device only.',
      fix: ['Type the colour’s code (like #ec7fa9) to use it again, and it goes back into Your colours.'],
    },
  ],
  browse: [
    {
      problem: 'Google didn’t find anything',
      says: 'Browse searches through your ELUM search engine, which may only cover some sites.',
      why: 'Browse’s Google search may be set up to cover a list of sites, and your search didn’t match any of them. Sometimes Google turns a search away, too.',
      fix: ['Try different words.', 'Choose See this search on Google. It opens Google’s web-only results, with no AI Overview.'],
    },
    {
      problem: 'Search results never show up',
      why: 'Google’s results load from cse.google.com, and ad blockers and tracker blockers often block it.',
      fix: ['Allow cse.google.com in your blocker, or pause the blocker on Browse, then search again.', 'If Google doesn’t answer within 10 seconds, Browse tells you and offers to run the search on Google instead.'],
    },
    {
      problem: 'A page opened as a reading view',
      why: 'That site doesn’t let other sites show it, so Browse shows you the article itself instead.',
      fix: ['Read it right there, or choose Open the original in a new window.'],
    },
    {
      problem: 'A page can’t be shown',
      says: 'This page cannot be shown here',
      why: 'The site won’t let Browse show it and isn’t an article Browse can read out, or it wants you to sign in or prove you’re a person.',
      fix: ['Choose Open in new window.'],
    },
    {
      problem: 'A page didn’t open',
      says: 'That page did not answer. Try again, or open it in a new window.',
      why: 'The site was slow or down.',
      fix: ['Reload the tab.', 'Or choose Open in new window.', 'If you see “That is a lot of pages.”, wait a little before opening more.'],
    },
    {
      problem: 'An address won’t open',
      says: 'Browse can only open public web addresses.',
      why: 'For your safety, Browse doesn’t open addresses on private networks, bare IP addresses, unusual ports, or addresses with a password in them.',
      fix: ['Open that address in your own browser instead.'],
    },
    {
      problem: 'I typed an app’s name and got a web search',
      why: 'Anything with a space, like “make bread”, is treated as a search. A single word, like “make”, opens the app.',
      fix: ['Type just the app’s name, or its elum.services address.'],
    },
    {
      problem: 'An app in a tab is asking for a site password',
      why: 'While ELUM is being tested, its sites may be protected by a site password. That’s separate from your ELUM account.',
      fix: ['Choose Open in new window and enter the site password there, then reload the tab.'],
    },
    {
      problem: 'An app in a tab isn’t signed in',
      why: 'Apps in tabs are signed in when you are signed in to Browse itself.',
      fix: ['Sign in to Browse using the button at the top, then reload the tab.', 'Or choose Open in new window, which opens the app signed in.'],
    },
    {
      problem: 'My tabs disappeared',
      why: 'Your tabs and groups are saved in this browser. A private window, clearing your browsing data or switching browsers starts fresh.',
      fix: ['Open Browse in the same browser, in a normal (not private) window.'],
    },
  ],
  store: [
    {
      problem: 'An app says Coming soon',
      why: 'That app isn’t open to everyone yet.',
      fix: ['Check back soon. When it opens, you’ll see it in What’s new.'],
    },
    {
      problem: 'Get keeps asking me to sign in',
      why: 'Getting an app needs your ELUM account. Signing in happens through ELUM Account, and Store only tries that once a minute so you never get stuck in a loop.',
      fix: ['Sign in, and Store will finish getting the app.', 'If it doesn’t, wait a minute and choose Get again.', 'Make sure your browser allows cookies for the ELUM sites.'],
    },
    {
      problem: 'Open took me to the app’s sign-in page',
      why: 'Store passes your sign-in to the app through ELUM Account. If that hand-over doesn’t work, the app opens signed out.',
      fix: ['Sign in to the app with the same ELUM account.'],
    },
    {
      problem: 'An app I got isn’t in Your apps or the ring',
      why: 'The page was opened before the app was added.',
      fix: ['Reload Store or ELUM Account.'],
    },
    {
      problem: 'Your apps won’t load',
      says: 'We couldn’t load your apps',
      why: 'Your connection dropped while Store was checking.',
      fix: ['Choose Try again.'],
    },
    {
      problem: 'Use in Make didn’t make a new design',
      why: 'Make creates one design per click. Going back to the same link doesn’t make another one.',
      fix: ['Choose Use in Make again in Store.', 'Or pick the template from Make’s home page.'],
    },
  ],
  account: [
    {
      problem: 'My code doesn’t work',
      says: 'That code does not match. Check it and try again.',
      why: 'The code was mistyped, or a newer code has been sent since.',
      fix: ['Use the most recent code in that inbox.', 'If you see “That code has expired. Ask for a new one.”, ask for a new code.'],
    },
    {
      problem: 'I can’t add an address',
      says: 'That address belongs to another account.',
      why: 'Each address can only belong to one ELUM account.',
      fix: ['Sign in to the other account and remove the address there first, or use a different address.'],
    },
    {
      problem: 'I can’t remove an address',
      says: 'Only added addresses can be removed. Your sign-in and Type addresses stay.',
      why: 'You sign in with those addresses, so they always stay on your account.',
      fix: ['You can remove any other address you added.'],
    },
    {
      problem: 'I can’t change my password',
      says: 'For your safety, sign in again before changing your password.',
      why: 'You can only change your password soon after signing in.',
      fix: ['Sign out, sign back in, and change your password straight away.'],
    },
    {
      problem: 'I picked the wrong number when approving a sign-in',
      says: 'That was not the number, so we stopped that sign-in.',
      why: 'Picking the wrong number stops the sign-in, just in case it wasn’t you.',
      fix: ['Sign in again on the new device and pick the number it shows.', 'Each request lasts ten minutes. After that you’ll see “The request lasts ten minutes. Sign in again to send a new one.”'],
    },
    {
      problem: 'Approvals are on and I’m not signed in anywhere else',
      why: 'Approving a sign-in needs a device you’re already signed in to, and ELUM doesn’t have a Forgot password option yet.',
      fix: ['While approvals are on, keep at least one device signed in.', 'Before you sign out everywhere, turn approvals off under Security.'],
    },
    {
      problem: 'My picture won’t upload',
      says: 'Pictures can be up to 2 MB.',
      why: 'The picture is too big, or it isn’t a type ELUM accepts.',
      fix: ['Choose a PNG, JPEG, WebP, GIF or AVIF file under 2 MB.', 'If you see “This browser cannot resize pictures.”, your browser is out of date. Update it or try another one.'],
    },
    {
      problem: 'Someone can’t find me or message me',
      why: 'Your Privacy settings decide who can find you and message you.',
      fix: ['Under Privacy, choose Everyone, or add them under People and choose People you know.', 'Make sure they aren’t in your Blocked list.'],
    },
    {
      problem: 'An app says “That ELUM app is not open yet.”',
      why: 'That app isn’t open to everyone yet.',
      fix: ['Check ELUM Store to see which apps are open.'],
    },
  ],
};

/** Problems that can happen in any ELUM app. */
export const COMMON_TROUBLES: Trouble[] = [
  {
    problem: 'I’m signed in to one ELUM app but not another',
    why: 'Each ELUM app is its own website. When you move between them, ELUM Account passes your sign-in along, and that hand-over didn’t happen this time.',
    fix: [
      'Open the other app from the apps window (the dots at the top of every app). It opens signed in.',
      'Or choose Sign in. If you’re already signed in to ELUM Account, you come straight back signed in, without typing anything.',
      'If it asks you to sign in, use the same ELUM account. If you keep going round in circles, wait a minute and try again.',
    ],
  },
  {
    problem: 'My confirmation email never arrived',
    says: 'Confirm your email first. We sent you a link when you signed up.',
    why: 'The email might be in your spam folder, or it might still be on its way.',
    fix: ['Check your spam folder.', 'Choose Send the link again. If you see “A link was sent a moment ago. Wait a minute and try again.”, wait a minute first.'],
  },
  {
    problem: 'A sign-in or confirmation link doesn’t work',
    says: 'That sign-in link has expired or was already used. Sign in again.',
    why: 'Each link only works once, and only for a limited time.',
    fix: ['Sign in with your password, or send yourself a new link.'],
  },
  {
    problem: 'An ELUM app says my session has ended',
    says: 'Your session has ended. Sign in again.',
    why: 'You signed out on another device, signed out everywhere, or your session ran out.',
    fix: ['Sign in again. Don’t worry, your work is saved to your account.'],
  },
  {
    problem: 'A new sign-in is waiting for approval',
    says: 'Approve this sign-in on a device you are already signed in to.',
    why: 'You’ve turned on approvals (ELUM Account, Security).',
    fix: ['Open any ELUM app on a device you’re already signed in to. When it asks “Is this you signing in?”, pick the number the new device shows.', 'If it isn’t you signing in, choose “No, it’s not me”.'],
  },
  {
    problem: 'An app says it has been updated',
    says: 'Reload the page to carry on. Your saved work is safe.',
    why: 'A new version of the app came out while you had it open.',
    fix: ['Reload the page.'],
  },
  {
    problem: 'Something went wrong',
    says: 'Something went wrong. Please try again.',
    why: 'One of ELUM’s services didn’t respond the way it should have.',
    fix: ['Try again, and if that doesn’t help, reload the page.', 'Check the Status page in Browse to see if something is down.'],
  },
  {
    problem: 'An ELUM site asks for a password before it loads',
    why: 'While ELUM is being tested, its sites may be protected by a site password. That’s separate from your ELUM account.',
    fix: ['Enter the site password you were given, then sign in with your ELUM account as usual.'],
  },
  {
    problem: 'The app is too dark, too light, or moves too much',
    why: 'ELUM follows your device’s light or dark setting until you choose otherwise.',
    fix: ['Use the sun and moon button at the top of any app to switch.', 'To reduce motion, use Preferences in ELUM Account, or your device’s reduce motion setting.'],
  },
  {
    problem: 'Which browsers does ELUM work in?',
    why: 'ELUM is built for up-to-date browsers.',
    fix: ['Use a recent version of Chrome, Edge, Firefox or Safari, on a computer, iPhone, iPad or Android.', 'Keep your browser up to date.'],
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
