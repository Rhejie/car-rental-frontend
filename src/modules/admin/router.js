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
            path: '/admin/users',
            name: "Admin Users",
            component: () => import('./views/UsersPage.vue')
        },
        {
            path: '/admin/users/:id',
            name: "Admin User Profile",
            component: () => import('../admin/components/users/AdminUserProfile.vue'),
            props: true
        },
        {
            path: '/admin/vehicles/edit/:id',
            name: "Edit Vehicle",
            component: () => import('../admin/components/vehciles/EditVehiclePage.vue'),
            props: true
        },
        {
            path: '/admin/vehicles/:id',
            name: "Show Vehicle",
            component: () => import('../admin/components/vehciles/ShowVehiclePage.vue'),
            props: true
        },
        {
            path: '/admin/trackers',
            name: "Trackers",
            component: () => import('./views/TrackerPage.vue'),
            props: true
        },
        {
            path: '/admin/bookings',
            name: "Admin Bookings",
            component: () => import('./views/BookingsPage.vue'),
            props: true
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
                },
                {
                    path: '/admin/settings/colors',
                    name: 'Colors',
                    component: () => import('./components/settings/ColorSettings.vue')
                },
                {
                    path: '/admin/settings/fuel-types',
                    name: 'Fuel Types',
                    component: () => import('./components/settings/FuelTypeSettings.vue')
                },
                {
                    path: '/admin/settings/vehicle-brands',
                    name: 'Vehicle Brands',
                    component: () => import('./components/settings/VehicleBrandSettings.vue')
                },
                {
                    path: '/admin/settings/places',
                    name: 'Places',
                    component: () => import('./components/settings/PlacesSettings.vue')
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