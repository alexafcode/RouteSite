<template>
  <v-container>
    <loading v-show="load"></loading>
    <v-layout row>
      <img :src="photoUrl ? photoUrl : defaultPhoto" height="150">
      <v-text-field
        label="Select Image"
        @click="pickFile"
        prepend-icon="attach_file"
        v-show="!changeData"
      ></v-text-field>
      <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
      <v-flex xs12 sm6 offset-sm3>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" label="Display Name" :readonly="changeData"></v-text-field>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" readonly></v-text-field>
          <!-- <v-text-field
            v-model="phoneNumber"
            return-masked-value
            mask="#.###.##.##.###"
            :readonly="changeData"
            label="Phone Number"
          ></v-text-field> -->
          <!-- <v-alert :value="errorMess" color="error" icon="warning" outline>{{ errorText }}.</v-alert> -->
          <v-btn color="success" v-show="changeData" @click="changeUserData">Изменить</v-btn>
          <v-btn color="success" v-show="!changeData" @click="updateProfile">Отправить</v-btn>
          <v-btn color="success" v-show="!changeData" to="/">Отмена</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
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
      changeData: true,
      defaultPhoto:
        "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png",
      photoUrl: null,
      imageFile: null,
      blobImage: null,
      changePhoto: false,
      // phoneNumber: null
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
        this.photoUrl = user.photoUrl;
        // this.phoneNumber = user.phoneNumber;
      });
    },
    changeUserData() {
      this.changeData = false;
    },
    updateProfile() {
      this.load = true;
      this.UPDATE_USER_PROFILE.then(r => {
        this.load = false;
        this.$router.push("/");
      });
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.photoUrl = fr.result;
          this.imageFile = files[0];
          this.blobImage = new Blob([files[0]], { type: "image/jpeg" });
          this.changePhoto = true;
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.photoUrl = "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 980px) {
  .layout {
    flex-wrap: wrap;
  }
}
</style>
