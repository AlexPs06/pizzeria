<template>

    <div class="Login">
        <v-content>
            <v-alert v-if="error" :value="true" type="error" dismissible transition="scale-transition" >
                {{errorMesage}}
            </v-alert>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Registrate</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                        <v-text-field v-model="name" prepend-icon="person" name="nombre" label="Nombre" type="text"></v-text-field>

                        <v-text-field v-model="email" prepend-icon="email" name="correo" label="Correo" type="text"></v-text-field>
                        <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                        <v-text-field v-model="passwordConfirm" prepend-icon="lock" name="password" label="Confirmar contraseña" id="password" type="password"></v-text-field>
                        
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn v-if="name==null || email==null || password==null ||  password!=passwordConfirm" disabled  v-on:click="signup(name, email, password, passwordConfirm) " color="primary">Registrate</v-btn>
                        <v-btn v-if="name!=null &&  email!=null && password!=null &&   password==passwordConfirm"   v-on:click="signup(name, email, password, passwordConfirm) " color="primary">Registrate</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-flex>
                </v-layout>
            </v-container>
            <v-layout align-center column justify-center>
                 <h4 class="subheading" :to="{name:'Register'}" >¿tienes cuenta?
                    <v-btn  flat :to="{name:'Login'}">
                        <span class="mr-2 black--text">Inicia sesion</span>
                    </v-btn>
                </h4>
            </v-layout>
        </v-content>
        <v-content>
            <router-view></router-view>
        </v-content>
    </div>

</template>

<script lang="js">
import axios from "axios";
export default  {
  data() {
    return{
      mensaje: 'hola ',
      name:null,
      email:null,
      password:null,
      passwordConfirm:null,
      error:false,
      errorMesage:"",
    };
  },
  methods:{
      signup(name, email, password, passwordConfirm) {
        
        let user={
            username:name,
            email: email,
            password: password, 
        }
        // localStorage.setItem("Login","true")
        console.log(email)
        console.log(password)

        let api = "http://127.0.0.1:3333/api/v1"
          axios.post(api + "/signup",{
            username:name,
            email: email,
            password: password, 
          }).then((response) => {
              console.log(response)
          });
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
