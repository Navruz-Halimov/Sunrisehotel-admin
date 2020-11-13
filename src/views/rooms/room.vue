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
                label="cost per day"
                v-model="cost_per_day"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
              />
            </CCol>
            <CCol col="12">
              <CInput
                label="Description first"
                v-model="description_1"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
              />
            </CCol>
            <CCol col="12">
              <CInput
                label="Description second"
                v-model="description_2"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
              />
            </CCol>
            <CCol col="12">
              <CInput
                label="Floor"
                v-model="floor"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
              />
            </CCol>
            <CCol col="12">
              <CInput
                label="Occupied"
                v-model="is_occupied"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
              />
            </CCol>
            <CCol col="12">
              <CInput
                label="room_num"
                v-model="room_num"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
              />
            </CCol>
            <CCol col="12">
              <CInput
                label="room_size"
                v-model="room_size"
                valid-feedback="Yaxshi."
                invalid-feedback="Kamida bitta so'z kiriting."
                :is-valid="validator"
                required
              />
            </CCol>
            <CCol col="12">
              <select
                name=""
                v-model="room_type"
                style="width:100%; height:35px;"
                label="room"
              >
                <option value="normal">normal</option>
                <option value="royal">royal</option>
              </select>
            </CCol>
            <CCol col="12">
              <div class="custom-file my-3">
                <input
                  ref="inputVal"
                  @change="fileUpload"
                  type="file"
                  class="custom-file-input"
                  id="validatedCustomFile"
                  required
                  valid-feedback="Yaxshi."
                  invalid-feedback="Kamida bitta so'z kiriting."
                  :is-valid="validator"
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
      :tbodies="room"
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
          <CCol col="12">
            <CInput
              label="cost per day"
              v-model="room_edit.cost_per_day"
              valid-feedback="Yaxshi."
              invalid-feedback="Kamida bitta so'z kiriting."
              :is-valid="validator"
              required
            />
          </CCol>
          <CCol col="12">
            <CInput
              label="Description first"
              v-model="room_edit.description_1"
              valid-feedback="Yaxshi."
              invalid-feedback="Kamida bitta so'z kiriting."
              :is-valid="validator"
              required
            />
          </CCol>
          <CCol col="12">
            <CInput
              label="Description second"
              v-model="room_edit.description_2"
              valid-feedback="Yaxshi."
              invalid-feedback="Kamida bitta so'z kiriting."
              :is-valid="validator"
              required
            />
          </CCol>
          <CCol col="12">
            <CInput
              label="Floor"
              v-model="room_edit.floor"
              valid-feedback="Yaxshi."
              invalid-feedback="Kamida bitta so'z kiriting."
              :is-valid="validator"
              required
            />
          </CCol>
          <CCol col="12">
            <CInput
              label="Occupied"
              v-model="room_edit.is_occupied"
              valid-feedback="Yaxshi."
              invalid-feedback="Kamida bitta so'z kiriting."
              :is-valid="validator"
              required
            />
          </CCol>
          <CCol col="12">
            <CInput
              label="room_num"
              v-model="room_edit.room_num"
              valid-feedback="Yaxshi."
              invalid-feedback="Kamida bitta so'z kiriting."
              :is-valid="validator"
              required
            />
          </CCol>
          <CCol col="12">
            <CInput
              label="room_size"
              v-model="room_edit.room_size"
              valid-feedback="Yaxshi."
              invalid-feedback="Kamida bitta so'z kiriting."
              :is-valid="validator"
              required
            />
          </CCol>
          <CCol col="12">
            <CInput
              label="Room type"
              v-model="room_edit.room_type"
              valid-feedback="Yaxshi."
              invalid-feedback="Kamida bitta so'z kiriting."
              :is-valid="validator"
              required
            />
          </CCol>
          <CCol col="12">
            <CInput
              label="Room set"
              v-model="room_edit.room_set"
              valid-feedback="Yaxshi."
              invalid-feedback="Kamida bitta so'z kiriting."
              :is-valid="validator"
              required
            />
          </CCol>
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
      room_edit: [],
      bshow: { warning: true, delete: true },
      imgSet: false,
      imagevalidation: true,
      addimagevalidation: false,
      showAddModal: false,
      showAddModaledit: false,
      cost_per_day: "",
      description_1: "",
      description_2: "",
      floor: "",
      is_occupied: "",
      room_num: "",
      room_size: "",
      room_type: "",
      image_set: "",
      form: "",
      thead: [
        "cost_per_day",
        "description_1",
        "description_2",
        "floor",
        "is_occupied",
        "room_num",
        "room_size",
        "room_type",
        "image_set",
        "Amallar",
      ],
      obj: [
        "cost_per_day",
        "description_1",
        "description_2",
        "floor",
        "is_occupied",
        "room_num",
        "room_size",
        "room_type",
        "image_set",
      ],
    };
  },
  methods: {
    validator(val) {
      return (val && val.length) > 0 ? true : false;
    },
    fileUpload(event) {
      this.form = new FormData();
      this.form.append("cost_per_day", this.cost_per_day);
      this.form.append("description_1", this.description_1);
      this.form.append("description_2", this.description_2);
      this.form.append("floor", this.floor);
      this.form.append("is_occupied", this.is_occupied);
      this.form.append("room_num", this.room_num);
      this.form.append("room_size", this.room_size);
      this.form.append("room_type", this.room_type);
      this.form.image_set.append("image", event.target.files[0]);
      this.$refs.image.innerHTML = event.target.files[0].name;
    },

    getEdit(val) {
      this.showAddModaledit = true;
      this.itemId = val;
      this.$store
        .dispatch("edit", `${this.$store.state.currentItemUrlApi}/${val}/`)
        .then(() => {
          this.room_edit = this.$store.state.singleItemEdit;
          console.log(this.room_edit);
        });
    },
    async add() {
      await axios
        .post("/rooms/admin/", this.form)
        .then((res) => {
          this.$toast.success("Muvaffaqiyatli bajarildi.");
          console.log(res);
        })
        .catch(() => {
          this.$toast.error("xatolik yuz  berdi.");
        });
    },
    uploadImage(event) {
      console.log(event.target.files[0].name);
      this.$refs.aImage.innerHTML = event.target.files[0].name;
      if (
        event.target.files[0] &&
        (event.target.files[0].type == "image/png" ||
          event.target.files[0].type == "image/jpeg" ||
          event.target.files[0].type == "image/jpg")
      ) {
        this.room_edit.image_set = event.target.files[0];
      } else {
        this.$toast.error(
          "Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko'p bo'lmasligi kerak."
        );
      }
    },
    async update() {
      let form = new FormData();
      console.log(this.room_edit);
      form.append("cost_per_day", this.room_edit.cost_per_day);
      form.append("description_1", this.room_edit.description_1);
      form.append("description_2", this.room_edit.description_2);
      form.append("floor", this.room_edit.floor);
      form.append("is_occupied", this.room_edit.is_occupied);
      form.append("room_num", this.room_edit.room_num);
      form.append("room_size", this.room_edit.room_size);
      form.append("room_type", this.room_edit.room_type);
      form.append("image_set", this.room_edit.image_set);
      // form.append("icon", event.target.files[0]);
      await axios
        .patch(`/rooms/admin/${this.itemId}/`, form)
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
    ...mapGetters(["room"]),
  },
  mounted() {
    // this.getAmenties();
  },
  created() {
    this.$store.dispatch("getRooms");
    console.log("room in room", this.room);
  },
};
</script>
