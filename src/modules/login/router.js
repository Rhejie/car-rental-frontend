const Module = () => import('./LoginModule.vue')
const HomePage = () => import('./views/LoginPage.vue')


const moduleRoute = {
    path: '/login',
    component: Module,
    children: [
        {
            path: '',
            component: HomePage
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute)
}