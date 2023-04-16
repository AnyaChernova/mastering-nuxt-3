import courseData from "~/composables/courseData";
import { Chapter, Course, Lesson, LessonWithPath } from "~/types/course";

export const useCourse = (): Course => {
	const chapters: Chapter[] = courseData.chapters.map((chapter: Chapter) => {
		const lessons: LessonWithPath[] = chapter.lessons.map((lesson: Lesson) => {
			return {
				...lesson,
				path: `/course/${chapter.slug}/${lesson.slug}`,
			};
		});

		return {
			...chapter,
			lessons,
		};
	});

	return {
		...courseData,
		chapters,
	};
};
