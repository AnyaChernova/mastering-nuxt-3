<template>
	<div class="mb-8 flex justify-between items-center w-full max-w-5xl">
		<h1 class="text-3xl">
			<span class="font-medium">
				<span class="font-bold">{{ course.title }}</span>
			</span>
		</h1>
		<UserCard />
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
			<NuxtErrorBoundary>
				<NuxtPage />
				<template #error="{ error }">
					<p>Oops! {{ error }}</p>
				</template>
			</NuxtErrorBoundary>
		</div>
	</div>
</template>

<script setup lang="ts">
import UserCard from "~/components/UserCard.vue";
import useCourse from '~/composables/useCourse';

const course = await useCourse();
</script>
