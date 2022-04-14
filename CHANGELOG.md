# Changelog

###[1.2.3] (2020-04-13)

Bug fixes:
1. Fixed missing path when using `composer` on some environments.

###[1.2.2] (2022-04-08)

Bug Fixes:
1. editor and admins can now see private and draft videos
2. If you have only access to a specific channel (or set of channels) on dailymotion, this is reflected in your WordPress video search and you’re only shown videos (draft, public, private) you would have access to on the platform

###[1.2.1] (2022-03-29)

Bug fixes:
1. Can't save a post after latest update on Gutenberg
2. Layout stacking on Gutenberg (player with components like title or infocard)

###[1.2.0] (2022-02-03)

Bug fixes:
1. Old post meta removal when the user updating the content. If user is not update the post meta, the old post meta will not be removed.

Implemented enhancements:
1. Multiple video for manual embed on Gutenberg.
2. Anonymous tracking to track usage of the plugin.

###[1.1.1] (2022-01-11)

Bug fixes:
1. The playerId and manual embed in Gutenberg in previous versions was not working properly, it fixed in this version.

Implemented enhancements:
1. The Popup now adjusts to the size of window responsively.
2. PHPCS and WordPress coding standards have been updated. Now third party packages standard

Removed packages:
1. Removed PHP SDK Dailymotion.

###[1.1.0] (2021-12-03)

This release introduces the following changes:

1. Support for classic-editor using shortcodes generator.
2. Support for multiple embeds on classic-editor.
3. A new menu to update database from version 1.0.4 to 1.1.0.
4. Fixed the icon not showing in the left sidebar.
5. Separation general settings to automated embed and manual embed settings.

###[1.0.2] (2021-08-24)

This release fixed a bug that appears when debug mode is active and added a new feature for toggling automatic embed.

###[1.0.1] (2021-08-18)

This release adds several features and clarifications to the plugin:

- You can now see the labels of your players (on top of their unique ID) in the mandatory settings so it's easier to pick one
- We moved the channel selection to the content settings and clarified the video content recommendation uses cases covered by this section
- The plugin now supports WordPress roles : editors, authors, contributors can see part or all of the plugin whereas subscribers do not have access to it


###[1.0.0-16] (2021-07-22)

**Implemented enhancements:**
- Giving the access properly to Administrator, Editor, Author, and Subscriber
- Change the searching flow for manual embed
- Now as long as user logged in, they can choose which player id they want to use

###[1.0.0-15]

We skip this version for development flow

###[1.0.0-14] (2021-06-28)

**Implemented enhancements:**
- Changed some infos on general settings

**Fixed bugs:**
- Fixed the video when there is no player on the blocks list
- Avoid the error when data is empty or errors
- Get first owner if there are more than one owner to avoid error


###[1.0.0-13] (2021-06-23)

**Implemented enhancements:**
- Added playlist embed on Gutenberg

**Fixed bugs:**
- Fixed cookies expires time to make user stay logged in
- Fixed a wrong `sort` param on the front end for auto-embed


###[1.0.0-12] (2021-06-17)

**Implemented enhancements:**
- Added playlist-id to content settings

**Fixed bugs:**
- Fixed the private content bugs
- Fixed the activation process flow


###[1.0.0-11] (2021-06-17)

**Implemented enhancements:**
- Login page to connect to Dailymotion account to consume private content 

**Fixed bugs:**
- Fixed the pagination on video search 
- Fixed the position of the player on the front-end
- Fixed the vertical thumbnail view


###[1.0.0-10] (2021-06-10)

**Implemented enhancements:**
- Added submenu to store API Key
- Update some details in general settings

**Fixed bugs:**
- Fixed fetch private content
- Fixed connect to Dailymotion account
- Fixed editing preview in Gutenberg
