import { defineEventHandler } from "h3";
import course from "~/server/courseData";
import { createError } from "#imports";

export default defineEventHandler((event) => {
	const { chapterSlug, lessonSlug } = event.context.params;

	const chapter = course.chapters.find(({ slug }) => slug === chapterSlug);

	if (!chapter) {
		throw createError({
			statusCode: 404,
			message: "Chapter not found",
		});
	}

	const lesson = chapter.lessons.find(({ slug }) => slug === lessonSlug);

	if (!lesson) {
		throw createError({
			statusCode: 404,
			message: "Lesson not found",
		});
	}

	return lesson;
});
