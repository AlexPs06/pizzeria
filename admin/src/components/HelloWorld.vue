<template>
  <div class="container">
    <v-data-table :headers="headers" :items="pedidos" class="elevation-1">
      <template v-slot:items="pedidos">
        <td>{{ pedidos.item.id }}</td>
        <td>{{ pedidos.item.nombre }}</td>
        <td>{{ pedidos.item.correo }}</td>
        <td>{{ pedidos.item.direccion }}</td>
        <td>{{ pedidos.item.referencias }}</td>
        <td>{{ pedidos.item.telefono }}</td>
        <td>{{ ordenes[pedidos.item.id-1] }}</td>
        <td>
          <div class="conteiner">
            <v-select
              :items="items"
              v-model="estatus[pedidos.item.id-1]"
              v-on:change="changeStatus(pedidos.item)"
              solo
              style="width:200px"
            ></v-select>
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';

let api = "http://127.0.0.1:3333/api/v1"

export default {
  data () {
    return {
        headers: [
          {
            text: 'Orden (id)',
            align: 'left',
            sortable: false,
            value: 'orden'
          },
          { text: 'Cliente', value: 'cliente' },
          { text: 'Correo', value: 'correo' },
          { text: 'Direccion', value: 'direccion' },
          { text: 'Referencias', value: 'referencias' },
          { text: 'Telefono', value: 'telefono' },
          { text: 'Pedido', value: 'pedido' },
          { text: 'Estatus', value: 'estatus' }
        ],
        pedidos: [],
        ordenes: [],
        items: ['Pedida', 'En proceso', 'En camino', 'Entregada'],
        estatus: []
    }
  },
  created(){
     
      axios.get(api + "/compras" ).then((response) => {
        //this.pizzas = response.data
        this.pedidos = response.data
        response.data.forEach(element => {
            console.log(element.tokenNotificaciones)
            this.estatus.push(element.estatus)
            let elementos = JSON.parse(element.lista)
            let orden = "Pizza: " + elementos[0].nombre + ", Ingredientes: " + elementos[0].ingredientes + ", Cantidad: " + elementos[0].cantidadPizzas
            this.ordenes.push(orden)
            console.log(JSON.parse(element.lista))
        });
        
        
        //console.log("Hola", JSON.parse(response.data[0].lista))

      })
    },
    methods:{
        changeStatus(pedido){
          pedido.estatus = this.estatus[pedido.id-1]
          console.log(pedido)
          axios.put(api + "/compras/" + pedido.id, pedido ).then((response) => {
            console.log(response)
          })
        }
    }
  
};
</script>

<style>
</style>
