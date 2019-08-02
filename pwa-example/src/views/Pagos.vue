<template>

<!-- v-for="{id,nombre, ingredientes, imagen, descripcion, precio} in pizzas" v-bind:key="id" -->
  <div class="text-xs-center">  
     <v-alert v-if="error" :value="true" type="error" dismissible transition="scale-transition" >
                {{errorMesage}}
      </v-alert>
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
      <v-form style="padding: 10px;" v-model="valid">
            <v-flex style="padding: 10px;" xs12 sm6 offset-sm3>
              <div>
                <div ref="card"></div>
              </div>
              <br>
              <div >
                 <v-icon color="primary" dark v-on="on">fas fa-home</v-icon><v-text-field  single-line solo v-model="direccion" label="Dirección"  required hide-details class="pa-0" >   </v-text-field>
              </div>
              <br>

              <div>
                <v-icon color="primary" dark v-on="on">home</v-icon> <v-text-field  single-line solo v-model="referencias" label="Referencias"  required hide-details class="pa-0" ></v-text-field>
              </div>
              <br>

              <div>
                <v-icon color="primary" dark v-on="on">fas fa-mobile-alt</v-icon><v-text-field  single-line solo v-model="telefono" label="Telefono" hide-details class="pa-0" ></v-text-field>
              </div>
              <br>
              
              <div>
                <v-icon color="primary" dark v-on="on">fas fa-user</v-icon> <v-text-field  single-line solo v-model="nombre"  label="Nombre"  required hide-details class="pa-0" ></v-text-field>
              </div>
              <br>
              
              <div>
                <v-icon color="primary" dark v-on="on">fas fa-at</v-icon><v-text-field  single-line solo v-model="email"  required label="Correo" hide-details class="pa-0" ></v-text-field>
              </div>
              <br>
              
              </v-flex>

          
      </v-form >
      <v-btn flat color="blue" v-if="email&&direccion&&referencias&&telefono&&nombre!=''" v-on:click="purchase(email,nombre, telefono, referencias,direccion,pizzas.precio)"   > <v-icon style="padding: 10px;" >fas fa-credit-card</v-icon> Pago</v-btn>
      <br>
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
         email:localStorage.getItem("email"),
         nombre: localStorage.getItem("username"),
         telefono: '',
         referencias: '',
         direccion: '',
         valid: false,
         error:false,
      };
    },
    mounted() {
      let style = {
        base: {
          border: '1px solid #D8D8D8',
          borderRadius: '4px',
          color: "#000",
          background:"red"
        },
        invalid: {
          // All of the error styles go inside of here.
        }
      };
      card = elements.create('card', {style});
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
          let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
          
          axios.post(api + "/compras",{
            token:result.token.id,
            lista: localStorage.getItem("carrito"),
            direccion:direccion,
            referencias:referencias,
            telefono:telefono,
            nombre:nombre,
            correo:email,
            estatus: "Pedida",
            tokenNotificaciones:tokenNotificaciones
          },
          {
            headers:{
              Authorization:"Bearer "+localStorage.getItem("token"),
              'Content-Type': "application/json",
            }
          }).then((response) => {
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
            this.$router.push('home')
          }).catch((error2) => {
              //esta parte es de control de errores hay que modificar el valor del 
              //error a true para que se muestren no obstante no se como cambiarlo por eso quedo asi 
              
              this.error=true;
              this.errorMesage=error2.response.data.warning;
              setTimeout(() => this.error=false, 3000);

            
            });
          

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
<style>

</style>

