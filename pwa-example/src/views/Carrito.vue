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

<script>
import Vue from 'vue'
  let carrito = JSON.parse(localStorage.getItem('carrito')+"")
export default {
  data() {
    return {
      ordenes: null,
    }
  }, created() {
    if(this.ordenes != null){
      this.ordenes = []
      console.log("Carro", carrito)
      carrito.forEach(element => {
          this.ordenes.push(element)
      });      
    }
  }, methods:{
      borrarCarrito(){
          localStorage.clear()
          this.ordenes = []
      }
  }
}

</script>
