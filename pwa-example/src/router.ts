import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PizzeriaView from './views/PizzeriaView.vue';
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/Pizza',
      name: 'Pizza',
      component: PizzeriaView,
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
