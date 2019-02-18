<template>
  <div>
    <h1 @click.prevent="initState">List {{ autos[0].id}}</h1>
    <h1 @click.prevent="addLS">{{ autos[0].name}}</h1>
    <h1>ID {{ getID }}</h1>
    <span v-for="(auto, index) in autos" :key="index">{{ auto.name }}</span>

    <v-container fluid>
      <v-flex xs12 sm6 md3>
        <v-text-field label="Name"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-textarea name="input" label="Descriptions" :value="desc" hint="Введите текст"></v-textarea>
      </v-flex>
      <v-flex xs2 sm2 class="text-xs-center text-sm-center text-md-center text-lg-center">
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
    </v-container>
    <div class="text-xs-center">
      <v-btn round color="brown darken-4" dark @click="saveToLS">
        <h2>Сохранить</h2>
      </v-btn>
    </div>
    <v-flex xs6 sm4>
      <v-img
        :src="autos[3].imageUrl"
        :alt="autos[3].imageName"
        aspect-ratio="1.7"
        max-height="300px"
        max-width="500px"
      ></v-img>
    </v-flex>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "List",
  components: {},
  data() {
    return {
      // auto: { id: 3, name: "FORD"},
      auto: { id: 4, name: "VW" },
      id: 3,
      //
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      desc: ""

      //
    };
  },
  computed: {
    ...mapState("autoStore", ["autos"]),
    ...mapGetters("autoStore", ["getById"]),
    getID() {
      return this.getById(this.id);
    }
  },
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
        id: 4,
        name: "VW",
        imageName: this.imageName,
        imageFile: this.imageFile,
        imageUrl: this.imageUrl
      };
      this.ADD_LS(ls);
    }
  }
};
</script>

<style>
</style>
