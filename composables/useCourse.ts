import courseData from "~/composables/courseData";

type Lesson = {
	title: string;
	slug: string;
	number: number;
	downloadUrl: string;
	videoId: number;
	text: string;
	sourceUrl?: string;
	path: string;
};

type Chapter = {
	title: string;
	slug: string;
	number: number;
	lessons: Lesson[];
};

type Course = {
	title: string;
	chapters: Chapter[];
};

export const useCourse = (): Course => {
	const chapters: Chapter[] = courseData.chapters.map((chapter: Chapter) => {
		const lessons: Lesson[] = chapter.lessons.map((lesson) => {
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
