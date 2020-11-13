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
              <label for="room">room</label>
              <select
                name=""
                id="room"
                style="width:100%;height:35px;"
                v-model="form.room"
              >
                <option
                  :value="room_num.id"
                  v-for="room_num in room"
                  :key="room_num.id"
                  >{{ room_num.room_num }}</option
                >
              </select>
            </CCol>
            <CCol col="12">
              <CInput
                label="cost"
                v-model="form.overall_cost"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
              />
            </CCol>
            <CCol col="12">
              <div class="form-check my-3">
                <label class="form-check-label">
                  <input
                    v-model="form.is_paid"
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
      :tbodies="reservation"
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
            v-model="reservations.start_date"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            :is-valid="validator"
            type="date"
          />
        </CCol>
        <CCol col="12">
          <CInput
            label="Ending date"
            v-model="reservations.end_date"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            :is-valid="validator"
            type="date"
          />
        </CCol>
        <CCol col="12">
          <label for="user">user</label>
          <select
            name=""
            id="user"
            style="width:100%;height:35px;"
            v-model="reservations.user"
          >
            <option :value="user.id" v-for="user in customer" :key="user.id"
              >{{ user.firstname }} {{ user.lastname }}</option
            >
          </select>
        </CCol>
        <CCol col="12">
          <label for="room">room</label>
          <select
            name=""
            id="room"
            style="width:100%;height:35px;"
            v-model="reservations.room"
          >
            <option
              :value="room_num.id"
              v-for="room_num in room"
              :key="room_num.id"
              >{{ room_num.room_num }}</option
            >
          </select>
        </CCol>
        <CCol col="12">
          <CInput
            label="cost"
            v-model="reservations.overall_cost"
            valid-feedback="Yaxshi."
            invalid-feedback="Kamida bitta so'z kiriting."
            :is-valid="validator"
            type="text"
          />
        </CCol>
        <CCol col="12">
          <div class="form-check my-3">
            <label class="form-check-label">
              <input
                v-model="reservations.is_paid"
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
      reservations: {
        end_date: "",
        start_date: "",
        room: "",
        user: "",
        is_paid: "",
        overall_cost: "",
      },
      bshow: { warning: true, delete: true },
      imgSet: false,
      imagevalidation: true,
      addimagevalidation: false,
      showAddModal: false,
      showAddModaledit: false,

      form: {
        end_date: "",
        start_date: "",
        room: "",
        user: "",
        is_paid: "",
        overall_cost: "",
      },
      thead: [
        "end_date",
        "start_date",
        "room",
        "user",
        "is_paid",
        "overall_cost",
        "Amallar",
      ],
      obj: [
        "end_date",
        "start_date",
        "room",
        "user",
        "is_paid",
        "overall_cost",
      ],
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
          this.reservations = this.$store.state.singleItemEdit;
          console.log(this.reservations);
        });
    },
    async add() {
      await axios
        .post("/reservation/admin/", this.form)
        .then((res) => {
          this.$toast.success("Muvaffaqiyatli bajarildi.");
          console.log(res);
          console.log("something",this.form);
          
        })
        .catch(() => {
          this.$toast.error("xatolik yuz  berdi.");
        });
    },
    async update() {
      await axios
        .patch(`/reservation/admin/${this.itemId}/`, this.reservations)
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
    ...mapGetters(["reservation", "customer", "room"]),
  },
  mounted() {
    // this.getAmenties();
  },
  created() {
    this.$store.dispatch("getCustomer");
    this.$store.dispatch("getRooms");
    this.$store.dispatch("getReservation");
    console.log("reserve", this.reservation);
  },
};
</script>
