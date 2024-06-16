<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { WelcomeDialog } from '../components/dynamicWelcome'
</script>

<template>
  <main>
    <TheWelcome />
    <button @click="() => WelcomeDialog.open()">Open Welcome</button>
  </main>
</template>
