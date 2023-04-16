import { defineEventHandler } from "h3";
import course from "~/server/courseData";
import { Chapter, Course, Lesson, LessonWithPath } from "~/types/course";
import { createError } from "#imports";

course as Course;

export default defineEventHandler((event): LessonWithPath => {
	const { chapterSlug, lessonSlug } = event.context.params;

	const chapter: Maybe<Chapter> = course.chapters.find(
		({ slug }) => slug === chapterSlug
	);

	if (!chapter) {
		throw createError({
			statusCode: 404,
			message: "Chapter not found",
		});
	}

	const lesson: Maybe<Lesson> = chapter.lessons.find(
		({ slug }) => slug === lessonSlug
	);

	if (!lesson) {
		throw createError({
			statusCode: 404,
			message: "Lesson not found",
		});
	}

	return {
		...lesson,
		path: `/course/${chapter.slug}/${lesson.slug}`,
	};
});
