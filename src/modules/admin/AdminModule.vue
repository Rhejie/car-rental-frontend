<script setup>
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
import {
    Bars3BottomLeftIcon,
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    TruckIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XMarkIcon,
    ClipboardDocumentIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

import SiderbarLayout from '@/components/SidebarLayout.vue'
import HeaderLayout from '@/components/HeaderLayout.vue'
import { loadUser } from '@/global-composables/get-user-profile'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore();
const router = useRouter();

const navigation = [
    { name: 'Dashboard', routeName: 'Dashboard', icon: HomeIcon, current: true },
    { name: 'Vehicles', routeName: 'Vehicles', icon: TruckIcon, current: false },
    { name: 'Users', routeName: 'Account', icon: UsersIcon, current: false },
    { name: 'Booking', routeName: 'Account', icon: CalendarIcon, current: false },
    { name: 'Trackers', routeName: 'Account', icon: InboxIcon, current: false },
    { name: 'Maintenance', routeName: 'Account', icon: ChartBarIcon, current: false },
    { name: 'Reporting', routeName: 'Account', icon: ClipboardDocumentIcon, current: false },
    { name: 'Settings', routeName: 'Account', icon: AdjustmentsHorizontalIcon, current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
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
</template>