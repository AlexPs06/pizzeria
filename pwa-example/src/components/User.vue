<template>

 <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div> {{ name }} </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script lang="js">
import axios from "axios";
export default  {
  data() {
    return{
      mensaje: 'hola ',
      name:"",
      email:"",
      password:"",
      passwordConfirm:"",
      error:false,
      errorMesage:"",
    };
  },
  methods:{
      signup(name, email, password, passwordConfirm) {
        
        // let user={
        //     username:name,
        //     email: email,
        //     password: password, 
        //     passwordConfirm: passwordConfirm
        // }
        // // localStorage.setItem("Login","true")
        // // localStorage.clear()
        // console.log(email)
        // console.log(password)

        // let api = "http://127.0.0.1:3333/api/v1"
        //   axios.post(api + "/signup",{user
        //   }).then((response) => {
              // console.log(response.warning)
        //   });
      },
    },
};
</script>

<style>

.topright {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
}
</style>
