<template>
  <div class="PerfilUser">
    <User />

    

  </div>
</template>

<script lang="js">
import { Component, Vue } from 'vue-property-decorator';
import User from '@/components/User.vue'; // @ is an alias to /src

@Component({
  components: {
    User,
  },
})
export default class PerfilUser extends Vue {}
</script>
