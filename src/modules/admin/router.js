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
            path: '/admin/deployed-bookings',
            name: "Deployed Bookings",
            component: () => import('./views/DeployedBookings.vue'),
            props: true
        },
        {
            path: '/admin/deployed-bookings',
            name: "Booking History",
            component: () => import('./views/BookingHistoryPage.vue'),
            props: true
        },
        {
            path: '/admin/maintenance',
            name: "Maintenance",
            component: () => import('./views/MaintenancePage.vue'),
        },
        {
            path: '/admin/reports',
            name: "Reports",
            component: () => import('./views/ReportingPage.vue')
        },
        {
            path: '/admin/reports/daily-reports',
            name: 'Daily Reports',
            component: () => import('../admin/reporting/DailyReports.vue')
        },
        {
            path: '/admin/reports/monthly-reports',
            name: 'Monthly Reports',
            component: () => import('../admin/reporting/MonthlyReport.vue')
        },
        {
            path: '/admin/reports/income-reports',
            name: 'Income Reports',
            component: () => import('../admin/reporting/IncomeReports.vue')
        },
        {
            path: '/admin/reports/expenses-reports',
            name: 'Expenses Reports',
            component: () => import('../admin/reporting/ExpensesReport.vue')
        },
        {
            path: '/admin/reports/driver-reports',
            name: 'Driver Reports',
            component: () => import('../admin/reporting/DriverReports.vue')
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
                    path: '/admin/settings/forms',
                    name: 'Form',
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
                },
                {
                    path: '/admin/settings/drivers',
                    name: 'Drivers',
                    component: () => import('./components/settings/DriverSettings.vue')
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