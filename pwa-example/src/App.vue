<template>
  <v-app>
    <v-toolbar app>
      <v-btn flat href="/">
      <v-toolbar-title class="headline text-uppercase">
        
        <span class="font-weight-light"
        
        >
        Upizza</span>
        
      </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="historial"
      >
        <span class="mr-2">Historial</span>
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
