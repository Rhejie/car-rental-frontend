const Module = () => import('./AdminModule.vue')
const HomePage = () => import('./views/HomePage.vue')


const moduleRoute = {
    path: '/admin',
    component: Module,
    children: [
        {
            path: '',
            name: 'Dashboard',
            component: HomePage
        },
        {
            path: '/admin/settings',
            component: () => import('./views/SettingsPage.vue'),
            children: [
                {
                    path: '',
                    name: 'Account',
                    component: () => import('./components/settings/AccountAdmin.vue')
                },
                {
                    path: '/admin/settings/roles',
                    name: 'Roles',
                    component: () => import('./components/settings/UserRole.vue')
                },
                {
                    path: '/admin/settings/identifications',
                    name: 'Identifications',
                    component: () => import('./components/settings/IdentificationSettings.vue')
                },
                {
                    path: '/admin/settings/payment-methods',
                    name: 'Payment Method',
                    component: () => import('./components/settings/PaymentMethods.vue')
                }
            ]
        }
    ],
    meta: {
        auth: true
    }
}

export default router => {
    router.addRoute(moduleRoute)
}