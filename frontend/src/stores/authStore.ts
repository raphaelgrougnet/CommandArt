// src/stores/transactions.ts
import {defineStore} from 'pinia';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import mitt from 'mitt';
import type {User} from "@/types/User";
import {useCategoryStore} from "@/stores/categoryStore";

const emitter = mitt();

const urlBase = "http://localhost:5000";

export const useAuthStore = defineStore('auth',{
    state: () => ({
        currentUser : null as User | null,
        token: null as string | null,
        isLogged: false,
    }),
    actions: {
        async checkEmailExists(email: string) {
            try{
                const response = await fetch(`${urlBase}/checkEmailExists`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email
                    })
                });
                if (!response.ok) {
                    if (response.status === 500) {
                        toast.error(`Erreur interne lors de la vérification de l'email`);
                        return null;
                    }
                    if (response.status === 400) {
                        //Email déjà utilisé
                        return true;
                    }
                    else
                        return null;
                }
                //Email non utilisé
                return false;

            }
            catch (error) {
                toast.error(`Une erreur est survenue lors de la vérification de l'email`);
            }
            return null;
        },
        async login(username: string, password: string) {
            try{
                const response = await fetch(`${urlBase}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });
                const data = await response.json();
                if (!response.ok) {
                    if (response.status === 500) {
                        toast.error(`Erreur interne lors de la connexion`);
                    }
                    else if (response.status === 401) {
                        return false;
                    }
                    else
                        toast.error(`Erreur lors de la connexion : ${data.message}`);
                    return;
                }
                this.isLogged = true;
                this.currentUser = data.user;
                this.token = data.token;
                return true;
            }
            catch (error) {
                toast.error(`Une erreur est survenue lors de la connexion`);
            }
        },
        async register(email: string, username: string, password: string) {
            try{
                const response = await fetch(`${urlBase}/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        username: username,
                        password: password
                    })
                });
                const data = await response.json();
                if (!response.ok) {
                    if (response.status === 500) {
                        toast.error(`Erreur interne lors de l'inscription`);
                    }
                    else{
                        toast.error(`${response.status} : ${data.message}`);
                    }
                    return;
                }
                this.isLogged = true;
                this.currentUser = data.user;
                this.token = data.token;
                return true;
            }
            catch (error) {
                toast.error(`Une erreur est survenue lors de l'inscription`);
            }

        },
        async updateUser(username: string, address: string, password: string) {
            try{
                const response = await fetch(`${urlBase}/updateUser`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.token}`
                    },
                    body: JSON.stringify({
                        username: username,
                        address: address,
                        password: password
                    })
                });
                const data = await response.json();
                if (!response.ok) {
                    if (response.status === 500) {
                        toast.error(`Erreur interne lors de la mise à jour de l'utilisateur`);
                    }
                    if (response.status === 404 || response.status === 401) {
                        await this.logout();
                    }
                    else{
                        toast.error(`${response.status} : ${data.message}`);
                    }
                    return;
                }
                this.currentUser = data.user;
                toast.success(`Utilisateur mis à jour`);
                return true;
            }
            catch (error) {
                toast.error(`Une erreur est survenue lors de la mise à jour de l'utilisateur`);
            }
        },
        async getCurrentUser() {
            try{
                const response = await fetch(`${urlBase}/currentUser`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.token}`
                    }
                });
                const data = await response.json();
                if (!response.ok) {
                    if (response.status === 500) {
                        toast.error(`Erreur interne lors de la récupération de l'utilisateur`);
                    }
                    if (response.status === 404 || response.status === 403 || response.status === 401) {
                        await this.logout();
                    }
                    else
                        toast.error(`${response.status} : ${data.message}`);
                    return;
                }
                this.currentUser = data.user;
                return true;
            }
            catch (error) {
                toast.error(`Une erreur est survenue lors de la récupération de l'utilisateur`);
            }
        },
        async logout() {
            const categoryStore = useCategoryStore();

            this.isLogged = false;
            this.currentUser = null;
            this.token = null;
            await categoryStore.logout();
            emitter.emit('navigate', '/login');
        },

    },
    persist: {
        storage: window.localStorage
    }
});

export function getEmitter() {
    return emitter;
}

