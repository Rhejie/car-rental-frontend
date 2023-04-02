<script setup> 
    import { ref } from 'vue'
import {
  BanknotesIcon,
  UserIcon,
  CogIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ListBulletIcon,
  IdentificationIcon,
  UserGroupIcon,
  DeviceTabletIcon,
  SwatchIcon,
  FireIcon,
  CpuChipIcon,
  DocumentCheckIcon
} from '@heroicons/vue/24/solid'
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import SettingsSlideOver from '../components/settings/SettingsSlideOver.vue';

const openModal = ref(false)
const subNavigation = ref([
  {
    name: 'Account',
    description: 'Controls admin account.',
    routerName: 'Account',
    icon: CogIcon,
    current: true,
  },
  {
    name: 'Tracker Devices',
    description: 'List of all tracking devince.',
    routerName: 'Tracker Devices',
    icon: DeviceTabletIcon,
    current: false,
  },
  {
    name: 'Overcharge Types',
    description: 'List of all charges.',
    routerName: 'Overcharge types',
    icon: ListBulletIcon,
    current: false,
  },
  {
    name: 'Payment Methods',
    description: 'List of payments method.',
    routerName: 'Payment Method',
    icon: CurrencyDollarIcon,
    current: false,
  },
  {
    name: 'Drivers',
    description: 'List of all drivers.',
    routerName: 'Drivers',
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: 'Vehicle Brands',
    description: 'List of all vehicle brands.',
    routerName: 'Vehicle Brands',
    icon: CpuChipIcon,
    current: false,
  },
  {
    name: 'Fuel Types',
    description: 'List of all fuel types.',
    routerName: 'Fuel Types',
    icon: FireIcon,
    current: false,
  },
  {
    name: 'Colors',
    description: 'List of colors of the vehicle.',
    routerName: 'Colors',
    icon: SwatchIcon,
    current: false,
  },
  {
    name: 'Roles',
    description: 'Users role.',
    routerName: 'Roles',
    icon: UserIcon,
    current: false,
  },
])

const handleClickSelect = (item) => {
    subNavigation.value.map(nav => {
        if(nav.name == item.name) {
            nav.current = true
        }
        else {
            nav.current = false
        }

        return nav
    })
}

const handleCloseModal = () => {
  openModal.value = false
}

const handleClickOpenSetting = () => {
  openModal.value = true
}
</script>
<template>
  <SettingsSlideOver :open-modal="openModal" @close-modal="handleCloseModal" :sub-navigation="subNavigation"/>
    <main class="flex flex-1 overflow-hidden">
        <div class="flex flex-1 flex-col xl:overflow-hidden">
          <!-- Breadcrumb -->
          <div aria-label="Breadcrumb" class="border-b border-blue-gray-200 bg-white xl:hidden" @click="handleClickOpenSetting">
            <div class="mx-auto flex max-w-3xl items-start py-3 px-4 sm:px-6 lg:px-8">
              <span  class="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900">
                <ChevronLeftIcon class="h-5 w-5 text-blue-gray-400" aria-hidden="true" />
                <span>Settings</span>
              </span>
            </div>
          </div>

          <div class="flex flex-1 xl:overflow-hidden">
            <!-- Secondary sidebar -->
            <nav aria-label="Sections" class="hidden w-96 h-full flex-shrink-0 border-r border-blue-gray-200 bg-white xl:flex xl:flex-col">
              <div class="flex h-16 flex-shrink-0 items-center border-b border-blue-gray-200 px-6">
                <p class="text-lg font-medium text-blue-gray-900">Settings</p>
              </div>
              <div class="min-h-0 flex-1 h-full overflow-y-auto">
                <router-link v-for="item in subNavigation" :key="item.name" :to="{ name: item.routerName }" @click="handleClickSelect(item)" :class="[item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50', 'flex p-6 border-b border-blue-gray-200']" :aria-current="item.current ? 'page' : undefined">
                  <component :is="item.icon" class="-mt-0.5 h-6 w-6 flex-shrink-0 text-gray-500" aria-hidden="true" />
                  <div class="ml-3 text-sm">
                    <p class="font-bold text-gray-700">{{ item.name }}</p>
                    <p class="mt-1 text-gray-500">{{ item.description }}</p>
                  </div>
                </router-link>
              </div>
            </nav>

            <!-- Main content -->
            <div class="flex-1 xl:overflow-y-scroll h-full bg-gray-100">
                <router-view/>
              
            </div>
          </div>
        </div>
      </main>
</template>