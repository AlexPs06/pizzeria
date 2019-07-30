<template>
  <div class="text-xs-center">  
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Elija el estilo de su pizza</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Proceda a pagar</v-stepper-step>

        <v-divider></v-divider>

      </v-stepper-header>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-img v-bind:src="this.pizza.imagen"  aspect-ratio="2.75" ></v-img>
              <v-card-title primary-title>
                  <div>
                    <h3  class="headline mb-0 ">{{this.pizza.nombre}} </h3>
                    <h3 v-if="tamano&&masa !='' " class="headline mb-0 ">${{precio}} </h3>
                    <div> {{this.pizza.descripcion}} </div>
                  </div>
                  <v-spacer></v-spacer>
                  <div class="mr-2">
                      <v-btn fab small color="blue" flat v-on:click="quitarPizzas(CantidadPizzas)"  >-</v-btn>
                      <v-btn fab small color="blue" flat v-on:click="aumentarPizzas(CantidadPizzas)" >+</v-btn >
                      <v-flex>
                        <label>Pizzas: {{CantidadPizzas}} </label> 
                      </v-flex>
                  </div>
              </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-stepper-items>
        <v-stepper-content step="1">
            
          
          <v-flex xs12 sm6 offset-sm3>
              <div>
                
                <v-overflow-btn v-model="tamano" v-on:change="calcularPrecio(CantidadPizzas)" solo :items="TamanoPizza" label="Tamaño" hide-details class="pa-0" ></v-overflow-btn>
              </div>
                <br>
              <div>
                <v-overflow-btn v-model="masa" v-on:change="calcularPrecio(CantidadPizzas)" solo :items="TiposOrilla" label="Masa" hide-details class="pa-0" ></v-overflow-btn>
              </div>

              
          </v-flex>
          <br>
          <v-btn v-if="masa&&tamano!=''"
            color="primary"
            @click="e1 = 2"
          >
            Continue
          </v-btn>

        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form v-model="valid">
            <v-flex xs12 sm6 offset-sm3>
              <v-btn  flat color="purple"  v-on:click="añadirCarrito(idAux, precio, masa, tamano, CantidadPizzas )" > <v-icon  style="padding: 5px;" >fas fa-cart-plus</v-icon> Añadir al carrito</v-btn>
              <v-btn  flat color="blue"   v-on:click="añadirCarrito2(idAux, precio, masa, tamano, CantidadPizzas )" > <v-icon  style="padding: 5px;" >fab fa-cc-stripe</v-icon> Finalizar compra</v-btn>
              </v-flex>

          
            </v-form >
          <v-btn flat color="red" @click="e1 = 1" > <v-icon  style="padding: 5px;" >fas fa-ban</v-icon> Cancelar</v-btn>
        </v-stepper-content>

        
      </v-stepper-items>
    </v-stepper>
  </div>
      
</template>

<script lang="js" >

