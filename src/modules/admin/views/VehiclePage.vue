<script setup>
import { ref } from 'vue';
import CreatevehicleModal from '../components/vehciles/modals/CreatevehicleModal.vue'
const products = [
  {
    id: 1,
    name: 'Fusion',
    category: 'UI Kit',
    href: '#',
    price: '$49',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
    imageAlt:
      'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
  },
  // More products...
]

const openModal = ref(false)

const handleClickAddVehicle = () => {
    openModal.value = true
}

const handleCloseAddVehicleModal = () => {
    openModal.value = false
}

const handleNewVehicle = () => {

}

</script>
<template>
    <CreatevehicleModal :openModal="openModal" @closeModal="handleCloseAddVehicleModal" @saveVehicle="handleNewVehicle"/>
    <div class="w-full bg-gray-200">
        <div class="mx-auto max-w-2xl  py-4 px-4 lg:max-w-7xl lg:px-0">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Vehicle List</h1>
          <p class="mt-2 text-sm text-gray-500">All publish and draft vehciles.</p>
        </div>
    </div>
    <div class="w-full shadow-md">
        <div class="mx-auto max-w-2xl  py-4 px-4 lg:max-w-7xl lg:px-0">
            <button type="button" @click="handleClickAddVehicle" class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add Vehicle
            </button>
        </div>
    </div>
        
    <div class=" ">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-4">
      <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        <div v-for="product in products" :key="product.id" class="group relative">
          <div class="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
            <img :src="product.imageSrc" :alt="product.imageAlt" class="object-cover object-center" />
            <div class="flex items-end p-4 opacity-0 group-hover:opacity-100" aria-hidden="true">
              <div class="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">View Product</div>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
            <h3>
              <a href="#">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ product.name }}
              </a>
            </h3>
            <p>{{ product.price }}</p>
          </div>
          <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
        </div>
      </div>
    </div>
    </div>
</template>