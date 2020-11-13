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
                label="Starting date"
                v-model="form.start_date"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
                type="date"
              />
            </CCol>
            <CCol col="12">
              <CInput
                label="Ending date"
                v-model="form.end_date"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
                type="date"
              />
            </CCol>
            <CCol col="12">
              <CInput
                label="Percentage"
                v-model="form.percentage"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
              />
            </CCol>
            <CCol col="12">
              <select
                name=""
                id=""
                style="width:100%;height:35px;"
                v-model="form.room_group"
                multiple
              >
                <option
                  :value="room_num.room_num"
                  v-for="room_num in room"
                  :key="room_num.id"
                  >{{ room_num.room_num }}</option
                >
              </select>
            </CCol>
            <CCol col="12">
              <div class="form-check my-3">
                <label class="form-check-label">
                  <input
                    v-model="form.is_active"
                    type="checkbox"
                    class="form-check-input"
                    value="false"
                  />Aktiv
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
      :tbodies="discount"
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
            label="Starting date"
            v-model="discounts.start_date"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            :is-valid="validator"
            required
            type="date"
          />
        </CCol>
        <CCol col="12">
          <CInput
            label="Ending date"
            v-model="discounts.end_date"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            :is-valid="validator"
            required
            type="date"
          />
        </CCol>
        <CCol col="12">
          <CInput
            label="Percentage"
            v-model="discounts.percentage"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            :is-valid="validator"
            required
          />
        </CCol>
        <CCol col="12">
          <select
            name=""
            id=""
            style="width:100%;height:35px;"
            v-model="discounts.room_group"
          >
            <option
              :value="parseInt(room_num.room_num)"
              v-for="room_num in room"
              :key="room_num.id"
              >{{ room_num.room_num }}</option
            >
          </select>
        </CCol>
        <CCol col="12">
          <div class="form-check my-3">
            <label class="form-check-label">
              <input
                v-model="discounts.is_active"
                type="checkbox"
                class="form-check-input"
                value=""
              />Aktiv
            </label>
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
      discounts: {
        start_date: "",
        end_date: "",
        percentage: "",
        is_active: "",
        room_group: [],
      },
      bshow: { warning: true, delete: true },
      imgSet: false,
      imagevalidation: true,
      addimagevalidation: false,
      showAddModal: false,
      showAddModaledit: false,

      form: {
        start_date: "",
        end_date: "",
        percentage: "",
        is_active: "",
        room_group: [],
      },
      thead: [
        "end_date",
        "start_date",
        "room_group",
        "percentage",
        "is_active",
        "Amallar",
      ],
      obj: ["end_date", "start_date", "room_group", "percentage", "is_active"],
    };
  },
  methods: {
    validator(val) {
      return (val && val.length) > 0 ? true : false;
    },
    getEdit(val) {
      this.showAddModaledit = true;
      this.itemId = val;
      this.$store
        .dispatch("edit", `${this.$store.state.currentItemUrlApi}/${val}/`)
        .then(() => {
          this.discounts = this.$store.state.singleItemEdit;
          console.log(this.discounts);
        });
    },
    async add() {
      await axios
        .post("/offers/admin/discount/", this.form)
        .then((res) => {
          this.$toast.success("Muvaffaqiyatli bajarildi.");
          console.log(res);
          console.log(this.form);
        })
        .catch(() => {
          this.$toast.error("xatolik yuz  berdi.");
        });
    },
    async update() {
      await axios
        .patch(`/offers/admin/discount/${this.itemId}/`, this.discounts)
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
    ...mapGetters(["discount", "room"]),
  },
  mounted() {
    // this.getAmenties();
  },
  created() {
    this.$store.dispatch("getDiscount");
    this.$store.dispatch("getRooms");
    console.log("discountlar", this.discount);
    // console.log("rooms", this.room);
  },
};
</script>
