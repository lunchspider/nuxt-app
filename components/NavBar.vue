<template>
  <v-navigation-drawer v-model="drawer" bottom temporary>
    <v-list>
      <v-list-item prepend-icon = "mdi-home" title = "Home" to = "/" nuxt/>
      <v-list-item prepend-icon = "mdi-stadium" title = "Create Arena" to = "/createArena" nuxt />
      <v-list-item prepend-icon = "mdi-logout" title = "Logout"/>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
let drawer = useDrawer();
</script>
