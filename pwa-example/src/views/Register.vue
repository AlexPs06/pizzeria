<template>
  <div class="Register">
    <!-- <v-img :src="'http://historiasdesobremesa.files.wordpress.com/2013/05/pizzas-dominos.jpg'"> -->
    <Register />

    
    <!-- </v-img> -->

  </div>
</template>

<script lang="js">
import { Component, Vue } from 'vue-property-decorator';
import Register from '@/components/Register.vue'; // @ is an alias to /src

@Component({
  components: {
    Register,
  },
})
export default class Register2 extends Vue {}
</script>
