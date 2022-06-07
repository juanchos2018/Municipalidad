import Vue from "vue";
import Router from "vue-router";
//const je = require("json-encrypt");

// Containers
const TheContainer = () =>
    import ("@/containers/TheContainer");

// Views
const Dashboard = () =>
    import ("@/views/Dashboard");



// Views - Pages
const Page404 = () =>
    import ("@/views/pages/Page404");
const Page500 = () =>
    import ("@/views/pages/Page500");
const Login = () =>
    import ("@/views/pages/Login");
const Register = () =>
    import ("@/views/pages/Register");
    
    //otras rutas we 

    const ListMapa =() => import('@/views/mapa/List')
    const ListNotices =() => import('@/views/notice/list')    
    const AddNotices =() => import('@/views/notice/Add.vue')


Vue.use(Router);

export default new Router({
    mode: "hash", // https://router.vuejs.org/api/#mode
    linkActiveClass: "active",
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes(),
    
});



function configRoutes() {
    return [{
            path: "/",
            redirect: "/",
            name: "Login",
            component: {
                render(c) {
                    return c("router-view");
                },
            },
            children: [{
                path: "/",
                name: "LoginPage",
                component: Login,
            }, ],
        },
        {
            path: "/inicio",
            redirect: "/inicio/inicio",
            name: "Home",
            component: TheContainer,
            children: [{
                    path: "inicio",
                    name: "Dashboard",
                    component: Dashboard,
                },
                {             
                    path: 'mapa',          
                    name: 'mapa',
                    component: ListMapa
                },
                {             
                    path: 'notices',          
                    name: 'noticias',
                    component: ListNotices
                },
                {             
                  path: 'notice-add',          
                  name: 'noticiasAdd',
                  component: AddNotices
                },
                {
                    path: "404",
                    name: "Page404",
                    component: Page404,
                },
                {
                    path: "500",
                    name: "Page500",
                    component: Page500,
                },
            ],
        },  


        
    ];
}