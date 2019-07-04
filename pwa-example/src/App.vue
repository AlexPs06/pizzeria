<template>
  <v-app>
    <v-toolbar color="primary" app>
      <v-btn flat href="/">
      <v-toolbar-title  class="headline text-uppercase  white--text">
        
        <span class="font-weight-light"
        
        >
        Upizza</span>
        
      </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        flat
        :to="{name:'carrito'}"
      >
        <span class="mr-2 white--text">Carrito</span>
      </v-btn>
      <v-btn
        flat
        :to="{name:'historial'}"
      >
        <span class="mr-2 white--text">Historial</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      //
    };
  },
};
</script>
