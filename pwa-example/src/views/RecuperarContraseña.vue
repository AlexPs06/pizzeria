<template>

    <div >
      <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Correo</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Codigo de seguridad</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3">Nueva contraseña</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="4">Nueva contraseña</v-stepper-step>
      <v-alert v-if="errorGetCode" :value="true" :type="tipo"  dismissible transition="scale-transition" >
        {{errorMesage}}
        </v-alert>
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
                      <v-text-field v-model="correo"  prepend-icon="email" label="correo*"   required></v-text-field>
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
        <v-btn color="primary" @click="e1 = 2" >
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
                     <v-btn color="blue darken-1" flat @click="reenviarCodigo(email)" >
                        <span class="mr-2 black--text">Reenviar</span>
                    </v-btn>
                
                </h4>

              </v-card-actions>
            </v-card>


        <v-btn
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
          @click="e1 = 4"
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
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 4"
        >
          Continue
        </v-btn>

        <v-btn @click="e1 = 3" text>Cancel</v-btn>
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
        correo:"",
        errorGetCode:false,
        errorMesage:"",
        codigo:"",
        newPassword:"",
        show: false,
    };
  },
  methods:{
     
      
      

     
      
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
