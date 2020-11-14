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
                label="title"
                v-model="form.title"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                required
                :is-valid="validator"
              />
            </CCol>
            <CCol col="12">
              <label for="rate">Rate</label>
              <select
                name=""
                id="rate"
                style="width:100%; height:37px;"
                v-model="form.rate"
              >
                <option value="" v-for="i of 5" :key="i.id">{{ i }}</option>
              </select>
            </CCol>
            <CCol col="12">
              <label for="rate">Rate</label>
              <select
                name=""
                id="rate"
                style="width:100%; height:37px;"
                v-model="form.trip_type"
              >
                <option value="Business">Business</option>
                <option value="Family">Family</option>
              </select>
            </CCol>
            <CCol col="12">
              <label for="user">User</label>
              <select
                name=""
                id="user"
                style="width:100%;height:35px;"
                v-model="form.user"
              >
                <option :value="user.id" v-for="user in customer" :key="user.id"
                  >{{ user.firstname }} {{ user.lastname }}</option
                >
              </select>
            </CCol>
            <CCol col="12">
              <CInput
                label="Comment"
                v-model="form.comment"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                required
                :is-valid="validator"
              />
            </CCol>
            <CCol col="12">
              <CInput
                label="Response"
                v-model="form.response"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                required
                :is-valid="validator"
              />
            </CCol>
             <CCol col="12">
              <CInput
                label="Response"
                v-model="form.created_at"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                required
                :is-valid="validator"
                type="date"
              />
            </CCol>
            <CCol col="12">
              <div class="form-check my-3">
                <label class="form-check-label">
                  <input
                    v-model="form.is_active"
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
            label="title"
            v-model="reviews.title"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            required
            :is-valid="validator"
          />
        </CCol>
        <CCol col="12">
          <label for="rate">Rate</label>
          <select
            name=""
            id="rate"
            style="width:100%; height:37px;"
            v-model="reviews.rate"
          >
            <option value="" v-for="i of 5" :key="i.id">{{ i }}</option>
          </select>
        </CCol>
        <CCol col="12">
          <label for="rate">Rate</label>
          <select
            name=""
            id="rate"
            style="width:100%; height:37px;"
            v-model="reviews.trip_type"
          >
            <option value="Business">Business</option>
            <option value="Family">Family</option>
          </select>
        </CCol>
        <CCol col="12">
          <label for="user">User</label>
          <select
            name=""
            id="user"
            style="width:100%;height:35px;"
            v-model="reviews.user"
          >
            <option :value="user.id" v-for="user in customer" :key="user.id"
              >{{ user.firstname }} {{ user.lastname }}</option
            >
          </select>
        </CCol>
        <CCol col="12">
          <CInput
            label="Comment"
            v-model="reviews.comment"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            required
            :is-valid="validator"
          />
        </CCol>
        <CCol col="12">
          <CInput
            label="Response"
            v-model="reviews.response"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            required
            :is-valid="validator"
          />
        </CCol>
        <CCol col="12">
          <div class="form-check my-3">
            <label class="form-check-label">
              <input
                v-model="reviews.is_active"
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
      reviews: {
        title: "",
        rate: "",
        comment: "",
        is_active: "",
        response: "",
        created_at:""
      },
      bshow: { warning: true, delete: true },
      imgSet: false,
      imagevalidation: true,
      addimagevalidation: false,
      showAddModal: false,
      showAddModaledit: false,
    
      form: {
        title: "",
        rate: "",
        comment: "",
        is_active: "",
        response: "",
        created_at:""
      },
      thead: [
        "title",
        "comment",
        "created_at",
        "is_active",
        "rate",
        "response",
        "Amallar",
      ],
      obj: ["title", "comment", "created_at", "is_active", "rate", "response"],
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
          this.reviews = this.$store.state.singleItemEdit;
          console.log(this.reviews);
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
      async update() {
      await axios
        .patch(`/reviews/admin/${this.itemId}/`, this.reviews)
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
    ...mapGetters(["review", "customer"]),
  },
  mounted() {
    // this.getAmenties();
  },
  created() {
    this.$store.dispatch("getCustomer");
    this.$store.dispatch("getReviews");
  },
};
</script>
