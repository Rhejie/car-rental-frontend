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
  DeviceTabletIcon,
  SwatchIcon,
  FireIcon,
  CpuChipIcon
} from '@heroicons/vue/24/solid'
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'

const subNavigation = ref([
  {
    name: 'Account',
    description: 'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
    routerName: 'Account',
    icon: CogIcon,
    current: true,
  },
  {
    name: 'Tracker Devices',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    routerName: 'Tracker Devices',
    icon: DeviceTabletIcon,
    current: false,
  },
  {
    name: 'Trackers Company',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    routerName: 'Company',
    icon: MapPinIcon,
    current: false,
  },
  {
    name: 'Price List',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    routerName: 'Roles',
    icon: ListBulletIcon,
    current: false,
  },
  {
    name: 'Overcharge Types',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    routerName: 'Overcharge types',
    icon: ListBulletIcon,
    current: false,
  },
  {
    name: 'Payment Methods',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    routerName: 'Payment Method',
    icon: CurrencyDollarIcon,
    current: false,
  },
  {
    name: 'Identifications',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    routerName: 'Identifications',
    icon: IdentificationIcon,
    current: false,
  },
  {
    name: 'Vehicle Brands',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    routerName: 'Vehicle Brands',
    icon: CpuChipIcon,
    current: false,
  },
  {
    name: 'Fuel Types',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    routerName: 'Fuel Types',
    icon: FireIcon,
    current: false,
  },
  {
    name: 'Colors',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    routerName: 'Colors',
    icon: SwatchIcon,
    current: false,
  },
  {
    name: 'Roles',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
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
</script>
<template>
    <main class="flex flex-1 overflow-hidden">
        <div class="flex flex-1 flex-col xl:overflow-hidden">
          <!-- Breadcrumb -->
          <nav aria-label="Breadcrumb" class="border-b border-blue-gray-200 bg-white xl:hidden">
            <div class="mx-auto flex max-w-3xl items-start py-3 px-4 sm:px-6 lg:px-8">
              <a href="#" class="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900">
                <ChevronLeftIcon class="h-5 w-5 text-blue-gray-400" aria-hidden="true" />
                <span>Settings</span>
              </a>
            </div>
          </nav>

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