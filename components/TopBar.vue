<template>
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>PadelGround Admin</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi:mdi-magnify"></v-btn>

        <v-btn variant="text" icon="mdi-filter"></v-btn>

        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
      </v-app-bar>
</template>

<script setup lang = "ts">
let drawer = useDrawer();
</script>
