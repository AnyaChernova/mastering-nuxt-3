import useFetchWithCache from "~/composables/useFetchWithCache";
import { LessonWithPath } from "~/types/course";

export default async (chapterSlug: string, lessonSlug: string) =>
	useFetchWithCache<LessonWithPath>(`/api/course/${chapterSlug}/${lessonSlug}`);
