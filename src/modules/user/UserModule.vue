<!-- <script setup>
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
    Bars3BottomLeftIcon,
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

import SiderbarLayout from '@/components/SidebarLayout.vue'
import HeaderLayout from '@/components/HeaderLayout.vue'

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Vehicles', href: '#', icon: UsersIcon, current: false },
    { name: 'Customers', href: '#', icon: FolderIcon, current: false },
    { name: 'Booking', href: '#', icon: CalendarIcon, current: false },
    { name: 'Trackers', href: '#', icon: InboxIcon, current: false },
    { name: 'Maintenance', href: '#', icon: ChartBarIcon, current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

const sidebarOpen = ref(false)
</script>

<template>
    <div>
        <SiderbarLayout :navigation="navigation" />

        <div class="flex flex-1 flex-col md:pl-64">
            <HeaderLayout :userNavigation="userNavigation" />

            <main>
                <router-view />
            </main>
        </div>
    </div>
</template> -->
<template>
    <div class="min-h-full">
            <UserHeader :user="user" :userNavigation="userNavigation" :navigation="navigation" />

            <router-view></router-view>
    </div>
</template>
  
<script setup>
import UserHeader from './user-components/UserHeader.vue';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Booking', href: '#', current: false },
    { name: 'Profile', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
</script>