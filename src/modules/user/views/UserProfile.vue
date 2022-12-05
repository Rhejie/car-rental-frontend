<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div class="min-w-0 flex-1">
            <!-- Profile -->
            <div class="flex items-center">
              <img class="hidden h-16 w-16 rounded-full sm:block"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                alt="" />
              <div v-loading="loading">
                <div class="flex items-center">
                  <img class="h-16 w-16 rounded-full sm:hidden"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                    alt="" />
                  <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">Good morning,
                    {{ name }}</h1>
                </div>
                <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dt class="sr-only">Account status</dt>
                  <dd class="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                    <CheckCircleIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                    Verified account
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
            <InformationCircleIcon class="inline-flex w-10 items-center rounded-md border border-transparent  text-sm font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"/>
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">

      <div class="mx-auto mt-5 max-w-6xl px-4 sm:px-6 lg:px-8">

        <div class="flex" v-if="loading">
          <GloadingList class="mx-2" v-for="n in 3" :key="n" />
        </div>
        <div class="overflow-hidden bg-white shadow sm:rounded-lg" v-if="!loading">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Applicant Information</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Full Name</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ name }}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Birthday</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userProfile.birthday }}</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Gender</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userProfile.gender }}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userProfile.email }}</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Contact Number</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userProfile.contact_number }}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userProfile.email }}</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ userProfile.address }}</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">User Identifications</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
                    <li v-for="identification in userProfile.user_identifications" :key="identification.id" class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div class="flex w-0 flex-1 items-center">
                        <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span class="ml-2 w-0 flex-1 truncate">Identification</span>
                      </div>
                      <div class="ml-4 flex-shrink-0">
                        <span @click="handleClickView(identification.image_url)" href="#" target="_black" class="font-medium text-indigo-600 hover:text-indigo-500">view</span>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>

      </div>


    </div>
  </main>
</template>
<script setup>

import GloadingList from '@/components/GloadingList.vue';
import { loadUser } from '@/global-composables/get-user-profile';
import {
  ScaleIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const userProfile = ref(null)
const loading = ref(true)

const name = computed({
  get() {
    if (!loading.value) {
      return userProfile.value.first_name + ' ' + userProfile.value.last_name
    }
    return ''
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [userProfile.value.first_name, userProfile.value.last_name] = newValue.split(' ')
  }
})

const getUser = async () => {

  const { load, data, hasError } = loadUser();

  await load();

  if (hasError.value) {
    router.push('/login')
    return
  }
  userProfile.value = data.value
  store.commit('login/USER_LOGGEDIN', data.value);
  loading.value = false
}

onMounted(async () => {
  await getUser();
})

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


const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
]
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
}
</script>