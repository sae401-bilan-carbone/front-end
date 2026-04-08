<script setup>
  import Footer from './components/layout/Footer.vue'
  import Navbar from './components/layout/Navbar.vue'
</script>

<template>
  <div class="nav-and-main">
    <nav>
      <Navbar />
    </nav>

    <main>
      <routerView />
    </main>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
</style>