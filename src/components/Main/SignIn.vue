<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3 @keyup.enter="validate">
      <loading v-show="load"></loading>
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Display Name" required></v-text-field> -->
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-alert :value="errorMess" color="error" icon="warning" outline>{{ errorText }}.</v-alert>
        <v-text-field
          prepend-icon="lock"
          name="password"
          label="Password"
          type="password"
          required
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>
        <v-btn :disabled="!valid" color="success" @click="validate">SignIn</v-btn>
        <v-btn color="error" @click="reset">Reset Form</v-btn>
      </v-form>
    </v-flex>
  </v-container>
</template>

<script>
import loading from "@/views/loading.vue";
import { mapActions } from "vuex";

export default {
  name: "signin",
  components: {
    loading
  },
  data() {
    return {
      valid: true,
      load: false,
      name: "",
      errorText: null,
      errorMess: false,
      // nameRules: [
      //   v => !!v || "Name is required",
      //   v => (v && v.length <= 10) || "Name must be less than 10 characters"
      // ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be greater than 6 characters"
      ]
    };
  },
  computed: {
    ...mapActions("user", ["USER_JOIN"])
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.USER_JOIN.then(() => {
          this.$router.push("/");
        }).catch(error => {
          // eslint-disable-next-line
          console.error(error.message);
          this.errorText = error.message;
          this.errorMess = true;
          this.load = false;
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
