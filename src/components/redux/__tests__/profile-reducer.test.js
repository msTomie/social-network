import profileReducer, {
	addPostActionCreator,
	deletePost,
} from "../profile-reducer";
import {expect, jest, test} from '@jest/globals';

let state = {
	posts: [
		{ message: "Hello", like: 5 },
		{ message: "hi, it's me", like: 10 },
		{ message: "How are you?", like: 30 },
	],
};

test("length pf posts should be incremented", () => {
	let action = addPostActionCreator("fffgsrgrstgregt");

	let newState = profileReducer({ state }, { action });
	expect(newState.posts.length).toBe(4);
});

test("message of new post shoild be correct", () => {
	let action = addPostActionCreator("fffgsrgrstgregt");

	let newState = profileReducer({ state }, { action });

	expect(newState.posts[4].message).toBe("rthrtgrtgr");
});

test("after deleting length of messages should be decrement", () => {
	let action = deletePost(1);

	let newState = profileReducer({ state }, { action });

	expect(newState.posts.length).toBe(3);
});
test("after deleting length shouldn't be decrement if id is incorrect", () => {
	let action = deletePost(1000);

	let newState = profileReducer({ state }, { action });

	expect(newState.posts.length).toBe(3);
});
