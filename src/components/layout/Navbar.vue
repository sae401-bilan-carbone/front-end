<template>
  <ul>
    <li>
      <routerLink :to="{ name: 'home' }">Accueil</routerLink>
    </li>
  </ul>
</template>

<style scoped>
  ul {
    display: flex;
    gap: 15px;
    padding: 0;
  }

  li {
    list-style: none;
  }
</style>