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
    {
      problem: 'My document says it’s saved only in this browser',
      says: 'Saved in this browser only',
      why: 'Write couldn’t reach your ELUM account for a moment, so it kept your latest changes on this device to keep them safe.',
      fix: ['Check you’re online, then keep the document open for a few seconds. Write sends the changes to your account as soon as it can.', 'Don’t clear your browser’s data until the message goes away, or those changes could be lost.'],
    },
    {
      problem: 'Two of us edited at once and the text looks muddled',
      why: 'When two people change the same sentence at the same moment, Write keeps both changes, so words can end up side by side.',
      fix: ['Read the paragraph through and tidy it up together.', 'For big rewrites, agree who’s editing which part, or make a copy and merge later.'],
    },
    {
      problem: 'The person I invited never got an email',
      why: 'If they don’t have an ELUM account, Write sends an invite to the address you typed. It may be in their spam folder, or the address may have a typo.',
      fix: ['Ask them to check their spam folder.', 'Open Share and check the address. If it’s wrong, cancel the invite and add the right one.', 'Send them the link with Copy link. Once they sign up with that address, the document opens for them.'],
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
      problem: 'My citations aren’t in the right style',
      why: 'Each document has one citation style, and new citations follow whatever style is chosen in the citations panel.',
      fix: ['Open the citations panel and pick the style your teacher or publisher asks for. Every citation in the document updates.'],
    },
    {
      problem: 'Write feels slow in a very long document',
      why: 'Very long documents with lots of large pictures take more work for your browser to show.',
      fix: ['Close other tabs you aren’t using.', 'Make pictures smaller before you add them.', 'Split a very long piece into a few documents, such as one per chapter.'],
    },
    {
      problem: 'The keyboard covers what I’m typing on my phone',
      why: 'On small screens the on-screen keyboard takes up a lot of room.',
      fix: ['Scroll a little and Write keeps the line you’re typing in view.', 'Turn your phone sideways for a wider page.'],
    },
    {
      problem: 'I deleted a document by mistake',
      why: 'Deleting a document removes it from your account and from everyone it was shared with.',
      fix: ['If the document is still open in a tab, copy the text out straight away into a new document.', 'Ask anyone it was shared with whether they made a copy or downloaded it.'],
    },
    {
      problem: 'A template opened as a blank page',
      why: 'The template didn’t finish loading, often because the connection dropped for a moment.',
      fix: ['Go back to your documents, delete the empty one, and choose the template again.'],
    },
    {
      problem: 'Shared with me is empty',
      why: 'Nobody has shared a document with this account yet, or they shared it with a different address.',
      fix: ['Ask the person which address they used.', 'If it’s an address you own, add it to your account in ELUM Account, Addresses, and confirm it.'],
    },
    {
      problem: 'Spelling marks a word that’s right',
      why: 'The word isn’t in the dictionary yet, like a name or a word from another language.',
      fix: ['Right-click the word and add it to your dictionary. It’s saved to your account, so it works on every device.'],
    },
    {
      problem: 'Download as a web page looks plain',
      why: 'A web page copy keeps your words, headings and pictures, but your browser shows it with simpler styling.',
      fix: ['For a copy that looks exactly the same, download a PDF instead.'],
    },
    {
      problem: 'I can’t find a document I know I made',
      why: 'Search looks at document titles and owners’ names, not at the words inside.',
      fix: ['Search for the title, or for the owner’s name.', 'Switch between All documents, Mine and Shared with me.', 'Make sure you’re signed in to the same ELUM account you made it with.'],
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
      why: 'Some email services are careful with addresses they haven’t seen before.',
      fix: ['Ask the person to mark your message Not spam, and to add you to their contacts.', 'Keep your first messages simple, with a clear subject and not too many links.'],
    },
    {
      problem: 'Someone outside ELUM says my email never arrived',
      why: 'Their email service may have filtered it, or the address may have a typo.',
      fix: ['Check the address in your sent message.', 'Ask them to look in their spam or junk folder.', 'Send it again a few minutes later.'],
    },
    {
      problem: 'I don’t see the verified symbol next to someone',
      why: 'The verified symbol only shows for people writing from an ELUM account. Email from outside ELUM doesn’t have it.',
      fix: ['That’s expected for outside email. Be careful with links and attachments from people you don’t know.'],
    },
    {
      problem: 'A message went to Spam by mistake',
      why: 'Type thought it looked like spam, or you reported it by accident.',
      fix: ['Open Spam, choose the message, and choose Not spam. It goes back to your inbox.'],
    },
    {
      problem: 'I archived a conversation and can’t find it',
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
      why: 'Messages in Trash don’t stay forever, so your inbox doesn’t fill up.',
      fix: ['If you might need a message later, archive it instead of deleting it.'],
    },
    {
      problem: 'I can’t see pictures in an email',
      why: 'Type can hold back pictures from outside email so senders can’t tell when you open it.',
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
      fix: ['Reply to them once and they’ll be added.', 'Add the people you know in ELUM Account, People.'],
    },
    {
      problem: 'I don’t get notified about new messages',
      why: 'Notifications may be off in ELUM Account, in your browser, or for that one conversation.',
      fix: ['Check Notifications in ELUM Account.', 'Make sure your browser lets the Type site show notifications.', 'Check the conversation isn’t muted.'],
    },
    {
      problem: 'A link to a shared document in Type won’t open',
      why: 'The person shared it with a different address, or took you off the document.',
      fix: ['Ask them to share it again with the address you’re signed in with.'],
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
    {
      problem: 'I can’t find an older version of my design',
      why: 'Version history keeps the design as it was at different times. It’s in the History tab, not in Undo.',
      fix: ['Open the History tab on the right and pick a time to look at it.', 'Restore it if it’s the one you want. Your current design is kept as a version too, so nothing is lost.'],
    },
    {
      problem: 'Restoring a version undid someone else’s work',
      why: 'Restoring puts the whole design back to how it was, for everyone who shares it.',
      fix: ['Open History again and restore the newer version that has their work.', 'Next time, make a copy of the old version instead and take just the parts you need.'],
    },
    {
      problem: 'I can’t add a comment',
      why: 'You were shared the design as a viewer, or you aren’t signed in.',
      fix: ['Ask the owner to make you a commenter or an editor.', 'Check you’re signed in with the account the design was shared with.'],
    },
    {
      problem: 'A comment is pinned to the wrong place',
      why: 'Comments stay with the thing they’re on. If it moved or was deleted, the comment moves with it or ends up on the page.',
      fix: ['Reply in the comment to say what it’s about, or resolve it and add a new one in the right place.'],
    },
    {
      problem: 'My brand kit colours or fonts don’t show up',
      why: 'A brand kit belongs to your account. Someone you share with sees the design as it is, but not your kit in their own panel.',
      fix: ['Open the Brand tab and check you’re signed in to the account that made the kit.', 'Pick the colour from the kit again on anything that didn’t pick it up.'],
    },
    {
      problem: 'Changing my brand kit didn’t change my old designs',
      why: 'Designs keep the colours they were made with, so a change to the kit doesn’t surprise you in finished work.',
      fix: ['Open the design, select the parts, and choose the new colours from your kit.'],
    },
    {
      problem: 'A template looks different from its preview',
      why: 'Fonts and pictures load after the design opens, so it can look plain for a second.',
      fix: ['Give it a moment on a slow connection.', 'If pictures stay missing, reload the page. Your copy of the template is already saved.'],
    },
    {
      problem: 'I can’t find a design I starred',
      why: 'Starred designs show up together under Favourites on Make’s home page.',
      fix: ['Open Favourites on Make’s home page.', 'If it isn’t there, open the design and star it again.'],
    },
    {
      problem: 'My tags don’t filter anything',
      why: 'A tag only finds the designs you’ve added it to, and the spelling has to match.',
      fix: ['Open a design’s menu and check which tags it has.', 'Pick the tag from the list rather than typing it again, so you don’t end up with two similar tags.'],
    },
    {
      problem: 'Things won’t line up',
      why: 'Guides only appear while you drag, and a locked item doesn’t move.',
      fix: ['Drag slowly near the other item until the pink guide appears.', 'Check the item isn’t locked in the Layers tab.', 'Use the arrow keys to nudge it one step at a time.'],
    },
    {
      problem: 'I can’t select something under another item',
      why: 'The item on top is catching your clicks.',
      fix: ['Open the Layers tab and pick it from the list.', 'Or lock the item on top while you work underneath.'],
    },
    {
      problem: 'Text looks blurry in my PNG',
      why: 'A small page exported at a small size has fewer pixels to work with.',
      fix: ['Download as PDF for printing, which keeps text sharp at any size.', 'Use a larger page size when you start a design that will be printed.'],
    },
    {
      problem: 'Speaker notes don’t show while presenting',
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
      fix: ['Open Share on the copy to check who’s on it. Only you should be there until you add people.'],
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
    {
      problem: 'Images shows nothing',
      why: 'There may be no pictures for those words, or SafeSearch is hiding them.',
      fix: ['Try different or fewer words.', 'If you’re happy to, turn SafeSearch off under the search box.'],
    },
    {
      problem: 'A result I expected has been left out',
      why: 'Browse leaves out results that lead to AI chat products, and tells you when it does.',
      fix: ['That’s on purpose. If you think a result was left out by mistake, search with more exact words.'],
    },
    {
      problem: 'My recent searches don’t show up',
      why: 'Recent searches stay on this device only, and only while Remember searches on this device is on.',
      fix: ['Turn on Remember searches on this device under the search box.', 'On another device or in a private window, your recent searches won’t be there. That’s expected.'],
    },
    {
      problem: 'I want to clear my recent searches',
      why: 'They’re kept on this device so you can find things again.',
      fix: ['Start typing in the search box and remove any search from the list, or clear them all.', 'Turn off Remember searches on this device to stop keeping new ones.'],
    },
    {
      problem: 'Pressing / doesn’t jump to the search box',
      why: 'The shortcut doesn’t work while you’re typing in another box, or while a page in a tab has your keyboard.',
      fix: ['Click an empty part of Browse first, then press /.'],
    },
    {
      problem: 'A tab group won’t open',
      why: 'Clicking a group folds it away or opens it up again.',
      fix: ['Click the group’s name once to open it.', 'Right-click it for more options, like renaming or ungrouping.'],
    },
    {
      problem: 'Closing a tab closed the wrong one',
      why: 'The close button belongs to the tab it sits on, and tabs can shift as others close.',
      fix: ['Open the page again from your recent searches or the address.', 'Close tabs one at a time, waiting for the row to settle.'],
    },
    {
      problem: 'Status says an app isn’t working',
      why: 'The Status page checks each ELUM app and what they run on every minute.',
      fix: ['Wait a few minutes and check again. Most problems clear up quickly.', 'Your saved work is safe while an app is down.'],
    },
    {
      problem: 'Status keeps saying Checking',
      why: 'Browse couldn’t reach ELUM to ask, often because of a weak connection.',
      fix: ['Check you’re online, then reload the page.'],
    },
    {
      problem: 'A page in a tab looks squashed',
      why: 'Some sites are built for full browser windows.',
      fix: ['Choose Open in new window for that page.'],
    },
    {
      problem: 'Sign in in Browse doesn’t sign me in to a page in a tab',
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
      fix: ['Pinch out to zoom back.', 'Browse uses large enough text that this shouldn’t happen. If it keeps happening, check Safari’s Page Zoom in the aA menu is at 100%.'],
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
    {
      problem: 'Get doesn’t seem to do anything',
      why: 'The app may already be in your account, in which case Store shows Open instead.',
      fix: ['Look for Open where Get used to be.', 'If the button is still Get, reload the page and try again.'],
    },
    {
      problem: 'Get says something went wrong',
      says: 'Something went wrong. Please try again.',
      why: 'Store couldn’t reach your account for a moment.',
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
      fix: ['Delete the one you don’t need from Make’s home page.'],
    },
    {
      problem: 'Search in Store doesn’t find a template',
      why: 'Store search looks at names and descriptions.',
      fix: ['Try a simpler word, like poster, deck or post.', 'Open Templates to browse them all.'],
    },
    {
      problem: 'An app’s page says it isn’t working',
      why: 'Each app’s page uses the same check as the Status page.',
      fix: ['Try again in a few minutes. Your work in that app is safe.'],
    },
    {
      problem: 'I want to remove an app from my account',
      why: 'Getting an app just adds it to your list and your ring. Every app stays free either way.',
      fix: ['You don’t need to remove it. If you never open it, nothing changes.', 'To leave ELUM altogether, see deleting your account in ELUM Account.'],
    },
    {
      problem: 'Tune shows Coming soon',
      why: 'Tune, ELUM’s music service, isn’t open yet.',
      fix: ['Check back in Store. It will have a Get button the day it opens.'],
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
    {
      problem: 'I want to delete my account',
      why: 'You can leave ELUM whenever you like.',
      fix: ['Open ELUM Account and choose Delete account at the bottom of the menu.', 'Download anything you want to keep first: documents from Write and designs from Make.', 'Deleting your account removes your profile, your documents, your designs and your messages. It can’t be undone.'],
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
      why: 'No. Browse sends your search to Google to get results, and ELUM doesn’t keep them. Recent searches stay on your device.',
      fix: ['Clear recent searches in Browse, or turn off Remember searches on this device.'],
    },
    {
      problem: 'Who can see my picture',
      why: 'Under Privacy you choose whether everyone, only people you know, or nobody sees your picture.',
      fix: ['Open Privacy in ELUM Account and choose who sees your picture.'],
    },
    {
      problem: 'I added someone to a circle by mistake',
      why: 'Circles are just for you. People aren’t told which circle they’re in.',
      fix: ['Open People, find them, and move them to the right circle or remove them.'],
    },
    {
      problem: 'I blocked someone by mistake',
      why: 'Blocking stops someone from finding you or messaging you.',
      fix: ['Open People, then Blocked, and unblock them.'],
    },
    {
      problem: 'A device I don’t recognise is signed in',
      why: 'It could be an old phone or computer of yours, or someone who knows your password.',
      fix: ['Open Security and sign that device out.', 'Change your password straight away.', 'Turn on approvals for new sign-ins, so nobody can get in without your say-so.'],
    },
    {
      problem: 'I want to sign out of every device',
      why: 'Handy if you’ve lost a phone or used a shared computer.',
      fix: ['Open Security and choose to sign out everywhere.', 'If approvals are on, keep one trusted device signed in, or turn approvals off first.'],
    },
    {
      problem: 'My preferences didn’t carry over to another app',
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
      problem: 'I can’t start in the app I picked',
      why: 'Your start app is used when you sign in from ELUM Account.',
      fix: ['Check Preferences, Start in, and choose the app. Sign in from ELUM Account next time.'],
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
  {
    problem: 'I forgot my password',
    why: 'ELUM doesn’t have a Forgot password option yet.',
    fix: ['If you’re still signed in on another device, open ELUM Account, Security, and change your password there.', 'Try signing in with a passkey or an email link if you set one up.'],
  },
  {
    problem: 'Sign in says my email or password is wrong',
    why: 'There may be a typo, Caps Lock may be on, or you signed up with a different address.',
    fix: ['Check Caps Lock, and use the eye button to see what you typed.', 'Try your ELUM Type address instead of your email, or the other way round.', 'If you signed up with a passkey, choose Sign in with a passkey.'],
  },
  {
    problem: 'I keep getting sent back to the sign-in page',
    why: 'Your browser may be blocking the storage ELUM uses to remember that you’re signed in.',
    fix: ['Allow cookies and site data for elum.services in your browser’s settings.', 'Leave private browsing and try in a normal window.', 'Check the date and time on your device are set automatically.'],
  },
  {
    problem: 'Signing out of one app signed me out of all of them',
    why: 'You have one ELUM account, so signing out ends your session in every ELUM app on that device.',
    fix: ['That’s on purpose, so nobody can carry on in another app after you’ve left. Sign in again whenever you’re ready.'],
  },
  {
    problem: 'I signed in on a shared computer',
    why: 'Anyone using that computer after you could open your ELUM apps.',
    fix: ['Sign out from your account menu before you leave.', 'If you forgot, open ELUM Account, Security, on your own device and sign that computer out.'],
  },
  {
    problem: 'The number to approve isn’t on my other device',
    why: 'The approval shows up on devices that are already signed in and have an ELUM app open.',
    fix: ['Open any ELUM app on your other device, or reload it. The question “Is this you signing in?” appears.', 'Make sure that device is signed in to the same ELUM account.'],
  },
  {
    problem: 'None of the numbers match',
    why: 'You may be looking at an old request, or someone else is trying to sign in.',
    fix: ['Choose “No, it’s not me”. Then start signing in again on your new device and pick the number it shows now.', 'If you didn’t try to sign in, change your password.'],
  },
  {
    problem: 'The approval ran out before I picked a number',
    why: 'Each sign-in request only waits a short while, to keep your account safe.',
    fix: ['Start signing in again on the new device, and have your other device ready.'],
  },
  {
    problem: 'A nearby approval doesn’t show up',
    why: 'Nearby approvals only appear on your devices that are on the same network, like the same home Wi-Fi.',
    fix: ['Connect both devices to the same Wi-Fi.', 'Turn off any VPN for a moment, as it can make your devices look like they’re in different places.', 'Or pick the number on any signed-in device instead.'],
  },
  {
    problem: 'An approval popped up and I wasn’t signing in',
    why: 'Someone may know your password and is trying to get in. Approvals stopped them.',
    fix: ['Choose “No, it’s not me”.', 'Change your password in ELUM Account, Security.', 'Look at the devices list there and sign out anything you don’t recognise.'],
  },
  {
    problem: 'The ELUM phone app doesn’t show approvals',
    why: 'The phone app needs to be signed in, and allowed to send notifications.',
    fix: ['Open the ELUM app on your phone and make sure you’re signed in.', 'Allow notifications for it in your phone’s settings.', 'Open the app itself. Waiting approvals show up there even without a notification.'],
  },
  {
    problem: 'I don’t have another device to approve with',
    why: 'Approvals need a device that’s already signed in.',
    fix: ['If you can, approve with the email link instead. ELUM sends it to your account’s email.', 'If you get back in, consider turning approvals off until you have a second device.'],
  },
  {
    problem: 'The approval email link doesn’t work',
    says: 'That sign-in link has expired or was already used. Sign in again.',
    why: 'The link works once, for a short time, and only for the sign-in that asked for it.',
    fix: ['Start signing in again and ask for a new link.', 'Open the newest email if you asked more than once.'],
  },
  {
    problem: 'The approval email went to an address I can’t reach',
    why: 'ELUM sends it to your account’s main email.',
    fix: ['Approve with a signed-in device instead.', 'Once you’re in, update your addresses in ELUM Account, Addresses.'],
  },
  {
    problem: 'I can’t create a passkey',
    why: 'Your device or browser needs a screen lock, like a PIN, Face ID or Touch ID, to keep a passkey safe.',
    fix: ['Set a screen lock on your device.', 'Update your browser, then try again from ELUM Account, Security.', 'If a window opens and closes straight away, try another browser.'],
  },
  {
    problem: 'My passkey isn’t offered when I sign in',
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
    why: 'A passkey only works on the web address it was made for. If an ELUM app moved to a new address, the old passkey can’t be used there.',
    fix: ['Sign in with your password or an email link.', 'Then make a new passkey in ELUM Account, Security, and remove the old one.'],
  },
  {
    problem: 'I want to remove a passkey',
    why: 'You might have a lost or old device with a passkey on it.',
    fix: ['Open ELUM Account, Security, and remove it from your list of passkeys.', 'You can also delete it from your device’s password manager.'],
  },
  {
    problem: 'What’s new keeps showing me the same tour',
    why: 'Older versions of the apps remembered the tour on each device only. It’s now kept on your account.',
    fix: ['Close the tour once while signed in. It won’t come back on your other devices.'],
  },
  {
    problem: 'I closed What’s new and want to see it again',
    why: 'The tour only opens by itself once after each update.',
    fix: ['Open your account menu and choose What’s new to watch every update again.'],
  },
  {
    problem: 'I’m new and didn’t see a What’s new tour',
    why: 'What’s new shows what changed since you last visited. When you’re new, everything is new, so there’s no tour.',
    fix: ['Have a look at ELUM Docs to get started, and open What’s new from your account menu any time.'],
  },
  {
    problem: 'I don’t get notifications',
    why: 'Notifications may be turned off in ELUM Account, or your browser or device is blocking them.',
    fix: ['Check Notifications in ELUM Account.', 'Allow notifications for the ELUM site in your browser’s settings.', 'Check Do Not Disturb or Focus isn’t on.'],
  },
  {
    problem: 'I get too many notifications',
    why: 'Every app can tell you about shares, comments and messages.',
    fix: ['Open Notifications in ELUM Account and turn off the ones you don’t need.', 'Mute busy conversations in Type.'],
  },
  {
    problem: 'A notification opened the wrong thing',
    why: 'The thing it was about may have been deleted, or you no longer have access.',
    fix: ['Ask the person who shared it whether it’s still there.'],
  },
  {
    problem: 'Someone can’t open what I shared',
    why: 'They may be signed in with a different address from the one you shared with.',
    fix: ['Ask which address they’re signed in with, and share with that one.', 'Or ask them to add the address you used to their account in ELUM Account, Addresses.'],
  },
  {
    problem: 'Can people find my work with the link?',
    why: 'No. A link only opens for people you’ve shared with.',
    fix: ['Share with people by their address. Anyone else who gets the link sees that they don’t have access.'],
  },
  {
    problem: 'I want to stop sharing something',
    why: 'Owners and editors can change who has access at any time.',
    fix: ['Open Share and remove the person. They lose access straight away.'],
  },
  {
    problem: 'ELUM is slow',
    why: 'Usually it’s a slow connection, or lots of tabs open at once.',
    fix: ['Check your connection, or move closer to your Wi-Fi.', 'Close tabs you aren’t using.', 'Check the Status page in Browse to see if ELUM itself is having a slow moment.'],
  },
  {
    problem: 'I lost my connection while working',
    why: 'ELUM apps need to reach your account to save.',
    fix: ['Keep the page open. Write keeps your latest changes on the device and saves them when you’re back online.', 'Don’t reload until you’re back online.'],
  },
  {
    problem: 'Can I use ELUM offline?',
    why: 'ELUM apps save to your account online, so they need a connection to work properly.',
    fix: ['Download a copy of anything you’ll need while you’re away, like a PDF of a document or design.'],
  },
  {
    problem: 'The page zooms in when I tap a box on my iPhone',
    why: 'Safari zooms into text boxes with very small text.',
    fix: ['Pinch out to zoom back. ELUM uses text big enough to avoid this, so let us know where it happens.', 'Check Page Zoom in Safari’s aA menu is set to 100%.'],
  },
  {
    problem: 'Private browsing forgets everything',
    why: 'Private windows throw away what sites save when you close them, including your sign-in and your settings on that device.',
    fix: ['That’s how private browsing works. Use a normal window if you want ELUM to remember you.', 'In Safari, some private windows also block storage. If an app won’t sign in, try a normal window.'],
  },
  {
    problem: 'An ELUM app looks broken in my browser',
    why: 'An old browser, or an extension, can stop parts of the page from working.',
    fix: ['Update your browser.', 'Turn off ad blockers or other extensions for elum.services and reload.', 'Try another browser to see if it’s the browser or the app.'],
  },
  {
    problem: 'The page is blank',
    why: 'The app didn’t finish loading, often because of a dropped connection or a browser extension.',
    fix: ['Reload the page.', 'Turn off extensions for elum.services.', 'Check the Status page in Browse.'],
  },
  {
    problem: 'Text is too small or too big',
    why: 'Your browser’s zoom or your device’s text size changes how ELUM looks.',
    fix: ['Press Ctrl and 0 (Cmd and 0 on a Mac) to reset the zoom.', 'On phones, change text size in your device’s display settings.'],
  },
  {
    problem: 'Does ELUM use AI?',
    why: 'No. ELUM apps are built by people and run without AI. Nothing you write, send or make is used to train AI.',
    fix: ['Nothing to fix. If something ever looks like it was written by AI, let us know.'],
  },
  {
    problem: 'Where is my data kept?',
    why: 'Your account and your work are kept in ELUM’s database and storage, and only you and people you share with can open them.',
    fix: ['To take your work with you, download it from each app.', 'To remove it all, delete your account from ELUM Account.'],
  },
  {
    problem: 'I can’t use a keyboard to get around',
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
    problem: 'Tune isn’t open yet',
    why: 'Tune, ELUM’s music service, is on the way.',
    fix: ['Keep an eye on ELUM Store. It will have a Get button the day it opens.'],
  },
  {
    problem: 'Sign in with a passkey opens a QR code',
    why: 'Your browser couldn’t find a passkey on this device, so it offers to use one on your phone.',
    fix: ['Scan the code with the phone that has your passkey, and follow the steps on the phone.', 'Or close it and sign in with your password.'],
  },
  {
    problem: 'Two-device approval keeps asking on every sign-in',
    why: 'With approvals on, every new device or browser needs approving once. Clearing your browser’s data makes it new again.',
    fix: ['Avoid clearing site data for elum.services if you can.', 'Private windows count as new each time, so use a normal window.'],
  },
  {
    problem: 'My account email is out of date',
    why: 'Your addresses are kept in ELUM Account.',
    fix: ['Add the new address in Addresses and confirm it, then remove the old one.'],
  },
  {
    problem: 'ELUM says I’m signed in somewhere I’m not',
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
