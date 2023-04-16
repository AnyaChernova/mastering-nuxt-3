import { defineNuxtRouteMiddleware } from "#imports";

export default defineNuxtRouteMiddleware(() => {
	// сбор истории посещения страниц для какой-нибудь аналитики
	// const navigationHistory = useLocalStorage('history', []);
	// navigationHistory.value.push(to.path);
});
