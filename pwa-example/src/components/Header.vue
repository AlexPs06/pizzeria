<template>
  <v-app>
    <!-- el header no cambia porque vue no hace cmabios en tiempo real falta implementar eso.  -->
    <v-toolbar color="primary" app>
      <v-btn flat href="/">
      <v-toolbar-title  class="headline text-uppercase  white--text">
        
        <span class="font-weight-light"
        
        >
        Upizza </span>
        
      </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn  flat :to="{name:'carrito'}">
      <v-icon  style="padding: 5px;" >fas fa-shopping-cart</v-icon>
        <span class="mr-2 white--text">Carrito</span>
      </v-btn>
      <v-btn v-if="login=='true' ||this.$store.state.login!=null" flat :to="{name:'historial'}">
        <span class="mr-2 white--text">Historial</span>
      </v-btn>
      <v-btn v-if=" login==null && this.$store.state.login==null" flat :to="{name:'Login'}">
        <span class="mr-2 white--text">Iniciar sesion</span>
      </v-btn>
      <v-btn  v-if="login=='true' || this.$store.state.login!=null " flat :to="{name:'Perfil'}">
        <span class="mr-2 white--text">Perfil</span>
      </v-btn>
      <v-btn  v-if="login=='true' || this.$store.state.login!=null " flat :to="{name:'pizza'}">
        <span class="mr-2 white--text">Pizzas</span>
      </v-btn>
      <!--cerrar sesion no sirve este boton falta todavia implementaer la logica de cerrar sesion -->
      <v-btn  v-if="login=='true' || this.$store.state.login!=null " flat  v-on:click="signdwon()">
        <span class="mr-2 white--text">Cerrar sesion</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  
export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      login: localStorage.getItem("login"),
    };
  },
  methods:{
    signdwon() {
        localStorage.clear()
        this.$store.state.login=null;
        this.$router.replace( 'Login' )
    },
  }
};
</script>
