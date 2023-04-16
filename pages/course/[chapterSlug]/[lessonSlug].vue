<template>
	<h2 class="text-gray-500 font-medium">
		LESSON {{ chapter.number }} - {{ lesson.number }}
	</h2>
	<p class="font-medium">{{ chapter.title }}</p>
	<p class="text-violet-500 font-medium">{{ lesson.title }}</p>
	<p class="mt-5">
		<VideoPlayer v-if="lesson.videoId" :video-id="lesson.videoId" />
	</p>
	<p class="mt-5">
		{{ lesson.text }}
	</p>
	<p class="mt-5">
		<ClientOnly>
			<LessonCompleteBtn
				:model-value="isLessonComplete"
				@update:model-value="toggleComplete"
			/>
		</ClientOnly>
	</p>
</template>

<script setup>
import { useTitle, useLocalStorage } from "@vueuse/core";
import { useRoute, computed } from "#imports";
import VideoPlayer from "@/components/VideoPlayer";
import LessonCompleteBtn from "@/components/LessonCompleteBtn";
import { useCourse } from "@/composables/useCourse";

const course = useCourse();
const route = useRoute();

const chapter = computed(() => {
	return course.chapters.find(({ slug }) => slug === route.params.chapterSlug);
});

const lesson = computed(() => {
	return chapter.value.lessons.find(
		({ slug }) => slug === route.params.lessonSlug
	);
});

const title = computed(() => {
	return `${lesson.value.title}`;
});
useTitle(title);

const progress = useLocalStorage("progress", []);
const isLessonComplete = computed(() => {
	if (!progress.value[chapter.value.number - 1]?.[lesson?.value?.number - 1]) {
		return false;
	}
	return progress.value[chapter.value.number - 1][lesson.value.number - 1];
});
const toggleComplete = () => {
	if (!progress.value[chapter.value.number - 1]) {
		progress.value[chapter.value.number - 1] = [];
	}
	progress.value[chapter.value.number - 1][lesson.value.number - 1] =
		!isLessonComplete.value;
};
</script>
