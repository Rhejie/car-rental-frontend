<template>
  <router-view />
</template>

<script setup>
import { onMounted, provide, ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { loadUser } from './global-composables/get-user-profile';
import { useCurrentStore } from './store/useCurrentUser';

const router = useRouter();
const auth = inject('auth');
const userProfile = ref(null)
const currentUserStore = useCurrentStore()
const getUser = async () => {

  const { load, data, hasError } = loadUser();

  await load();
  if (hasError.value) {
    router.push('/login')
    return
  }
  currentUserStore.setUserProfile(data.value)
  userProfile.value = data.value
}

onMounted(async () => {
  await getUser()
  console.log('user', userProfile.value)
  console.log('auth', JSON.parse(auth.remember()))
  provide('userData', userProfile.value)
})



</script>