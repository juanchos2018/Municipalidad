import Vue from "vue";
import Router from "vue-router";
//const je = require("json-encrypt");

// Containers
const TheContainer = () =>
    import ("@/containers/TheContainer");

// Views
const Dashboard = () =>
    import ("@/views/Dashboard");

// Views - Components

const Forms = () =>
    import ("@/views/base/Forms");

// Views - Pages
const Page404 = () =>
    import ("@/views/pages/Page404");
const Page500 = () =>
    import ("@/views/pages/Page500");
const Login = () =>
    import ("@/views/pages/Login");
const Register = () =>
    import ("@/views/pages/Register");


    const ListEle = () => import('@/views/elemento/List')

    const ListMeto = () => import('@/views/metodologia/List')
    const ListFases = () => import('@/views/fases/List')
    const ListProyecto = () => import('@/views/proyecto/List')
    const AddProyecto = () => import('@/views/proyecto/Add')
    
    const ListMenber = () => import('@/views/proyecto/Members')
    const ViewProyect = () => import('@/views/proyecto/View')
    
    const ListTarea = () => import('@/views/tarea/List')
    const ListUsuario = () => import('@/views/usuario/List')
    
    const ListRols = () => import('@/views/rol/List')
    const ListProyectoMenber = () => import('@/views/tareamenber/ListProyect')
    const TareaMenber = () => import('@/views/tareamenber/List')
    const SolicitudAdd =() => import('@/views/solicitud/Add')
    const SolicitudEnvida =() => import('@/views/solicitud/List')
    const ListSolicitud =() => import('@/views/solicitud/Listsoli')
    
    //otras rutas we 



    const ListMapa =() => import('@/views/mapa/List')
    
    


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
             
                    path: 'metodologia',          
                    name: 'metodologia',
                    component: ListMeto
                  },

                  {
                    //  path: "editar/:id_user_type",
                     path: 'fases/:id',          
                     name: 'fases',
                     props:true,
                     component: ListFases
                   },
                   {
             
                    path: 'proyecto',          
                    name: 'proyecto',
                    component: ListProyecto
                  },
                  {
             
                    path: 'proyectonuevo',          
                    name: 'proyectonuevo',
                    component: AddProyecto
                  },
                  {
                    //  path: "editar/:id_user_type",
                     path: 'member/:id_proyecto',          
                     name: 'member',
                     props:true,
                     component: ListMenber
                   },
                   {
                    //  path: "editar/:id_user_type",
                     path: 'viewproyect/:id_proyecto',          
                     name: 'viewproyect',
                     props:true,
                     component: ViewProyect
                   },
                   {
                    //  path: "editar/:id_user_type",
                     path: 'tarea/:obj',          
                     name: 'tarea',
                     props:true,
                     component: ListTarea
                   },
                   {
                   
                    path: 'usuario',          
                    name: 'usuario',
                    component: ListUsuario
                  },
                  {
             
                    path: 'rols',          
                    name: 'rols',
                    component: ListRols
                  },
                  {
             
                    path: 'proyectomenber',          
                    name: 'proyectomenber',
                    component: ListProyectoMenber
                  },
                  {
             
                    path: 'tarasmenber/:id_miembro_proyecto',          
                    name: 'tarasmenber',
                    props:true,
                    component: TareaMenber
                  },
                  {
             
                    path: 'solicitud',          
                    name: 'solicitud',
               
                    component: SolicitudAdd
                  },

                  {
             
                    path: 'solicitudenviada',          
                    name: 'solicitudenviada',               
                    component: SolicitudEnvida
                  },

                  {
             
                    path: 'solicitudlis',          
                    name: 'solicitudlis',               
                    component: ListSolicitud
                  },

                    //ListSolicitud


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