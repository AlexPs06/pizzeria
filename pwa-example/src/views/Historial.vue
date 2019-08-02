<template>
  <div class="container">
    <v-data-table :headers="headers" :items="pedidos" class="elevation-1">
      <template v-slot:items="pedidos">
        <!--<p>Datos</p>
        <p>{{ pedidos }}</p>-->
        
        <td>{{ pedidos.item.id}}</td>
        <td>{{ pedidos.item.username}}</td>
        <td>{{ pedidos.item.email}}</td>
        <tr v-for="compra in pedidos.item.compras">
          <td> {{ compra.direccion }} </td>
          <td> {{ compra.referencias }} </td>
          <td> {{ compra.telefono }} </td>
          <td> {{ compra.estatus }} </td>          
        </tr>
        <td v-if="pedidos.item.compras.length == 0" >Datos no disponibles</td>              
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
              <div>Cantidad: {{orden.cantidadPizzas}}</div>
              <span class="green--text">Precio: {{orden.precio}}</span>
            </div>
          </v-card-title>
        </v-card>
        <br>
      </v-flex>
      
    </div>
    <br>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
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
        { text: "Direccion, Referencias, Telefono, Estatus", sortable: false },
      ],
      pedidos: [],
      ordenes: [],
      ocultar: 0
    };
  },
  created() {
    const api = "https://alfredito-pizzeria.herokuapp.com/api/v1";
    const token = localStorage.getItem('token')
    const header = {headers: { Authorization: "Bearer " + token } }
    axios.get(api + "/compras", header)
    .then(response => {
      console.log('Result:')
      console.log(this.pedidos.data)
      this.pedidos = response.data;
    }).catch(error => {
      console.log('Algo salio mal')
      console.log(error)
    });
  },
  methods: {
    mostrarPedido(id) {
      this.ocultar = id;
      this.ordenes = [];
      let elementos = JSON.parse(this.pedidos[id - 1].lista);
      elementos.forEach(pedido => {
        this.ordenes.push(pedido);
      });
    },
    ocultarPedido() {
      this.ocultar = 0;
      this.ordenes = [];
    }
  }
};
</script>
