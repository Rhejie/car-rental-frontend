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
        },
        {
            path: '/details/:id',
            name: 'User Vehicle Details',
            component: () => import('./views/VehicleDetails.vue'),
            props: true
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute)
}