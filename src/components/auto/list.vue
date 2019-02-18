<template>
  <div>
    <!-- <h1 @click.prevent="initState">List {{ autos[0].id}}</h1>
    <h1 @click.prevent="addLS">{{ autos[0].name}}</h1>
    <h1>ID {{ getID }}</h1>
    <span v-for="(auto, index) in autos" :key="index">{{ auto.name }}</span> -->
    <v-container style="background-color: #d8d4d4">
      <v-flex xs12 sm6 md3>
        <v-text-field label="Name" v-model="text"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-textarea
          name="input"
          label="Descriptions"
          v-model="desc"
          required
          hint="Введите текст"
        >{{ desc }}</v-textarea>
      </v-flex>
      <v-flex
        xs12
        sm6
        md3
        required
        class="text-xs-center text-sm-center text-md-center text-lg-center"
      >
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
      <v-btn fab dark color="indigo" v-model="validFields" :disabled="!valid" @click="saveToLS">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-container>

    <!-- <v-flex xs6 sm4>
      <v-img
        :src="imageUrl"
        :alt="imageName"
        aspect-ratio="1.7"
        max-height="300px"
        max-width="500px"
      ></v-img>
    </v-flex>-->
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "List",
  components: {},
  data() {
    return {
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      desc: "",
      text: "",
      valid: false

      //
    };
  },
  computed: {
    ...mapState("autoStore", ["autos"]),
    ...mapGetters("autoStore", ["getById"]),
    getID() {
      return this.getById(this.id);
    },
    validFields() {
      if (this.text != "" && this.desc != "") {
        this.valid = true;
      }
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
      console.log(this.autos);
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
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    saveToLS() {
      let ls = {
        name: this.text,
        descriptions: this.desc,
        imageName: this.imageName,
        imageFile: this.imageFile,
        imageUrl: this.imageUrl
      };
      console.log(ls);
      this.ADD_LS(ls);
      // ToDo router push
    }
  }
};
</script>

<style>
</style>
