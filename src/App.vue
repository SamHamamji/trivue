<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="navbar bg-base-300">
      <h1 class="text-xl">Trivue</h1>
    </div>
    <RouterView class="grow" />
  </div>
</template>
