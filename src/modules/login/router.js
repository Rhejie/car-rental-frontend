const Module = () => import('./LoginModule.vue')
const HomePage = () => import('./views/LoginPage.vue')


const moduleRoute = {
    path: '/login',
    component: Module,
    children: [
        {
            path: '',
            name: "Login",
            component: HomePage
        }
    ],
    meta: false
}

export default router => {
    router.addRoute(moduleRoute)
}