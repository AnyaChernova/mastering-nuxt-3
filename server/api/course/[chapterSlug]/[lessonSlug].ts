import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
	const { chapterSlug, lessonSlug } = event.context.params;
	return `Lesson ${lessonSlug} in ${chapterSlug}`;
});
