<template>
	<div class="prose w-full max-w-2xl h-9">
		<h1 class="mb-5">Log in to {{ title }}</h1>
		<button
			class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
			@click="login"
		>
			Log in with Github
		</button>
	</div>
</template>

<script setup lang="ts">
import {
	navigateTo,
	useRoute,
	useSupabaseClient,
	useSupabaseUser,
	watchEffect,
} from "#imports";
import useCourse from '~/composables/useCourse';

const course = await useCourse();
const title = course.value.title;
const { query } = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(async () => {
	if (user.value) {
		await navigateTo(query.redirectTo as string, {
			replace: true,
		});
	}
});

const login = async () => {
	const redirectTo = `${window.location.origin}${query.redirectTo}`;
	const { error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: { redirectTo },
	});

	if (error) {
		console.error(error);
	}
};
</script>
