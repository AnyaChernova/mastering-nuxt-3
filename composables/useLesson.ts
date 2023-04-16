import { createError, useFetch } from "#imports";

export default async (chapterSlug: string, lessonSlug: string) => {
	const { data, error } = await useFetch(
		`/api/course/${chapterSlug}/${lessonSlug}`
	);

	if (error.value) {
		throw createError({
			...error.value,
			statusMessage: `Could not fetch lesson ${lessonSlug} in ${chapterSlug}`,
		});
	}

	return data;
};
