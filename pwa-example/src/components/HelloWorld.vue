<template>
  <v-container>
    
    <v-layout >


      <v-layout row >
        <!-- "
        https://pbs.twimg.com/media/DchIIN-VAAEwZuo.jpg" 
        https://pbs.twimg.com/media/DchIIN-VAAEwZuo.jpg
        https://www.superpizza.es/wp-content/uploads/2018/09/pizza-hawaiana-origen.png
        https://www.cocinavital.mx/wp-content/uploads/2017/09/pizza-de-carnes-frias-con-albahaca.jpg
        https://www.philadelphia.com.mx/modx/assets/img/categoria_recetas/thumb_fb/ph_sitio_1200x700-pizza-cuatroquesos%20(1).png
        -->
        <v-flex v-for="{id,nombre, ingredientes, imagen, descripcion, precio} in pizzas" v-bind:key="id"  xs12 sm3 pa-2 >
          <v-card>
            <v-img
              v-bind:src="imagen"
              height="200px"
            >
            </v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">{{nombre}}</div>
                <span class="green--text">${{precio}} </span>
              </div>
            </v-card-title>

              <v-card-actions>
                <v-btn flat color="purple" :to="{name: 'order', params:{id:id}}"   >Ordenar</v-btn>
                <!-- <router-link :to="{name: 'order', params:{id:1}}" flat color="purple" > Ordenar</router-link> -->
                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show"  v-on:click="description(id)" >
                  <v-icon>{{ (id==idAux) ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
              </v-card-actions>

            <v-slide-y-transition>
              <v-card-text v-show="idAux==id">
                {{descripcion}}
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
      
      </v-layout>
    </v-layout>
  </v-container>
  
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
      show: false,
      idAux:0,
      pizzas: [],
    }),
    created(){
      let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
      axios.get(api + "/pizzas" ).then((response) => {
        this.pizzas = response.data

      })
    },
    methods:{
      description(id){
        if(id==this.idAux)
          this.idAux=0
         else 
          this.idAux=id
        
      }
    }
  };
</script>

<style>

</style>
