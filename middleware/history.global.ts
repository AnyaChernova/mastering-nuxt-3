import { defineNuxtRouteMiddleware } from '#imports';
import { useLocalStorage } from '@vueuse/core';

export default defineNuxtRouteMiddleware((to, from) => {
	// сбор истории посещения страниц для какой-нибудь аналитики
	// const navigationHistory = useLocalStorage('history', []);
	// navigationHistory.value.push(to.path);
});
