<template>
  <div class="PerfilUser">
    <User />
    <Historial />
  </div>
</template>

<script lang="js">
import { Component, Vue } from 'vue-property-decorator';
import User from '@/components/User.vue'; // @ is an alias to /src
import Historial from '@/components/Historial.vue'; // @ is an alias to /src

// localStorage.clear()

@Component({
  components: {
    User,
    Historial
  },
})
export default class PerfilUser extends Vue {}
</script>
