import { defineEventHandler } from "h3";
import { Chapter, Course, CourseMeta, OutlineChapter, OutlineLesson } from '~/types/course';
import courseData from "~/server/courseData";

export default defineEventHandler((): CourseMeta => {
	const course: Course = courseData;
	const outline: OutlineChapter[] = course.chapters.reduce(
		(prev: OutlineChapter[], next: Chapter) => {
			const lessons: OutlineLesson[] = next.lessons.map((lesson) => ({
				title: lesson.title,
				slug: lesson.slug,
				number: lesson.number,
				path: `/course/${next.slug}/${lesson.slug}`,
			}));

			const chapter: OutlineChapter = {
				title: next.title,
				slug: next.slug,
				number: next.number,
				lessons,
			};

			return [...prev, chapter];
		},
		[]
	);

	return {
		title: course.title,
		chapters: outline,
	};
});
