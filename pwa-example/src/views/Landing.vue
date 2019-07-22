<template>
  <div class="Landing">
    <!-- <v-img :src="'http://historiasdesobremesa.files.wordpress.com/2013/05/pizzas-dominos.jpg'"> -->
    <Login />

    
    <!-- </v-img> -->

  </div>
</template>

<script lang="js">
import { Component, Vue } from 'vue-property-decorator';
import Login from '@/components/Login.vue'; // @ is an alias to /src

@Component({
  components: {
    Login,
  },
})
export default class Landing extends Vue {}
</script>
