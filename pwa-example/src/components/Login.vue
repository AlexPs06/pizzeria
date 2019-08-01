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
                 <h4 class="subheading">¿Se te olvido la contraseña? 
                     <v-btn  flat :to="{name:'RecuperarContraseña'}">
                        <span class="mr-2 black--text">Recuperala</span>
                    </v-btn>
                
                </h4>
                 
            </v-layout>

            <v-layout align-center column justify-center>
                 <h4 class="subheading">¿No tienes cuenta? 
                     <v-btn  flat :to="{name:'Register'}">
                        <span class="mr-2 black--text">Registrate</span>
                    </v-btn>
                
                </h4>
                 
            </v-layout>
            
        </v-content>
            
          <!-- dialog de la activacion de la cuenta del usuairo  -->
          <v-dialog v-model="dialog" persistent max-width="600px">
              <v-alert v-if="errorGetCode" :value="true" :type="tipo"  dismissible transition="scale-transition" >
                <!-- Correo o contraseña incorrectos -->
                {{errorMesage}}
              </v-alert>
            <v-card>
              <v-card-title>
                <span class="headline">Cuenta bloqueada</span>
              </v-card-title>
              <v-card-text>
                <span>Se envio un codigo de seguridad a tu correo para corroborar tu identidad</span>
                <v-container grid-list-md>
                  <v-layout wrap>
                    
                    <v-flex xs12>
                      <v-text-field v-model="codigo"  prepend-icon="lock" label="Codigo de seguridad*"   required></v-text-field>
                    </v-flex>
                    
                    
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
                <v-btn color="blue darken-1" v-if="codigo!='' "   text @click="comprobarCodigo(codigo, email)">Continuar</v-btn>
                
                <h4 class="subheading">¿No te llego un correo? 
                     <v-btn color="blue darken-1" flat @click="reenviarCodigo(email)" >
                        <span class="mr-2 black--text">Reenviar</span>
                    </v-btn>
                
                </h4>

                <v-btn color="blue darken-1" v-if=" codigo=='' " disabled  >Continuar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>






            <v-dialog v-model="dialogContraseña" persistent max-width="600px">
              <v-alert v-if="errorGetCodeContraseña" :value="true" type="error" dismissible transition="scale-transition" >
                <!-- Correo o contraseña incorrectos -->
                {{errorMesage}}
              </v-alert>
            <v-card>
              <v-card-title>
                <span class="headline">Cambiando contraseña</span>
              </v-card-title>
              <v-card-text>
                <span>Enviamos un codigo para que cambies tu contraseña, por seguridad recomendamos cambiar tu contraseña </span>
                <v-container grid-list-md>
                  <v-layout wrap>
                   
                    <v-flex xs12>
                      <v-text-field v-model="codigoContraseña"  prepend-icon="lock" label="Codigo de seguridad*"   required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="newPassword" prepend-icon="lock" label="Nueva contraseña*"  :append-icon="show ? 'visibility' : 'visibility_off'"   :type="show ? 'text' : 'password'" @click:append="show = !show" required></v-text-field>
                    </v-flex>
                    
                    
                    
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
                <v-btn color="blue darken-1" v-if="codigoContraseña!='' && newPassword!=''"   text @click="verificarCodigoContraseña(newPassword,codigoContraseña, email)">Continuar</v-btn>
                
                <h4 class="subheading">¿No te llego un correo? 
                     <v-btn color="blue darken-1" flat @click="reenviarCodigoContraseña(email)" >
                        <span class="mr-2 black--text">Reenviar</span>
                    </v-btn>
                
                </h4>

                <v-btn color="blue darken-1" v-if=" codigoContraseña=='' || newPassword=='' || codigoContraseña!= newPassword " disabled  >Continuar</v-btn>
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
      codigoContraseña:"",
      email:"luis_pesar@hotmail.com",
      password:"Alejandro1998",
      error:false,
      errorMesage:"",
      codigo:"",
      alert:false,
      errorGetCode:false,
      show: false,
      newPassword:"",
      dialogContraseña:false,
      tipo:"",
      errorGetCodeContraseña: false
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
              console.log(error2.response.data.warning);
              console.log(error2.response.data.warning== "Cuenta bloqueada. Te hemos enviado el código de verificación de cuenta a tu correo.");
              if (error2.response.data.warning== "Cuenta bloqueada. Te hemos enviado el código de verificación de cuenta a tu correo o solicita o puedes solicitar uno nuevo.") {
                // this.error=true;
                // this.errorMesage="Cuenta bloqueada. Te hemos enviado el código de verificación de cuenta a tu correo."
                this.dialog=true
                this.reenviarCodigo(email);

              }else{
                this.error = true;
                this.errorMesage=error2.response.data.warning+" "
                if (error2.response.data.more) {
                  this.errorMesage=this.errorMesage+" "+error2.response.data.more[0].message
                }
                setTimeout(() => this.error=false, 3000);
              }
            
            });

        
      },
      reenviarCodigo(email){
        
        let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
          axios.post(api + "/new_code_check_account",{
            email: email,
          }).then((response) => {
        console.log("si envie codigo ");
              
          }).catch((error2)  =>{
              if (error2.response) {
                this.errorGetCode = true;
                this.tipo="error"
                this.errorMesage=error2.response.data.warning+" "
                if (error2.response.data.more) {
                  this.errorMesage=this.errorMesage+" "+error2.response.data.more[0].message
                }
                setTimeout(() => this.errorGetCode=false, 3000);
              }
            
            });
      },
      
      comprobarCodigo(codigo,email){
        let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
          axios.post(api + "/check_account",{
            email: email,
            key: codigo
          }).then((response) => {
            this.dialog=false;
            this.dialogContraseña=true;
              this.reenviarCodigoContraseña(email)
          }).catch((error2)  =>{
              if (error2.response) {
                this.tipo="error"
                this.errorGetCode = true;
                this.errorMesage=error2.response.data.warning+" "
                if (error2.response.data.more) {
                  this.errorMesage=this.errorMesage+" "+error2.response.data.more[0].message
                }
                setTimeout(() => this.errorGetCode=false, 3000);
              }
            
            });
      },

      verificarCodigoContraseña(newPassword,codigoContraseña, email){
      let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
          axios.post(api + "/recovery_password/cambiar",{
            email: email,
            password:newPassword,
            key: codigoContraseña
          }).then((response) => {
          this.$router.replace({ path: 'Login' })

          }).catch((error2)  =>{
              if (error2.response) {
                this.tipo="error"
                this.errorGetCodeContraseña = true;
                this.errorMesage=error2.response.data.warning+" "
                if (error2.response.data.more) {
                  this.errorMesage=this.errorMesage+" "+error2.response.data.more[0].message
                }
                setTimeout(() => this.errorGetCodeContraseña=false, 3000);
              }
            
            });
      },
      reenviarCodigoContraseña(email){

        let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
          axios.post(api + "/recovery_password/codigo_de_cambio",{
            email: email,
          }).then((response) => {
          console.log("si envie codigo contraseña");
              
          }).catch((error2)  =>{
              if (error2.response) {
                this.tipo="error"
                this.errorGetCodeContraseña = true;
                this.errorMesage=error2.response.data.warning+" "
                if (error2.response.data.more) {
                  this.errorMesage=this.errorMesage+" "+error2.response.data.more[0].message
                }
                setTimeout(() => this.errorGetCodeContraseña=false, 3000);
              }
            
            });
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
