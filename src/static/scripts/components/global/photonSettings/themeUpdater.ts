
import { UiTheme } from "./settingsConfig";

export function setTheme(theme: UiTheme) {
	const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
	metaColorScheme.setAttribute('content', theme);
}

export function currentTheme(): UiTheme {
	const darkQuery = '(prefers-color-scheme: dark)';
	if (window.matchMedia && window.matchMedia(darkQuery).matches) {
		return UiTheme.dark;
	}
	return UiTheme.light;
}
