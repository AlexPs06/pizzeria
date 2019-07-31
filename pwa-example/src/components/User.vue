<template>

 <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
       <v-alert :value="alert" type="success"  transition="scale-transition" >
        Cambio realizado exitosamente
        </v-alert>
      <v-card>
        <v-img
          src="https://pbs.twimg.com/media/DchIIN-VAAEwZuo.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Bienvenido {{name}}</h3>
          </div>
        </v-card-title>

        <v-card-actions>
          
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn flat color="orange" dark v-on="on">Cambiar contraseña</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Cambiar contraseña</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                   <v-alert v-if="password!=passwordConfirm && passwordConfirm!=null" :value="true" type="error"  transition="scale-transition" >
                        Las contraseñas no coinciden
                    </v-alert>
                    <v-flex xs12>
                      <!-- <v-text-field v-model="oldPassword" prepend-icon="lock" label="Contraseña*"  :append-icon="show ? 'visibility' : 'visibility_off'"   :type="show ? 'text' : 'password'" @click:append="show = !show" required></v-text-field> -->
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="password"  :rules="[v => v.length >= 6 || 'Minimo 6 caracteres']" prepend-icon="lock" label="Nueva contraseña*"  :append-icon="show2 ? 'visibility' : 'visibility_off'"   :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="passwordConfirm"  prepend-icon="lock" label="Confirmar nueva contraseña*"  :append-icon="show3 ? 'visibility' : 'visibility_off'"   :type="show3 ? 'text' : 'password'" @click:append="show3 = !show3" required></v-text-field>
                    </v-flex>
                    
                  </v-layout>
                </v-container>
                <small>*Campos Requeridos</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" v-if="password!=passwordConfirm || password.length<6 " disabled  text @click="changePassword(password,passwordConfirm)">Save</v-btn>
              <v-btn color="blue darken-1" v-if="password==passwordConfirm && password.length>=6 " text @click="changePassword(password,passwordConfirm)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>




           <v-dialog v-model="dialog2" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn flat color="orange" dark v-on="on">Cambiar nombre de usuario</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Cambiar nombre de usuario</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                   <v-alert v-if="nameConfirm==null || nameConfirm==''  " :value="true" type="error"  transition="scale-transition" >
                        Campo vacio
                    </v-alert>
                    <v-flex xs12>
                      <!-- <v-text-field v-model="oldPassword" prepend-icon="lock" label="Contraseña*"  :append-icon="show ? 'visibility' : 'visibility_off'"   :type="show ? 'text' : 'password'" @click:append="show = !show" required></v-text-field> -->
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="nameConfirm"  :rules="[v => v.length >= 4 || 'Minimo 4 caracteres']" prepend-icon="person" label="Nuevo nombre de usuario*"   required></v-text-field>
                    </v-flex>
                    
                    
                  </v-layout>
                </v-container>
                <small>*Campos Requeridos</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog2 = false">Close</v-btn>
              <v-btn color="blue darken-1" v-if="name.length<4 " disabled >Save</v-btn>
              <v-btn color="blue darken-1" v-if="name.length>=4 " text @click="changeName(nameConfirm)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

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
      name:localStorage.getItem("username"),
      email:localStorage.getItem("email"),
      dialog: false,
      dialog2:false,
      password:"",
      passwordConfirm:null,
      oldPassword:null,
      show:false,
      show2:false,
      show3:false,
      alert:false,
      nameConfirm:"",

    };
  },
  methods:{
      changePassword(password,passwordConfirm) {
        


        let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
          axios.put(api + "/profile/passworde",{
            password: password
          },
          {
            headers:{
              Authorization:"Bearer "+localStorage.getItem("token"),
              'Content-Type': "application/json",
            }
          }).then((response) => {
            console.log(response);
            
          }).catch(function (error2) {
            
            });
          this.dialog=false
          this.alert = true
        setTimeout(() => this.alert=false, 3000);
      },
      changeName(name) {
        let api = "https://alfredito-pizzeria.herokuapp.com/api/v1"
          axios.put(api + "/profile/username",{
            username: name,
          },
          {
            headers:{
              Authorization:"Bearer "+localStorage.getItem("token"),
              'Content-Type': "application/json",
            }
          }).then((response) => {
            console.log(response);
            localStorage.setItem("username",name)
            
          }).catch(function (error2) {
            
            });
            this.dialog2=false
          this.name=name;
          this.alert = true
        setTimeout(() => this.alert=false, 3000);
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
