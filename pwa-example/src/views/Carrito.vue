<template>
    <div class="container">
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
    <v-btn
    
    color="info"
    v-on:click="borrarCarrito()"
   
    >Borrar carrito
    </v-btn>
     
    <v-btn
    color="info"
    style="margin-left: 800px"
    :to="{name:'pagos'}"
    >Pagar
    </v-btn>
    </div>

</template>

<script>
import Vue from 'vue'

      let carrito = JSON.parse(localStorage.getItem('carrito')+"")

export default {
  data() {
    return {
        ordenes: [],
    }
  }, created() {
      
      console.log("Carro", carrito)
      carrito.forEach(element => {
          this.ordenes.push(element)
      });
  }, methods:{
      borrarCarrito(){
          localStorage.clear()
          this.ordenes = []
      }
  }
}

</script>
