import {defineStore} from "pinia";
import type {Category} from "@/types/Category";
import {toast} from 'vue3-toastify';
import {useAuthStore} from "@/stores/authStore";

const urlBase = "http://localhost:5000";

export const useCategoryStore = defineStore('category', {
    state : () => ({
        categories: [] as Category[]
    }),
    actions: {
        async fetchCategories() {
            const authStore = useAuthStore();

            try {
                const foundUser = await authStore.getCurrentUser();
                if (!foundUser) {
                    return;
                }
                const response = await fetch(`${urlBase}/category`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authStore.token
                    }
                });
                if (!response.ok) {
                    if (response.status === 500) {
                        toast.error(`Erreur interne lors de la vérification de l'email`);
                    }
                    if (response.status === 401) {
                        await authStore.logout();
                    }
                }
                const responseToJson = await response.json();
                this.categories = responseToJson.categories;
            } catch (error) {
                toast.error(`Une erreur est survenue lors de la récupération des catégories`);
            }
        },
        async logout() {
            this.categories = [];
        }
    },
    persist: {
        storage: window.localStorage
    }
})