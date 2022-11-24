const Module = () => import('./AdminModule.vue')
const HomePage = () => import('./views/HomePage.vue')


const moduleRoute = {
    path: '/admin',
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