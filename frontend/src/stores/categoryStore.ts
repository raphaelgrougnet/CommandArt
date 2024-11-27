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
        async addCategory(name: string) {
            const authStore = useAuthStore();
            try {
                const foundUser = await authStore.getCurrentUser();
                if (!foundUser) {
                    return;
                }
                const response = await fetch(`${urlBase}/category`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authStore.token
                    },
                    body: JSON.stringify({name : name})
                });
                if (!response.ok) {
                    if (response.status === 500) {
                        toast.error(`Erreur interne lors de l'ajout de la catégorie`);
                    }
                    if (response.status === 401  || response.status === 403) {
                        await authStore.logout();
                    }
                    return
                }

                const responseToJson : {category: Category} = await response.json();

                this.categories.push(responseToJson.category);
                toast.success(`Catégorie ajoutée avec succès`);
            } catch (error) {
                toast.error(`Une erreur est survenue lors de l'ajout de la catégorie`);
            }
        },
        async deleteCategory(id: string) {
            const authStore = useAuthStore();
            try {
                const foundUser = await authStore.getCurrentUser();
                if (!foundUser) {
                    return;
                }
                const response = await fetch(`${urlBase}/category/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authStore.token
                    }
                });
                if (!response.ok) {
                    if (response.status === 500) {
                        toast.error(`Erreur interne lors de la suppression de la catégorie`);
                    }
                    if (response.status === 401  || response.status === 403) {
                        await authStore.logout();
                    }
                    return
                }
                this.categories = this.categories.filter((category) => category.id !== id);
                toast.success(`Catégorie supprimée avec succès`);
            } catch (error) {
                toast.error(`Une erreur est survenue lors de la suppression de la catégorie`);
            }
        },
        async editCategory(id: string, name: string) {
            const authStore = useAuthStore();
            try {
                const foundUser = await authStore.getCurrentUser();
                if (!foundUser) {
                    return;
                }
                const response = await fetch(`${urlBase}/category/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authStore.token
                    },
                    body: JSON.stringify({name : name})
                });
                if (!response.ok) {
                    if (response.status === 500) {
                        toast.error(`Erreur interne lors de la modification de la catégorie`);
                    }
                    if (response.status === 401  || response.status === 403) {
                        await authStore.logout();
                    }
                    return;
                }
                const responseToJson : {category: Category} = await response.json();

                this.categories = this.categories.map((category) => {
                    if (category.id === id) {
                        return responseToJson.category;
                    }
                    return category;
                });
                toast.success(`Catégorie modifiée avec succès`);
            } catch (error) {
                toast.error(`Une erreur est survenue lors de la modification de la catégorie`);
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