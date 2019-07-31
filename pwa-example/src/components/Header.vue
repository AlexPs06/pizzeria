<template>
  <v-app>
    <!-- el header no cambia porque vue no hace cmabios en tiempo real falta implementar eso.  -->
    <v-toolbar color="primary" app>
      <v-btn flat href="/">
      <v-toolbar-title  class="headline text-uppercase  white--text">
        
        <span class="font-weight-light"
        
        >
        Upizza</span>
        
      </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn  flat :to="{name:'carrito'}">
      <v-icon  style="padding: 5px;" >fas fa-shopping-cart</v-icon>
        <span class="mr-2 white--text">Carrito</span>
      </v-btn>
      <v-btn v-if="tokenUser!=null" flat :to="{name:'historial'}">
        <span class="mr-2 white--text">Historial</span>
      </v-btn>
      <v-btn v-if="tokenUser==null" flat :to="{name:'Login'}">
        <span class="mr-2 white--text">Iniciar sesion</span>
      </v-btn>
      <v-btn  v-if="tokenUser!=null " flat :to="{name:'Perfil'}">
        <span class="mr-2 white--text">Perfil</span>
      </v-btn>
      <!--cerrar sesion no sirve este boton falta todavia implementaer la logica de cerrar sesion -->
      <v-btn  v-if="tokenUser!=null " flat :to="{name:'Perfil'}">
        <span class="mr-2 white--text" v-on:click="SignOff()" >Cerrar sesion</span>
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
      tokenUser:localStorage.getItem("token")
    };
  },
  methods:{
    SignOff(){
      console.log('SignOff');
    }
  }
};
</script>
