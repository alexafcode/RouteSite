<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3>
      <loading v-show="load"></loading>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :counter="10" label="Display Name" :readonly="changeData"></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" :readonly="changeData"></v-text-field>
        <!-- <v-alert :value="errorMess" color="error" icon="warning" outline>{{ errorText }}.</v-alert> -->
        <!-- <v-text-field
          prepend-icon="lock"
          name="password"
          label="Password"
          type="password"
          required
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>-->
        <v-btn color="success" v-show="changeData" @click="changeUserData">Изменить</v-btn>
        <v-btn color="success" v-show="!changeData" @click="updateProfile">Отправить</v-btn>
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
      ],
      changeData: true
    };
  },
  mounted() {
    this.getUserData();
  },
  computed: {
    ...mapActions("user", ["GET_USER_DATA", "UPDATE_USER_PROFILE"])
  },
  methods: {
    getUserData() {
      this.GET_USER_DATA.then(user => {
        this.name = user.name;
        this.email = user.email;
        // this.photo = user.photoURL
      });
    },
    changeUserData() {
      this.changeData = false;
    },
    updateProfile() {
      this.UPDATE_USER_PROFILE
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
