<script setup lang="ts">
import { Button } from 'ant-design-vue'
import TheWelcome from '../components/TheWelcome.vue'
import { WelcomeDialog } from '../components/dynamicWelcome'
</script>

<template>
  <main>
    <Button type="primary" @click="() => WelcomeDialog.open()">Open Welcome</Button>
    <TheWelcome />
  </main>
</template>
