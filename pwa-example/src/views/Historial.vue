<template>
    <div class="container">
        <v-data-table 
        :headers="headers"
        :items="pedidos" 
        class="elevation-1">
            <template v-slot:items="pedidos">
                <td>{{ pedidos.item.id}}</td>
                <td>{{ ordenes[pedidos.item.id-1] }}</td>
                <td>{{ pedidos.item.nombre}}</td>
                <td>{{ pedidos.item.correo}}</td>
                <td>{{ pedidos.item.direccion}}</td>
                <td>{{ pedidos.item.referencias}}</td>
                <td>{{ pedidos.item.telefono}}</td>
                <td>{{ pedidos.item.estatus}}</td>
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
          { text: 'Orden', value: 'orden', sortable: false },
          { text: 'Cliente', value: 'cliente', sortable: false },
          { text: 'Correo', value: 'correo', sortable: false },
          { text: 'Direccion', value: 'direccion', sortable: false },
          { text: 'Referencias', value: 'referencias', sortable: false },
          { text: 'Telefono', value: 'telefono', sortable: false },
          { text: 'Estatus', value: 'estatus', sortable: false }
        ],
        pedidos: [],
        ordenes: []
      }
    },
     created(){
       let api = "http://127.0.0.1:3333/api/v1"
       axios.get(api + "/compras" ).then((response) => {
          this.pedidos = response.data
          response.data.forEach(element => {
            let elementos = JSON.parse(element.lista)
            let orden = "Pizza: " + elementos[0].nombre + ", Ingredientes: " + elementos[0].ingredientes + ", Cantidad: " + elementos[0].cantidadPizzas
            this.ordenes.push(orden)
          })
       })
     }
}
</script>
