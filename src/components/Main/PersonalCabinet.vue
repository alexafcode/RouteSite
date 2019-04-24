<template>
  <v-container>
    <loading v-show="load"></loading>
    <v-layout row v-show="!load">
      <!-- <img :src="photoUrl ? photoUrl : defaultPhoto" height="150"> -->
      <v-layout column>
        <img :src="getPhoto" height="200">
        <v-text-field
          label="Select Image"
          @click="pickFile"
          prepend-icon="attach_file"
          v-if="!changeData"
        ></v-text-field>
      </v-layout>
      <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
      <v-flex xs12 sm6 offset-sm3>
        <div class="display-0 text-xs-center" v-if="!user.emailVerified">
          <p>
            Для использования всех возможностей сайта, укажите Отображаемое имя и подтвердите ваш
            <b>email</b>
          </p>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" label="Display Name" :readonly="changeData"></v-text-field>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" readonly></v-text-field>
          <!-- <v-text-field
            v-model="phoneNumber"
            return-masked-value
            mask="#.###.##.##.###"
            :readonly="changeData"
            label="Phone Number"
          ></v-text-field>-->
          <!-- <v-alert :value="errorMess" color="error" icon="warning" outline>{{ errorText }}.</v-alert> -->
          <v-btn color="yellow" v-show="changeData" @click="changeUserData">Изменить</v-btn>
          <v-btn color="success" v-if="!changeData" @click="updateProfile">Отправить</v-btn>
          <v-btn color="warning" v-show="!changeData" to="/">Отмена</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <div v-if="favoriteAuto">
      <v-flex xs12 sm2 offset-sm10>
        <v-list class="favauto">
          <v-list-tile-content>
            <v-list-tile-title>
              <h3>Your Favorites Cars:</h3>
            </v-list-tile-title>
            <v-list-tile-action v-for="(item, index) in favoriteAuto.auto" :key="index">
              <v-list-tile-sub-title>
                <v-icon color="yellow darken-2">star</v-icon>
                <router-link :to="{name: 'cardItem', params: {id: item.id}}">{{ item.name }}</router-link>
              </v-list-tile-sub-title>
            </v-list-tile-action>
          </v-list-tile-content>
        </v-list>
      </v-flex>
    </div>
  </v-container>
</template>

<script>
import loading from "@/views/loading.vue";
import { mapActions, mapState } from "vuex";
import helper from "../Helpers/Helper.js";

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
        "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/128x128/plain/user.png",
      photoUrl: null,
      imageFile: null,
      blobImage: null,
      changePhoto: false
    };
  },
  mounted() {
    this.getUserData();
    this.LOAD_ADD_FAVORITE_AUTO;
  },
  computed: {
    ...mapActions("user", ["GET_USER_DATA", "UPDATE_USER_PROFILE"]),
    ...mapState("user", ["user"]),
    ...mapActions("userDataDb", ["LOAD_ADD_FAVORITE_AUTO"]),
    ...mapState("userDataDb", ["favoriteAuto"]),

    getPhoto() {
      if (this.photoUrl) {
        return this.photoUrl;
      }
      return this.defaultPhoto;
    }
  },
  methods: {
    getUserData() {
      this.load = true;
      this.GET_USER_DATA.then(user => {
        this.name = user.name;
        this.email = user.email;
        this.photoUrl = user.photoUrl;
      });
      this.load = false;
    },
    changeUserData() {
      this.changeData = false;
    },
    updateProfile() {
      this.load = true;
      this.UPDATE_USER_PROFILE.then(() => {
        this.load = false;
        this.$router.push("/");
      });
    },
    pickFile() {
      this.$refs.image.click();
    },
    async onFilePicked(e) {
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
          this.changePhoto = true;
        });
        const config = {
          file: files[0],
          maxSize: 150
        };
        this.blobImage = await helper(config);
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
.favauto {
  background: #fafafa;
}
@media screen and (max-width: 980px) {
  .layout {
    flex-wrap: wrap;
  }
}
</style>
