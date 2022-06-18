<script setup lang="ts">
const router = useRouter();
const email = ref("");
const password = ref("");
let isError = ref(false);
const handleLogin = async () => {
  try {
    let { data } = await useFetch("/api/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });
    if (!data.value) {
      isError.value = true;
      return;
    }
    // saving the session
    router.push({ path: "/" });
  } catch (e) {
    console.log(e);
    isError.value = true;
  }
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height align="center">
        <v-row align="center" no-gutters style="width: 70%">
          <v-col align="center" style="height: 100%">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="handleLogin()">
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
                  <v-btn
                    type="submit"
                    class="mt-4"
                    color="primary"
                    value="log in">Login</v-btn>
                </form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-label>Don't have a account?</v-label>
            <v-btn color="red" to="/register" nuxt>Register Now</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <div class="text-center">
      <v-dialog v-model="isError">
        <v-card>
          <v-card-text> Email or password is incorrect! </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="isError = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>