import axios from 'axios';
import { Component} from 'vue-property-decorator';
import Vue from 'vue'
// localStorage.clear();
export default  {
    data : () => ({
        idAux:0,
        pizza:"",
        valid: false,
        e1: 0,
        pago: '',
        masa: '',
        tamano: '',
        TamanoPizza: [
          { text: 'Chica' },
          { text: 'Meidana' },
          { text: 'Grande' },
          { text: 'Extravaganza' },
        ],
        CantidadPersonas: [
          { text: '1-2' },
          { text: '3-4' },
          { text: '5-6' },
          { text: '6-8' },
        ],
        TiposOrilla: [
          { text: 'Normal' },
          { text: 'Artesanal' },
          { text: 'Rellena de queso' },
          { text: 'Biscout' },
        ],
        CantidadPizzas: 1,
        FormaPago: [
          { text: 'Tarjeta' },
          { text: 'Efectivo' },
        ],
        precio:0,
        bottomNav: 3,
        email: '',
        quitarPizzas: function( event ) {
          if (this.CantidadPizzas > 1) {
            this.CantidadPizzas -= 1;
            this.calcularPrecio(event);
            }

        },
        aumentarPizzas: function( event ) {
            this.CantidadPizzas += 1;
            this.calcularPrecio(event);
        },
        añadirCarrito: function(id,precio, masa, tamano, cantidadPizzas ) {          
          if(localStorage.getItem("carrito")!=null){
            let carrito=JSON.parse(localStorage.getItem("carrito")+"")
            let item={
                  id: id,
                  nombre: this.pizza.nombre,
                  descripcion: this.pizza.descripcion,
                  ingredientes: this.pizza.ingredientes,
                  imagen: this.pizza.imagen,
                  precio: precio,
                  masa: masa,
                  tam: tamano,
                  cantidadPizzas:cantidadPizzas

            }
            carrito.push(item) 
            localStorage.setItem("carrito",JSON.stringify(carrito))
            console.log("carrito")
            console.log(carrito)
          }
          else{
            let item=[
                {
                    id: id,
                    nombre: this.pizza.nombre,
                    descripcion: this.pizza.descripcion,
                    ingredientes: this.pizza.ingredientes,
                    imagen: this.pizza.imagen,
                    precio: precio,
                    masa: masa,
                    tam: tamano,
                    cantidadPizzas:cantidadPizzas
                }
            ];
            localStorage.setItem("carrito",JSON.stringify(item))
            console.log("pizzas")
            console.log(item)

            
          }
          this.$router.push('/carrito')            


        },
        añadirCarrito2: function(id,precio, masa, tamano, cantidadPizzas ) {   
                 
          if(localStorage.getItem("carrito")!=null){
            let carrito=JSON.parse(localStorage.getItem("carrito")+"")
            let item={
                  id: id,
                  nombre: this.pizza.nombre,
                  descripcion: this.pizza.descripcion,
                  ingredientes: this.pizza.ingredientes,
                  imagen: this.pizza.imagen,
                  precio: precio,
                  masa: masa,
                  tam: tamano,
                  cantidadPizzas:cantidadPizzas

            }
            carrito.push(item) 
            localStorage.setItem("carrito",JSON.stringify(carrito))
            console.log("carrito")
            console.log(carrito)

          }
          else{
            let item=[
                {
                    id: id,
                    nombre: this.pizza.nombre,
                    descripcion: this.pizza.descripcion,
                    ingredientes: this.pizza.ingredientes,
                    imagen: this.pizza.imagen,
                    precio: precio,
                    masa: masa,
                    tam: tamano,
                    cantidadPizzas:cantidadPizzas
                }
            ];
            localStorage.setItem("carrito",JSON.stringify(item))
            console.log("pizzas")
            console.log(item)

            
          }
          console.log("entre");

          this.$router.push('/pagos')            

        },
        calcularPrecio:function(event){
          
          let aumentoTamano=0
          let aumentoMasa=0
          switch(this.tamano){
            case "Chica":{
              aumentoTamano=0
              break;
            }
             case "Meidana":{
               aumentoTamano=25
              break;
            }
             case "Grande":{
               aumentoTamano=50
              
              break;
            }
             case "Extravaganza":{
               aumentoTamano=75
              
              break;
            }
          }
          switch(this.masa){
            case "Normal":{
              aumentoMasa=0
              break;
            }
             case "Artesanal":{
               aumentoMasa=90
              break;
            }
             case "Rellena de queso":{
               aumentoMasa=100
              
              break;
            }
             case "Biscout":{
               aumentoMasa=80
              
              break;
            }
          }
          let precio= 0
          precio=aumentoTamano+aumentoMasa+parseFloat(this.pizza.precio)
          this.precio=this.CantidadPizzas* (precio)
        }
    }),
    props:['id'],
    created(){
      this.idAux=this.id
      let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
      axios.get(api + "/pizzas/"+this.id ).then((response) => {
        this.pizza = response.data
        this.precio=this.pizza.precio
      })
    }
    // purchase() {
    //   stripe.createToken(card).then(function(result) {
    //   // Access the token with result.token
    //   });
    // },
 };

</script>

