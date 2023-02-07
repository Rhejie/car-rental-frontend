import { defineStore } from "pinia";

export const useCurrentStore = defineStore('loggedInStore', {
    state: () => ({
        userProfile: {}
    }),
    actions: {
        setUserProfile(user) {
            this.userProfile = user;
        }
    }
})