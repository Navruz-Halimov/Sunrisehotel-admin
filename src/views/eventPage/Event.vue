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
                label="qulaylik nomi"
                v-model="date"
                valid-feedback="Yaxshi."
                invalid-feedback="Kalendardan biror sanani tanlang"
                required
                data-date-format="DD MMMM YYYY"
                type="date"
                 :is-valid="validator"
              />
            </CCol>
            <CCol col="12">
              <editor
                api-key="72yygutms5bezwcxavaanlhe1atalva8wzzssnbsnqbbifhh"
                v-model="content"
                :init="$store.state.config"
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
      :tbodies="$store.state.event"
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
            v-model="events.title"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            required
          />
        </CCol>
        <CCol col="12">
          <CInput
            label="qulaylik nomi"
            v-model="events.date"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            required
            type="date"
          />
        </CCol>
        <CCol col="12">
          <editor
            api-key="72yygutms5bezwcxavaanlhe1atalva8wzzssnbsnqbbifhh"
            v-model="events.content"
            :init="$store.state.config"
          />
          <div class="custom-file my-3">
            <input
              ref="inputVal"
              @change="uploadImage"
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
          <CButton color="success" class="float-right" @click="update()">
            <span>Saqlash</span>
          </CButton>
        </div>
      </div>
    </CModal>
  </div>
</template>

<script>
// import Editor from "@tinymce/tinymce-vue";
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
      events: [],
      bshow: { warning: true, delete: true },
      imgSet: false,
      imagevalidation: true,
      addimagevalidation: false,
      showAddModal: false,
      showAddModaledit: false,
      title: "",
      content: "",
      date: "",
      form: "",
      thead: ["Title", "thumbnail", "date", "content", "Amallar"],
      obj: ["title", "thumbnail", "date", "content"],
    };
  },
  methods: {
       validator(val) {
      return (val && val.length) > 0 ? true : false;
    },
    fileUpload(event) {
      this.form = new FormData();
      this.form.append("title", this.title);
      this.form.append("thumbnail", event.target.files[0]);
      this.form.append("date", this.date);
      this.form.append("content", this.content);
      this.$refs.image.innerHTML = event.target.files[0].name;
    },
    getEdit(val) {
      this.showAddModaledit = true;
      this.itemId = val;
      this.$store
        .dispatch("edit", `${this.$store.state.currentItemUrlApi}/${val}/`)
        .then(() => {
          this.events = this.$store.state.singleItemEdit;
          console.log(this.events);
        });
    },
    async add() {
      await axios
        .post("events/", this.form)
        .then((res) => {
          this.$toast.success("Muvaffaqiyatli bajarildi.");
          console.log(res);
        })
        .catch(() => {
          this.$toast.error("xatolik yuz  berdi.");
        });
    },
    uploadImage(event) {
      if (
        event.target.files[0] &&
        (event.target.files[0].type == "image/png" ||
          event.target.files[0].type == "image/jpeg" ||
          event.target.files[0].type == "image/jpg")
      ) {
        this.events.thumbnail = event.target.files[0];
      } else {
        this.$toast.error(
          "Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko'p bo'lmasligi kerak."
        );
      }
    },
    async update() {
      let form = new FormData();
      console.log(this.events);
      this.form.append("title", this.events.title);
      this.form.append("date", this.events.date);
      this.form.append("content", this.events.content);
      // this.form.append("thumbnail", this.events.thumbnail);
      await axios
        .patch(`events/${this.itemId}/`, form)
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
    ...mapGetters(["eventArr"]),
  },
  mounted() {
    this.$store.dispatch("getevent");
  },
};
</script>
