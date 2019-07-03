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
        <!-- <td>{{ ordenes[pedidos.item.id-1] }}</td> -->
        <td>{{ pedidos.item.tokenNotificaciones }}</td>
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
import request from 'request'
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
          { text: 'Token', value: 'token' },
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
            this.estatus.push(element.estatus)
            let elementos = JSON.parse(element.lista)
            let orden = "Pizza: " + elementos[0].nombre + ", Ingredientes: " + elementos[0].ingredientes + ", Cantidad: " + elementos[0].cantidadPizzas
            this.ordenes.push(orden)
        });
        
        
        
        //console.log("Hola", JSON.parse(response.data[0].lista))

      })
    },
    methods:{

      


        changeStatus(pedido){
          let notification= {
                title: "FCM Message",
                body: "This is an FCM Message",
                icon: "./img/icons/android-chrome-192x192.png"
              }

          let data ={
            to: pedido.tokenNotificaciones,
            notification: notification
          }
          let api = "https://fcm.googleapis.com/fcm/send"
          axios.post(api,data,{
          headers:{
            'Authorization':"key=AAAAR2Ns23c:APA91bHwRlsf2HuHK03B51eGxX2cVflh7CNFGVaSO0Zqi4mpqeyQ4lKZ-cPbLTrw7_YmML31n_q1UuZ2DgJVsbs_mhGXTO51co9vIq6A7-_LWqIVPjlRIQQx0Z9_mAUGBanpoPYHBPoB",
            'Content-Type': "application/json",
          }
          } ).then((response) => {
          });



        console.log(pedido.tokenNotificaciones)
          
          // const options = {
          // method: 'POST',
          // url: 'https://fcm.googleapis.com/fcm/send',
          // headers: {
            // 'Authorization':"key=AAAASim8sYY:APA91bHyE3EdrFabmRy-Lsi2DhWeIRGTPzvS9T638Qee80ah65rST4NOcnbQRsNFyLkZW_sLRdiCOCds_7VwI8l9tNmpJhlncIi1r4_NDSLscLY1cpnYGKw7XmPTwolMtW6dq347F5LK",
            // 'Content-Type': "application/json",
            //  to: this.pedidos[0].tokenNotificaciones,      
            //  "Access-Control-Allow-Origin":'*'
          // },
          // body: notification,
          // json: true // JSON stringifies the body automatically
          // }
          
          // request(options)
          // .then(function (response) {
          // // Handle success response data
          // })

          /*
          curl -X POST -H "Authorization: key=AAAASim8sYY:APA91bHyE3EdrFabmRy-Lsi2DhWeIRGTPzvS9T638Qee80ah65rST4NOcnbQRsNFyLkZW_sLRdiCOCds_7VwI8l9tNmpJhlncIi1r4_NDSLscLY1cpnYGKw7XmPTwolMtW6dq347F5LK" -H "Content-Type: application/json" -d '{
              "to": "d43Vg-NLBFQ:APA91bG4p86LfApZV9PVb-DwiJ1eQ2eyNgfFmuhZ6bwVPBJR-ds3B-uKVx7C-p0-_sxi1E9N1wVMz78fz3O7twcoNYOY5oY1uD6tQY3nFiWOzzm4hdL2RDcdMrZEZ-j-6eh0O6Zbtp5h",
              "notification": {
                "title": "FCM Message",
                "body": "This is an FCM Message",
                "icon": "./img/icons/android-chrome-192x192.png"
              }
            }' https://fcm.googleapis.com/fcm/send
          
          */


          pedido.estatus = this.estatus[pedido.id-1]
          console.log(pedido)
          // axios.put(api + "/compras/" + pedido.id, pedido ).then((response) => {
          //   console.log(response)
          // })
        }
    }
  
};
</script>

<style>
</style>
