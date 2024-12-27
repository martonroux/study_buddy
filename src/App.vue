<script setup>
import FlashCard from "@/components/FlashCard.vue";
</script>

<template>
  <main>
    <FlashCard title="Dérivées I" answer="u(x) * v'(x) + u'(x) * v(x)" question="Donner la dérivée d'une fonction sous la forme u(x)*v(x)" subject="Analyse 1"/>
  </main>
</template>

<style scoped>

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>
