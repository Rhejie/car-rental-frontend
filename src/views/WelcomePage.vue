<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
    <div class="bg-white">
        <!-- Mobile menu -->
        <TransitionRoot as="template" :show="mobileMenuOpen">
            <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileMenuOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel
                            class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                            <div class="flex px-4 pt-5 pb-2">
                                <button type="button"
                                    class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                    @click="mobileMenuOpen = false">
                                    <span class="sr-only">Close menu</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <!-- Links -->
                            <TabGroup as="div" class="mt-2">
                                <div class="border-b border-gray-200">
                                    <TabList class="-mb-px flex space-x-8 px-4">
                                        <Tab as="template" v-for="category in navigation.categories"
                                            :key="category.name" v-slot="{ selected }">
                                            <button
                                                :class="[selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent', 'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium']">{{
                                                        category.name
                                                }}</button>
                                        </Tab>
                                    </TabList>
                                </div>
                                <TabPanels as="template">
                                    <TabPanel v-for="category in navigation.categories" :key="category.name"
                                        class="space-y-12 px-4 py-6">
                                        <div class="grid grid-cols-2 gap-x-4 gap-y-10">
                                            <div v-for="item in category.featured" :key="item.name"
                                                class="group relative">
                                                <div
                                                    class="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                    <img :src="item.imageSrc" :alt="item.imageAlt"
                                                        class="object-cover object-center" />
                                                </div>
                                                <a :href="item.href"
                                                    class="mt-6 block text-sm font-medium text-gray-900">
                                                    <span class="absolute inset-0 z-10" aria-hidden="true" />
                                                    {{ item.name }}
                                                </a>
                                                <p aria-hidden="true" class="mt-1 text-sm text-gray-500">Shop now</p>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>

                            <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                                    <a  @click="handleClickPage(page.name)" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name
                                    }}</a>
                                </div>
                            </div>

                            <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                                <div class="flow-root">
                                    <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Create an account</a>
                                </div>
                                <div class="flow-root">
                                    <router-link to="/login" class="-m-2 block p-2 font-medium text-gray-900">Sign in</router-link>
                                </div>
                            </div>

                            <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                                <!-- Currency selector -->
                                <form>
                                    <div class="inline-block">
                                        <label for="mobile-currency" class="sr-only">Currency</label>
                                        <div
                                            class="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                                            <select id="mobile-currency" name="currency"
                                                class="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800">
                                                <option v-for="currency in currencies" :key="currency">{{ currency }}
                                                </option>
                                            </select>
                                            <div
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                                <ChevronDownIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Hero section -->
        <div class="relative bg-gray-900">
            <!-- Decorative image and overlay -->
            <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
                <img src=".././assets/suv2.webp" alt=""
                    class="h-full w-full object-cover object-center" />
            </div>
            <div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50" />

            <!-- Navigation -->
            <header class="relative z-10">
                <nav aria-label="Top">
                    <!-- Top navigation -->
                    <div class="bg-gray-900">
                        <div class="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <!-- Currency selector -->
                            <form>
                                <div>
                                    <label for="desktop-currency" class="sr-only">Currency</label>
                                    <div
                                        class="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                                        <!-- <select id="desktop-currency" name="currency" class="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100">
                        <option v-for="currency in currencies" :key="currency">{{ currency }}</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                        <ChevronDownIcon class="h-5 w-5 text-gray-300" aria-hidden="true" />
                      </div> -->
                                        <span class="text-white">APC Car Rental</span>
                                    </div>
                                </div>
                            </form>

                            <div class="flex items-center space-x-6">
                                <router-link to="/login" class="text-sm cursor-pointer font-medium text-white hover:text-gray-100">Sign in</router-link>
                                <router-link to="/register" class="text-sm cursor-pointer font-medium text-white hover:text-gray-100">Create an
                                    account</router-link>
                            </div>
                        </div>
                    </div>

                    <!-- Secondary navigation -->
                    <div class="bg-white bg-opacity-10 backdrop-blur-md backdrop-filter">
                        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div>
                                <div class="flex h-16 items-center justify-between">
                                    <!-- Logo (lg+) -->
                                    <div class="hidden lg:flex lg:flex-1 lg:items-center">
                                        <a href="#">
                                            <span class="sr-only">Your Company</span>
                                            <img class="h-8 w-auto"
                                                src=".././assets/APCLogo.jpg" alt="" />
                                        </a>
                                    </div>

                                    <div class="hidden h-full lg:flex">
                                        <!-- Flyout menus -->
                                        <PopoverGroup class="inset-x-0 bottom-0 px-4">
                                            <div class="flex h-full justify-center space-x-8">
                                                <a v-for="page in navigation.pages" :key="page.name" :href="page.href"
                                                    class="flex items-center text-sm font-medium text-white">{{
                                                            page.name
                                                    }}</a>
                                            </div>
                                        </PopoverGroup>
                                    </div>

                                    <!-- Mobile menu and search (lg-) -->
                                    <div class="flex flex-1 items-center lg:hidden">
                                        <button type="button" class="-ml-2 p-2 text-white"
                                            @click="mobileMenuOpen = true">
                                            <span class="sr-only">Open menu</span>
                                            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        <!-- Search -->
                                        <a href="#" class="ml-2 p-2 text-white">
                                            <span class="sr-only">Search</span>
                                            <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                                        </a>
                                    </div>

                                    <!-- Logo (lg-) -->
                                    <a href="#" class="lg:hidden">
                                        <span class="sr-only">Your Company</span>
                                        <img src="https://tailwindui.com/img/logos/mark.svg?color=white" alt=""
                                            class="h-8 w-auto" />
                                    </a>

                                    <div class="flex flex-1 items-center justify-end">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div class="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
                <h1 class="text-4xl font-bold tracking-tight text-white lg:text-6xl">Your are safe here</h1>
                <p class="mt-4 text-xl text-white">Check out the latest and beautifull car release while they're still in stock.</p>
                <router-link to="/login" 
                    
                    class="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100">
                    Book now
                </router-link>
            </div>
        </div>

        <main>
            <!-- Category section -->
            <section ref="vehicleDiv" aria-labelledby="category-heading" class="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8" v-loading="loadingVehicles">
                <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
                    <h2 id="category-heading" class="text-2xl font-bold tracking-tight text-gray-900">Vehicles
                    </h2>
                    <router-link to="/login" class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                        Show all vehicles
                        <span aria-hidden="true"> &rarr;</span>
                    </router-link>
                </div>

                <div class="mt-4 flow-root" v-if="(vehiclesData.length > 0)" >
                    <div class="-my-2">
                        <div class="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                            <div
                                class="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                                <router-link v-for="vehicle in vehiclesData" :key="vehicle.id" to="/login"
                                    class="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto">
                                    <span aria-hidden="true" class="absolute inset-0">
                                        <img :src="url + (vehicle.vehicle_images && vehicle.vehicle_images ? vehicle.vehicle_images[0].image_url : '../assets/APCLogo.jpg')" alt=""
                                            class="h-full w-full object-cover object-center" />
                                    </span>
                                    <span aria-hidden="true"
                                        class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
                                    <span class="relative mt-auto text-center text-xl font-bold text-white">{{
                                            vehicle.name
                                    }}</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 px-4 sm:hidden">
                    <a href="#" class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                        Browse all categories
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </section>

            <!-- Featured section -->
            <section aria-labelledby="social-impact-heading" ref="locationRef"
                class="mx-auto max-w-7xl px-4 sm:px-6  pt-3 lg:px-8">
                <LocationPage />
            </section>

            <!-- Collection section -->
            <section aria-labelledby="collection-heading"
                class="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8">
                <FaqPage />
            </section>

            <!-- Featured section -->
            <section aria-labelledby="comfort-heading" class="mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <div class="relative overflow-hidden rounded-lg">
                    <div class="absolute inset-0">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg"
                            alt="" class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="relative bg-gray-900 bg-opacity-75 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
                        <div class="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                            <h2 id="comfort-heading" class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                About Us</h2>
                            <p class="mt-3 text-xl text-white">Endless tasks, limited hours, a single piece of paper.
                                Not really a haiku, but we're doing our best here. No kanban boards, burndown charts, or
                                tangled flowcharts with our Focus system. Just the undeniable urge to fill empty
                                circles.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer aria-labelledby="footer-heading" class="bg-gray-900">
            <h2 id="footer-heading" class="sr-only">Footer</h2>
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div class="border-t border-gray-800 py-10">
                    <p class="text-sm text-gray-400">Copyright &copy; 2022 APC Car Rental.</p>
                </div>
            </div>
        </footer>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import LocationPage from './LocationPage.vue'
