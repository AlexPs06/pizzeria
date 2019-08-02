<template>
  <v-container>
    <v-layout justify-center wrap>
      <v-btn color="primary" class="ma-2" dark @click="dialog = true" v-on:click="eraseDataPizza()">
        Crear una pizza
      </v-btn>

      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar flat dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Pizza</v-toolbar-title>
              <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text v-on:click="SavePizza()"> Guardar pizza </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-layout>
                <v-flex xs5>
                  <v-layout align-center justify-center style="background-color:#1976d2 !important">
                    <v-img
                      :src="data_pizza.imagen"
                      class="grey lighten-2 my-5 shadow-image"
                      max-width="90%"
                      max-height="300"
                    ></v-img>
                   
                  </v-layout>
                  <v-text-field v-model="data_pizza.nombre" placeholder="Nombre de la pizza" type="text"  solo></v-text-field>
                </v-flex>

                <v-flex xs8 class="my-auto mx-3" >
                  <p class="my-3 display-1" >Ingresa los datos de tu pizza</p>
                  <v-form>
                    <v-text-field v-model="data_pizza.ingredientes" placeholder="Ingredientes" type="text"  solo></v-text-field>
                    <v-text-field v-model="data_pizza.imagen" placeholder="Imagen" type="text"   solo></v-text-field>
                    <v-textarea   v-model="data_pizza.descripcion" placeholder="Descripción" solo auto-grow></v-textarea>
                    <v-text-field v-model.number="data_pizza.precio" placeholder="Precio" solo value="10.00" prefix="$"></v-text-field>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>

      </v-dialog>
    </v-layout>

    <v-data-table :headers="headers" :items="pizzas" class="elevation-1 mt-2">
      <template v-slot:items="pizzas">
        <td>{{ pizzas.item.id }}</td> 
        <td>{{ pizzas.item.nombre }}</td>
        <td>{{ pizzas.item.ingredientes }}</td>
        <td>{{ pizzas.item.descripcion }}</td>
        <td>{{ pizzas.item.precio }}</td>
        <td>
          <v-btn class="mx-2" color="info" dark small v-on:click="SetPizza(pizzas.item.id)" >Editar</v-btn>
          <v-btn class="mx-2" color="error" dark small v-on:click="DeletePizza(pizzas.item.id)" >Eliminar</v-btn>
        </td>
      </template>
    </v-data-table>

  </v-container>
</template>

<script>
  const URL = 'https://alfredito-pizzeria.herokuapp.com/api/v1'
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU2NDU0NDUxM30.bVdlORike-Y2YYWxE8piwyO-hPT5w5k2Tq-djny1vl8'
  
  import axios from 'axios';
  
  export default {
    data: () => ({
      dialog: false,
      isEdit: false,
      pizza_id: 0,
      data_pizza: {
        nombre: '',
        ingredientes: '',
        imagen: 'https://images.vexels.com/media/users/3/157235/isolated/preview/a6f8c1c10614213e9b2754dabdadb4a6-tasty-pizza-icon-by-vexels.png',
        descripcion: '',
        precio: ''
      },
      pizzas: [],
      dialog: false,
      headers: [
        { text: 'Id', value: 'id', },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Ingredientes', value: 'ingredientes' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Precio', value: 'precio' },
        { text: 'Opciones' }
      ],
    }),

    created(){
      this.getPizzas()
    },

    methods:{
      
      async getPizzas(){
        try{
          this.pizzas = (await axios.get(`${URL}/pizzas`)).data
        }catch(ex){
          console.log('Error')
        }
      }, 

      async SavePizza(){
        var eraseData = true
        if(this.formIsValid()){
          try{
            const config = { headers: {'Authorization': 'Bearer ' + token } };
            const params = this.data_pizza
            if(!this.isEdit){
              await axios.post(`${URL}/pizzas`, params, config)
              this.pizzas.push(params)
            }else{
              const aux_id = this.pizza_id
              const aux_pizza = this.data_pizza
              this.pizzas.forEach(function(element) {
                if(element.id == aux_id){
                  element.nombre = aux_pizza.nombre
                  element.ingredientes = aux_pizza.ingredientes
                  element.descripcion = aux_pizza.descripcion
                  element.imagen = aux_pizza.imagen
                  element.precio = aux_pizza.precio
                }
              });
              (await axios.put(`${URL}/pizzas/${this.pizza_id}`, params, config)).data
            }
              
          }catch(Ex){
            console.log('Algo salio mal')
          }  
        }
        this.dialog = false
        this.isEdit = false
        this.pizza_id = 0
        this.eraseDataPizza(eraseData)
      },

      async SetPizza(pizza_id){
        const aux_pizzas =  JSON.parse(JSON.stringify(this.pizzas))
        this.data_pizza = aux_pizzas.find( x => x.id == pizza_id )
        this.dialog = true
        this.isEdit = true
        this.pizza_id = pizza_id
      },

      async DeletePizza(pizza_id){
        try{
          const config = { headers: {'Authorization': 'Bearer ' + token } };
          await axios.delete(`${URL}/pizzas/${pizza_id}`, config)
          this.pizzas =  this.pizzas.filter(function(ele){return ele.id != pizza_id;});
        }catch(Ex){
          console.log('Error')
        }
      },

      eraseDataPizza(eraseData){
        if(eraseData){
          this.data_pizza = {
            nombre: '',
            ingredientes: '',
            imagen: 'https://images.vexels.com/media/users/3/157235/isolated/preview/a6f8c1c10614213e9b2754dabdadb4a6-tasty-pizza-icon-by-vexels.png',
            descripcion: '',
            precio: ''
          }            
        }
      },

      nombreIsValid(){
        return !!this.data_pizza.nombre
      },

      ingredientesIsValid(){
        return !!this.data_pizza.ingredientes
      },

      imagenIsValid(){
        return !!this.data_pizza.imagen
      },

      descripcionIsValid(){
        return !!this.data_pizza.descripcion
      },

      precioIsValid(){
        return this.data_pizza.precio > 100
      },

      formIsValid(){
        console.log('--------------------------------------------->')
        console.log('Nombre')
        console.log(this.nombreIsValid())
        console.log('Ingredientes')
        console.log(this.ingredientesIsValid())
        console.log('Imagen')
        console.log(this.imagenIsValid())
        console.log('Descripción')
        console.log(this.descripcionIsValid())
        console.log('Precio')
        console.log(this.precioIsValid())

        return this.nombreIsValid() && this.ingredientesIsValid() && this.imagenIsValid() && this.descripcionIsValid() && this.precioIsValid()
      },

    }
  };
</script>

<style>

  .shadow-image{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width:100%
  }

</style>
