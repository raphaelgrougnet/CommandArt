<script setup lang="ts">
  import Navbar from "@/components/Navbar.vue";
  import type {NavbarLinks} from "@/types/NavbarLinks";
  import {useOrderStore} from "@/stores/orderStore";
  import {computed, onMounted, ref} from "vue";
  import CardOrder from "@/components/CardOrder.vue";
  import CardOrderPlaceholder from "@/components/CardOrderPlaceholder.vue";

  const orderStore = useOrderStore();
  const links: NavbarLinks[] = [
    {
      name: 'Accueil',
      route: 'home',
      isActive: true
    },
    {
      name: 'Catégories',
      route: 'categories',
      isActive: false,
      isForAdmin: true
    }
  ]
  const isFetchOrderLoading = ref(false)
  const orders = computed(() => orderStore.orders);
  const currentPage = ref(1);
  const itemsPerPage = 6;

  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return orders.value.slice(start, end);
  });

  const totalPages = computed(() => Math.ceil(orders.value.length / itemsPerPage));

  onMounted(async () => {
    isFetchOrderLoading.value = true;
    await orderStore.fetchOrders();
    isFetchOrderLoading.value = false;
  });

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };
</script>

<template>
  <Navbar :links="links"/>
  <div class="container mt-4">
    <h1 class="text-center fw-bold ">Liste des commandes</h1>
  </div>
  <div class="card-grid container mt-5" v-if="isFetchOrderLoading">
    <CardOrderPlaceholder v-for="order in itemsPerPage" :key="order"/>
  </div>
  <div class="card-grid container mt-5" v-else>
    <CardOrder v-for="order in paginatedOrders"
               :key="order.id"
               :title="order.name"
               :cost="order.cost.toString()"
               :category="order.category.name"
               :date="new Date(order.limitDate).toLocaleDateString()"
               :description="order.description"
    />
  </div>
  <nav aria-label="navigation" class="d-flex justify-content-center mt-5">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link"  @click.prevent="goToPage(currentPage - 1)">Précédent</button>
      </li>
      <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
        <button class="page-link" @click.prevent="goToPage(page)">{{ page }}</button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button class="page-link" @click.prevent="goToPage(currentPage + 1)">Suivant</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .pagination {
    .page-item {
      .page-link {
        color: #0f172a;
        background-color: white;
        border: 1px solid #0f172a;

        &:focus {
          box-shadow: none;
        }
      }

      &.disabled{
        .page-link {
          pointer-events: none;
          opacity: 0.6;
          color: #0f172a;
        }
      }

      &.active {
        .page-link {
          background-color: #0f172a;
          border-color: #0f172a;
          color: white;
        }
      }
    }
  }
</style>