import FaqPage from './FaqPage.vue'
import { getRamdomVehicles } from '@/modules/admin/components/vehciles/composables/vehcile-composables'
import { storageUrl } from '@/global-composables/http_service'

const locationRef = ref()

const url = storageUrl();
const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
    pages: [
        { name: 'Vehicles', href: '#' },
        { name: 'Location', href: '#' },
        { name: 'FAQ', href: '#' },
    ],
}

const handleClickPage = (pageName) => {
    if(pageName == 'Location') {
        
        console.log('location')
    }
}
const categories = [
    {
        name: 'New Arrivals',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg',
    },
    {
        name: 'Productivity',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg',
    },
    {
        name: 'Workspace',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg',
    },
    {
        name: 'Accessories',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg',
    },
    { name: 'Sale', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg' },
]
const collections = [
    {
        name: 'Handcrafted Collection',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
        imageAlt: 'Brown leather key ring with brass metal loops and rivets on wood table.',
        description: 'Keep your phone, keys, and wallet together, so you can lose everything at once.',
    },
    {
        name: 'Organized Desk Collection',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg',
        imageAlt: 'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
        description: 'The rest of the house will still be a mess, but your desk will look great.',
    },
    {
        name: 'Focus Collection',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg',
        imageAlt: 'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
        description: 'Be more productive than enterprise project managers with a single piece of paper.',
    },
]
const footerNavigation = {
    shop: [
        { name: 'Bags', href: '#' },
        { name: 'Tees', href: '#' },
        { name: 'Objects', href: '#' },
        { name: 'Home Goods', href: '#' },
        { name: 'Accessories', href: '#' },
    ],
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy', href: '#' },
    ],
    account: [
        { name: 'Manage Account', href: '#' },
        { name: 'Returns & Exchanges', href: '#' },
        { name: 'Redeem a Gift Card', href: '#' },
    ],
    connect: [
        { name: 'Contact Us', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'Pinterest', href: '#' },
    ],
}
const vehiclesData = ref([])
const loadingVehicles = ref(true)
const vehicles = async () => {
    const {data, load} = getRamdomVehicles()
    await load();
    vehiclesData.value = data.value
    loadingVehicles.value = false
}

onMounted(() => {
    vehicles();
})
const mobileMenuOpen = ref(false)
</script>