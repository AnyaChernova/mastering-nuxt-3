<template>
	<div class="prose w-full max-w-2xl h-9">
		<h1 class="mb-5">Log in to {{ course.title }}</h1>
		<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
			Log in with Github
		</button>
	</div>
</template>

<script setup lang="ts">
import { useCourse } from "~/composables/useCourse";

const course = useCourse();
</script>
