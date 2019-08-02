<template>

    <div >
      <v-stepper v-model="e1">
        <v-alert v-if="errorGetCodeContraseña" :value="true" :type="tipo"  dismissible transition="scale-transition" >
        {{errorMesage}}
        </v-alert>
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Correo</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Codigo de seguridad</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3">Nueva contraseña</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="4">Nueva contraseña</v-stepper-step>
      
    </v-stepper-header>

    <v-stepper-items  >
      <v-stepper-content  step="1">
            <v-card >
              <v-card-title>
                <span class="headline">Ingrese el correo</span>
              </v-card-title>
              <v-card-text>
                <span>Ingrese su correo para recuperar la contraseña</span>
                <v-container grid-list-md>
                  <v-layout wrap>
                    
                    <v-flex xs12>
                      <v-text-field v-model="email"  prepend-icon="email" label="correo*"   required></v-text-field>
                    </v-flex>
                    <small>*Campos requeridos</small>
                    
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
              </v-card-actions>
            </v-card>
        <v-btn v-if="email!=''" color="primary" @click="enviarCodigoContraseña(email)" >
          Continue
        </v-btn>
        <v-btn v-else color="primary" disabled  >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card  >
              <v-card-title>
                <span class="headline">Ingrese el codigo de seguridad</span>
              </v-card-title>
              <v-card-text>
                <span>Se envio un codigo de verificacion a su correo </span>
                <v-container grid-list-md>
                  <v-layout wrap>
                    
                    <v-flex xs12>
                      <v-text-field v-model="codigo"  prepend-icon="lock" label="Codigo de seguridad*"   required></v-text-field>
                    </v-flex>
                    <small>*Campos requeridos</small>
                    
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
                
                <h4 class="subheading">¿No te llego un correo? 
                     <v-btn color="blue darken-1" flat @click="reenviarCodigoContraseña(email)" >
                        <span class="mr-2 black--text">Reenviar</span>
                    </v-btn>
                
                </h4>

              </v-card-actions>
            </v-card>


        <v-btn
          v-if="codigo!=''"
          color="primary"
          @click="e1=3"
        >
          Continue
        </v-btn>
        <v-btn 
          v-else
          disabled
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn  @click="e1 = 1" text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card>
              <v-card-title>
                <span class="headline">Nueva contraseña</span>
              </v-card-title>
              <v-card-text>
                <span>Ingresa la nueva contraseña </span>
                <v-container grid-list-md>
                  <v-layout wrap>
                   
                    
                    <v-flex xs12>
                      <v-text-field v-model="newPassword" prepend-icon="lock" label="Nueva contraseña*"  :append-icon="show ? 'visibility' : 'visibility_off'"   :type="show ? 'text' : 'password'" @click:append="show = !show" required></v-text-field>
                    </v-flex>
                    
                    
                    
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
               
              </v-card-actions>
            </v-card>

        <v-btn
          v-if=" newPassword!=''"
          color="primary"
          @click="verificarCodigoContraseña(newPassword,codigo, email)"
        >
          Continue
        </v-btn>
        <v-btn
          v-if=" newPassword==''"
          color="primary"
          disabled
          @click="e1 = 4"
        >
          Continue
        </v-btn>
        <v-btn  @click="e1 = 2" text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card>
              <v-card-title>
                <span class="headline">Contraseña cambiada con exito</span>
              </v-card-title>
              <v-card-text>
                <span>Ahora puede iniciar sesión con la nueva contraseña</span>
                <v-container grid-list-md>
                  <v-layout wrap>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
               
              </v-card-actions>
            </v-card>

        <v-btn
          color="primary"
          :to="{name:'Login'}"
          @click="e1 = 4"
        >
          Iniciar sesión
        </v-btn>

      </v-stepper-content>


    </v-stepper-items>
  </v-stepper>

    </div>

</template>

<script lang="js">
import axios from "axios";
export default  {
  data() {
    return{
        e1: 0,
        email:"",
        errorGetCodeContraseña:false,
        errorMesage:"",
        codigo:"",
        newPassword:"",
        show: false,
        tipo:"error",
    };
  },
  methods:{
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
                setTimeout(() => this.errorGetCodeContraseña=false, 5000);
              }
            
            });
      },
      enviarCodigoContraseña(email){

        let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
          axios.post(api + "/recovery_password/codigo_de_cambio",{
            email: email,
          }).then((response) => {
          console.log("si envie codigo contraseña");
              this.e1=2;
          }).catch((error2)  =>{
              if (error2.response) {
                this.tipo="error"
                this.errorGetCodeContraseña = true;
                this.errorMesage=error2.response.data.warning+" "
                if (error2.response.data.more) {
                  this.errorMesage=this.errorMesage+" "+error2.response.data.more[0].message
                }
                setTimeout(() => this.errorGetCodeContraseña=false, 5000);
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
            this.e1 = 4

          }).catch((error2)  =>{
              if (error2.response) {
                this.tipo="error"
                this.errorGetCodeContraseña = true;
                this.errorMesage=error2.response.data.warning+" "
                if (error2.response.data.more) {
                  this.errorMesage=this.errorMesage+" "+error2.response.data.more[0].message
                }
                setTimeout(() => this.errorGetCodeContraseña=false, 5000);
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
