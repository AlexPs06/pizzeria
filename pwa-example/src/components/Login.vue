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
                        <v-toolbar-title>Iniciar sesion</v-toolbar-title>
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
  

        let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
          axios.post(api + "/login",{
            email: email,
            password: password, 
          }).then((response) => {
              localStorage.setItem("token",response.data.token)
              localStorage.setItem("username",response.data.user.username)
              localStorage.setItem("email",response.data.user.email)
              localStorage.setItem("id",response.data.user.id)
              this.$store.state.login=true;
              this.$router.push({ path: 'Perfil' })
          }).catch(function (error2) {
              //esta parte es de control de errores hay que modificar el valor del 
              //error a true para que se muestren no obstante no se como cambiarlo por eso quedo asi 
              //this.error=true;
              //this.errorMesage="Usuario o contraseña incorrectos"
            
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
