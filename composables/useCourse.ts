import courseData from "~/composables/courseData";

export const useCourse = () => {
	return {
		...courseData,
		chapters: courseData.chapters.map((chapter) => {
			return {
				...chapter,
				lessons: chapter.lessons.map((lesson) => {
					return {
						...lesson,
						path: `/course/${chapter.slug}/${lesson.slug}`,
					};
				}),
			};
		}),
	};
};
