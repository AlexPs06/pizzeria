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
        <td>
          <div class="conteiner">
            <v-select
              :items="items"
              v-model="estatus[pedidos.item.id-1]"
              v-on:change="changeStatus(pedidos.item)"
              solo
              style="width:150px; margin-top:30px"
            ></v-select>
          </div>
        </td>
        <td>
          <v-btn color="info" @click="mostrarPedido(pedidos.item.id)">Ver pedido</v-btn>
        </td>
      </template>
    </v-data-table>
    <br />
    <div v-for="orden in ordenes " v-bind:key = "orden.id">
      
      <v-flex xs12 sm8 offset-sm2 >
        <v-card>
          <v-img v-bind:src= "orden.imagen" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{orden.nombre}}</h3>
              <div>Ingredientes: {{orden.ingredientes}} - Masa: {{orden.masa}} - Tamaño: {{orden.tam}}</div>
              <span class="green--text">Precio: {{orden.precio}}</span>
            </div>
          </v-card-title>


        </v-card>
      </v-flex>
      
    </div>
    <br>
  </div>
</template>

<script>
import axios from "axios";

let api = "http://127.0.0.1:3333/api/v1";

export default {
  data() {
    return {
      headers: [
        {
          text: "Orden (id)",
          align: "left",
          sortable: false,
          value: "orden"
        },
        { text: "Cliente", value: "cliente", sortable: false },
        { text: "Correo", value: "correo", sortable: false },
        { text: "Direccion", value: "direccion", sortable: false },
        { text: "Referencias", value: "referencias", sortable: false },
        { text: "Telefono", value: "telefono", sortable: false },
        {
          text: "Estatus",
          value: "estatus",
          sortable: false,
          align: "center"
        },
        {
          text: "Pedido",
          value: "pedido",
          sortable: false,
          align: "center"
        }
      ],
      pedidos: [],
      ordenes: [],
      items: ["Pedida", "En proceso", "En camino", "Entregada"],
      estatus: []
    };
  },
  created() {
    axios.get(api + "/compras").then(response => {
      
      //this.pizzas = response.data
      this.pedidos = response.data;
      response.data.forEach(element => {
        console.log(element.tokenNotificaciones);
        this.estatus.push(element.estatus);
       
        
      });

      //console.log("Hola", JSON.parse(response.data[0].lista))
    });
  },
  methods: {
    changeStatus(pedido) {
      pedido.estatus = this.estatus[pedido.id - 1];
      console.log(pedido);
      axios.put(api + "/compras/" + pedido.id, pedido).then(response => {
        console.log(response);
      });
    },
   
  }
};
</script>

<style>
</style>
