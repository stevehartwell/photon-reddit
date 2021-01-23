import { config } from "dotenv";
export const env = process.env.NODE_ENV || 'development';
if (env !== "production")
	config();

export const port = process.env.PORT || 8080;
export const __dirname = process.cwd();
export const tokenDuration = "permanent";
export const scope = ["edit", "flair", "history", "identity", "mysubreddits", "privatemessages", "read", "save", "submit", "subscribe", "vote", "wikiread"];

// Configure middlewares
export const commonRateLimitConfig = {
	message: "A little fast hugh?",
	headers: false
}
export const basicRateLimitConfig = {
	windowMs: 30 * 1000,
	max: 30,
	...commonRateLimitConfig
};
export const redditTokenRateLimitConfig = {
	windowMs: 60 * 1000,
	max: 5,
	...commonRateLimitConfig
};
export const analyticsRateLimitConfig = {
	windowMs: 40 * 1000,
	max: 15,
	message: "A little fast hugh?",
	headers: false
};
