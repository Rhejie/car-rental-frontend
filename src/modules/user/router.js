const Module = () => import('./UserModule.vue')

const moduleRoute = {
    path: '/user',
    component: Module,
    children: [
        {
            path: '',
            name: 'UserHome',
            component: () => import('./views/HomePage.vue')
        },
        {
            path: '/user/profile',
            name: 'User Profile',
            component: () => import('./views/UserProfile.vue')
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute)
}