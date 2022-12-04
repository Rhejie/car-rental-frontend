<script setup>

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
          <label for="email-address" class="block text-sm font-medium text-gray-900">Email address</label>
          <input type="text" name="email-address" id="email-address" autocomplete="email"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
        </div>

        <div class="sm:col-span-3">
          <label for="phone-number" class="block text-sm font-medium text-gray-900">Phone number</label>
          <input type="text" name="phone-number" id="phone-number" autocomplete="tel"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
        </div>

        <div class="sm:col-span-3">
          <label for="country" class="block text-sm font-medium text-gray-900">Country</label>
          <select id="country" name="country" autocomplete="country-name"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
            <option />
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>

        <div class="sm:col-span-3">
          <label for="language" class="block text-sm font-medium text-gray-900">Language</label>
          <input type="text" name="language" id="language"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
        </div>

        <p class="text-sm text-gray-500 sm:col-span-6">This account was created on <time
            datetime="2017-01-05T20:35:40">January 5, 2017, 8:35:40 PM</time>.</p>
      </div>

      <div class="flex justify-end pt-8">
        <button type="button"
          class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Cancel</button>
        <button type="submit"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
      </div>
    </form>
  </div>
</template>