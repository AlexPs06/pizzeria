<template>

<!-- v-for="{id,nombre, ingredientes, imagen, descripcion, precio} in pizzas" v-bind:key="id" -->
  <div class="text-xs-center">  
     
      <v-layout style="padding: 10px;" v-for="{id,nombre, ingredientes, imagen, descripcion, precio,cantidadPizzas} in pizzas" v-bind:key="id"  >

        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-img v-bind:src="imagen"  aspect-ratio="2.75" ></v-img>
              <v-card-title primary-title>
                  <div>
                    <h3  class="headline mb-0 ">{{nombre}} </h3>
                    <h3  class="headline mb-0 ">${{precio}} </h3>
                    <div> {{descripcion}} </div>
                  </div>
                  <v-spacer></v-spacer>
                  <div class="mr-2">
                      <v-flex>
                        <label>Pizzas: {{cantidadPizzas}} </label> 
                      </v-flex>
                  </div>
              </v-card-title>
          </v-card>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout> 
      <v-form v-model="valid">
            <v-flex xs12 sm6 offset-sm3>
              <div>
                <div ref="card"></div>
              </div>

              <div>
                <v-text-field  single-line solo v-model="direccion" label="Dirección"  required hide-details class="pa-0" ></v-text-field>
              </div>

              <div>
                <v-text-field  single-line solo v-model="referencias" label="Referencias"  required hide-details class="pa-0" ></v-text-field>
              </div>

              <div>
                <v-text-field  single-line solo v-model="telefono" label="Telefono" hide-details class="pa-0" ></v-text-field>
              </div>
              
              <div>
                <v-text-field  single-line solo v-model="nombre"  label="Nombre"  required hide-details class="pa-0" ></v-text-field>
              </div>
              
              <div>
                <v-text-field  single-line solo v-model="email"  required label="Correo" hide-details class="pa-0" ></v-text-field>
              </div>
              
              </v-flex>

          
      </v-form >
      <v-btn v-on:click="purchase(email,nombre, telefono, referencias,direccion,pizzas.precio)">Purchase</v-btn>
  
  </div>
      <!-- <div ref="card"></div> -->
</template>

<script lang="js" >
let stripe = Stripe(`pk_test_AjSflyejK3J7quTKNeWfBY0v00XIuUpWtP`),
  elements = stripe.elements(),
  card = undefined;

  let carrito =JSON.parse(localStorage.getItem("carrito"))

  console.log("carrito")
  
  console.log(carrito)
import axios from 'axios';
import { Component} from 'vue-property-decorator';
import Vue from 'vue'
export default  {
    data (){
      return{
         pizzas:carrito,
         email: '',
         nombre: '',
         telefono: '',
         referencias: '',
         direccion: '',
         valid: false,
      };
    },
    mounted() {
      let style = {
        base: {
          border: '1px solid #D8D8D8',
          borderRadius: '4px',
          color: "#000",
        },


        invalid: {
          // All of the error styles go inside of here.
        }

      };
      card = elements.create('card', style);
      card.mount(this.$refs.card);
    },
    methods:{
      purchase(email,nombre, telefono, referencias,direccion,precio) {
        stripe.createToken(card).then(function(result) {
          console.log(result.token.id)
          let tokenNotificaciones=null 
          if (localStorage.getItem("tokenNotificaciones")!=null) {
              tokenNotificaciones=localStorage.getItem("tokenNotificaciones");
          }

          let api = "http://127.0.0.1:3333/api/v1"
          axios.post(api + "/compras",{
            token:result.token.id,
            lista: localStorage.getItem("carrito"),
            direccion:direccion,
            referencias:referencias,
            telefono:telefono,
            nombre:nombre,
            correo:email,
            tokenNotificaciones:tokenNotificaciones
            // ngrok http 8080 -host-header="localhost:8080"

          } ).then((response) => {
          });
          localStorage.clear()

        });
      },
    },
     
    beforeDestroy() {
      card.destroy(this.$refs.card);
    },
    
    
    // purchase() {
    //   stripe.createToken(card).then(function(result) {
    //   // Access the token with result.token
    //   });
    // },
 };

</script>

