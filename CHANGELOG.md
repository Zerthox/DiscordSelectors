## 0.2.4 - (upcoming)
Fixes for the discord update adding the BG element & rerolling classes for the Members List & List Item Component.

- Add `bg` selector *(Discord update)*

## 0.2.3 - (2019-09-27)
Addition of User Summary selectors & small fix for the changes to chat.

- Add User Summary selectors:
	- Added `userSummaryContainer`, `userSummaryIcon`, `userSummaryAvatarContainer`, `userSummaryAvatarContainerMasked`, `userSummaryAvatar`, `userSummaryAvatarClickable`, `userSummaryEmptyUser`, `userSummaryMoreUsers`
- Update Chat selectors *(Discord update)*:
	- Added `chatContent`
	- Renamed `chatContent` to `chatContentWrapper`

## 0.2.2 - (2019-09-21)
Addition of Activity Panel (Go-Live-Panel) selectors & updates for the Friends Table Action Button selectors.

- Add Activity Panel selectors:
	- Added `activityPanel`, `activityPanelBody`, `activityPanelGameWrapper`, `activityPanelGameWrapperClickable`, `activityPanelGameIcon`, `activityPanelGameName`, `activityPanelActions`
- Update Friends Table Action selectors:
	- Added `friendsActionDisabled`, `friendsActionDeny`
	- Updated `friendsActionAccept`
	- Removed `friendsActionAdd`, `friendsActionVideoCall`, `friendsActionVoiceCall`, `friendsActionRemove`, `friendsActionCancel`, `friendsActionIgnore`
- Add `channelTextAreaAttachButtonDivider` selector
- Add `userPopoutBodyInner` selector

## 0.2.1 - (2019-09-21)
New classes for the Discord update affecting several scrollers.

- Add `privateChannelsScroller` selector
- Add `libraryScroller` selector
- Add `storeHomeScroller`, `storeListingScroller` selectors
- Add `settingsSidebarScroller`, `settingsContentScroller`, `settingsContentSidebarScrollable`, `settingsContentSidebarScroller` selectors

## 0.2.0 - (2019-09-15)
Fixes for the major Discord UI update & additions of missing selectors.  
Private Channels & Members List now share common classes from the "ListItem" Component.

- Update Channels selectors *(Discord update)*:
	- Added `channelsSidebar`
	- Removed `channels`
- Update Channels List Panels selectors *(Discord update)*:
	- Added `panels`, `panelButtonEnabled`
	- Updated `panelButtonDisabled`
	- Removed `panelButtonIcon`
- Update Private Channels selectors *(Discord update)*:
	- Added `privateChannelsHeader`
	- Removed `privateChannelSelected`, `privateChannelNameWrapper`, `privateChannelName`, `privateChannelNameWithActivity`, `privateChannelActivity`, `privateChannelActivityIcon`, `privateChannelActivityIconForeground`, `privateChannelActivityMobileIndicator`, `privateChannelClose`
- Add List Item selectors *(Discord update)*:
	- Added `listItem`, `listItemSelected`, `listItemLayout`, `listItemAvatar`, `listItemContent`, `listItemNameAndDecorators`, `listItemName`, `listItemRoleColor`, `listItemChildren`, `listItemSubText`, `listItemActivity`, `listItemActivityText`, `listItemActivityIcon`, `listItemClose`
- Update Guild selectors *(Discord update)*:
	- Added `guildChildWrapper`
	- Renamed `guildAcronymSelected` to `guildLinkSelected`
	- Fixed `guildSeparator`
	- Removed `homeContainer`, `homeButton`, `homeButtonSelected`
- Update Friends List selectors *(Discord update)*:
	- Updated `friendsColumnNameDiscordTag`, `friendsColumnNameUsername`, `friendsColumnNameDiscriminator`
- Update Members List selectors *(Discord update)*:
	- Updated `memberOffline`
	- Removed `memberPopoutOpen`, `memberInner`, `memberContent`, `memberNameTag`, `memberUsername`, `memberActivity`, `memberActivityText`, `memberActivityIcon`, `memberActivityIconForeground`, `memberMobileIndicator`
- Update Message selectors *(Discord update)*:
	- Added `blockquoteContainer`, `blockquoteDivider`
	- Removed `message`, `messageCozy`
