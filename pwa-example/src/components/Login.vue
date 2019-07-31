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
                        <v-toolbar-title>Crear cuenta</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                        <v-text-field v-model="email" prepend-icon="email" name="correo" label="Correo" type="text"></v-text-field>
                        <v-text-field v-model="password" prepend-icon="lock" name="password" label="Contraseña" id="password" type="password"></v-text-field>
                        
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn v-if="email==null || password==null" disabled v-on:click="Login(email, password)" color="primary">Iniciar sesion</v-btn>
                        <v-btn v-if="email&&password!=null"  v-on:click="Login(email, password)" color="primary">Iniciar sesion</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-flex>
                </v-layout>
            </v-container>
            <v-layout align-center column justify-center>
                 <h4 class="subheading">¿No tienes cuenta? 
                     <v-btn  flat :to="{name:'Register'}">
                        <span class="mr-2 black--text">Registrate</span>
                    </v-btn>
                
                </h4>
                 
            </v-layout>
            
        </v-content>
            
    </div>

</template>

<script lang="js">
import axios from "axios";
export default  {
  data() {
    return{
      mensaje: 'hola ',
      email:null,
      password:null,
      error:false,
      errorMesage:"",
    };
  },
  methods:{
      Login(email, password) {
        const api = "http://127.0.0.1:3333/api/v1"
        const json = { "email": email, "password": password }
        axios.post(api + "/login",json).then((response) => {
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("username",response.data.user.username)
            localStorage.setItem("email",response.data.user.email)
            localStorage.setItem("id",response.data.user.id)
            this.$router.push({ path: 'Perfil' })
        }).catch(function (error) {
            console.log('Error')
            console.log(error)
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
