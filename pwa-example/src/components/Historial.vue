<template>
  <div class="container">
    <v-data-table :headers="headers" :items="pedidos" class="elevation-1">
      <template v-slot:items="pedidos">
        <td>{{ pedidos.item.id}}</td>
        <td>{{ pedidos.item.informacion}}</td>
        <td>{{ pedidos.item.tipo}}</td>

      </template>
    </v-data-table>
    <br />
  
    <br>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { log } from 'util';
export default {
  data() {
    return {
      headers: [
        {
          text: "Historial ID",
          align: "left",
          sortable: false,
          value: "orden"
        },
        { text: "Informacion", value: "informacion", sortable: false },
        { text: "Tipo", value: "tipo", sortable: false },
      ],
      pedidos: [],
      ordenes: [],
      ocultar: 0
    };
  },
  created() {
    const api = "https://alfredito-pizzeria.herokuapp.com/api/v1";
    console.log(localStorage.getItem('token'));
    
    const token = localStorage.getItem('token')
    const header = {headers: { Authorization: "Bearer " + token } }
    axios.get(api + "/logs_user", header )
    .then(response => {
      console.log(response.data.logs)
      this.pedidos=response.data.logs;
    }).catch(error =>{
      console.log('Error')
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
