<template>
  <div class="container" v-if="ordenes != null">
    <div v-for="orden in ordenes " v-bind:key = "orden.id">
      <v-flex xs12 sm8 offset-sm2 >
        <v-card>
          <v-img v-bind:src= "orden.imagen" aspect-ratio="2.75"></v-img>
          
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{orden.nombre}}</h3>
              <div>Ingredientes: {{orden.ingredientes}} - Masa: {{orden.masa}} - Tamaño: {{orden.tam}}</div>
              <div>Cantidad: {{orden.cantidadPizzas}}</div>
              <span class="green--text">Precio: {{orden.precio}}</span>
            </div>
          </v-card-title>
        </v-card>
        <br>
      </v-flex>
    </div>
    <v-btn  color="info" v-on:click="borrarCarrito()">Borrar carrito</v-btn>
    <v-btn color="info" style="margin-left: 800px" :to="{name:'pagos'}" >Pagar</v-btn>
  </div>
  <div v-else>
    <v-container bg fill-height grid-list-md text-xs-center>
      <v-layout row wrap align-center>
        <v-flex>
          I don't have data.
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
  
export default {
  data() {
    return {
      carrito: JSON.parse(localStorage.getItem('carrito')+""),
      ordenes:null
    }
  }, created() {
    
    if(this.carrito != null){
      this.ordenes = []
      console.log("Carro", this.carrito)
      this.carrito.forEach(element => {
          this.ordenes.push(element)
      });      
    }
  }, methods:{
      borrarCarrito(){
          let token = localStorage.getItem("token")
          let username = localStorage.getItem("username")
          let email = localStorage.getItem("email")
          let id = localStorage.getItem("id")
          let login = localStorage.getItem("login")
          localStorage.clear()
          localStorage.setItem("token",token)
          localStorage.setItem("username",username)
          localStorage.setItem("email",email)
          localStorage.setItem("id",id)
          localStorage.setItem("login","true")
          this.carrito = null
      }
  }
}

</script>
