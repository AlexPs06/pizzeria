<template>
    <div class="container">
        <v-data-table 
        :headers="headers"
        :items="pedidos" 
        class="elevation-1">
            <template v-slot:items="pedidos">
                <td>{{ pedidos.item.id}}</td>
                <td>{{ pedidos.item.nombre}}</td>
                <td>{{ pedidos.item.correo}}</td>
                <td>{{ pedidos.item.direccion}}</td>
                <td>{{ pedidos.item.referencias}}</td>
                <td>{{ pedidos.item.telefono}}</td>
                <td>{{ pedidos.item.estado}}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'
export default  {
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
          { text: 'Estado', value: 'estado' }
        ],
        pedidos: []
      }
    },
     created(){
       let api = "http://127.0.0.1:3333/api/v1"
       axios.get(api + "/compras" ).then((response) => {
         this.pedidos = response.data
       })
     }
}
</script>
