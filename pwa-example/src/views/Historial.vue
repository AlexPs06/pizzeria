<template>
  <div class="container">
    <v-data-table :headers="headers" :items="pedidos" class="elevation-1">
      <template v-slot:items="pedidos">
        <!--<p>Datos</p>
        <p>{{ pedidos }}</p>-->
        
        <td>{{ pedidos.item.id}}</td>
        <td>{{ pedidos.item.nombre}}</td>
        <td>{{ pedidos.item.correo}}</td>
        <td>{{ pedidos.item.direccion}}</td>
        <td>{{ pedidos.item.referencias}}</td>
        <td>{{ pedidos.item.telefono}}</td>
        <td>{{ pedidos.item.estatus}}</td>
        <td>
          <v-btn
            v-if="ocultar != pedidos.item.id"
            color="info"
            @click="mostrarPedido(pedidos.item.id,pedidos.item.lista )"
          >Ver pedido</v-btn>
          <v-btn fab small v-if="ocultar == pedidos.item.id" color="error" @click="ocultarPedido()">
            <v-icon>remove</v-icon>
          </v-btn>
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
    axios.get(api + "/compras_usuario", header)
    .then(response => {
      console.log('Result:')
      console.log(response.data)//length
      this.pedidos = response.data;

    }).catch(error => {
      console.log('Algo salio mal')
      console.log(error.response)
    });
  },
  methods: {
    mostrarPedido(id,lista) {
      this.ocultar = id;
      this.ordenes = [];
      console.log(id)
      // console.log(this.pedidos[id - 1].lista)

      let elementos = JSON.parse(lista);
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
