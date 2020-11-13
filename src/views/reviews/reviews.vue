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
              />
            </CCol>
            <CCol col="12">
              <editor
                api-key="72yygutms5bezwcxavaanlhe1atalva8wzzssnbsnqbbifhh"
                v-model="description"
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
                  ref="aImage"
                  class="custom-file-label"
                  for="validatedCustomFile"
                  >Rasm yuklang...</label
                >
              </div>
            </CCol>
            <CCol col="12">
              <div class="form-check my-3">
                <label class="form-check-label">
                  <input
                    v-model="is_active"
                    type="checkbox"
                    class="form-check-input"
                    value=""
                  />Aktive
                </label>
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
      :tbodies="review"
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
            v-model="menuof.title"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            required
          />
        </CCol>
        <CCol col="12">
          <editor
            api-key="72yygutms5bezwcxavaanlhe1atalva8wzzssnbsnqbbifhh"
            v-model="menuof.description"
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
              ref="aImage"
              class="custom-file-label"
              for="validatedCustomFile"
              >Rasm yuklang...</label
            >
          </div>
            <CCol col="12">
              <div class="form-check my-3">
                <label class="form-check-label">
                  <input
                    v-model="menuof.is_active"
                    type="checkbox"
                    class="form-check-input"
                    value=""
                  />Aktive
                </label>
              </div>
            </CCol>
        </CCol>
      </CRow>
      <div slot="footer">
        <div slot="footer-wrapper">
          <CButton color="success" class="float-right" @click="updateAdd()">
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
      menuof: [],
      bshow: { warning: true, delete: true },
      imgSet: false,
      imagevalidation: true,
      addimagevalidation: false,
      showAddModal: false,
      showAddModaledit: false,
      title: "",
      description: "",
      is_active:"",
      form: "",
      thead: ["title", "comment","created_at", "is_active", "rate", "response","Amallar"],
      obj: ["title", "comment","created_at", "is_active", "rate", "response",],
    };
  },
  methods: {
    fileUpload(event) {
      this.form = new FormData();
      this.form.append("title", this.title);
      this.form.append("description", this.description);
      this.form.append("image", event.target.files[0]);
      this.form.append("is_active",this.is_active);
      // this.form.append("");
    },
    getEdit(val) {
      this.showAddModaledit = true;
      this.itemId = val;
      this.$store
        .dispatch("edit", `${this.$store.state.currentItemUrlApi}/${val}/`)
        .then(() => {
          this.menuof = this.$store.state.singleItemEdit;
          console.log(this.menuof);
        });
    },
    async add() {
      await axios
        .post("reviews/admin/", this.form)
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
    ...mapGetters(["review"]),
  },
  mounted() {
    // this.getAmenties();
  },
  created() {
    this.$store.dispatch("getReviews");
  },
};
</script>
