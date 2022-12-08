<script setup>
import { inject, computed, ref } from 'vue';
import { updateAdmin } from '../../composables/admin-user-composable';

const auth = inject('auth')

const admin = computed(() => JSON.parse(auth.remember()))

const change_password = ref(false)
const old_password = ref(null)
const new_password = ref(null)
const new_password_confirmation = ref(null)
const errorValue = ref(null)
const loading = ref(false)

const handleClickUpdateAdmin = async () => {
  loading.value = true
  admin.value.change_password = change_password.value
  admin.value.new_password = new_password.value
  admin.value.old_password = old_password.value
  admin.value.new_password_confirmation = new_password_confirmation.value

  const { data, update, errorData } = updateAdmin(admin.value);
  await update();
  errorValue.value = errorData.value
  loading.value = false
  if (!loading.value && !errorValue.value, !errorData.value) {
    emit('saveRole', data.value)
  }

}
</script>
<template>
  <div class="mx-auto max-w-3xl py-10  px-4 sm:px-6 lg:py-12 lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900">Account</h1>

    <form class="divide-y-gray-200 mt-6 space-y-8 divide-y">


      <div class="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
        <div class="sm:col-span-6">
          <h2 class="text-xl font-medium text-gray-900">Personal Information</h2>
          <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you
            share.</p>
        </div>


        <div class="sm:col-span-3">
          <label for="email-address" class="block text-sm font-medium text-gray-900">Last Name</label>
          <input type="text" v-model="admin.last_name" name="email-address" id="email-address" autocomplete="email"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
          <span class="text-sm text-red-400" v-if="(errorValue && !loading && errorValue.last_name)">
            {{ errorValue.last_name[0] }}
          </span>
        </div>


        <div class="sm:col-span-3">
          <label for="email-address" class="block text-sm font-medium text-gray-900">First Name</label>
          <input type="text" v-model="admin.first_name" name="email-address" id="email-address" autocomplete="email"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
          <span class="text-sm text-red-400" v-if="(errorValue && !loading && errorValue.first_name)">
            {{ errorValue.first_name[0] }}
          </span>
        </div>

        <div class="sm:col-span-3">
          <label for="email-address" class="block text-sm font-medium text-gray-900">Email address</label>
          <input type="text" v-model="admin.email" name="email-address" id="email-address" autocomplete="email"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
          <span class="text-sm text-red-400" v-if="(errorValue && !loading && errorValue.email)">
            {{ errorValue.email[0] }}
          </span>
        </div>

        <div class="sm:col-span-3">
          <label for="phone-number" class="block text-sm font-medium text-gray-900">Phone number</label>
          <input type="text" v-model="admin.contact_number" name="phone-number" id="phone-number" autocomplete="tel"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
          <span class="text-sm text-red-400" v-if="(errorValue && !loading && errorValue.contact_number)">
            {{ errorValue.contact_number[0] }}
          </span>
        </div>
        <div class="sm:col-span-6">
          <input type="checkbox" v-model="change_password" class="text-sm text-gray-500 mr-2 sm:col-span-6" name=""
            id=""><span class="text-sm text-gray-500">Change password?</span>
        </div>

        <div class="sm:col-span-6" v-if="change_password">
          <label for="phone-number" class="block text-sm font-medium text-gray-900">Old Password</label>
          <input type="password" v-model="old_password" name="phone-number" id="phone-number" autocomplete="tel"
            placeholder="Old Password"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
          <span class="text-sm text-red-400" v-if="(errorValue && !loading && errorValue.old_password)">
            {{ errorValue.old_password[0] }}
          </span>
        </div>

        <div class="sm:col-span-3" v-if="change_password">
          <label for="email-address" class="block text-sm font-medium text-gray-900">New Password</label>
          <input type="password" v-model="new_password" name="email-address" id="email-address" autocomplete="email"
            placeholder="New Password"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
          <span class="text-sm text-red-400" v-if="(errorValue && !loading && errorValue.new_password)">
            {{ errorValue.new_password[0] }}
          </span>
        </div>

        <div class="sm:col-span-3" v-if="change_password">
          <label for="phone-number" class="block text-sm font-medium text-gray-900">Password Confirmation</label>
          <input type="password" v-model="new_password_confirmation" name="phone-number" id="phone-number"
            autocomplete="tel" placeholder="New Password"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
          <span class="text-sm text-red-400" v-if="(errorValue && !loading && errorValue.new_password_confirmation)">
            {{ errorValue.new_password_confirmation[0] }}
          </span>
        </div>
      </div>

      <div class="flex justify-end pt-8">
        <button @click.prevent="handleClickUpdateAdmin"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
      </div>
    </form>
  </div>
</template>