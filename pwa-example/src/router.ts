import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Landing from './views/Landing.vue';
import Register from './views/Register.vue';
import Perfil from './views/PerfilUser.vue';
import Pizza from './views/Pizza.vue';
import RecuperarContraseña from './views/RecuperarContraseña.vue';
// import auth from './middleware/auth';
// import log from './middleware/log';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/Pizza',
      name: 'pizza',
      component: Pizza,
    },
    {
      path: '/RecuperarContraseña',
      name: 'RecuperarContraseña',
      component: RecuperarContraseña,
    },
    {
      path: '/Perfil',
      name: 'Perfil',
      component: Perfil,
      // meta: {
      //   middleware: auth,
      // },
    },
    {
      path: '/Login',
      name: 'Login',
      component: Landing,
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/order/:id',
      name: 'order',
      component: () => import('./views/Order.vue'),
      props: true,
    },
    {
      path: '/pagos',
      name: 'pagos',
      component: () => import('./views/Pagos.vue'),
      props: true,
    },
    {
      path: '/historial/',
      name: 'historial',
      component: () => import('./views/Historial.vue'),
      props: true,
    },
    {
      path: '/carrito/',
      name: 'carrito',
      component: () => import('./views/Carrito.vue'),
      props: true,
    },
  ],
});
