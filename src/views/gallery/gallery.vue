<template>
  <div>
    <CRow>
      <CCol col="12">
        <CButton
          color="info"
          class="mx-auto d-block mb-4"
          @click="showAddModal = true"
        >
          <CIcon name="cil-Plus" />
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
    <Table :button="bshow" :theads="thead" :tbodies="gallery" :objects="obj" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Table from "@/components/Table";
import axios from "axios";

export default {
  components: {
    Table,
  },
  data() {
    return {
      bshow: { warning: false, delete: true },
      // amenty: [],
      imgSet: false,
      imagevalidation: true,
      addimagevalidation: false,
      showAddModal: false,
      form: "",
      thead: ["Icon", "Amallar"],
      obj: ["image"],
    };
  },
  methods: {
    fileUpload(event) {
      this.form = new FormData();
      this.form.append("image", event.target.files[0]);
      this.$refs.aImage.innerHTML = event.target.files[0].name;
    },
    async add() {
      await axios
        .post("gallery/admin/", this.form)
        .then((res) => {
          this.$toast.success("Muvaffaqiyatli bajarildi.");
          console.log(res);
        })
        .catch(() => {
          this.$toast.error("Rasm kirgizishdagi xatolik.");
        });
    },
  },
  computed: {
    ...mapGetters(["gallery"]),
  },
  mounted() {
    // this.getAmenties();
  },
  created() {
    this.$store.dispatch("getgallery");
  },
};
</script>
