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
            path: '/admin/vehicles',
            name: "Vehicles",
            component: () => import('./views/VehiclePage.vue')
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
                },
                {
                    path: '/admin/settings/companies',
                    name: 'Company',
                    component: () => import('./components/settings/CompanySettings.vue')
                },
                {
                    path: '/admin/settings/overcharge-types',
                    name: 'Overcharge types',
                    component: () => import('./components/settings/OverchargeTypesSettings.vue')
                },
                {
                    path: '/admin/settings/tracker-devices',
                    name: 'Tracker Devices',
                    component: () => import('./components/settings/TrackersDeviceSettings.vue')
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