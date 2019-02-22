<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field
          prepend-icon="lock"
          name="password"
          label="Password"
          type="password"
          required
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>
        <v-btn :disabled="!valid" color="success" @click="signUp">SIGNUP</v-btn>
        <v-btn color="error" @click="reset">Reset Form</v-btn>
      </v-form>
    </v-flex>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "signin",
  components: {},
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
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
  mounted() {},
    computed: {
    ...mapActions("user", ["USER_JOIN", "USER_SIGNUP"]),
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        // this.snackbar = true;
        this.USER_JOIN.then( r => {
          console.log(r)
          this.$router.push("/");
        })
      }
    },
    signUp() {
      if (this.$refs.form.validate()) {
        this.USER_SIGNUP.then( r =>{
          console.log(r)
          this.$router.push("/");
        })
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