- Update ContextMenu selectors *(Discord update)*:
	- Added `subContextMenu`
	- Removed `contextMenuInvertChildX`
- Update Popout selectors *(Discord update)*:
	- Added `popoutTranslate`, `popoutAnimatorTop`, `popoutAnimatorBottom`, `popoutAnimatorLeft`, `popoutAnimatorRight`, `popoutAnimatorDidRender`, `guildHeaderPopoutItemBase`, `guildHeaderPopoutItemLeave`, `guildHeaderPopoutIconContainer`
	- Removed `statusPickerItem`
- Update Settings Content selectors:
	- Added `settingsToolsContainer`, `settingsTools`, `settingsCloseButtonContainer`, `settingsCloseButton`, `settingsCloseButtonKeybind`, `settingsUserAccount`, `settingsUserAccountSecurity`
- Add `channelTextAreaButton` selector

## 0.1.4 - (2019-07-28)
Fixes for the small changes to Guild Folder selectors and addition of missing Message selectors.

- Update Guild Folder selectors *(Discord update)*:
	- Added `guildFolderHover`
	- Removed `guildFolderBackgroundSelected`, `guildFolderMouseHover`, `guildFolderSelected`, `guildFolderExpanded`
- Add `messageCozy`, `messageCompact` selectors

## 0.1.3 - (2019-07-25)
Preemptive addition of new Guild Folder selectors and fixes for Guild Placeholder selectors.

- Add Guild Folder selectors:
	- Added `guildFolderWrapper`, `guildFolderBackground`, `guildFolderBackgroundCollapsed`, `guildFolderBackgroundSelected`, `guildFolder`, `guildFolderMouseHover`, `guildFolderSelected`, `guildFolderSelected`, `guildFolderIconWrapper`, `guildFolderClosedIconWrapper`, `guildFolderExpandedIconWrapper`, `guildFolderIcon`, `guildFolderIconSizeSmol`, `guildFolderGuildIcon`, `guildFolderNoIcon`, `guildFolderExpandedGuilds`
- Update Guild Placeholder selectors:
	- Added `guildPlaceholderMask`, `guildDragInner`
	- Removed `guildPlaceholder`

## 0.1.2 - (2019-07-21)
Fixes for the Discord update affecting Avatars & Statuses.

- Update Avatar selectors *(Discord update)*:
	- Updated `avatarWrapper`, `avatarMask`, `avatarImage`, `avatarProfile`
	- Removed `avatar`, `avatarInner`, `avatarSmall`, `avatarPopout`, `avatarMaskProfile`
- Update Status selectors *(Discord update)*:
	- Updated `statusMask`
	- Added `statusPointerEvents`, `statusCursorDefault`
	- Removed `status`, `statusProfile`, `statusOnline`, `statusIdle`, `statusDnd`, `statusOffline`, `statusInvisible`, `statusStreaming`
- Update Status Picker selectors *(Discord update)*:
	- Updated `statusPickerStatus`
	- Added `statusPickerStatusInner`
- Add `friendsTableStatus` selector *(Discord update)*
- Update Members List selectors *(Discord update)*:
	- Added new `memberContent` *(different element!)*
	- Removed `memberContent`
- Remove `colorblindMode` selector *(Discord update)*
- Add Switch selectors:
	- Added `switch`, `switchEnabled`, `switchDisabled`, `switchValue`, `switchValueChecked`, `switchValueUnckecked`, `switchSize`, `switchSizeDefault`, `switchSizeMini`, `switchThemeDefault`, `switchThemeClear`, `switchItem`, `switchCheckbox`, `switchCheckboxEnabled`, `switchCheckboxDisabled`
- Add `guildHeaderPopoutItemInvite` selector

## 0.1.1 - (2019-07-11)
Fixes for the Discord update affecting Popouts, Modals & Channel List Panels.

- Update Popout selectors *(Discord update)*
- Update Modal selectors *(Discord update)*
- Update Channel List Panels selectors *(Discord update)*
- Add `connectionPanelDescription` selector
- Rename `accountPanelAvatarWrapper` selector to `accountPanelAvatar`
- Add `accountPanelAvatarWrapper` selector
- Add `avatarImage` and `avatarInner` selectors

## 0.1.0 - (2019-07-11)
Initial pre-release.