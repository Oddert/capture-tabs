# Capture Tabs

A simple little app for personal use intended to quickly process a series of "captured" URLs.

## Capturing

Following the framework described by David Allen in Getting Things Done, this application is intended to sort an incoming list of URLs into respective buckets based on what Next Action is required for each (if any).

Following 'proper' capturing involves taking each item at a time, in order of appearance, and making a decision as to where it should go. The idea is to avoid "threat scanning" - in which we skim a list of to-dos to find easy wins or likely high priorities and ignoring lower priority items - and getting too bogged down in each item, leading to distraction which can pull you off task.

When each item is evaluated it must be actioned here and now if (and only if) it can be actioned to completion within 2 minutes. Longer tasks need dedicated time and attention, but shorter ity-bitty items could create clutter.

If the item is not to be discarded and has a next action(s) that will take more than 2 minutes it is placed into a Next Action list or a project plan / definition. If it has no immediate Next Action it is 'incubated' for later by classing it as 'defer', 'delegate', 'someday / maybe', or a 'reference'.

### As URLs

Capture Tabs interprets GTD as follows:

1. **Discard**: Many URLs are expected to be discarded, these are quick searches or open documents that are not needed right now.
2. **Reference**: Some will need to be bookmarked, either as a reference or put into a 'read later' list.
  - I personally defined three 'read later' lists which are regularly scrubbed to avoid becoming clutter stores:
    1. **Priority**: These are items I'd really like to read soon as I believe they have some relevance to me.
    2. **Non-Timely Priority**: Same as above but without a time dimension, e.g. its not a news item which will become out of date if left too long.
    3. **Backlog**: Anything else which I'd like to get to but can treat much more casually. Also accounts for items I think I might loose interest in.
3. **Next Actions**: After this, it is expected that there may be actions or projects which the tab contains or points to which need something else to be done outside of that web page. The page might have been opened as a reminder, there might be something that needs to be written down or someone to contact etc. For these items we export a list with an optional note to be further processes by the user.

## Design Principle

We are using a keyboard-first interface to build this app, creating effectively a glorified CLI with a few extra web bits on-top.

The main navigation will use the arrow keys to quickly tab through the list of URL's building momentum and avoiding too much overthinking about their contents; capturing means deciding how something should be dealt with, not necessarily doing it now.

Actions for each URL will be triggered by keys such as "o" to open a URL in a new tab, or "b" to bookmark it. A CLI like input box at the bottom will also allow some commands to be triggered by the user without using the mouse.

## TODOs
- [ ] Add menus to the icons on each entry
- [ ] Investigate implementing a link preview
- [ ] Add a review mode
