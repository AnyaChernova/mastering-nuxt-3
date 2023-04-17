<template>
	<h2 class="text-gray-500 font-medium">
		LESSON {{ chapter.number }} - {{ lesson.number }}
	</h2>
	<p class="font-medium">{{ chapter.title }}</p>
	<p class="text-violet-500 font-medium">{{ lesson.title }}</p>
	<div class="flex space-x-4 mt-2 mb-5">
		<NuxtLink
			v-if="lesson.sourceUrl"
			class="underline font-normal text-md text-gray-500"
			:to="lesson.sourceUrl"
		>
			Download Source Code
		</NuxtLink>
		<NuxtLink
			v-if="lesson.downloadUrl"
			class="underline font-normal text-md text-gray-500"
			:to="lesson.downloadUrl"
		>
			Download Video
		</NuxtLink>
	</div>
	<div class="mt-5">
		<VideoPlayer v-if="lesson.videoId" :video-id="lesson.videoId" />
	</div>
	<p class="mt-5">
		{{ lesson.text }}
	</p>
	<div class="mt-5">
		<ClientOnly>
			<LessonCompleteBtn
				v-if="user"
				:model-value="isCompleted"
				@update:model-value="toggleComplete"
			/>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
import { useTitle, useLocalStorage } from "@vueuse/core";
import {
	useRoute,
	computed,
	createError,
	definePageMeta,
	abortNavigation, useSupabaseUser,
} from '#imports';
import VideoPlayer from "@/components/VideoPlayer";
import LessonCompleteBtn from "@/components/LessonCompleteBtn";
import useLesson from '~/composables/useLesson';
import useCourse from '~/composables/useCourse';
import { useCourseProgress } from '~/stores/courseProgress';

definePageMeta({
	middleware: [
		async function ({ params }) {
			const course = await useCourse();

			const chapter = course.value.chapters.find(
				({ slug }) => slug === params.chapterSlug
			);

			if (!chapter) {
				return abortNavigation(
					createError({
						statusCode: 404,
						message: "Chapter not found",
					})
				);
			}

			const lesson = chapter.lessons.find(
				({ slug }) => slug === params.lessonSlug
			);

			if (!lesson) {
				return abortNavigation(
					createError({
						statusCode: 404,
						message: "Lesson not found",
					})
				);
			}
		},
		"auth",
	],
});

const user = useSupabaseUser();
const course = await useCourse();
const route = useRoute();
const { chapterSlug, lessonSlug } = route.params;
const lesson = await useLesson(chapterSlug as string, lessonSlug as string);
const store = useCourseProgress();
const { initialize, toggleComplete } = store;

initialize();

const chapter = computed(() => {
	return course.value.chapters.find(({ slug }) => slug === route.params.chapterSlug);
});

// Check if the current lesson is completed
const isCompleted = computed(() => {
	return store.progress?.[chapterSlug]?.[lessonSlug] || 0;
});

const title = computed(() => {
	return `${lesson.value.title}`;
});
useTitle(title);
</script>
