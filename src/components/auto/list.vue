<template>
  <div>
    <!-- <h1 @click.prevent="initState">List {{ autos[0].id}}</h1>
    <h1 @click.prevent="addLS">{{ autos[0].name}}</h1>
    <h1>ID {{ getID }}</h1>
    <span v-for="(auto, index) in autos" :key="index">{{ auto.name }}</span>-->
    <v-flex xs12 sm8 offset-sm2>
      <!-- <loading v-show="load"></loading> -->
    </v-flex>
    <v-container style="background-color: #d8d4d4">
      <v-layout column>
        <v-flex xs12 sm8 md6>
          <v-text-field label="Name" v-model="text" @change="validFields"></v-text-field>
        </v-flex>
        <v-flex xs12 sm8 md6>
          <v-textarea
            name="input"
            label="Descriptions"
            v-model="desc"
            @change="validFields"
            hint="Введите текст"
          >{{ desc }}</v-textarea>
        </v-flex>
        <v-flex xs12 sm8 md6 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <img :src="imageUrl" height="150" v-if="imageUrl">
          <v-text-field
            label="Select Image"
            @click="pickFile"
            v-model="imageName"
            prepend-icon="attach_file"
          ></v-text-field>
          <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          >
        </v-flex>
        <!-- <v-btn fab dark color="indigo" loading large :disabled="!valid" @click="upload"> -->
        <v-btn fab dark color="indigo" :loading="load" large @click="upload" :disabled="!valid">
          <v-icon dark>add</v-icon>
        </v-btn>
        <!-- <v-btn color="indigo" @click="testData">Upload</v-btn> -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
// import firebase from 'firebase/app';
// import Loading from "@/views/loading.vue";

export default {
  name: "List",
  components: {
    // Loading
  },
  data() {
    return {
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      blobImage: "",
      desc: "",
      text: "",
      valid: false,
      load: false

      //
    };
  },
  computed: {
    ...mapState("autoStore", ["autos"]),
    ...mapGetters("autoStore", ["getById"]),
    ...mapActions("autoStore", ["UPLOAD"]),
    getID() {
      return this.getById(this.id);
    }
  },
  watch: {},
  methods: {
    ...mapMutations("autoStore", ["ADD_LS", "INIT_STATE"]),
    addLS() {
      this.ADD_LS(this.auto);
    },
    initState() {
      this.INIT_STATE;
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
          this.imageUrl = fr.result;
          this.imageFile = files[0];
          this.blobImage = new Blob([files[0]], { type: "image/jpeg" });

          // this.blobImage = new Blob([files[0]], { type: "image/jpeg" });
          // files.forEach(f => {
          //   this.blobImage.push(f)
          // })
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    // saveToLS() {
    //   let ls = {
    //     name: this.text,
    //     descriptions: this.desc,
    //     imageName: this.imageName,
    //     imageFile: this.imageFile,
    //     imageUrl: this.imageUrl
    //   };
    //   this.ADD_LS(ls);
    //   this.$router.push("autoCard");
    // },
    validFields() {
      if (this.text != "" && this.desc != "") {
        this.valid = true;
      }
    },
    upload() {
      this.load = true;
      this.UPLOAD.then(res => {
        console.log(res);
        this.$router.push("autoCard");
      }).catch(err => {
        console.log(err);
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 55%;
  // .loading {
  //   margin-top: 10%;
  // }
}
</style>>

