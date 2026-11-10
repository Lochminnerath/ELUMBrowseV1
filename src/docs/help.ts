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
        'Choose New document to start a blank page. It is saved to your ELUM account straight away.',
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
        'Spelling underlines words it does not recognise as you type.',
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
        'Choose Share and add people by their ELUM address or email. They will get a notification in every ELUM app.',
        'If someone does not have an ELUM account yet, Write sends them an invite. They get access as soon as they sign up and confirm that address.',
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
      title: 'ELUM Support in Type',
      items: [
        'Messages from ELUM Support carry the verified ELUM badge, and show at the top of your inbox while a conversation is open.',
        'To ask for help, open Support from the rail or the account menu, give it a title and write your message. There is no form to fill in.',
        'Under the box it says You are messaging an official representative from ELUM, so you always know who you are talking to.',
        'Replies arrive in the same conversation, the way any message does.',
      ],
    },
    {
      title: 'Where a message came from',
      items: [
        'A small symbol on each message shows how it arrived: two circles for ELUM, a globe for email from outside ELUM.',
        'People’s pictures travel with their messages. Someone who keeps their picture private shows a colour instead.',
        'Sign-in codes sent to your Type address show as a code you can copy with one click.',
        'Spam is caught before it reaches your inbox. Not spam brings a message back if it was caught by mistake.',
      ],
    },
    {
      title: 'Your ELUM Type address',
      items: [
        'When you sign up, choose Get an ELUM Type address and pick a name. Your address becomes name@elum.space.',
        'A name has to start and end with a letter or number, and cannot have two symbols in a row.',
        'Add a recovery email when you sign up, so you can still be reached if you lose access.',
        'You can sign in with your whole address or with just the name.',
        'If you signed up with your own email, you can message people on ELUM. To email people outside ELUM, you will need an ELUM Type address.',
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
        'Report spam to move a conversation to Spam, where it will not notify you. Not spam brings it back.',
        'Deleted conversations wait in Trash, and Undo appears right after you act, in case you change your mind.',
      ],
    },
    {
      title: 'Contacts, signature and away reply',
      items: [
        'Contacts collects everyone you write to. Messages from ELUM accounts show the verified symbol.',
        'In Settings you can set your signature and the address you send from, and turn on Away reply to answer new messages for you while you are away.',
        'Who’s allowed to message you at all is set in ELUM Account, under Privacy.',
      ],
    },
  ],
  make: [
    {
      title: 'Starting a design',
      items: [
        'Pick a size: a presentation, a post, a story, a banner, a poster, a flyer, a certificate, a business card, a logo, a website or a phone screen.',
        'Or start from one of thirty templates, from a pitch deck or a sale post to an app screen, a website landing page or a business card.',
        'In ELUM Store, Use in Make opens a template straight in Make.',
        'Your designs save as you work, to your ELUM account, so they are on every device you sign in to.',
      ],
    },
    {
      title: 'Text, shapes and pictures',
      items: [
        'Use the toolbar to add text, one of twelve shapes, a line, an arrow or a picture.',
        'To edit text, double-click it. Click somewhere else or press Esc when you are done.',
        'Text can have an outline, a highlight behind each line, or be set in capitals, from the Text part of the panel.',
        'A shape can change into another shape from its panel, keeping its colours and place.',
        'Pictures can be up to 15 MB. Hold Shift while you draw a line or arrow to keep it straight or at 45°.',
      ],
    },
    {
      title: 'The pen and the brush',
      items: [
        'Press P, or choose Pen, and click to place points. Click the first point again to close the shape, or press Enter to leave it open.',
        'Hold Shift with the pen to keep each line straight or at 45°.',
        'Press B, or choose Brush, and drag to draw freehand. Each stroke becomes its own drawing.',
        'The bar at the bottom sets the line colour, its width and the fill a closed shape gets.',
        'Double-click any drawing to move its points. Smooth curves and Closed shape are in its panel.',
      ],
    },
    {
      title: 'Colours, gradients and effects',
      items: [
        'Choose a colour from the ELUM swatches or the colour wheel, type its code, or pick it from the screen with the eyedropper.',
        'Shapes and closed drawings can have a gradient: two colours and an angle.',
        'Effects give anything a shadow, a blur, a flip, or one of ten blend modes such as multiply and screen.',
        'Your colours remembers the last eight colours you used on this device.',
      ],
    },
    {
      title: 'Pictures',
      items: [
        'Pick one of eight filters, or use the sliders for brightness, contrast, saturation, black and white, warmth and hue.',
        'Show a picture inside a circle, a heart, a hexagon, a star and more, from Shape in its panel.',
        'Fill frame fills the shape; Fit whole picture shows all of it.',
      ],
    },
    {
      title: 'Pages, layers and the grid',
      items: [
        'Use the pages strip to add, duplicate, reorder and delete pages. Each page has room for speaker notes.',
        'Layers lists everything on the page, with the top item first. Drag items to change their order.',
        'Turn on the grid from the bottom bar, or with Ctrl and the apostrophe key, and things snap to it as you move them.',
        'Changing the page size can resize everything to fit, so a slide becomes a post in one step.',
        'Lock anything you do not want to move by accident. Undo and Redo work for every change.',
      ],
    },
    {
      title: 'Presenting, sharing and downloading',
      items: [
        'Present fills your screen until you press Esc. Use the arrow keys, the space bar or a click to move through your pages.',
        'Give an element a link under When presenting, and clicking it opens a web page or goes to another page.',
        'Share adds anyone with an ELUM account. They get a notification, and the design shows up in their Make.',
        'Download a single page as a PNG, or the whole design as a PDF. Effects come with it.',
        'Deleting a design you own deletes it, and its pictures, for everyone. If someone shared a design with you, deleting it just removes it from your list.',
      ],
    },
  ],
  browse: [
    {
      title: 'Searching',
      items: [
        'Type what you are looking for and press Enter. You can press / anywhere to jump to the search box.',
        'Switch between All and Images. SafeSearch stays on unless you turn it off in Settings.',
        'Your recent searches are kept on this device only. You can clear one, or all of them, whenever you like.',
        'Results come from Google, without AI Overviews or Gemini, and results that lead to AI chat products are left out.',
      ],
    },
    {
      title: 'Opening pages in Browse',
      items: [
        'When you click a result or type an address like wikipedia.org, the page opens in a Browse tab.',
        'Most sites show up just as they are. If a site does not allow other sites to show it, Browse shows you a clean reading view of the article instead.',
        'Links in the reading view open in the same tab, and Open in new window always takes you to the original.',
        'Google’s own pages and ads always open in a new window.',
      ],
    },
    {
      title: 'Your ELUM apps in Browse',
      items: [
        'Type write, type, make, store or account, or an address like make.elum.space, and that app opens in a Browse tab.',
        'The address bar shows the app’s elum.space address.',
        'If you are signed in to Browse, apps open in their tabs already signed in.',
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
      title: 'Settings',
      items: [
        'Open Settings from the sliders symbol at the top of Browse, or from the link at the bottom of the home page.',
        'Search: SafeSearch, pictures beside results, and whether / jumps to the search box.',
        'Pages and apps: open results in a Browse tab or a new window, and show the address bar over pages or tuck it away.',
        'Privacy: remember searches on this device, and clear them.',
        'Look: the theme, a background for the home page (live ones like Aurora drift slowly in every ELUM colour, or use a picture of your own), your accent colour, the colour of the tab strip, and less motion.',
        'Settings are kept on this device only. Nothing you choose there is sent to ELUM.',
      ],
    },
    {
      title: 'Hiding the address bar',
      items: [
        'Over a web page or an ELUM app, the arrow at the end of the address bar hides it.',
        'A small button with the page’s name stays in the top corner. Click it to bring the bar back.',
        'Browse remembers your choice, and you can change it in Settings too.',
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
        'The home page shows the latest from ELUM, a row of every app around Store, templates for Make and Write, and the apps you have.',
        'Every app has its own page that explains what it does, what’s new, whether it is in beta and whether it is working right now.',
        'Search finds apps and templates by any word, like slides, mail or poster. Press / to jump to the search box.',
      ],
    },
    {
      title: 'Getting and opening apps',
      items: [
        'Choose Get to add an app to your ELUM account. Every ELUM app is free.',
        'If you are not signed in, Get asks you to sign in first and then finishes adding the app.',
        'Open takes you straight to the app, already signed in. The arrow next to it opens the app in a Browse tab or a window of its own.',
        'ELUM Account comes with every account, so it shows as Included.',
        'Every app you get lights up in its colour in the ring around your picture in ELUM Account.',
      ],
    },
    {
      title: 'Templates and your apps',
      items: [
        'Use in Make or Use in Write opens the app with that template ready to edit. Each click makes one new design or document.',
        'The Templates page lists all of them, with filters for presentations, posters, social posts, logos and screens, and documents. The home page shows five, then See every template.',
        'Your apps lists the apps in your account and when you last used each one.',
      ],
    },
  ],
  account: [
    {
      title: 'Your profile',
      items: [
        'Your name, picture and colour show up in every ELUM app.',
        'Your picture can be a PNG, JPEG, WebP, GIF or AVIF file up to 2 MB. If you do not add one, people see your initials on your colour.',
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
        'Sort the people you know into Family, Friends and Work, and block anyone you would rather not hear from.',
        'Under Privacy, decide who can see your picture, find you by name and message you: everyone, only people you know, or no one.',
        'People you block cannot find you, see your picture or message you.',
      ],
    },
    {
      title: 'Security',
      items: [
        'You can change your password here. To keep you safe, ELUM may ask you to sign in again first.',
        'Turn on approvals and a new device has to wait until you pick its number on a device you are already signed in to.',
        'You can see every device you are signed in on and sign out any you do not recognise. Recent activity shows what changed and when.',
      ],
    },
    {
      title: 'Passkeys',
      items: [
        'A passkey lets you sign in with Face ID, Touch ID or your device PIN instead of a password. Nobody can trick you into giving it away.',
        'Make one in Security: choose Create a passkey, then follow your device’s prompt. You will see “Passkey saved. Next time, sign in with a glance or a touch.”',
        'After you sign in without a passkey, ELUM offers one with “Sign in faster with a passkey”. Choose Create a passkey, or Not now. It asks again the next time you sign in, until you have one.',
        'To sign in, choose Sign in with a passkey. On many browsers your passkey also appears in the address field’s suggestions.',
        'A passkey is saved in your iCloud Keychain, Google Password Manager or another password manager, so your other devices can use it too.',
        'Rename a passkey so you can tell them apart, for example “Work laptop”. Remove one you do not use any more.',
        'Passkeys work on the ELUM Account site only: account.elum.space, and accountsbyelum.netlify.app. A passkey belongs to the address it was made on.',
        'Keep your password too. If you lose every device, your password is how you get back in to make a new passkey.',
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
  inquire: [
    {
      title: 'Designing a form',
      items: [
        'Choose New form, give it a name, and add your first question. The name is what people see at the top of the form.',
        'Add as many questions as you need and drag them into the order you want. Each one can be a short answer, a longer answer or a choice.',
        'Mark a question as required if people should not be able to send the form without answering it.',
        'Add a short note under a question when it needs explaining.',
        'Your form saves as you work, to your ELUM account, so you can carry on from any device you sign in to.',
      ],
    },
    {
      title: 'Sharing the link',
      items: [
        'Every form has its own link. Choose Share, then Copy link, and send it by message, email or anywhere else.',
        'Anyone with the link can fill the form in. They do not need an ELUM account, and signing in is optional.',
        'Try the link in a private window first, to see exactly what other people will see.',
        'If you change a question after sharing, people who open the link afterwards see the new version.',
      ],
    },
    {
      title: 'Reading responses',
      items: [
        'Open a form and choose Responses to see the answers that have come in, newest first.',
        'Open one response to read it in full, with each answer under its question.',
        'Only you, and anyone you gave edit access to, can read the responses. People who fill the form in cannot see each other’s answers.',
        'Responses stay with the form after you close it.',
      ],
    },
    {
      title: 'Conditional questions',
      items: [
        'A conditional question appears only when someone gives a certain answer to an earlier question.',
        'Choose the question you want to hide, then pick the question and the answer that should make it appear.',
        'A conditional question can only follow the question it depends on, so put the earlier question first.',
        'A hidden question is never required. If it does not appear, people can send the form without it.',
      ],
    },
    {
      title: 'Closing a form',
      items: [
        'Choose Close form when you have all the answers you need. Anyone who opens the link afterwards is told the form is closed.',
        'Closing keeps every response you already have.',
        'Open the form again from your list whenever you want to take answers again.',
        'Delete a form only when you are sure. Deleting it removes its responses too.',
      ],
    },
  ],
  tune: [
    {
      title: 'Getting Tune',
      items: [
        'Open ELUM Store, find Tune and choose Get. It is free for ELUM Account users.',
        'Open Tune from the ELUM app list, the grid of dots at the top of any ELUM app, or type tune in Browse.',
        'Everything you make in Tune is kept in your ELUM account, on every device you sign in to.',
      ],
    },
    {
      title: 'Getting and playing music',
      items: [
        'Get Tune from ELUM Store. It is rolling out to people in the U.S. and Canada.',
        'Browse the home shelves and genres, or search for a song, an artist or an album.',
        'Now playing opens big, in the colours of the album art. Open the lyrics and each line lights up as it is sung.',
        'Every song plays at the same loudness. Turn on crossfade in settings for smooth changes between songs.',
      ],
    },
    {
      title: 'Your library and playlists',
      items: [
        'Save songs and albums to your library, and gather them into playlists.',
        'Your library is in your ELUM account, so it is on every device you sign in to.',
        'Start a song on your phone and pick it up on your computer, right where you stopped.',
      ],
    },
  ],
  code: [
    {
      title: 'Getting Code',
      items: [
        'Open ELUM Store, find Code and choose Get. It is free for ELUM Account users.',
        'Open Code from the ELUM app list, the grid of dots at the top of any ELUM app, or type code in Browse.',
        'Everything you make in Code is kept in your ELUM account, on every device you sign in to.',
      ],
    },
    {
      title: 'Projects and files',
      items: [
        'Get Code from ELUM Store, then start a project and choose its language.',
        'Add files and folders, and upload your own files to use in the project.',
        'Projects save as you type, to your ELUM account.',
      ],
    },
    {
      title: 'Running your code',
      items: [
        'Press Run and the output shows beside your code. Web pages show in a live preview.',
        'Code keeps the versions of your project, so you can look back and put one back.',
        'No AI writes or finishes code for you.',
      ],
    },
  ],
  capture: [
    {
      title: 'Getting Capture',
      items: [
        'Open ELUM Store, find Capture and choose Get. It is free for ELUM Account users.',
        'Open Capture from the ELUM app list, the grid of dots at the top of any ELUM app, or type capture in Browse.',
        'Everything you make in Capture is kept in your ELUM account, on every device you sign in to.',
      ],
    },
    {
      title: 'Your library',
      items: [
        'Get Capture from ELUM Store, then drop photos and videos onto your library, or choose Upload.',
        'Everything is sorted by the day it was taken. Capture keeps almost any file, not only photos.',
      ],
    },
    {
      title: 'Editing, albums and sharing',
      items: [
        'Crop, straighten and adjust a photo. Your changes sit on top, and the original is always there to go back to.',
        'Gather photos into albums, and add to them any time.',
        'Share an album with people on ELUM, or make a link for anyone you choose.',
      ],
    },
  ],
  home: [
    {
      title: 'The ELUM home',
      items: [
        'The ELUM home is at elum.space. It is the public front door to ELUM, so you can read it without signing in.',
        'Products shows every ELUM app with a short description and a link to open it.',
        'Your ELUM Account is the home base. You sign in there, and the apps open already signed in.',
        'Searching for elum.space in Browse opens the ELUM home in a Browse tab.',
      ],
    },
    {
      title: 'Contacting support',
      items: [
        'Choose Contact support on the ELUM home, in the header of Docs, or on any screen where something went wrong.',
        'It opens the support form in a Browse tab called Support, at inquire.elum.space/f/support.',
        'The form is already filled in with the app you were using, any error code, the page you were on and what the screen said. Add what you were trying to do, then send it.',
        'You do not need to be signed in to send it, so you can still reach us if signing in is the problem.',
        'Your message is saved as a request for the ELUM team. There is no ticket number yet, so keep a note of when you sent it.',
      ],
    },
    {
      title: 'Before you write to us',
      items: [
        'Troubleshooting has answers for every app. Search for the words you saw on screen.',
        'Every answer says what you will see, why it happens and how to fix it.',
        'At the bottom of each Troubleshooting page, “Still stuck? Tell us what happened” opens the support form for that app.',
        'The Status page shows whether any ELUM app is having a problem right now.',
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
      problem: 'I cannot open a document',
      says: 'This document does not exist or was deleted.',
      why: 'The owner deleted it or took away your access, or the link is not quite right.',
      fix: ['Ask the owner to share it with you again.', 'Make sure you are signed in with the address it was shared with.'],
    },
    {
      problem: 'The person I shared with cannot see the document',
      says: 'No account yet. They get access once they sign up and confirm this address.',
      why: 'That address does not have an ELUM account yet, so Write is holding an invite for it.',
      fix: ['Ask them to sign up with exactly that address and confirm it.', 'Once they do, the document shows up for them under Shared with me.'],
    },
    {
      problem: 'I cannot add or remove people',
      says: 'Only the owner and editors can add people.',
      why: 'You are a viewer or a commenter on this document. Only the owner and editors can choose who has access.',
      fix: ['Ask the owner to share it for you, or to make you an editor.'],
    },
    {
      problem: 'I cannot delete a document',
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
      problem: 'My picture will not upload',
      says: 'Choose an image file: PNG, JPEG, GIF, WebP, AVIF, SVG or BMP.',
      why: 'The file is not one of the picture types Write accepts, or the upload did not finish.',
      fix: ['Save the picture as a PNG or JPEG and try again.', 'If you see “That image could not be uploaded.”, check your connection and try again.'],
    },
    {
      problem: 'Downloading a PDF opens a print window',
      why: 'Write makes PDFs with your browser’s print window, so the PDF looks exactly like your page.',
      fix: ['In the print window, choose “Save as PDF” as the destination.', 'If you see “The print copy did not load.”, allow pop-ups for Write and try again.'],
    },
    {
      problem: 'Spelling is not underlining anything',
      says: 'The dictionary is not loaded.',
      why: 'Write downloads its dictionary the first time you start typing, and that download did not finish.',
      fix: ['Check your internet connection, then reload the page.'],
    },
    {
      problem: 'My document says it is saved only in this browser',
      says: 'Saved in this browser only',
      why: 'Write could not reach your ELUM account for a moment, so it kept your latest changes on this device to keep them safe.',
      fix: ['Check you are online, then keep the document open for a few seconds. Write sends the changes to your account as soon as it can.', 'Do not clear your browser’s data until the message goes away, or those changes could be lost.'],
    },
    {
      problem: 'Two of us edited at once and the text looks muddled',
      why: 'When two people change the same sentence at the same moment, Write keeps both changes, so words can end up side by side.',
      fix: ['Read the paragraph through and tidy it up together.', 'For big rewrites, agree who is editing which part, or make a copy and merge later.'],
    },
    {
      problem: 'The person I invited never got an email',
      why: 'If they do not have an ELUM account, Write sends an invite to the address you typed. It may be in their spam folder, or the address may have a typo.',
      fix: ['Ask them to check their spam folder.', 'Open Share and check the address. If it is wrong, cancel the invite and add the right one.', 'Send them the link with Copy link. Once they sign up with that address, the document opens for them.'],
    },
    {
      problem: 'Someone can read my document but not change it',
      why: 'They were added as a viewer or a commenter. Only editors and the owner can change the text.',
      fix: ['Open Share, find their name and change them to Editor.'],
    },
    {
      problem: 'I can comment but not edit',
      why: 'The owner shared the document with you as a commenter.',
      fix: ['Ask the owner, or an editor, to change you to Editor in Share.', 'Or make a copy of your own from the document’s menu, if you only need the text.'],
    },
    {
      problem: 'A comment I wrote has gone',
      why: 'Comments that are resolved move out of the Open list, and a comment goes away if the text it was on is deleted.',
      fix: ['In the Comments panel, switch to Resolved to see comments that were dealt with.', 'If the text was deleted, use Undo straight away to bring it back with its comment.'],
    },
    {
      problem: 'Formatting changed when I pasted text in',
      why: 'Text copied from another website or app brings its own fonts and colours with it.',
      fix: ['Use Undo, then paste again with Ctrl+Shift+V (Cmd+Shift+V on a Mac) to paste plain text.', 'Or select the text and choose Normal text in the styles menu.'],
    },
    {
      problem: 'The page looks different when I print it',
      why: 'Your printer’s margins or paper size may not match the page size of the document.',
      fix: ['In the print window, check the paper size and set margins to Default.', 'Turn off headers and footers in the print window if your browser adds its own.'],
    },
    {
      problem: 'My citations are not in the right style',
      why: 'Each document has one citation style, and new citations follow whatever style is chosen in the citations panel.',
      fix: ['Open the citations panel and pick the style your teacher or publisher asks for. Every citation in the document updates.'],
    },
    {
      problem: 'Write feels slow in a very long document',
      why: 'Very long documents with lots of large pictures take more work for your browser to show.',
      fix: ['Close other tabs you are not using.', 'Make pictures smaller before you add them.', 'Split a very long piece into a few documents, such as one per chapter.'],
    },
    {
      problem: 'The keyboard covers what I am typing on my phone',
      why: 'On small screens the on-screen keyboard takes up a lot of room.',
      fix: ['Scroll a little and Write keeps the line you are typing in view.', 'Turn your phone sideways for a wider page.'],
    },
    {
      problem: 'I deleted a document by mistake',
      why: 'Deleting a document removes it from your account and from everyone it was shared with.',
      fix: ['If the document is still open in a tab, copy the text out straight away into a new document.', 'Ask anyone it was shared with whether they made a copy or downloaded it.'],
    },
    {
      problem: 'A template opened as a blank page',
      why: 'The template did not finish loading, often because the connection dropped for a moment.',
      fix: ['Go back to your documents, delete the empty one, and choose the template again.'],
    },
    {
      problem: 'Shared with me is empty',
      why: 'Nobody has shared a document with this account yet, or they shared it with a different address.',
      fix: ['Ask the person which address they used.', 'If it is an address you own, add it to your account in ELUM Account, Addresses, and confirm it.'],
    },
    {
      problem: 'Spelling marks a word that is right',
      why: 'The word is not in the dictionary yet, like a name or a word from another language.',
      fix: ['Right-click the word and add it to your dictionary. It is saved to your account, so it works on every device.'],
    },
    {
      problem: 'Download as a web page looks plain',
      why: 'A web page copy keeps your words, headings and pictures, but your browser shows it with simpler styling.',
      fix: ['For a copy that looks exactly the same, download a PDF instead.'],
    },
    {
      problem: 'I cannot find a document I know I made',
      why: 'Search looks at document titles and owners’ names, not at the words inside.',
      fix: ['Search for the title, or for the owner’s name.', 'Switch between All documents, Mine and Shared with me.', 'Make sure you are signed in to the same ELUM account you made it with.'],
    },
  ],
  type: [
    {
      problem: 'I cannot email someone outside ELUM',
      says: 'Get an ELUM address to email people outside ELUM.',
      why: 'Email to the rest of the internet is sent from an ELUM Type address. If you signed up with your own email, you can only message people on ELUM.',
      fix: ['Create an account with an ELUM Type address, or email that person from your usual email service.'],
    },
    {
      problem: 'Type cannot find the person I am writing to',
      says: 'Check the spelling, or write to their email address.',
      why: 'No ELUM account matches that name, or that person has chosen not to be found (ELUM Account, Privacy).',
      fix: ['Type their full email address or ELUM address instead of their name.'],
    },
    {
      problem: 'My message did not reach someone',
      why: 'They might only accept messages from people they know, or they might have blocked you. Email sent outside ELUM can also end up in their spam folder.',
      fix: ['Ask them to add you under People in their ELUM Account.', 'If you emailed them outside ELUM, ask them to check their spam folder.'],
    },
    {
      problem: 'I cannot attach a file',
      says: 'Save the message first, then attach files.',
      why: 'Attachments are added to a saved draft.',
      fix: ['Save your message as a draft, then attach the file.', 'Keep attachments under 25 MB in total. If you see “Attachments can add up to 25 MB.”, the message is over the limit.'],
    },
    {
      problem: 'My email has said “Sending” for a while',
      says: 'Sending. Outside email goes out in a moment.',
      why: 'Email to addresses outside ELUM is sent in the background, usually within a minute.',
      fix: ['You do not need to do anything; it will send on its own. If it is still waiting after a few minutes, reload Type.'],
    },
    {
      problem: 'A message I was expecting is missing',
      why: 'It might have landed in Spam, or been archived or deleted.',
      fix: ['Check Spam first, then Archived, then Trash.', 'If it is in Spam, choose Not spam to move it back to your inbox.'],
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
    {
      problem: 'My address is already taken',
      why: 'Every ELUM Type address belongs to one person, and someone else chose that one first.',
      fix: ['Try adding your surname, a middle initial or a number.', 'You can add more addresses later in ELUM Account, Addresses.'],
    },
    {
      problem: 'I want to change my Type address',
      why: 'Your first address stays with your account, so people who already have it can still reach you.',
      fix: ['Add a new address in ELUM Account, Addresses, and use that one from now on.'],
    },
    {
      problem: 'Emails I send land in people’s spam folders',
      why: 'Some email services are careful with addresses they have not seen before.',
      fix: ['Ask the person to mark your message Not spam, and to add you to their contacts.', 'Keep your first messages simple, with a clear subject and not too many links.'],
    },
    {
      problem: 'Someone outside ELUM says my email never arrived',
      why: 'Their email service may have filtered it, or the address may have a typo.',
      fix: ['Check the address in your sent message.', 'Ask them to look in their spam or junk folder.', 'Send it again a few minutes later.'],
    },
    {
      problem: 'I do not see the verified symbol next to someone',
      why: 'The verified symbol only shows for people writing from an ELUM account. Email from outside ELUM does not have it.',
      fix: ['That is expected for outside email. Be careful with links and attachments from people you do not know.'],
    },
    {
      problem: 'A message went to Spam by mistake',
      why: 'Type thought it looked like spam, or you reported it by accident.',
      fix: ['Open Spam, choose the message, and choose Not spam. It goes back to your inbox.'],
    },
    {
      problem: 'I archived a conversation and cannot find it',
      why: 'Archive takes conversations out of your inbox without deleting them.',
      fix: ['Open Archived to find it.', 'Search finds archived messages too.'],
    },
    {
      problem: 'A muted conversation still has new messages',
      why: 'Muting stops a conversation from notifying you, but new messages still arrive in it.',
      fix: ['Open the conversation whenever you like to catch up.', 'Unmute it from the conversation’s menu to hear about new replies again.'],
    },
    {
      problem: 'Trash emptied itself',
      why: 'Messages in Trash do not stay forever, so your inbox does not fill up.',
      fix: ['If you might need a message later, archive it instead of deleting it.'],
    },
    {
      problem: 'I cannot see pictures in an email',
      why: 'Type can hold back pictures from outside email so senders cannot tell when you open it.',
      fix: ['If you trust the sender, choose to show pictures in that message.'],
    },
    {
      problem: 'My reply went only to one person',
      why: 'Reply answers just the person who wrote the last message.',
      fix: ['Use Reply all to answer everyone in the conversation.'],
    },
    {
      problem: 'Contacts is missing someone',
      why: 'Contacts fills up with the people you write to. Someone who has only written to you may not be there yet.',
      fix: ['Reply to them once and they will be added.', 'Add the people you know in ELUM Account, People.'],
    },
    {
      problem: 'I do not get notified about new messages',
      why: 'Notifications may be off in ELUM Account, in your browser, or for that one conversation.',
      fix: ['Check Notifications in ELUM Account.', 'Make sure your browser lets the Type site show notifications.', 'Check the conversation is not muted.'],
    },
    {
      problem: 'A link to a shared document in Type will not open',
      why: 'The person shared it with a different address, or took you off the document.',
      fix: ['Ask them to share it again with the address you are signed in with.'],
    },
  ],
  make: [
    {
      problem: 'I cannot edit the text',
      why: 'You edit text by double-clicking it. If it still will not change, it may be locked.',
      fix: ['Double-click the text.', 'If that does not work, open Layers and unlock it.'],
    },
    {
      problem: 'My picture will not add',
      says: 'Pictures can be up to 15 MB.',
      why: 'The picture is too big, or Make could not read it.',
      fix: ['Make the picture smaller, or save it as a PNG or JPEG.', 'If you see “That picture could not be uploaded.”, the upload stopped. Check your connection and try again.'],
    },
    {
      problem: 'My download did not work',
      says: 'That export did not work. Try again, or try a smaller design.',
      why: 'Very large pages, or lots of large pictures, need more memory than your browser allowed.',
      fix: ['Try again.', 'Download one page at a time as a PNG, or use a smaller page size.'],
    },
    {
      problem: 'Present does not fill my screen',
      why: 'Your browser asks before letting a page go full screen, and some browsers do not allow it inside another site.',
      fix: ['Allow full screen when your browser asks.', 'If Make is open in a Browse tab, choose Open in new window first, then Present.', 'Press Esc whenever you want to stop presenting.'],
    },
    {
      problem: 'The design changed while I was looking at it',
      says: 'Someone else changed this design. Your view was updated.',
      why: 'Someone you shared it with is working on it at the same time.',
      fix: ['Just carry on. You are looking at the latest version.'],
    },
    {
      problem: 'I cannot open a design',
      says: 'This design does not exist, or it has not been shared with you.',
      why: 'The owner deleted it or took away your access, or the link is not quite right.',
      fix: ['Ask the owner to share it with you again.'],
    },
    {
      problem: 'Deleting a design only takes it off my list',
      says: 'Remove it from your designs?',
      why: 'Someone else owns this design. Only the owner can delete it for everyone.',
      fix: ['It is fine to remove it. The owner still has it.'],
    },
    {
      problem: 'A template from Store opened Make’s home page instead',
      says: 'That template is not in Make. Pick one below.',
      why: 'The link asked for a template Make does not have, or that click had already made its design.',
      fix: ['Pick the template from Make’s home page.', 'If you clicked before, the design you made is at the top of your designs.'],
    },
    {
      problem: 'My saved colours are gone',
      why: 'Your colours are remembered by this browser, on this device only.',
      fix: ['Type the colour’s code (like #ec7fa9) to use it again, and it goes back into Your colours.'],
    },
    {
      problem: 'I cannot find an older version of my design',
      why: 'Version history keeps the design as it was at different times. It is in the History tab, not in Undo.',
      fix: ['Open the History tab on the right and pick a time to look at it.', 'Restore it if it is the one you want. Your current design is kept as a version too, so nothing is lost.'],
    },
    {
      problem: 'Restoring a version undid someone else’s work',
      why: 'Restoring puts the whole design back to how it was, for everyone who shares it.',
      fix: ['Open History again and restore the newer version that has their work.', 'Next time, make a copy of the old version instead and take just the parts you need.'],
    },
    {
      problem: 'I cannot add a comment',
      why: 'You were shared the design as a viewer, or you are not signed in.',
      fix: ['Ask the owner to make you a commenter or an editor.', 'Check you are signed in with the account the design was shared with.'],
    },
    {
      problem: 'A comment is pinned to the wrong place',
      why: 'Comments stay with the thing they are on. If it moved or was deleted, the comment moves with it or ends up on the page.',
      fix: ['Reply in the comment to say what it is about, or resolve it and add a new one in the right place.'],
    },
    {
      problem: 'My brand kit colours or fonts do not show up',
      why: 'A brand kit belongs to your account. Someone you share with sees the design as it is, but not your kit in their own panel.',
      fix: ['Open the Brand tab and check you are signed in to the account that made the kit.', 'Pick the colour from the kit again on anything that did not pick it up.'],
    },
    {
      problem: 'Changing my brand kit did not change my old designs',
      why: 'Designs keep the colours they were made with, so a change to the kit does not surprise you in finished work.',
      fix: ['Open the design, select the parts, and choose the new colours from your kit.'],
    },
    {
      problem: 'A template looks different from its preview',
      why: 'Fonts and pictures load after the design opens, so it can look plain for a second.',
      fix: ['Give it a moment on a slow connection.', 'If pictures stay missing, reload the page. Your copy of the template is already saved.'],
    },
    {
      problem: 'I cannot find a design I starred',
      why: 'Starred designs show up together under Favourites on Make’s home page.',
      fix: ['Open Favourites on Make’s home page.', 'If it is not there, open the design and star it again.'],
    },
    {
      problem: 'My tags do not filter anything',
      why: 'A tag only finds the designs you have added it to, and the spelling has to match.',
      fix: ['Open a design’s menu and check which tags it has.', 'Pick the tag from the list rather than typing it again, so you do not end up with two similar tags.'],
    },
    {
      problem: 'Things will not line up',
      why: 'Guides only appear while you drag, and a locked item does not move.',
      fix: ['Drag slowly near the other item until the pink guide appears.', 'Check the item is not locked in the Layers tab.', 'Use the arrow keys to nudge it one step at a time.'],
    },
    {
      problem: 'I cannot select something under another item',
      why: 'The item on top is catching your clicks.',
      fix: ['Open the Layers tab and pick it from the list.', 'Or lock the item on top while you work underneath.'],
    },
    {
      problem: 'Text looks blurry in my PNG',
      why: 'A small page exported at a small size has fewer pixels to work with.',
      fix: ['Download as PDF for printing, which keeps text sharp at any size.', 'Use a larger page size when you start a design that will be printed.'],
    },
    {
      problem: 'Speaker notes do not show while presenting',
      why: 'Notes are for you, so they stay out of the full-screen slides everyone else sees.',
      fix: ['Keep the notes open in another window, or print them before you present.'],
    },
    {
      problem: 'The design on my phone is tiny',
      why: 'Make shows the whole page on a small screen first.',
      fix: ['Use the zoom buttons at the bottom, or pinch to zoom in.'],
    },
    {
      problem: 'My copy of a design is still shared with people',
      why: 'A copy starts private to you, but the original keeps everyone it was shared with.',
      fix: ['Open Share on the copy to check who is on it. Only you should be there until you add people.'],
    },
  ],
  browse: [
    {
      problem: 'Google did not find anything',
      says: 'Browse searches through your ELUM search engine, which may only cover some sites.',
      why: 'Browse’s Google search may be set up to cover a list of sites, and your search did not match any of them. Sometimes Google turns a search away, too.',
      fix: ['Try different words.', 'Choose See this search on Google. It opens Google’s web-only results, with no AI Overview.'],
    },
    {
      problem: 'Search results never show up',
      why: 'Google’s results load from cse.google.com, and ad blockers and tracker blockers often block it.',
      fix: ['Allow cse.google.com in your blocker, or pause the blocker on Browse, then search again.', 'If Google does not answer within 10 seconds, Browse tells you and offers to run the search on Google instead.'],
    },
    {
      problem: 'A page opened as a reading view',
      why: 'That site does not let other sites show it, so Browse shows you the article itself instead.',
      fix: ['Read it right there, or choose Open the original in a new window.'],
    },
    {
      problem: 'A page cannot be shown',
      says: 'This page cannot be shown here',
      why: 'The site will not let Browse show it and is not an article Browse can read out, or it wants you to sign in or prove you are a person.',
      fix: ['Choose Open in new window.'],
    },
    {
      problem: 'A page did not open',
      says: 'That page did not answer. Try again, or open it in a new window.',
      why: 'The site was slow or down.',
      fix: ['Reload the tab.', 'Or choose Open in new window.', 'If you see “That is a lot of pages.”, wait a little before opening more.'],
    },
    {
      problem: 'An address will not open',
      says: 'Browse can only open public web addresses.',
      why: 'For your safety, Browse does not open addresses on private networks, bare IP addresses, unusual ports, or addresses with a password in them.',
      fix: ['Open that address in your own browser instead.'],
    },
    {
      problem: 'I typed an app’s name and got a web search',
      why: 'Anything with a space, like “make bread”, is treated as a search. A single word, like “make”, opens the app.',
      fix: ['Type just the app’s name, or its elum.space address.'],
    },
    {
      problem: 'An app in a tab is asking for a site password',
      why: 'While ELUM is being tested, its sites may be protected by a site password. That is separate from your ELUM account.',
      fix: ['Choose Open in new window and enter the site password there, then reload the tab.'],
    },
    {
      problem: 'An app in a tab is not signed in',
      why: 'Apps in tabs are signed in when you are signed in to Browse itself.',
      fix: ['Sign in to Browse using the button at the top, then reload the tab.', 'Or choose Open in new window, which opens the app signed in.'],
    },
    {
      problem: 'My tabs disappeared',
      why: 'Your tabs and groups are saved in this browser. A private window, clearing your browsing data or switching browsers starts fresh.',
      fix: ['Open Browse in the same browser, in a normal (not private) window.'],
    },
    {
      problem: 'Images shows nothing',
      why: 'There may be no pictures for those words, or SafeSearch is hiding them.',
      fix: ['Try different or fewer words.', 'If you are happy to, turn SafeSearch off under the search box.'],
    },
    {
      problem: 'A result I expected has been left out',
      why: 'Browse leaves out results that lead to AI chat products, and tells you when it does.',
      fix: ['That is on purpose. If you think a result was left out by mistake, search with more exact words.'],
    },
    {
      problem: 'My recent searches do not show up',
      why: 'Recent searches stay on this device only, and only while Remember searches on this device is on.',
      fix: ['Turn on Remember searches on this device under the search box.', 'On another device or in a private window, your recent searches will not be there. That is expected.'],
    },
    {
      problem: 'I want to clear my recent searches',
      why: 'They are kept on this device so you can find things again.',
      fix: ['Start typing in the search box and remove any search from the list, or clear them all.', 'Turn off Remember searches on this device to stop keeping new ones.'],
    },
    {
      problem: 'Pressing / does not jump to the search box',
      why: 'The shortcut does not work while you are typing in another box, or while a page in a tab has your keyboard.',
      fix: ['Click an empty part of Browse first, then press /.'],
    },
    {
      problem: 'A tab group will not open',
      why: 'Clicking a group folds it away or opens it up again.',
      fix: ['Click the group’s name once to open it.', 'Right-click it for more options, like renaming or ungrouping.'],
    },
    {
      problem: 'Closing a tab closed the wrong one',
      why: 'The close button belongs to the tab it sits on, and tabs can shift as others close.',
      fix: ['Open the page again from your recent searches or the address.', 'Close tabs one at a time, waiting for the row to settle.'],
    },
    {
      problem: 'Status says an app is not working',
      why: 'The Status page checks each ELUM app and what they run on every minute.',
      fix: ['Wait a few minutes and check again. Most problems clear up quickly.', 'Your saved work is safe while an app is down.'],
    },
    {
      problem: 'Status keeps saying Checking',
      why: 'Browse could not reach ELUM to ask, often because of a weak connection.',
      fix: ['Check you are online, then reload the page.'],
    },
    {
      problem: 'A page in a tab looks squashed',
      why: 'Some sites are built for full browser windows.',
      fix: ['Choose Open in new window for that page.'],
    },
    {
      problem: 'Sign in in Browse does not sign me in to a page in a tab',
      why: 'Your ELUM account signs you in to ELUM apps, not to other websites.',
      fix: ['Sign in to that website separately, or open it in a new window.'],
    },
    {
      problem: 'My searches open a different search engine',
      why: 'Your browser’s own address bar uses its default search engine, not Browse.',
      fix: ['Search from the box on Browse’s page.', 'Or bookmark Browse and start your searches there.'],
    },
    {
      problem: 'Browse looks zoomed in on my iPhone',
      why: 'Safari zooms in when you tap into small text boxes, and it can stay zoomed after.',
      fix: ['Pinch out to zoom back.', 'Browse uses large enough text that this should not happen. If it keeps happening, check Safari’s Page Zoom in the aA menu is at 100%.'],
    },
    {
      problem: 'SafeSearch turned itself back on',
      why: 'Your SafeSearch choice is kept on this device. A new device, a private window or cleared browser data starts with it on.',
      fix: ['Turn it off again under the search box on that device.'],
    },
  ],
  store: [
    {
      problem: 'An app says Coming soon',
      why: 'That app is not open to everyone yet.',
      fix: ['Check back soon. When it opens, you will see it in What’s new.'],
    },
    {
      problem: 'Get keeps asking me to sign in',
      why: 'Getting an app needs your ELUM account. Signing in happens through ELUM Account, and Store only tries that once a minute so you never get stuck in a loop.',
      fix: ['Sign in, and Store will finish getting the app.', 'If it does not, wait a minute and choose Get again.', 'Make sure your browser allows cookies for the ELUM sites.'],
    },
    {
      problem: 'Open took me to the app’s sign-in page',
      why: 'Store passes your sign-in to the app through ELUM Account. If that hand-over does not work, the app opens signed out.',
      fix: ['Sign in to the app with the same ELUM account.'],
    },
    {
      problem: 'An app I got is not in Your apps or the ring',
      why: 'The page was opened before the app was added.',
      fix: ['Reload Store or ELUM Account.'],
    },
    {
      problem: 'Your apps will not load',
      says: 'We could not load your apps',
      why: 'Your connection dropped while Store was checking.',
      fix: ['Choose Try again.'],
    },
    {
      problem: 'Use in Make did not make a new design',
      why: 'Make creates one design per click. Going back to the same link does not make another one.',
      fix: ['Choose Use in Make again in Store.', 'Or pick the template from Make’s home page.'],
    },
    {
      problem: 'Get does not seem to do anything',
      why: 'The app may already be in your account, in which case Store shows Open instead.',
      fix: ['Look for Open where Get used to be.', 'If the button is still Get, reload the page and try again.'],
    },
    {
      problem: 'Get says something went wrong',
      says: 'Something went wrong. Please try again.',
      why: 'Store could not reach your account for a moment.',
      fix: ['Check your connection and choose Get again.', 'If it keeps happening, check the Status page in Browse.'],
    },
    {
      problem: 'Open opened the app in the same tab',
      why: 'A plain click on Open takes you to the app in this tab.',
      fix: ['Use the arrow next to Open to open the app in a Browse tab or its own window.', 'Or hold Ctrl (Cmd on a Mac) as you click to open a new tab.'],
    },
    {
      problem: 'A template asked me to sign in again',
      why: 'Templates open in Make, which needs to know whose account to save the design to.',
      fix: ['Sign in with the same ELUM account. Make opens with the template ready to edit.'],
    },
    {
      problem: 'The same template made two designs',
      why: 'Choosing Use in Make twice makes two copies, one each time.',
      fix: ['Delete the one you do not need from Make’s home page.'],
    },
    {
      problem: 'Search in Store does not find a template',
      why: 'Store search looks at names and descriptions.',
      fix: ['Try a simpler word, like poster, deck or post.', 'Open Templates to browse them all.'],
    },
    {
      problem: 'An app’s page says it is not working',
      why: 'Each app’s page uses the same check as the Status page.',
      fix: ['Try again in a few minutes. Your work in that app is safe.'],
    },
    {
      problem: 'I want to remove an app from my account',
      why: 'Getting an app just adds it to your list and your ring. Every app stays free either way.',
      fix: ['You do not need to remove it. If you never open it, nothing changes.', 'To leave ELUM altogether, see deleting your account in ELUM Account.'],
    },
    {
      problem: 'Tune shows Coming soon',
      why: 'Tune, ELUM’s music service, is not open yet.',
      fix: ['Check back in Store. It will have a Get button the day it opens.'],
    },
  ],
  account: [
    {
      problem: 'My code does not work',
      says: 'That code does not match. Check it and try again.',
      why: 'The code was mistyped, or a newer code has been sent since.',
      fix: ['Use the most recent code in that inbox.', 'If you see “That code has expired. Ask for a new one.”, ask for a new code.'],
    },
    {
      problem: 'I cannot add an address',
      says: 'That address belongs to another account.',
      why: 'Each address can only belong to one ELUM account.',
      fix: ['Sign in to the other account and remove the address there first, or use a different address.'],
    },
    {
      problem: 'I cannot remove an address',
      says: 'Only added addresses can be removed. Your sign-in and Type addresses stay.',
      why: 'You sign in with those addresses, so they always stay on your account.',
      fix: ['You can remove any other address you added.'],
    },
    {
      problem: 'I cannot change my password',
      says: 'For your safety, sign in again before changing your password.',
      why: 'You can only change your password soon after signing in.',
      fix: ['Sign out, sign back in, and change your password straight away.'],
    },
    {
      problem: 'I picked the wrong number when approving a sign-in',
      says: 'That was not the number, so we stopped that sign-in.',
      why: 'Picking the wrong number stops the sign-in, just in case it was not you.',
      fix: ['Sign in again on the new device and pick the number it shows.', 'Each request lasts ten minutes. After that you will see “The request lasts ten minutes. Sign in again to send a new one.”'],
    },
    {
      problem: 'Approvals are on and I am not signed in anywhere else',
      why: 'Approving a sign-in needs a device you are already signed in to, and ELUM does not have a Forgot password option yet.',
      fix: ['While approvals are on, keep at least one device signed in.', 'Before you sign out everywhere, turn approvals off under Security.'],
    },
    {
      problem: 'My picture will not upload',
      says: 'Pictures can be up to 2 MB.',
      why: 'The picture is too big, or it is not a type ELUM accepts.',
      fix: ['Choose a PNG, JPEG, WebP, GIF or AVIF file under 2 MB.', 'If you see “This browser cannot resize pictures.”, your browser is out of date. Update it or try another one.'],
    },
    {
      problem: 'Someone cannot find me or message me',
      why: 'Your Privacy settings decide who can find you and message you.',
      fix: ['Under Privacy, choose Everyone, or add them under People and choose People you know.', 'Make sure they are not in your Blocked list.'],
    },
    {
      problem: 'An app says “That ELUM app is not open yet.”',
      why: 'That app is not open to everyone yet.',
      fix: ['Check ELUM Store to see which apps are open.'],
    },
    {
      problem: 'I want to delete my account',
      why: 'You can leave ELUM whenever you like.',
      fix: ['Open ELUM Account and choose Delete account at the bottom of the menu.', 'Download anything you want to keep first: documents from Write and designs from Make.', 'Deleting your account removes your profile, your documents, your designs and your messages. It cannot be undone.'],
    },
    {
      problem: 'What happens to things I shared when I delete my account',
      why: 'Documents and designs you own are deleted with your account, so the people you shared them with lose them too.',
      fix: ['Before you delete, tell people, or let them make their own copies.'],
    },
    {
      problem: 'I want to see what ELUM knows about me',
      why: 'Your ELUM account holds your name, picture, addresses, people, preferences and the work you make in the apps.',
      fix: ['Look through Profile, Addresses, People and Privacy in ELUM Account.', 'Your work is in each app, where you can download it.'],
    },
    {
      problem: 'Does ELUM keep my searches?',
      why: 'No. Browse sends your search to Google to get results, and ELUM does not keep them. Recent searches stay on your device.',
      fix: ['Clear recent searches in Browse, or turn off Remember searches on this device.'],
    },
    {
      problem: 'Who can see my picture',
      why: 'Under Privacy you choose whether everyone, only people you know, or nobody sees your picture.',
      fix: ['Open Privacy in ELUM Account and choose who sees your picture.'],
    },
    {
      problem: 'I added someone to a circle by mistake',
      why: 'Circles are just for you. People are not told which circle they are in.',
      fix: ['Open People, find them, and move them to the right circle or remove them.'],
    },
    {
      problem: 'I blocked someone by mistake',
      why: 'Blocking stops someone from finding you or messaging you.',
      fix: ['Open People, then Blocked, and unblock them.'],
    },
    {
      problem: 'A device I do not recognise is signed in',
      why: 'It could be an old phone or computer of yours, or someone who knows your password.',
      fix: ['Open Security and sign that device out.', 'Change your password straight away.', 'Turn on approvals for new sign-ins, so nobody can get in without your say-so.'],
    },
    {
      problem: 'I want to sign out of every device',
      why: 'Handy if you have lost a phone or used a shared computer.',
      fix: ['Open Security and choose to sign out everywhere.', 'If approvals are on, keep one trusted device signed in, or turn approvals off first.'],
    },
    {
      problem: 'My preferences did not carry over to another app',
      why: 'Preferences are saved to your account, and each app picks them up when it next loads.',
      fix: ['Reload the other app.'],
    },
    {
      problem: 'The ring around my picture is missing an app',
      why: 'The ring shows the apps in your account. An app you only visited without choosing Get may not be in it.',
      fix: ['Open ELUM Store and choose Get on that app.'],
    },
    {
      problem: 'My name looks wrong in other apps',
      why: 'Apps that were already open still show your old name until they load again.',
      fix: ['Reload the other app after changing your name in Profile.'],
    },
    {
      problem: 'I cannot start in the app I picked',
      why: 'Your start app is used when you sign in from ELUM Account.',
      fix: ['Check Preferences, Start in, and choose the app. Sign in from ELUM Account next time.'],
    },
    {
      problem: 'Passkeys are not offered on a preview or test version of ELUM Account',
      says: 'Passkeys work on the ELUM Account site only.',
      why: 'A passkey belongs to the exact web address it was made on, and ELUM only lets ELUM Account’s own addresses make and use them. Preview and test versions of the site have other addresses, so the passkey buttons stay hidden there. If something tries anyway, this is what it says.',
      fix: ['Open ELUM Account at account.elum.space or accountsbyelum.netlify.app.', 'Make and use your passkey there.', 'If you are at one of those addresses and still do not see the button, see “I do not see Create a passkey”.'],
    },
    {
      problem: 'I do not see Create a passkey',
      says: 'This browser cannot make passkeys. Try Safari, Chrome, Edge or Firefox on a recent device.',
      why: 'Your browser or device does not support passkeys, or you are not on ELUM Account’s own site. On an older device, or in a browser that is out of date, the button is replaced by this note.',
      fix: ['Update your browser and your phone or computer to the latest version.', 'Try Safari, Chrome, Edge or Firefox on a recent device.', 'Check the address bar says account.elum.space or accountsbyelum.netlify.app.', 'Meanwhile, sign in with your password. Nothing else changes.'],
    },
    {
      problem: 'My device asks for a passkey and I closed the prompt',
      why: 'If you close the prompt, press Cancel, or the phone or computer takes too long to answer, the browser tells ELUM that no passkey was used. ELUM treats that as your choice and shows no message at all, so you may only notice that nothing happened.',
      fix: ['Choose Create a passkey, or Sign in with a passkey, again and follow the prompt to the end.', 'Use Face ID, Touch ID, Windows Hello or your device PIN when it asks.', 'If the prompt never shows, see “The passkey prompt does not appear”.'],
    },
    {
      problem: 'The passkey prompt does not appear',
      why: 'Something is blocking it: a pop-up blocker, a browser extension that manages passwords, or a screen lock that is not set up on the device.',
      fix: ['Make sure your device has a screen lock, like a PIN, a fingerprint or Face ID.', 'Turn off extensions that take over passkeys or passwords, then try again.', 'Try again in another browser.'],
    },
    {
      problem: 'It says there is no passkey when I sign in',
      why: 'Your browser could not find a passkey for ELUM on this device. Passkeys are kept where you made them, in the device or password manager.',
      fix: ['Choose Sign in with a passkey and, if asked, pick “Use a phone or tablet” and scan the code with the device that has your passkey.', 'Sign in with your password instead, then make a passkey on this device in Security.', 'Check you are on the same ELUM Account address you made it on.'],
    },
    {
      problem: 'We do not know that passkey',
      says: 'We do not know that passkey. It may have been removed from your account.',
      why: 'The passkey you picked is not in any ELUM account any more. It may have been removed in Security, or it belongs to an account that was deleted, but your device still shows it.',
      fix: ['Sign in with your password.', 'Make a new passkey in Security.', 'Delete the old one from your device’s password manager so it stops being offered.'],
    },
    {
      problem: 'That passkey did not work',
      says: 'That passkey did not work. Try again, or use your password.',
      why: 'The passkey was found, but it could not be checked. This can happen if the time on your device is wrong, if the passkey was made for a different address, or if it was copied badly between devices.',
      fix: ['Try once more, picking the passkey again.', 'Check your device’s date and time are set automatically.', 'Make sure you are on the address you made the passkey on: account.elum.space or accountsbyelum.netlify.app.', 'Use your password, then make a new passkey.'],
    },
    {
      problem: 'A passkey did not sign me in',
      says: 'That passkey did not sign you in. Try again, or use your password.',
      why: 'ELUM accepted the passkey but the sign-in itself did not finish, often because of a poor connection.',
      fix: ['Check your connection and try again.', 'Use your password if it keeps happening.'],
    },
    {
      problem: 'This browser could not use a passkey',
      says: 'This browser could not use a passkey. Try again, or use your password.',
      why: 'Your browser or device ran into a problem while using the passkey. It can come from private browsing, a managed browser, or a security key that is not plugged in.',
      fix: ['Try again, and approve the prompt when it appears.', 'Close private or incognito windows, and try in a normal one.', 'Try a different browser, such as Safari, Chrome, Edge or Firefox.', 'Use your password if you are in a hurry.'],
    },
    {
      problem: 'This device already has a passkey',
      says: 'This device already has a passkey for your account.',
      why: 'ELUM will not make a second passkey on a device or password manager that already holds one for your account.',
      fix: ['You do not need another. Choose Sign in with a passkey next time.', 'To start fresh, remove the old passkey in Security, then create a new one.', 'To use a different device, open ELUM Account on it and create a passkey there.'],
    },
    {
      problem: 'It says “That took too long. Try again.” when I use a passkey',
      says: 'That took too long. Try again.',
      why: 'Each passkey attempt starts with a short-lived check from ELUM. If you waited too long at the prompt, or the page sat open for a while, the check ran out.',
      fix: ['Close the prompt and start again from Create a passkey or Sign in with a passkey.', 'Approve the prompt straight away this time.', 'If it keeps happening, reload the page first.'],
    },
    {
      problem: 'The passkey did not answer',
      says: 'The passkey did not answer. Try again.',
      why: 'Your device did not send back what ELUM needed, often because the prompt was dismissed part-way or the browser extension interrupted it.',
      fix: ['Try again and finish the whole prompt.', 'Turn off password-manager extensions for a moment, or try another browser.'],
    },
    {
      problem: 'A passkey could not be saved',
      says: 'We could not save that passkey. Try again.',
      why: 'ELUM could not finish checking the new passkey. The time on your device may be wrong, or the page was open for too long.',
      fix: ['Reload ELUM Account, sign in, and try Create a passkey again.', 'Check your date and time are set automatically.', 'Try another browser if it happens again.'],
    },
    {
      problem: 'I need to sign in before I can make a passkey',
      says: 'Sign in first, then make a passkey.',
      why: 'Passkeys belong to a signed-in account, so ELUM needs to know whose it is. Your sign-in may have ended.',
      fix: ['Sign in with your password and then choose Create a passkey in Security.', 'If you are asked to sign in again straight away, sign out and back in.'],
    },
    {
      problem: 'Too many passkey tries',
      says: 'Too many tries. Wait a few minutes and try again.',
      why: 'To keep accounts safe, ELUM slows down repeated passkey sign-in attempts from one place.',
      fix: ['Wait about ten minutes, then try again.', 'In the meantime, sign in with your password.', 'On a shared network, someone else’s tries can count too. Try a different network, like mobile data.'],
    },
    {
      problem: 'A passkey sign-in failed with “We could not sign you in. Try again.”',
      says: 'We could not sign you in. Try again.',
      why: 'ELUM checked your passkey, but could not finish signing you in.',
      fix: ['Try again.', 'Use your password if it keeps happening, and tell us with Contact support.'],
    },
    {
      problem: 'Passkeys do not work in private browsing',
      why: 'Private or incognito windows do not keep sign-in details, and some browsers limit passkeys in them.',
      fix: ['Use a normal window to make your passkey.', 'Once it is made, you can use it in private windows on browsers that allow it.'],
    },
    {
      problem: 'My work or school browser will not make a passkey',
      why: 'Browsers managed by an organisation can switch passkeys off, or save them only in the organisation’s own password manager.',
      fix: ['Ask whoever manages the device whether passkeys are allowed.', 'Make your passkey on your own phone or computer instead.', 'Sign in with your password on the managed device.'],
    },
    {
      problem: 'I use a security key',
      why: 'A security key works as a passkey if it supports it, but you need it with you each time.',
      fix: ['Choose Create a passkey, and when your browser asks, pick Security key. Plug it in or tap it, and touch it when it blinks.', 'Use Sign in with a passkey and the same steps next time.', 'Make a second passkey on your phone or computer, so a lost key does not lock you out.'],
    },
    {
      problem: 'My passkey is on my iPhone but not my laptop',
      why: 'Passkeys sync through iCloud Keychain, Google Password Manager or another password manager. If syncing is off, or the other device uses a different account, the passkey stays where it was made.',
      fix: ['On Apple devices, turn on iCloud Keychain on both and use the same Apple account.', 'On Android and Chrome, sign in to the same Google account and turn on sync for passwords.', 'Otherwise, choose Sign in with a passkey and pick “Use a phone or tablet”, then scan the code.', 'Or make a separate passkey on the laptop in Security.'],
    },
    {
      problem: 'I made a passkey on account.elum.space but accountsbyelum.netlify.app does not show it',
      why: 'A passkey belongs to one web address. ELUM Account has two, account.elum.space and accountsbyelum.netlify.app, and a passkey made on one is not offered on the other.',
      fix: ['Sign in on the address you made it on.', 'Or sign in with your password and make a passkey on the other address too.', 'Pick the address you will use every day, and make your passkey there.'],
    },
    {
      problem: 'I removed a passkey but my device still shows it',
      why: 'Removing a passkey in Security takes it off your ELUM account. A copy can still sit in your device’s password manager, which does not know.',
      fix: ['It does no harm. ELUM will not accept it, and says “We do not know that passkey. It may have been removed from your account.”', 'Delete it from your password manager so it stops being offered.'],
    },
    {
      problem: 'Renaming a passkey',
      why: 'Passkeys get a name from the device you made them on, like iPhone or Mac. You can change it to something you\'ll recognise.',
      fix: ['Open Security, find the passkey in the list, and choose Rename.', 'Type a new name, up to 80 characters, and choose Save.', 'Choose Cancel to keep the old name.'],
    },
    {
      problem: 'Removing a passkey',
      says: 'Remove “iPhone”? You will not be able to sign in with it any more.',
      why: 'Removing a passkey means you cannot sign in with it again. You may want to do it for a lost phone, or an old laptop.',
      fix: ['Open Security, find the passkey and choose Remove, then confirm.', 'You will see “iPhone is removed”, with the passkey’s own name, and Passkey removed shows under Recent activity.', 'You can make a new passkey whenever you want.'],
    },
    {
      problem: 'ELUM keeps offering me a passkey',
      says: 'Sign in faster with a passkey',
      why: 'After you sign in without a passkey, ELUM suggests making one, and asks again each time you sign in, until your account has one. Choosing Not now only skips it for that sign-in.',
      fix: ['Choose Create a passkey and follow the prompt. Once your account has one, the offer stops.', 'If your browser cannot make passkeys, you will not be offered one at all.', 'You can always make one later in Security.'],
    },
    {
      problem: 'I lost every device that had my passkey',
      why: 'A passkey lives on your devices and in your password manager. If they are gone, so is the passkey, but your ELUM account is still there.',
      fix: ['Sign in another way. Use your password on any browser.', 'Open Security and remove the old passkeys that are lost.', 'Create a new passkey on your new device.', 'If approvals are on and you have no signed-in device left, use Contact support and tell us what happened.'],
    },
    {
      problem: 'I cannot make a passkey because passkeys are not connected',
      says: 'Passkeys work once ELUM is connected.',
      why: 'This copy of ELUM Account is running on its own, without the ELUM platform, so it has nowhere to keep passkeys.',
      fix: ['Open ELUM Account at account.elum.space and use passkeys there.'],
    },
    {
      problem: 'A passkey I tried to change is not in my account',
      says: 'That passkey is not in your account.',
      why: 'You tried to rename or remove a passkey that is not on your account any more, often because it was removed on another device a moment ago.',
      fix: ['Reload the Security page to see the passkeys you have now.'],
    },
  ],
  inquire: [
    {
      problem: 'My form link does not open',
      why: 'The link was cut short when it was copied, or the form has been deleted.',
      fix: ['Copy the link again from Share in Inquire, and send the whole thing.', 'Open the link in a private window to check it works for someone who is not signed in.', 'If the form was deleted, you will need to make it again. Deleted forms cannot be brought back.'],
    },
    {
      problem: 'Nobody can send my form',
      why: 'The form may be closed, or a required question cannot be answered the way you set it up.',
      fix: ['Open the form in Inquire and check whether it says it is closed. Open it again to take answers.', 'Try it yourself in a private window. If a required question blocks you, change it or make it optional.', 'Check that the person has the full link and a connection that works.'],
    },
    {
      problem: 'People say they cannot answer a question',
      why: 'The question might be required but hidden behind a condition that never appears, or its choices do not fit what people want to say.',
      fix: ['Open the form and look at the question’s condition. Make sure the question it depends on comes first.', 'Add a choice like “Something else”, or a short answer, for people whose answer is not in the list.', 'Try the form in a private window and answer it the way they would.'],
    },
    {
      problem: 'A question I added is not showing up',
      why: 'The question is conditional, so it only appears after someone gives a certain answer to an earlier question.',
      fix: ['Open the question and check the condition. Pick the answer that should make it appear.', 'Try the form in a private window and choose that answer to see it appear.', 'If you want it to always show, remove the condition.'],
    },
    {
      problem: 'A conditional question shows when it should not',
      why: 'The condition is looking at a different answer than you meant, or an earlier question was changed after you set it up.',
      fix: ['Open the condition and check the question and the answer it uses.', 'If you renamed or replaced the earlier question, set the condition again.', 'Test it in a private window with each answer.'],
    },
    {
      problem: 'I cannot see any responses',
      why: 'No one has sent the form yet, or you are looking at a different form than the one you shared.',
      fix: ['Check you opened the right form in your list.', 'Open the link yourself in a private window and send a test answer. It should appear under Responses.', 'Reload the page. Responses show as soon as they are sent, but an old page does not update on its own.'],
    },
    {
      problem: 'Someone says they sent it but I cannot find their answer',
      why: 'The form might have been closed before they sent it, or their device lost its connection part-way.',
      fix: ['Check when you closed the form. Nothing can be sent after that.', 'Ask them to open the link again and check they see a message that their answer was sent.', 'Ask them to send it once more if they did not. Duplicate answers are fine to delete.'],
    },
    {
      problem: 'I closed a form by mistake',
      why: 'Closing stops any more answers. Your form and the answers so far are kept.',
      fix: ['Open the form from your list and open it again.', 'Tell people the link works again.'],
    },
    {
      problem: 'I deleted a form and want it back',
      why: 'Deleting a form removes it and every response it had.',
      fix: ['Deleted forms cannot be brought back, so make the form again.', 'Next time, close a form instead of deleting it. Closing keeps all the answers.', 'If the answers matter and you are not sure what is gone, use Contact support and tell us which form it was.'],
    },
    {
      problem: 'I cannot edit someone else’s form',
      why: 'Only the person who made a form, and people they gave edit access to, can change it.',
      fix: ['Ask the owner to share the form with you so you can edit it.', 'Or make a copy of your own and design it your way.'],
    },
    {
      problem: 'I cannot share my form with another person',
      why: 'You can share with people who have an ELUM account. Everyone else can fill the form in with the link, but cannot manage it.',
      fix: ['Ask them to sign up for an ELUM account, then share it with their address.', 'To simply collect answers from someone, send them the link.'],
    },
    {
      problem: 'The form looks different on my phone',
      why: 'Forms fit the screen they are opened on, so long answers and wide choices wrap on a small screen.',
      fix: ['Keep question names short and put longer explanations in the note under the question.', 'Try the link on your phone before you share it.'],
    },
    {
      problem: 'My answers disappeared when I reloaded the form',
      why: 'A form you have not sent yet is only on your screen. Reloading, or closing the tab, can clear it.',
      fix: ['Keep the tab open until you have sent your answers.', 'For a long form, write your answers somewhere else first and paste them in.'],
    },
    {
      problem: 'Inquire says my session has ended',
      why: 'You were signed out, perhaps because you signed out in another ELUM app or were away for a long time.',
      fix: ['Sign in again. Your forms are all still there.', 'If you were part-way through changing a form, check the last change saved.'],
    },
    {
      problem: 'The support form did not fill in my details',
      why: 'You opened it without Contact support, or the details were cleared.',
      fix: ['Choose Contact support again from the app or page where something went wrong.', 'Or tell us in your own words: which app, what you were doing, and what the screen said.'],
    },
  ],
  tune: [
    {
      problem: 'I cannot find Tune',
      why: 'Tune is added to your ELUM account from ELUM Store.',
      fix: ['Open ELUM Store, find Tune and choose Get.', 'Then open Tune from the ELUM app list, the grid of dots at the top of any ELUM app.'],
    },
    {
      problem: 'Tune asks me to sign in again',
      why: 'Your sign-in ended, or you signed out in another app.',
      fix: ['Sign in again with your ELUM account. Your work is saved in your account and comes back as it was.'],
    },
    {
      problem: 'Tune is slow or does not load',
      why: 'The connection is weak, or ELUM is having trouble.',
      fix: ['Check you are online, then reload the page.', 'Open the Status page in Browse to see whether ELUM is working right now.'],
    },
    {
      problem: 'Tune says something went wrong',
      why: 'Something did not finish on ELUM’s side.',
      fix: ['Reload the page and try again.', 'If it keeps happening, use Contact support on that message. It fills in what happened for you.'],
    },
    {
      problem: 'I want to use Tune in a Browse tab',
      why: 'Tune can open inside ELUM Browse like any ELUM app.',
      fix: ['In Browse, type tune and choose Open ELUM Tune. It opens already signed in.'],
    },
    {
      problem: 'Tune looks different on my phone',
      why: 'Tune fits itself to smaller screens, so some buttons move into menus.',
      fix: ['Look for the menu button at the top or the bar at the bottom.', 'Everything you can do on a computer is there on a phone.'],
    },
    {
      problem: 'I want Tune in dark mode',
      why: 'Tune follows your device’s light or dark setting unless you choose one.',
      fix: ['Use the sun and moon button at the top, or change the theme in ELUM Account.'],
    },
    {
      problem: 'I deleted something in Tune by mistake',
      why: 'Some things can be undone straight away; others are gone once deleted.',
      fix: ['Look for Undo on the message that appears right after you delete.', 'If it has gone, Contact support and say what was deleted and when.'],
    },
    {
      problem: 'A song will not play at all',
      why: 'The song may not be available where you are, or Tune lost its connection.',
      fix: ['Try another song. If none play, check you are online and reload Tune.'],
    },
    {
      problem: 'The lyrics do not show',
      why: 'Not every song has lyrics yet.',
      fix: ['Songs with lyrics show the lyrics button on Now playing. Others will gain them over time.'],
    },
    {
      problem: 'Crossfade does not seem to work',
      why: 'Crossfade only blends songs that play one after another, not when you pick a new song yourself.',
      fix: ['Turn on crossfade in Tune’s settings, then let a playlist or album play on.'],
    },
    {
      problem: 'The volume jumps between songs',
      why: 'Even volume may be off.',
      fix: ['Turn on even volume in Tune’s settings so every song plays at the same loudness.'],
    },
    {
      problem: 'My playlist is missing on another device',
      why: 'The other device may be signed in to a different ELUM account, or has not refreshed yet.',
      fix: ['Check the account in the top corner, then reload Tune.'],
    },
    {
      problem: 'Sound plays from the wrong speaker',
      why: 'Tune plays on the output you last chose.',
      fix: ['Open the output button on Now playing and pick your headphones or speakers.'],
    },
    {
      problem: 'Tune will not open for me',
      why: 'Tune is rolling out to people in the U.S. and Canada first.',
      fix: ['Check that Tune is in your ELUM account: open ELUM Store, find Tune and choose Get.', 'If you are outside the U.S. and Canada, Tune will open for you as it reaches more countries.'],
    },
    {
      problem: 'A song stops or skips',
      why: 'The connection dropped for a moment while the song was loading.',
      fix: ['Tune tries again on its own. If the song still stops, check you are online and press play again.'],
    },
  ],
  code: [
    {
      problem: 'I cannot find Code',
      why: 'Code is added to your ELUM account from ELUM Store.',
      fix: ['Open ELUM Store, find Code and choose Get.', 'Then open Code from the ELUM app list, the grid of dots at the top of any ELUM app.'],
    },
    {
      problem: 'Code asks me to sign in again',
      why: 'Your sign-in ended, or you signed out in another app.',
      fix: ['Sign in again with your ELUM account. Your work is saved in your account and comes back as it was.'],
    },
    {
      problem: 'Code is slow or does not load',
      why: 'The connection is weak, or ELUM is having trouble.',
      fix: ['Check you are online, then reload the page.', 'Open the Status page in Browse to see whether ELUM is working right now.'],
    },
    {
      problem: 'Code says something went wrong',
      why: 'Something did not finish on ELUM’s side.',
      fix: ['Reload the page and try again.', 'If it keeps happening, use Contact support on that message. It fills in what happened for you.'],
    },
    {
      problem: 'I want to use Code in a Browse tab',
      why: 'Code can open inside ELUM Browse like any ELUM app.',
      fix: ['In Browse, type code and choose Open ELUM Code. It opens already signed in.'],
    },
    {
      problem: 'Code looks different on my phone',
      why: 'Code fits itself to smaller screens, so some buttons move into menus.',
      fix: ['Look for the menu button at the top or the bar at the bottom.', 'Everything you can do on a computer is there on a phone.'],
    },
    {
      problem: 'I want Code in dark mode',
      why: 'Code follows your device’s light or dark setting unless you choose one.',
      fix: ['Use the sun and moon button at the top, or change the theme in ELUM Account.'],
    },
    {
      problem: 'I deleted something in Code by mistake',
      why: 'Some things can be undone straight away; others are gone once deleted.',
      fix: ['Look for Undo on the message that appears right after you delete.', 'If it has gone, Contact support and say what was deleted and when.'],
    },
    {
      problem: 'The preview stays blank',
      why: 'The page may have an error that stops it drawing, or it has not been run yet.',
      fix: ['Press Run again, then read the output panel for errors.'],
    },
    {
      problem: 'My project lost a change',
      why: 'Changes save as you type; a change made while offline waits until you are back online.',
      fix: ['Keep Code open until it says it is saved.', 'Open the project’s versions to find an earlier copy.'],
    },
    {
      problem: 'An upload did not work',
      why: 'The file may be too large, or the connection dropped.',
      fix: ['Check you are online and upload it again.'],
    },
    {
      problem: 'The editor does not colour my code',
      why: 'The file’s name may not end in the extension for its language.',
      fix: ['Rename the file with the right extension, such as .py or .js.'],
    },
    {
      problem: 'My program waits forever',
      why: 'It may be waiting for input, or stuck in a loop.',
      fix: ['Stop it, check any loops, and run it again.'],
    },
    {
      problem: 'I want to start again from an older version',
      why: 'Code keeps the versions of your project.',
      fix: ['Open versions, pick the one you want and put it back. The newer one stays in the list.'],
    },
    {
      problem: 'My code does not run',
      why: 'The language may need a moment to load the first time, or the code has an error.',
      fix: ['Wait a few seconds after the first Run, then try again.', 'Read the output panel: errors show there with the line they happened on.'],
    },
  ],
  capture: [
    {
      problem: 'I cannot find Capture',
      why: 'Capture is added to your ELUM account from ELUM Store.',
      fix: ['Open ELUM Store, find Capture and choose Get.', 'Then open Capture from the ELUM app list, the grid of dots at the top of any ELUM app.'],
    },
    {
      problem: 'Capture asks me to sign in again',
      why: 'Your sign-in ended, or you signed out in another app.',
      fix: ['Sign in again with your ELUM account. Your work is saved in your account and comes back as it was.'],
    },
    {
      problem: 'Capture is slow or does not load',
      why: 'The connection is weak, or ELUM is having trouble.',
      fix: ['Check you are online, then reload the page.', 'Open the Status page in Browse to see whether ELUM is working right now.'],
    },
    {
      problem: 'Capture says something went wrong',
      why: 'Something did not finish on ELUM’s side.',
      fix: ['Reload the page and try again.', 'If it keeps happening, use Contact support on that message. It fills in what happened for you.'],
    },
    {
      problem: 'I want to use Capture in a Browse tab',
      why: 'Capture can open inside ELUM Browse like any ELUM app.',
      fix: ['In Browse, type capture and choose Open ELUM Capture. It opens already signed in.'],
    },
    {
      problem: 'Capture looks different on my phone',
      why: 'Capture fits itself to smaller screens, so some buttons move into menus.',
      fix: ['Look for the menu button at the top or the bar at the bottom.', 'Everything you can do on a computer is there on a phone.'],
    },
    {
      problem: 'I want Capture in dark mode',
      why: 'Capture follows your device’s light or dark setting unless you choose one.',
      fix: ['Use the sun and moon button at the top, or change the theme in ELUM Account.'],
    },
    {
      problem: 'I deleted something in Capture by mistake',
      why: 'Some things can be undone straight away; others are gone once deleted.',
      fix: ['Look for Undo on the message that appears right after you delete.', 'If it has gone, Contact support and say what was deleted and when.'],
    },
    {
      problem: 'My photos are on the wrong day',
      why: 'Capture sorts by the date saved inside each photo, which some cameras and apps leave out.',
      fix: ['Open the photo’s details to check its date. Photos without one are sorted by when you uploaded them.'],
    },
    {
      problem: 'An edit looks wrong',
      why: 'Edits sit on top of the original, so the photo can always go back.',
      fix: ['Open the photo, choose Edit, then Revert to the original.'],
    },
    {
      problem: 'A shared link does not open for someone',
      why: 'The link may have been turned off, or the album was deleted.',
      fix: ['Open the album’s sharing and check the link is on, or make a new one.'],
    },
    {
      problem: 'A video will not play',
      why: 'The browser may not play that kind of video.',
      fix: ['Download it and play it on your device, or try another browser.'],
    },
    {
      problem: 'An album is missing a photo',
      why: 'A photo deleted from your library leaves every album too.',
      fix: ['Check whether it was deleted, and upload it again if you still have it.'],
    },
    {
      problem: 'I am running out of space',
      why: 'Your ELUM account has a set amount of space for files.',
      fix: ['Delete photos and videos you no longer need, then check your space in ELUM Account.'],
    },
    {
      problem: 'A photo did not upload',
      why: 'The file may be too large, or the connection dropped while it was uploading.',
      fix: ['Check you are online and upload it again.', 'Very large videos take longer: keep the tab open until the upload finishes.'],
    },
  ],
  home: [
    {
      problem: 'I cannot find where to sign in on the ELUM home',
      why: 'The ELUM home is a front door and does not sign you in. Your ELUM Account is the home base.',
      fix: ['Open any ELUM app, or ELUM Account, and sign in there.', 'Once you are signed in, the other apps open already signed in.'],
    },
    {
      problem: 'Contact support opens a blank page',
      why: 'The support form could not load, often because of a content blocker or a slow connection.',
      fix: ['Reload the tab, or choose Reload in the address bar.', 'Turn off any content blocker for ELUM and try again.', 'Still blank? Open browsebyelum.netlify.app/app/inquire/f/support in a new window.'],
    },
    {
      problem: 'I want to contact support but I cannot sign in',
      why: 'You do not need to sign in to send the support form.',
      fix: ['Choose Contact support on the sign-in screen, or open browsebyelum.netlify.app/app/inquire/f/support.', 'Tell us the address you use and what you see on the screen.'],
    },
    {
      problem: 'I sent the support form and heard nothing back',
      why: 'Support requests are saved for the ELUM team to read. There is no automatic reply or ticket number yet.',
      fix: ['Keep a note of when you sent it.', 'Check Troubleshooting for an answer in the meantime.', 'If it is urgent and you are locked out, send the form again with “Locked out” at the start.'],
    },
    {
      problem: 'The support form says it is closed',
      why: 'The form was closed or cannot be reached right now.',
      fix: ['Check the Status page to see if Inquire is working.', 'Try again in a few minutes.'],
    },
    {
      problem: 'I want to send a screenshot to support',
      why: 'The support form takes words, not pictures.',
      fix: ['Type the message you saw on the screen exactly as it appears, and what you were doing.', 'Contact support from the screen itself, so we get the message automatically.'],
    },
    {
      problem: 'elum.space shows the old Docs page',
      why: 'Your browser may be holding on to an older copy.',
      fix: ['Reload the page, or press Ctrl+Shift+R (Cmd+Shift+R on a Mac).', 'Docs now lives at browsebyelum.netlify.app/docs. The ELUM home has the products and the mission.'],
    },
    {
      problem: 'Where did “Start here” go?',
      why: 'The start-here part of Docs moved to Products on the ELUM home.',
      fix: ['Open elum.space/products to meet each ELUM app.', 'Docs now opens on the guides and Troubleshooting for every app.'],
    },
  ],
};

/** Problems that can happen in any ELUM app. */
export const COMMON_TROUBLES: Trouble[] = [
  {
    problem: 'I am signed in to one ELUM app but not another',
    why: 'Each ELUM app is its own website. When you move between them, ELUM Account passes your sign-in along, and that hand-over did not happen this time.',
    fix: [
      'Open the other app from the apps window (the dots at the top of every app). It opens signed in.',
      'Or choose Sign in. If you are already signed in to ELUM Account, you come straight back signed in, without typing anything.',
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
    problem: 'A sign-in or confirmation link does not work',
    says: 'That sign-in link has expired or was already used. Sign in again.',
    why: 'Each link only works once, and only for a limited time.',
    fix: ['Sign in with your password, or send yourself a new link.'],
  },
  {
    problem: 'An ELUM app says my session has ended',
    says: 'Your session has ended. Sign in again.',
    why: 'You signed out on another device, signed out everywhere, or your session ran out.',
    fix: ['Sign in again. Do not worry, your work is saved to your account.'],
  },
  {
    problem: 'A new sign-in is waiting for approval',
    says: 'Approve this sign-in on a device you are already signed in to.',
    why: 'You have turned on approvals (ELUM Account, Security).',
    fix: ['Open any ELUM app on a device you are already signed in to. When it asks “Is this you signing in?”, pick the number the new device shows.', 'If it is not you signing in, choose “No, it is not me”.'],
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
    why: 'One of ELUM’s services did not respond the way it should have.',
    fix: ['Try again, and if that does not help, reload the page.', 'Check the Status page in Browse to see if something is down.'],
  },
  {
    problem: 'An ELUM site asks for a password before it loads',
    why: 'While ELUM is being tested, its sites may be protected by a site password. That is separate from your ELUM account.',
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
  {
    problem: 'I forgot my password',
    why: 'ELUM does not have a Forgot password option yet.',
    fix: ['If you are still signed in on another device, open ELUM Account, Security, and change your password there.', 'Try signing in with a passkey or an email link if you set one up.'],
  },
  {
    problem: 'Sign in says my email or password is wrong',
    why: 'There may be a typo, Caps Lock may be on, or you signed up with a different address.',
    fix: ['Check Caps Lock, and use the eye button to see what you typed.', 'Try your ELUM Type address instead of your email, or the other way round.', 'If you signed up with a passkey, choose Sign in with a passkey.'],
  },
  {
    problem: 'I keep getting sent back to the sign-in page',
    why: 'Your browser may be blocking the storage ELUM uses to remember that you are signed in.',
    fix: ['Allow cookies and site data for elum.space in your browser’s settings.', 'Leave private browsing and try in a normal window.', 'Check the date and time on your device are set automatically.'],
  },
  {
    problem: 'Signing out of one app signed me out of all of them',
    why: 'You have one ELUM account, so signing out ends your session in every ELUM app on that device.',
    fix: ['That is on purpose, so nobody can carry on in another app after you have left. Sign in again whenever you are ready.'],
  },
  {
    problem: 'I signed in on a shared computer',
    why: 'Anyone using that computer after you could open your ELUM apps.',
    fix: ['Sign out from your account menu before you leave.', 'If you forgot, open ELUM Account, Security, on your own device and sign that computer out.'],
  },
  {
    problem: 'The number to approve is not on my other device',
    why: 'The approval shows up on devices that are already signed in and have an ELUM app open.',
    fix: ['Open any ELUM app on your other device, or reload it. The question “Is this you signing in?” appears.', 'Make sure that device is signed in to the same ELUM account.'],
  },
  {
    problem: 'None of the numbers match',
    why: 'You may be looking at an old request, or someone else is trying to sign in.',
    fix: ['Choose “No, it is not me”. Then start signing in again on your new device and pick the number it shows now.', 'If you did not try to sign in, change your password.'],
  },
  {
    problem: 'The approval ran out before I picked a number',
    why: 'Each sign-in request only waits a short while, to keep your account safe.',
    fix: ['Start signing in again on the new device, and have your other device ready.'],
  },
  {
    problem: 'A nearby approval does not show up',
    why: 'Nearby approvals only appear on your devices that are on the same network, like the same home Wi-Fi.',
    fix: ['Connect both devices to the same Wi-Fi.', 'Turn off any VPN for a moment, as it can make your devices look like they are in different places.', 'Or pick the number on any signed-in device instead.'],
  },
  {
    problem: 'An approval popped up and I was not signing in',
    why: 'Someone may know your password and is trying to get in. Approvals stopped them.',
    fix: ['Choose “No, it is not me”.', 'Change your password in ELUM Account, Security.', 'Look at the devices list there and sign out anything you do not recognise.'],
  },
  {
    problem: 'The ELUM phone app does not show approvals',
    why: 'The phone app needs to be signed in, and allowed to send notifications.',
    fix: ['Open the ELUM app on your phone and make sure you are signed in.', 'Allow notifications for it in your phone’s settings.', 'Open the app itself. Waiting approvals show up there even without a notification.'],
  },
  {
    problem: 'I do not have another device to approve with',
    why: 'Approvals need a device that is already signed in.',
    fix: ['If you can, approve with the email link instead. ELUM sends it to your account’s email.', 'If you get back in, consider turning approvals off until you have a second device.'],
  },
  {
    problem: 'The approval email link does not work',
    says: 'That sign-in link has expired or was already used. Sign in again.',
    why: 'The link works once, for a short time, and only for the sign-in that asked for it.',
    fix: ['Start signing in again and ask for a new link.', 'Open the newest email if you asked more than once.'],
  },
  {
    problem: 'The approval email went to an address I cannot reach',
    why: 'ELUM sends it to your account’s main email.',
    fix: ['Approve with a signed-in device instead.', 'Once you are in, update your addresses in ELUM Account, Addresses.'],
  },
  {
    problem: 'I cannot create a passkey',
    why: 'Your device or browser needs a screen lock, like a PIN, Face ID or Touch ID, to keep a passkey safe.',
    fix: ['Set a screen lock on your device.', 'Update your browser, then try again from ELUM Account, Security.', 'If a window opens and closes straight away, try another browser.'],
  },
  {
    problem: 'My passkey is not offered when I sign in',
    why: 'Passkeys are kept on the device or in the password manager where you made them.',
    fix: ['Use the same device, or one that shares the same password manager, like iCloud Keychain or Google Password Manager.', 'Choose Sign in with a passkey, then pick “Use a phone or tablet” to scan a code with the device that has it.', 'Or sign in with your password and add a passkey on this device too.'],
  },
  {
    problem: 'Using my passkey on my other Apple devices',
    why: 'Passkeys made on an iPhone, iPad or Mac are saved to iCloud Keychain.',
    fix: ['Turn on iCloud Keychain on each device (Settings, your name, iCloud, Passwords and Keychain).', 'Sign in to the same Apple account on them. The passkey appears a little while after.'],
  },
  {
    problem: 'My passkey stopped working after the site moved',
    why: 'A passkey only works on the web address it was made for. If an ELUM app moved to a new address, the old passkey cannot be used there.',
    fix: ['Sign in with your password or an email link.', 'Then make a new passkey in ELUM Account, Security, and remove the old one.'],
  },
  {
    problem: 'I want to remove a passkey',
    why: 'You might have a lost or old device with a passkey on it.',
    fix: ['Open ELUM Account, Security, and remove it from your list of passkeys.', 'You can also delete it from your device’s password manager.'],
  },
  {
    problem: 'What’s new keeps showing me the same tour',
    why: 'Older versions of the apps remembered the tour on each device only. It is now kept on your account.',
    fix: ['Close the tour once while signed in. It will not come back on your other devices.'],
  },
  {
    problem: 'I closed What’s new and want to see it again',
    why: 'The tour only opens by itself once after each update.',
    fix: ['Open your account menu and choose What’s new to watch every update again.'],
  },
  {
    problem: 'I am new and did not see a What’s new tour',
    why: 'What’s new shows what changed since you last visited. When you are new, everything is new, so there is no tour.',
    fix: ['Have a look at ELUM Docs to get started, and open What’s new from your account menu any time.'],
  },
  {
    problem: 'I do not get notifications',
    why: 'Notifications may be turned off in ELUM Account, or your browser or device is blocking them.',
    fix: ['Check Notifications in ELUM Account.', 'Allow notifications for the ELUM site in your browser’s settings.', 'Check Do Not Disturb or Focus is not on.'],
  },
  {
    problem: 'I get too many notifications',
    why: 'Every app can tell you about shares, comments and messages.',
    fix: ['Open Notifications in ELUM Account and turn off the ones you do not need.', 'Mute busy conversations in Type.'],
  },
  {
    problem: 'A notification opened the wrong thing',
    why: 'The thing it was about may have been deleted, or you no longer have access.',
    fix: ['Ask the person who shared it whether it is still there.'],
  },
  {
    problem: 'Someone cannot open what I shared',
    why: 'They may be signed in with a different address from the one you shared with.',
    fix: ['Ask which address they are signed in with, and share with that one.', 'Or ask them to add the address you used to their account in ELUM Account, Addresses.'],
  },
  {
    problem: 'Can people find my work with the link?',
    why: 'No. A link only opens for people you have shared with.',
    fix: ['Share with people by their address. Anyone else who gets the link sees that they do not have access.'],
  },
  {
    problem: 'I want to stop sharing something',
    why: 'Owners and editors can change who has access at any time.',
    fix: ['Open Share and remove the person. They lose access straight away.'],
  },
  {
    problem: 'ELUM is slow',
    why: 'Usually it is a slow connection, or lots of tabs open at once.',
    fix: ['Check your connection, or move closer to your Wi-Fi.', 'Close tabs you are not using.', 'Check the Status page in Browse to see if ELUM itself is having a slow moment.'],
  },
  {
    problem: 'I lost my connection while working',
    why: 'ELUM apps need to reach your account to save.',
    fix: ['Keep the page open. Write keeps your latest changes on the device and saves them when you are back online.', 'Do not reload until you are back online.'],
  },
  {
    problem: 'Can I use ELUM offline?',
    why: 'ELUM apps save to your account online, so they need a connection to work properly.',
    fix: ['Download a copy of anything you will need while you are away, like a PDF of a document or design.'],
  },
  {
    problem: 'The page zooms in when I tap a box on my iPhone',
    why: 'Safari zooms into text boxes with very small text.',
    fix: ['Pinch out to zoom back. ELUM uses text big enough to avoid this, so let us know where it happens.', 'Check Page Zoom in Safari’s aA menu is set to 100%.'],
  },
  {
    problem: 'Private browsing forgets everything',
    why: 'Private windows throw away what sites save when you close them, including your sign-in and your settings on that device.',
    fix: ['That is how private browsing works. Use a normal window if you want ELUM to remember you.', 'In Safari, some private windows also block storage. If an app will not sign in, try a normal window.'],
  },
  {
    problem: 'An ELUM app looks broken in my browser',
    why: 'An old browser, or an extension, can stop parts of the page from working.',
    fix: ['Update your browser.', 'Turn off ad blockers or other extensions for elum.space and reload.', 'Try another browser to see if it is the browser or the app.'],
  },
  {
    problem: 'The page is blank',
    why: 'The app did not finish loading, often because of a dropped connection or a browser extension.',
    fix: ['Reload the page.', 'Turn off extensions for elum.space.', 'Check the Status page in Browse.'],
  },
  {
    problem: 'Text is too small or too big',
    why: 'Your browser’s zoom or your device’s text size changes how ELUM looks.',
    fix: ['Press Ctrl and 0 (Cmd and 0 on a Mac) to reset the zoom.', 'On phones, change text size in your device’s display settings.'],
  },
  {
    problem: 'Does ELUM use AI?',
    why: 'No. ELUM apps run without AI, and what you make in them is made by you. Nothing you write, send or make is used to train AI.',
    fix: ['Nothing to fix. If something ever looks like it was written by AI, let us know.'],
  },
  {
    problem: 'Where is my data kept?',
    why: 'Your account and your work are kept in ELUM’s database and storage, and only you and people you share with can open them.',
    fix: ['To take your work with you, download it from each app.', 'To remove it all, delete your account from ELUM Account.'],
  },
  {
    problem: 'I cannot use a keyboard to get around',
    why: 'Every ELUM app can be used with a keyboard. Tab moves forward and Shift+Tab moves back.',
    fix: ['Press Tab to move through buttons and links, and Enter or Space to choose one.', 'Press Esc to close windows and menus.'],
  },
  {
    problem: 'An ELUM app is in the wrong language',
    why: 'ELUM apps are in English for now.',
    fix: ['Your browser’s translate feature can help in the meantime.'],
  },
  {
    problem: 'Animations make me feel unwell',
    why: 'Some ELUM pages use motion to show how things work.',
    fix: ['Turn on Reduce motion in your device’s accessibility settings, or in ELUM Account, Preferences. ELUM then keeps things still.'],
  },
  {
    problem: 'Tune is not open yet',
    why: 'Tune, ELUM’s music service, is on the way.',
    fix: ['Keep an eye on ELUM Store. It will have a Get button the day it opens.'],
  },
  {
    problem: 'Sign in with a passkey opens a QR code',
    why: 'Your browser could not find a passkey on this device, so it offers to use one on your phone.',
    fix: ['Scan the code with the phone that has your passkey, and follow the steps on the phone.', 'Or close it and sign in with your password.'],
  },
  {
    problem: 'Two-device approval keeps asking on every sign-in',
    why: 'With approvals on, every new device or browser needs approving once. Clearing your browser’s data makes it new again.',
    fix: ['Avoid clearing site data for elum.space if you can.', 'Private windows count as new each time, so use a normal window.'],
  },
  {
    problem: 'My account email is out of date',
    why: 'Your addresses are kept in ELUM Account.',
    fix: ['Add the new address in Addresses and confirm it, then remove the old one.'],
  },
  {
    problem: 'ELUM says I am signed in somewhere I am not',
    why: 'An old session may still be open on a device you no longer use.',
    fix: ['Open ELUM Account, Security, and sign that device out.'],
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
