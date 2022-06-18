<script lang="ts" setup>
const counter = useState("counter", () => 0);

const { data, refresh } = await useFetch("/api/send");
</script>

<template>
  <div>
    <v-main>
      <p>Counter : {{ counter }}</p>
      <button @click="counter++">+++</button>
      <button @click="counter--">---</button>
      <p>{{ data }}</p>
      <button @click="refresh()">Refresh</button>
    </v-main>
  </div>
</template>
