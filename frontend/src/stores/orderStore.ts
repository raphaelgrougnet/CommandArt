import {defineStore} from "pinia";
import type {Order} from "@/types/Order";
import {toast} from 'vue3-toastify';

const urlBase = "http://localhost:5000";

export const useOrderStore = defineStore('order', {
    state : () => ({
        orders: [] as Order[]
    }),
    actions: {
        async fetchOrders() {
            try {
                const response = await fetch(`${urlBase}/order`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    if (response.status === 500) {
                        toast.error(`Erreur interne lors de la récupération des commandes`);
                    }
                    return;
                }
                const responseToJson = await response.json();
                this.orders = responseToJson.orders;
            } catch (error) {
                toast.error(`Une erreur est survenue lors de la récupération des commandes`);
            }
        }
    }
});