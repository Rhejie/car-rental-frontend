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
    <div>
      <!-- Mobile menu -->
      <TransitionRoot as="template" :show="mobileMenuOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileMenuOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
            enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
            leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full" enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
              leave-to="-translate-x-full">
              <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
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
                      <Tab as="template" v-for="category in navigation.categories" :key="category.name"
                        v-slot="{ selected }">
                        <button
                          :class="[selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent', 'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium']">{{
                              category.name
                          }}</button>
                      </Tab>
                    </TabList>
                  </div>
                  <TabPanels as="template">
                    <TabPanel v-for="category in navigation.categories" :key="category.name"
                      class="space-y-10 px-4 pt-10 pb-8">
                      <div class="grid grid-cols-2 gap-x-4">
                        <div v-for="item in category.featured" :key="item.name" class="group relative text-sm">
                          <div
                            class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center" />
                          </div>
                          <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                            <span class="absolute inset-0 z-10" aria-hidden="true" />
                            {{ item.name }}
                          </a>
                          <p aria-hidden="true" class="mt-1">Shop now</p>
                        </div>
                      </div>
                      <div v-for="section in category.sections" :key="section.name">
                        <p :id="`${category.id}-${section.id}-heading-mobile`" class="font-medium text-gray-900">{{
                            section.name
                        }}</p>
                        <ul role="list" :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                          class="mt-6 flex flex-col space-y-6">
                          <li v-for="item in section.items" :key="item.name" class="flow-root">
                            <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{ item.name }}</a>
                          </li>
                        </ul>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>

                <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                    <router-link :to="{ name: page.routeName }" class="-m-2 block p-2 font-medium text-gray-900">{{
                        page.name
                    }}</router-link>
                  </div>
                </div>

                <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div class="flow-root">
                    <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
                  </div>
                  <div class="flow-root">
                    <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Create account</a>
                  </div>
                </div>

                <div class="border-t border-gray-200 py-6 px-4">
                  <a href="#" class="-m-2 flex items-center p-2">
                    <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt=""
                      class="block h-auto w-5 flex-shrink-0" />
                    <span class="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span class="sr-only">, change currency</span>
                  </a>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <header class="relative bg-white">

        <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="border-b border-gray-200">
            <div class="flex h-16 items-center">
              <button type="button" class="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                @click="mobileMenuOpen = true">
                <span class="sr-only">Open menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Logo -->
              <div class="ml-4 flex lg:ml-0">
                <a href="#">
                  <span class="sr-only">Your Company</span>
                  <img class="h-8 w-auto" src="../../assets/APCLogo.jpg" alt="" />
                </a>
              </div>

              <!-- Flyout menus -->
              <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
                <div class="flex h-full space-x-8">


                  <router-link v-for="page in navigation.pages" :key="page.name" :to="{ name: page.routeName }"
                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ page.name
                    }}</router-link>
                </div>
              </PopoverGroup>

              <div class="ml-auto flex items-center">
                <Popover class="relative" v-slot="{ open }">
                  <PopoverButton
                    :class="[open ? 'text-gray-900' : 'text-gray-500', 'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2']">

                    <BellIcon
                      :class="[open ? 'text-gray-600' : 'text-gray-400', 'mx-2 mt-1  w-7 group-hover:text-gray-500']"
                      aria-hidden="true" />
                  </PopoverButton>

                  <transition enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-1">
                    <PopoverPanel
                      class="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                      <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                        v-loading="loadingNotification">
                        <div class="relative grid gap-6 bg-white px-3 py-6 sm:gap-8">
                          <router-link v-for="(notification, index) in myNotifications" :key="notification.id"
                            :to="`${notification.data.link}`" :class="[index ? 'border-t border-gray-300': '','-m-3 block px-6 py-1 p-3 transition duration-150 ease-in-out ']">
                            <p :class="[!notification.read_at? 'font-bold' : 'font-medium', 'text-base  text-gray-900']">{{ notification.data.title }}</p>
                            <p class="mt-1 text-sm text-gray-500">{{ notification.data.message }}</p>
                          </router-link>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>
                <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <router-link :to="{ name: 'User Profile' }"
                    class="text-sm font-medium text-gray-700 hover:text-gray-800">Profile</router-link>
                </div>

                <!-- Cart -->
                <div class="ml-4 flow-root lg:ml-6">
                  <a href="#" class="group -m-2 flex items-center p-2">
                    <PowerIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true" />
                    <span class="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>

    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
            enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
            leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full" enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
              leave-to="translate-x-full">
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    @click="mobileFiltersOpen = false">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4">
                  <Disclosure as="div" v-for="section in filters" :key="section.name"
                    class="border-t border-gray-200 pt-4 pb-4" v-slot="{ open }">
                    <fieldset>
                      <legend class="w-full px-2">
                        <DisclosureButton
                          class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                          <span class="text-sm font-medium text-gray-900">{{ section.name }}</span>
                          <span class="ml-6 flex h-7 items-center">
                            <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                              aria-hidden="true" />
                          </span>
                        </DisclosureButton>
                      </legend>
                      <DisclosurePanel class="px-4 pt-4 pb-2">
                        <div class="space-y-6">
                          <div v-for="(option, optionIdx) in section.options" :key="option.value"
                            class="flex items-center">
                            <input :id="`${section.id}-${optionIdx}-mobile`" :name="`${section.id}[]`"
                              :value="option.value" type="checkbox"
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label :for="`${section.id}-${optionIdx}-mobile`" class="ml-3 text-sm text-gray-500">{{
                                option.label
                            }}</label>
                          </div>
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>


      <router-view></router-view>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
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
import { Bars3Icon, MagnifyingGlassIcon, PowerIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, BellIcon, PlusIcon } from '@heroicons/vue/20/solid'
import FilterColors from '../admin/components/settings/color-utilities/FilterColors.vue';
import FilterFuelTypes from '../admin/components/settings/fuel-type-utilities/FilterFuelTypes.vue';
import FilterVehicleBrand from '../admin/components/settings/vehicle-brand-utilities/FilterVehicleBrand.vue';
import { getMyNotifications } from './composables/user-notification-composables';
import { loadUser } from '@/global-composables/get-user-profile';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore();
const selectedColors = ref([])
const selectedFuelType = ref([])
const selectedBrands = ref([])
const myNotifications = ref([])
const loadingNotification = ref(true)
const auth = inject('auth');
const navigation = {
  pages: [
    { name: 'Home', routeName: 'UserHome' },
    { name: 'Booking', routeName: 'User Bookings' },
  ],
}
const loading = ref(true)
const hasError = ref(null)
const userProfile = computed(() => JSON.parse(auth.remember()))
console.log(userProfile.value)



const loadNotifications = async () => {
  const { data, load } = getMyNotifications();
  await load();
  myNotifications.value = data.value
  loadingNotification.value = false
}

onMounted(async () => {
  Echo.private('notify.' + userProfile.value.id)
    .notification((notification) => {
      myNotifications.value.unshift(notification.notification)
      console.log(notification, 'notification')
    })

  // Echo.private('user-notify')
  //   .listen('SendUserNotification', (e) => {
  //     console.log('notif user', e)
  //   })


  await loadNotifications();
})



const breadcrumbs = [{ id: 1, name: 'Home', href: '#' }]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals' },
      { value: 'tees', label: 'Tees' },
      { value: 'crewnecks', label: 'Crewnecks' },
      { value: 'sweatshirts', label: 'Sweatshirts' },
      { value: 'pants-shorts', label: 'Pants & Shorts' },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: '2xl', label: '2XL' },
    ],
  },
]
const mobileMenuOpen = ref(false)
const mobileFiltersOpen = ref(false)

</script>