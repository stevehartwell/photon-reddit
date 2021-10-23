import { $class } from "../../../utils/htmlStatics";
import { makeElement } from "../../../utils/utils";
import { photonWebVersion } from "../../../utils/version";
import Users from "../../multiUser/userManagement";
import Ph_Changelog from "../../photon/changelog/changelog";
import Ph_Tutorial from "../../photon/tutorial/tutorial";
import { FiltersSetting } from "./filtersSetting";
import Ph_PhotonSettings, { ImageLoadingPolicy, NsfwPolicy } from "./photonSettings";
import {
	BooleanSetting,
	HTMLElementSetting,
	MultiOptionSetting,
	NumberSetting,
	SettingsApi,
	SettingsSection,
	TimeSetting
} from "./photonSettingsData";

export const getSettingsSections = (): SettingsSection[] => [
	{
		name: "Post",
		iconUrl: "/img/post.svg",
		settings: [
			new BooleanSetting("markSeenPosts", "Mark seen posts", "Mark posts you have scrolled past. Seen posts are only stored in your browser.", SettingsApi.Photon),
			new BooleanSetting("hideSeenPosts", "Hide seen posts", "Hide posts marked as seen (above option). When viewing a user all posts are always visible.", SettingsApi.Photon),
			new TimeSetting({ allowRange: [1, Number.MAX_SAFE_INTEGER] }, "clearSeenPostAfterMs", "Store seen posts for", "Seen posts are stored for this time duration (format examples: 1y 13d, 6months 3 days, 1hour).", SettingsApi.Photon),
			new MultiOptionSetting([
				{ text: "Hide NSFW", value: NsfwPolicy.never },
				{ text: "Blur NSFW", value: NsfwPolicy.covered },
				{ text: "Show NSFW", value: NsfwPolicy.always },
			], "nsfwPolicy", "NSFW post visibility", "NSFW post visibility when viewing in feed. 1. Completely hidden 2. Blur + Warning on post 3. Normal visibility", SettingsApi.Photon)
		]
	},
	{
		name: "Filters",
		iconUrl: "/img/filter.svg",
		settings: [
			new FiltersSetting("subredditBlacklist", "Subreddits", "Posts from these subreddits will be hidden. They are still visible when visiting the actual subreddit.", SettingsApi.Photon, input => input.replace(/^\/?r\//, "")),
			new FiltersSetting("userBlacklist", "Users", "Posts from these users will be hidden. They are still visible when visiting the users profile.", SettingsApi.Photon, input => input.replace(/^\/?(u|user)\//, "")),
			new FiltersSetting("tileTextBlacklist", "Post Tile", "Posts where the title contains on of these keywords will be hidden.", SettingsApi.Photon),
			new FiltersSetting("flairTextBlacklist", "Flair", "Posts with flairs that contain on of these keywords will be hidden.", SettingsApi.Photon),
		]
	},
	{
		name: "Images",
		iconUrl: "/img/fileImage.svg",
		settings: [
			new MultiOptionSetting(
				[
					{ text: "Only previews", value: ImageLoadingPolicy.alwaysPreview },
					{ text: "Original in fullscreen", value: ImageLoadingPolicy.originalInFs },
					{ text: "Always originals", value: ImageLoadingPolicy.alwaysOriginal },
				], "imageLoadingPolicy", "Image previews", "Decide whether images in posts are loaded in max resolution or preview quality", SettingsApi.Photon
			),
		]
	},
	{
		name: "Videos",
		iconUrl: "/img/fileVideo.svg",
		settings: [
			new BooleanSetting("preferHigherVideoQuality", "Prefer higher video quality", "On: Use max resolution Off: Use lower resolution (if available) (360p, 480p)", SettingsApi.Photon),
			new BooleanSetting("autoplayVideos", "Autoplay videos", "Play videos when they are on screen.", SettingsApi.Photon),
			new BooleanSetting("globalVideoVolume", "Sync video volume", "When changing volume on video, sync volume to all other videos.", SettingsApi.Photon),
		]
	},
	{
		name: "General UI",
		iconUrl: "/img/settings2.svg",
		settings: [
			new BooleanSetting("loadInlineMedia", "Expand media previews", "Expand previews for links with media (e.g. imgur.com/..., reddit.com/.../.png).", SettingsApi.Photon),
			new NumberSetting({ allowRange: [0, Number.MAX_SAFE_INTEGER] }, "imageLimitedHeight", "Max media height", "Set the maximum height for images/videos in % of screen height. Set height to \"0\" to disable height limits.", SettingsApi.Photon),
			new BooleanSetting("displayRedditEmojis", "Display Reddit Emojis", "", SettingsApi.Photon),
			new BooleanSetting("firstShowControlBar", "Initially show bottom bar", "Initially show or hide controls bar on the bottom of images and videos.", SettingsApi.Photon),
			new BooleanSetting("enableFab", "Enable FAB", "Enable Floating Action Button (bottom left corner).", SettingsApi.Photon),
			new BooleanSetting("tooltipsVisible", "Show tooltips", "Toggle tooltips when hovering some UI elements.", SettingsApi.Photon),
		]
	},
	{
		name: "Reddit Prefs",
		iconUrl: "/img/settings2.svg",
		settings: [
			new HTMLElementSetting(makeElement("h3", {}, [
				makeElement("span", null, "Here are your Reddit Preferences from "),
				makeElement("a", {
					href: "https://old.reddit.com/prefs",
					target: "_blank",
					excludeLinkFromSpa: ""
				}, "https://old.reddit.com/prefs")
			])),
			new MultiOptionSetting([
				{ text: "Confidence", value: "confidence" },
				{ text: "Top", value: "top" },
				{ text: "New", value: "new" },
				{ text: "Controversial", value: "controversial" },
				{ text: "Old", value: "old" },
				{ text: "Random", value: "random" },
				{ text: "Q & A", value: "qa" },
				{ text: "Live", value: "live" },
			], "default_comment_sort", "Default Comment Sort", "", SettingsApi.Reddit),
			new BooleanSetting("enable_followers", "Enable Followers", "Allow people to follow you.", SettingsApi.Reddit),
			new BooleanSetting("hide_from_robots", "Hide Profile from Search Engines", "Hide your profile from search results (like Google, Bing, DuckDuckGo, ...)", SettingsApi.Reddit),
			new BooleanSetting("ignore_suggested_sort", "Ignore Suggested Sort", "Ignore suggested sort set by subreddit moderators.", SettingsApi.Reddit),
			new NumberSetting({ allowRange: [1, 500] }, "num_comments", "Number of Comments", "Number of comments to load when viewing a post.", SettingsApi.Reddit),
			new NumberSetting({ allowRange: [1, 100] }, "numsites", "Number of loaded Posts", "Number of posts loaded when viewing a subreddit or scrolling.", SettingsApi.Reddit),
			new BooleanSetting("over_18", "Over 18", "Enable to show NSFW posts", SettingsApi.Reddit),
			new BooleanSetting("search_include_over_18", "Include NSFW results in searches", "", SettingsApi.Reddit),
			new BooleanSetting("show_presence", "Show Online Status", "Other people can see if you are online.", SettingsApi.Reddit)
		]
	},
	{
		name: "Other",
		iconUrl: "/img/circle.svg",
		settings: [
			new BooleanSetting("isIncognitoEnabled", "Incognito mode", "Randomize the tab title & url.", SettingsApi.Photon),
			new TimeSetting({ allowRange: [1, Number.MAX_SAFE_INTEGER] }, "clearFeedCacheAfterMs", "Subreddit info cache duration", "", SettingsApi.Photon),
			new TimeSetting({ allowRange: [1, Number.MAX_SAFE_INTEGER] }, "userShortCacheTTLMs", "Short Cache Duration", "For your subscriptions", SettingsApi.Photon),
			new TimeSetting({
				allowRange: [1000 * 10, Number.MAX_SAFE_INTEGER],
				allowList: [0]
			}, "messageCheckIntervalMs", "New messages checking interval", "Use \"0\" to disable. Min intervall is 10s. Message polling is only done while website is open.", SettingsApi.Photon),
			new HTMLElementSetting(makeElement("div", null, [
				makeElement("button", {
					class: "button",
					onclick: () => Users.global.clearSeenPosts()
				}, "Clear seen posts"),
				makeElement("button", { class: "button", onclick: () => Ph_Changelog.show() }, "Show Changelog"),
				makeElement("button", {
					class: "button", onclick() {
						($class("photonSettings")[0] as Ph_PhotonSettings).hide();
						new Ph_Tutorial();
					}
				}, "Start Tutorial"),
				makeElement("div", null, `v${photonWebVersion}`)
			])),
		]
	},
];