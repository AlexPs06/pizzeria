<template>

    <div class="Login">
        <v-content>
            <v-alert v-if="error" :value="true" type="error" dismissible transition="scale-transition" >
                <!-- Correo o contraseña incorrectos -->
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
                        <v-btn v-if="email&&password!=null"  v-on:click="Login(email, password,error)" color="primary">Iniciar sesion</v-btn>
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
            
            <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">Cuenta bloqueada</span>
              </v-card-title>
              <v-card-text>
                <span>Se envio un codigo de seguridad a tu correo para corroborar tu identidad</span>
                <v-container grid-list-md>
                  <v-layout wrap>
                   <v-alert v-if="alert" :value="true" type="error"  transition="scale-transition" >
                        Las contraseñas no coinciden
                    </v-alert>
                    <v-flex xs12>
                      <!-- <v-text-field v-model="oldPassword" prepend-icon="lock" label="Contraseña*"  :append-icon="show ? 'visibility' : 'visibility_off'"   :type="show ? 'text' : 'password'" @click:append="show = !show" required></v-text-field> -->
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="codigo"  prepend-icon="lock" label="Codigo de seguridad*"   required></v-text-field>
                    </v-flex>
                    
                    
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
                <v-btn color="blue darken-1" v-if="codigo!=''"   text @click="recoveryAcount(codigo)">Siguiente</v-btn>
                <v-btn color="blue darken-1" v-if="codigo==''" disabled  >Continuar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

    </div>

</template>

<script lang="js">
import axios from "axios";
export default  {
  data() {
    return{
      dialog:false,
      mensaje: 'hola ',
      email:"luis_pesar@hotmail.com",
      password:"Alejandro1998",
      error:false,
      errorMesage:"",
      codigo:"",
      alert:false
    };
  },
  methods:{
      Login(email, password, error) {
  
          this.error=false
        let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
          axios.post(api + "/login",{
            email: email,
            password: password, 
          }).then((response) => {
              localStorage.setItem("token",response.data.token)
              localStorage.setItem("username",response.data.user.username)
              localStorage.setItem("email",response.data.user.email)
              localStorage.setItem("id",response.data.user.id)
              localStorage.setItem("login","true")
              this.$store.state.login=true;
              this.$router.push({ path: 'Perfil' })
          }).catch((error2)  =>{
              console.log(error2.response.data);
              console.log(error2.response.data.warning== "Cuenta bloqueada. Te hemos enviado el código de verificación de cuenta a tu correo.");
              if (error2.response.data.warning== "Cuenta bloqueada. Te hemos enviado el código de verificación de cuenta a tu correo.") {
                this.error=true;
                this.errorMesage="Cuenta bloqueada. Te hemos enviado el código de verificación de cuenta a tu correo."
                setTimeout(() => this.dialog=true, 2000);

              }else{
                this.error = true;
                this.errorMesage=error2.response.data.warning+" "
                if (error2.response.data.more[0].message) {
                  this.errorMesage=this.errorMesage+" "+error2.response.data.more[0].message
                }
                setTimeout(() => this.error=false, 3000);
              }
            
            });

        
      },
      recoveryAcount(codigo){

      }
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
