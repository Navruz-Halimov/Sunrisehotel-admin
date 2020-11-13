<template>
  <div>
    <CRow>
      <CCol col="12">
        <CButton
          color="info"
          class="mx-auto d-block mb-4"
          @click="showAddModal = true"
        >
          <CIcon name="cilPlus" />
        </CButton>
        <CModal
          title="Qo'shish"
          color="info"
          :show.sync="showAddModal"
          size="lg"
          :centered="true"
        >
          <CRow>
            <CCol col="12">
              <CInput
                label="qulaylik nomi"
                v-model="title"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                required
                :is-valid="validator"
              />
            </CCol>
            <CCol col="12">
              <CInput
                label="text "
                v-model="description"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                required
                :is-valid="validator"
              />
              <div class="custom-file my-3">
                <input
                  ref="inputVal"
                  @change="fileUpload"
                  type="file"
                  class="custom-file-input"
                  id="validatedCustomFile"
                  required
                />
                <label
                  ref="aImage"
                  class="custom-file-label"
                  for="validatedCustomFile"
                  >Rasm yuklang...</label
                >
              </div>
            </CCol>
          </CRow>
          <div slot="footer">
            <div slot="footer-wrapper">
              <CButton color="success" class="float-right" @click="add">
                <span>Saqlash</span>
              </CButton>
            </div>
          </div>
        </CModal>
      </CCol>
    </CRow>
    <Table
      :button="bshow"
      :theads="thead"
      :tbodies="menuSlider"
      :objects="obj"
      @getItemEdit="getEdit"
    />

    <CModal
      title="O'zgartirish"
      color="info"
      :show.sync="showAddModaledit"
      size="lg"
      :centered="true"
    >
      <CRow>
        <CCol col="12">
          <CInput
            label="qulaylik nomi"
            v-model="menuSlide.title"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
          />
        </CCol>
        <CCol col="12">
          <CInput
            label="text "
            v-model="menuSlide.description"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            required
            :is-valid="validator"
          />
          <div class="custom-file my-3">
            <input
              ref="inputVal"
              @change="uploadImage"
              type="file"
              class="custom-file-input"
              id="validatedCustomFile"
            />
            <label
              ref="image"
              class="custom-file-label"
              for="validatedCustomFile"
              >Rasm yuklang...</label
            >
          </div>
        </CCol>
      </CRow>
      <div slot="footer">
        <div slot="footer-wrapper">
          <CButton color="success" class="float-right" @click="update()">
            <span>Saqlash</span>
          </CButton>
        </div>
      </div>
    </CModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Table from "@/components/Table";
import axios from "axios";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    Table,
    editor: Editor,
  },
  data() {
    return {
      menuSlide: [],
      bshow: { warning: true, delete: true },
      imgSet: false,
      imagevalidation: true,
      addimagevalidation: false,
      showAddModal: false,
      showAddModaledit: false,
      title: "",
      description: "",
      form: "",
      thead: ["Title", "Image", "Description", "Amallar"],
      obj: ["title", "image", "description"],
    };
  },
  methods: {

    validator(val) {
      return (val && val.length) > 0 ? true : false;
    },

    fileUpload(event) {
      this.$refs.aImage.innerHTML = event.target.files[0].name;
      this.form = new FormData();
      this.form.append("title", this.title);
      this.form.append("description", this.description);
      this.form.append("image", event.target.files[0]);
      // this.form.append("");
    },
    getEdit(val) {
      this.showAddModaledit = true;
      this.itemId = val;
      this.$store
        .dispatch("edit", `${this.$store.state.currentItemUrlApi}/${val}/`)
        .then(() => {
          this.menuSlide = this.$store.state.singleItemEdit;
          console.log(this.menuSlide);
        });
    },
    async add() {
      await axios
        .post("menu/admin/image/", this.form)
        .then((res) => {
          this.$toast.success("Muvaffaqiyatli bajarildi.");
          console.log(res);
        })
        .catch(() => {
          this.$toast.error("xatolik yuz  berdi.");
        });
    },
    uploadImage(event) {
      this.$refs.aImage.innerHTML = event.target.files[0].name;
      if (
        event.target.files[0] &&
        (event.target.files[0].type == "image/png" ||
          event.target.files[0].type == "image/jpeg" ||
          event.target.files[0].type == "image/jpg")
      ) {
        this.menuSlide.icon = event.target.files[0];
      } else {
        this.$toast.error(
          "Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko'p bo'lmasligi kerak."
        );
      }
    },
    async update() {
      let form = new FormData();
      console.log(this.menuSlide);
      form.append("title", this.menuSlide.title);
      form.append("description", this.menuSlide.description);
      // form.append("icon", this.amenty.icon);
      await axios
        .patch(`menu/admin/image/${this.itemId}/`, form)
        .then((res) => {
          this.$toast.success("Muvaffaqiyatli bajarildi.");
          console.log(res);
        })
        .catch(() => {
          this.$toast.error("xatolik yuz  berdi.");
        });
    },
  },
  computed: {
    ...mapGetters(["menuSlider"]),
  },
  mounted() {},
  created() {
    this.$store.dispatch("getmenuslider");
  },
};
</script>
