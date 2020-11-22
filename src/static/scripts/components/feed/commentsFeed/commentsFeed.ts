import { linksToSpa } from "../../../utils/htmlStuff.js";
import { RedditApiType, SortCommentsOrder } from "../../../utils/types.js";
import Ph_Comment from "../../comment/comment.js";
import Ph_Toast, { Level } from "../../misc/toast/toast.js";
import Ph_Post from "../../post/post.js";

export default class Ph_CommentsFeed extends HTMLElement {
	postFullName: string;
	sort: SortCommentsOrder;

	constructor(comments: RedditApiType, post: Ph_Post) {
		super();

		this.classList.add("commentsFeed");

		this.sort = SortCommentsOrder[new URLSearchParams(location.search).get("sort") || "confidence"];

		for (const commentData of comments.data.children) {
			try {
				this.appendChild(new Ph_Comment(commentData, false, false, post));
			}
			catch (e) {
				console.error("Error making root comment");
				console.error(e);
				new Ph_Toast(Level.Error, "Error making comment");
			}
		}
	}

	insertParentLink(link: string, displayText: string) {
		const linkA = document.createElement("a");
		linkA.href = link;
		linkA.innerHTML = displayText;
		linkA.className = "parentCommentsLink";
		linksToSpa(linkA);
		this.insertAdjacentElement("afterbegin", linkA);
	}
}

customElements.define("ph-comments-feed", Ph_CommentsFeed);
