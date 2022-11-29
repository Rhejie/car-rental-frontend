
<template>
    <div class="min-h-full">
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </TransitionChild>
  
          <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
              <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-cyan-700 pt-5 pb-4">
                <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute top-0 right-0 -mr-12 pt-2">
                    <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                      <span class="sr-only">Close sidebar</span>
                      <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div class="flex flex-shrink-0 items-center px-4">
                  <img class="h-8 w-auto" src="../../assets/APCLogo.jpg" alt="Easywire logo" /> Car Rental
                </div>
                <nav class="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                  <div class="space-y-1 px-2">
                    <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
                      <component :is="item.icon" class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" aria-hidden="true" />
                      {{ item.name }}
                    </a>
                  </div>
                  <div class="mt-6 pt-6">
                    <div class="space-y-1 px-2">
                      <router-link v-for="item in secondaryNavigation" :key="item.name" :to="{ name: item.routeName }" class="group flex items-center rounded-md px-2 py-2 text-base font-medium text-cyan-100 hover:bg-cyan-600 hover:text-white">
                        <component :is="item.icon" class="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                        {{ item.name }}
                      </router-link>
                    </div>
                  </div>
                </nav>
              </DialogPanel>
            </TransitionChild>
            <div class="w-14 flex-shrink-0" aria-hidden="true">
              <!-- Dummy element to force sidebar to shrink to fit close icon -->
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <!-- Static sidebar for desktop -->
      <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <img class="h-8 w-auto" src="../../assets/APCLogo.jpg" alt="Easywire logo" /> <span class="text-white text-sm ml-2">Car Rental</span>
          </div>
          <nav class="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
            <div class="space-y-1 px-2">
              <router-link v-for="item in navigation" :key="item.name" :to="{name: item.routeName}" :class="[item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600', 'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
                <component :is="item.icon" class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" aria-hidden="true" />
                {{ item.name }}
              </router-link>
            </div>
            <div class="mt-6 pt-6">
              <div class="space-y-1 px-2">
                <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white">
                  <component :is="item.icon" class="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
  
      <div class="flex flex-1 flex-col lg:pl-64">
        <div class="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
          <button type="button" class="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden" @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true" />
          </button>
          <!-- Search bar -->
          <div class="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div class="flex flex-1">
              <form class="flex w-full md:ml-0" action="#" method="GET">
                <label for="search-field" class="sr-only">Search</label>
                <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                    <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input id="search-field" name="search-field" class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" placeholder="Search transactions" type="search" />
                </div>
              </form>
            </div>
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button" class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
                <span class="sr-only">View notifications</span>
                <PowerIcon class="h-6 w-6" aria-hidden="true" />
              </button>
  
              <!-- Profile dropdown -->
            </div>
          </div>
        </div>
        <router-view/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import {
    Bars3CenterLeftIcon,
    PowerIcon,
    ClockIcon,
    CogIcon,
    CreditCardIcon,
    DocumentChartBarIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ScaleIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    XMarkIcon,
    CalendarIcon,
    ChartBarIcon,
    TruckIcon,
    InboxIcon,
    UsersIcon,
    ClipboardDocumentIcon,
    AdjustmentsHorizontalIcon
  } from '@heroicons/vue/24/outline'
  import {
    BanknotesIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
  } from '@heroicons/vue/20/solid'
  
  const navigation = [
    { name: 'Dashboard', routeName: 'Dashboard', icon: HomeIcon, current: true },
    { name: 'Vehicles', routeName: 'Vehicles', icon: TruckIcon, current: false },
    { name: 'Users', routeName: 'Account', icon: UsersIcon, current: false },
    { name: 'Booking', routeName: 'Admin Bookings', icon: CalendarIcon, current: false },
    { name: 'Trackers', routeName: 'Trackers', icon: InboxIcon, current: false },
    { name: 'Maintenance', routeName: 'Account', icon: ChartBarIcon, current: false },
    { name: 'Reporting', routeName: 'Account', icon: ClipboardDocumentIcon, current: false },
    { name: 'Settings', routeName: 'Account', icon: AdjustmentsHorizontalIcon, current: false },
]
  const secondaryNavigation = [
    { name: 'Settings', href: '#', icon: CogIcon },
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
    { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
  ]
  const cards = [
    { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    // More items...
  ]
  const transactions = [
    {
      id: 1,
      name: 'Payment to Molly Sanders',
      href: '#',
      amount: '$20,000',
      currency: 'USD',
      status: 'success',
      date: 'July 11, 2020',
      datetime: '2020-07-11',
    },
    // More transactions...
  ]
  const statusStyles = {
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-gray-100 text-gray-800',
  }
  
  const sidebarOpen = ref(false)
  </script>
<!-- <script setup>
import { onMounted, ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

import SiderbarLayout from '@/components/SidebarLayout.vue'
import HeaderLayout from '@/components/HeaderLayout.vue'
import { loadUser } from '@/global-composables/get-user-profile'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore();
const router = useRouter();


const userNavigation = [
    { name: 'Sign out', href: '#' },
]

const sidebarOpen = ref(false)

const getUser = async () => {
    
    const {load, data, hasError} = loadUser();

    await load();

    if(hasError.value) {
        router.push('/login')
        return
    }
    store.commit('login/USER_LOGGEDIN', data.value);
}

onMounted( async () => {
    await getUser()
})

</script>

<template>
    <div>
        <SiderbarLayout :navigation="navigation"/>

        <div class="flex flex-1 flex-col md:pl-64">
            <HeaderLayout :userNavigation="userNavigation"/>

            <main>
                <router-view class=""/>
            </main>
        </div>
    </div>
</template> -->