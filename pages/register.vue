<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height align="center">
        <v-row align="center" no-gutters style="width: 70%">
          <v-col align="center" style="height: 100%">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="handleRegister()">
                  <v-text-field
                    v-model="email"
                    name="email"
                    label="Email"
                    type="text"
                    placeholder="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="name"
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="name"
                    required
                  ></v-text-field>
                  <v-btn
                    type="submit"
                    class="mt-4"
                    color="primary"
                    value="log in"
                    >Register</v-btn
                  >
                </form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-label>Already have a account?</v-label>
            <v-btn color="red" to="/login" nuxt>Login</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
let email = ref("");
let password = ref("");
let name = ref("");
let isError = ref(false);
let router = useRouter();
const handleRegister = async () => {
  try {
    let { data } = await useFetch("/api/user", {
      method: "POST",
      body: { email: email.value, password: password.value, name: name.value },
    });
    if (!data.value) {
      isError.value = true;
      return;
    }
    router.push({ path: "/" });
  } catch (e) {
    isError.value = true;
    console.log(e);
  }
};
</script>
