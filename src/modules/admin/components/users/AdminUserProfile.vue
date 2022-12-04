<template>
    <main class="flex-1 pb-8">
      <!-- Page header -->
      <div class="bg-white shadow">
        <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div class="min-w-0 flex-1">
              <!-- Profile -->
              <div class="flex items-center">
                <UserCircleIcon class="hidden h-16 text-gray-700 w-16 rounded-full sm:block"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                  alt="" />
                <div v-loading="loading">
                  <div class="flex items-center">
                    <UserCircleIcon class="h-16 w-16 text-gray-700 rounded-full sm:hidden"
                      />
                    <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                      {{ name }}</h1>
                  </div>
                  <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dt class="sr-only">Account status</dt>
                    <dd class="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0" v-if="userProfile">
                      <CheckCircleIcon v-if="userProfile.verified == 'Yes'" class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                      <XCircleIcon v-else class="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true"/>
                      {{userProfile.verified == 'Yes' ? 'Verified User' : 'Not Yet Verified User'}}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4" v-if="userProfile">
              <button type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
                Verify User
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
          <div class="overflow-hidden bg-white shadow sm:rounded-lg border-t border-cyan-300" v-if="!loading">
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
                      <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div class="flex w-0 flex-1 items-center">
                          <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <span class="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                        </div>
                        <div class="ml-4 flex-shrink-0">
                          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                        </div>
                      </li>
                      <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div class="flex w-0 flex-1 items-center">
                          <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <span class="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                        </div>
                        <div class="ml-4 flex-shrink-0">
                          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
  
        </div>
  
  
        <h2 class="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">Booking
          Activities</h2>
  
        <!-- Activity list (smallest breakpoint only) -->
        <div class="shadow sm:hidden">
          <ul role="list" class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
            <li v-for="transaction in transactions" :key="transaction.id">
              <a :href="transaction.href" class="block bg-white px-4 py-4 hover:bg-gray-50">
                <span class="flex items-center space-x-4">
                  <span class="flex flex-1 space-x-2 truncate">
                    <BanknotesIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <span class="flex flex-col truncate text-sm text-gray-500">
                      <span class="truncate">{{ transaction.name }}</span>
                      <span><span class="font-medium text-gray-900">{{ transaction.amount }}</span> {{
                          transaction.currency
                      }}</span>
                      <time :datetime="transaction.datetime">{{ transaction.date }}</time>
                    </span>
                  </span>
                  <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                </span>
              </a>
            </li>
          </ul>
  
          <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
            aria-label="Pagination">
            <div class="flex flex-1 justify-between">
              <a href="#"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">Previous</a>
              <a href="#"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">Next</a>
            </div>
          </nav>
        </div>
  
        <!-- Activity table (small breakpoint and up) -->
        <div class="hidden sm:block">
          <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="mt-2 flex flex-col">
              <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900" scope="col">
                        Transaction</th>
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col">Amount
                      </th>
                      <th class="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                        scope="col">Status</th>
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col">Date
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="transaction in transactions" :key="transaction.id" class="bg-white">
                      <td class="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div class="flex">
                          <a :href="transaction.href" class="group inline-flex space-x-2 truncate text-sm">
                            <BanknotesIcon class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true" />
                            <p class="truncate text-gray-500 group-hover:text-gray-900">{{ transaction.name }}</p>
                          </a>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <span class="font-medium text-gray-900">{{ transaction.amount }}</span>
                        {{ transaction.currency }}
                      </td>
                      <td class="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                        <span
                          :class="[statusStyles[transaction.status], 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize']">{{
                              transaction.status
                          }}</span>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <time :datetime="transaction.datetime">{{ transaction.date }}</time>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- Pagination -->
                <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                  aria-label="Pagination">
                  <div class="hidden sm:block">
                    <p class="text-sm text-gray-700">
                      Showing
                      {{ ' ' }}
                      <span class="font-medium">1</span>
                      {{ ' ' }}
                      to
                      {{ ' ' }}
                      <span class="font-medium">10</span>
                      {{ ' ' }}
                      of
                      {{ ' ' }}
                      <span class="font-medium">20</span>
                      {{ ' ' }}
                      results
                    </p>
                  </div>
                  <div class="flex flex-1 justify-between sm:justify-end">
                    <a href="#"
                      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                    <a href="#"
                      class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  <script setup>
  
  import GloadingList from '@/components/GloadingList.vue';
  import { loadUser, loadUserProfile } from '@/global-composables/get-user-profile';
  import {
    ScaleIcon,
    BanknotesIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    XCircleIcon,
    InformationCircleIcon,
    UserCircleIcon
  } from '@heroicons/vue/24/outline'
  import { computed, onMounted, ref, defineProps } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  const props = defineProps({
    id: null
  })
  
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

  const getUserProfile = async () => {
    const {load, data, hasError} = loadUserProfile(props.id);
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
    if(props.id) {
      await getUserProfile();
    }
    else {
      await getUser();
    }
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