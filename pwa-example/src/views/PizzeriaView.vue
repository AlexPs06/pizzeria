<template>
  <div class="PizzeriaView">
    <Pizzeria mensaje="esto es pizza"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Pizzeria from '@/components/Pizzeria.vue'; // @ is an alias to /src

@Component({
  components: {
    Pizzeria,
  },
})

export default class PizzeriaView extends Vue {}
</script>