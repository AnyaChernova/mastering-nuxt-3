<template>
	<div class="flex justify-center items-center w-full mb-10">
		<h1 class="text-3xl">
			<span class="font-medium">
				<span class="font-bold">Course</span>
			</span>
		</h1>
	</div>
	<div class="flex justify-center grow">
		<div
			class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
		>
			<h3 class="font-medium mb-5">Chapters</h3>
			<div
				v-for="chapter in course.chapters"
				:key="chapter.slug"
				class="space-y-1 mb-4 flex flex-col"
			>
				<h4 class="flex justify-between items-center">
					{{ chapter.title }}
				</h4>
				<NuxtLink
					v-for="(lesson, index) in chapter.lessons"
					:key="lesson.slug"
					class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
					:to="lesson.path"
					:class="{
						'text-blue-500': lesson.path === $route.fullPath,
						'text-gray-600': lesson.path !== $route.fullPath,
					}"
				>
					<span class="text-gray-500">{{ index + 1 }}.</span>
					<span>{{ lesson.title }}</span>
				</NuxtLink>
			</div>
		</div>
		<div class="prose p-12 bg-red-100 rounded-md max-w-[80ch]">
			<NuxtPage />
		</div>
	</div>
</template>

<script setup>
import { useCourse } from "@/composables/useCourse";

const course = useCourse();
</script>
