<template>

 <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://pbs.twimg.com/media/DchIIN-VAAEwZuo.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Bienvenido {{name}}</h3>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Cambiar contraseña</v-btn>
          <v-btn flat color="orange">Cambiar nombre de usuario</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script lang="js">
import axios from "axios";
export default  {
  data() {
    return{
      mensaje: 'hola ',
      name:localStorage.getItem("username"),
      email:localStorage.getItem("email"),
    };
  },
  methods:{
      signup() {
        
      },
    },
};
</script>

<style>

.topright {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
}
</style>
