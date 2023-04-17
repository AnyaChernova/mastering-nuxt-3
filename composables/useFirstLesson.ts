import useCourse from "~/composables/useCourse";

export default async () => {
	const course = await useCourse();
	return course.value.chapters[0].lessons[0];
};
