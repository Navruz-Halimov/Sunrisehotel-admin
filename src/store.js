import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { TYPE } from "vue-toastification";
import axios from "axios";

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: false,
  showDeleteModal: false,
  showEditModal: false,
  baseURL: "http://188.225.83.193/",
  token: localStorage.getItem("token") || "",
  amenties: [],
  singleItemEdit: [],
  gallery: [],
  event: [],
  menuSlider: [],
  menuOffer: [],
  payment: [],
  offers: [],
  rooms: [],
  customer: [],
  discounts: [],
  reservations: [],
  reviews: [],
  currentItemUrl: "",
  currentItemUrlApi: "",
  numberOfItems: 0,
  deleteModalId: 0,
  editModalId: 0,
  editItemId: 0,
  showLoader: false,
  editLoader: false,
  config: {
    selector: "textarea#full-featured-non-premium",
    plugins:
      "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
    imagetools_cors_hosts: ["picsum.photos"],
    menubar: "file edit view insert format tools table help",
    toolbar:
      "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    image_advtab: true,
    content_css: "//www.tiny.cloud/css/codepen.min.css",
    importcss_append: true,
    template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
    template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
    height: 300,
    image_caption: true,
    quickbars_selection_toolbar:
      "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
    noneditable_noneditable_class: "mceNonEditable",
    contextmenu: "link image imagetools table",
  },
};

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarOpened ? false : "responsive";
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarClosed ? true : "responsive";
  },
  set(state, [variable, value]) {
    state[variable] = value;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setAmenties(state, payload) {
    state.amenties = payload;
  },
  setGallery(state, payload) {
    state.gallery = payload;
  },
  setEvent(state, payload) {
    state.event = payload;
  },
  setMenuSlider(state, payload) {
    state.menuSlider = payload;
  },
  setMenuOffer(state, payload) {
    state.menuOffer = payload;
  },
  setOffers(state, payload) {
    state.offers = payload;
  },
  setDeleteModalId(state, payload) {
    state.deleteModalId = payload;
  },
  setShowDeleteModal(state) {
    state.showDeleteModal = !state.showDeleteModal;
  },
  setEditModalId(state, payload) {
    state.editModalId = payload;
  },
  setShowEditModal(state) {
    state.showEditModal = !state.showEditModal;
  },
  setEditItemId(state, payload) {
    state.editItemId = payload;
  },
  setCurrentItem(state, payload) {
    state.currentItemUrl = payload;
  },
  setCurrentItemUrlApi(state, payload) {
    state.currentItemUrlApi = payload;
  },
  setSingleItemEdit(state, payload) {
    state.singleItemEdit = payload;
  },
  setShowLoader(state, payload) {
    state.showLoader = payload;
  },
  setRoom(state, payload) {
    state.rooms = payload;
  },
  setCustomer(state, payload) {
    state.customer = payload;
  },
  setDiscount(state, payload) {
    state.discounts = payload;
  },
  setReservation(state, payload) {
    state.reservations = payload;
  },
  setReviews(state, payload) {
    state.reviews = payload;
  },
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  amenties(state) {
    return state.amenties;
  },
  gallery(state) {
    return state.gallery;
  },
  eventArr(state) {
    return state.event;
  },
  menuSlider(state) {
    return state.menuSlider;
  },
  menuOffer(state) {
    return state.menuOffer;
  },
  offers(state) {
    return state.offers;
  },
  room(state) {
    return state.rooms;
  },
  customer(state) {
    return state.customer;
  },
  discount(state) {
    return state.discounts;
  },
  reservation(state) {
    return state.reservations;
  },
  review(state){
    return state.reviews;
  }
};
const actions = {
  async delete({ dispatch, state, commit }, payload) {
    await axios
      .delete(payload)
      .then(() => {
        Vue.$toast("Muvaffaqiyatli o'chirildi.", {
          type: TYPE.SUCCESS,
        });
        if (state.currentItemUrl == "payment-amounts") {
          commit("setCurrentItem", "payment");
        }
        dispatch(`get${state.currentItemUrl}`);
      })
      .catch(() => {
        Vue.$toast("Xatolik yuz berdi.", {
          type: TYPE.ERROR,
        });
      });
  },
  async edit({ commit }, payload) {
    commit('setEditLoader', true);
    await axios
      .get(payload)
      .then((res) => {
        console.log(res)
        commit('setEditLoader', false);
        commit("setSingleItemEdit", res.data);
      })
      .catch(() => {
        Vue.$toast("Xatolik yuz berdi.", {
          type: TYPE.ERROR,
        });
      });
  },
  async getamenties({ commit }) {
    commit("setCurrentItem", "amenties");
    commit("setCurrentItemUrlApi", "amenity/admin");
    await axios.get("amenity/admin/").then((res) => {
      // this.amenty = res.data;
      console.log(res);
      commit("setAmenties", res.data);
    });
  },
  async getgallery({ commit }) {
    commit("setCurrentItem", "gallery");
    commit("setCurrentItemUrlApi", "gallery/admin");
    await axios.get("gallery/admin/").then((res) => {
      console.log(res);
      commit("setGallery", res.data);
    });
  },
  async getevent({ commit, state }) {
    commit("setCurrentItem", "event");
    commit("setCurrentItemUrlApi", "events");
    await axios.get("events/").then((res) => {
      commit("setEvent", res.data);
      console.log(state.event);
    });
  },
  async getmenuslider({ commit }) {
    commit("setCurrentItem", "menuslider");
    commit("setCurrentItemUrlApi", "menu/admin/image");
    await axios.get("menu/admin/image/").then((res) => {
      console.log(res);
      commit("setMenuSlider", res.data);
    });
  },
  async getmenuoffers({ commit }) {
    commit("setCurrentItem", "menuOffer");
    commit("setCurrentItemUrlApi", "menu/admin/offer");
    await axios.get("/menu/admin/offer/").then((res) => {
      console.log("menu offer", res);
      commit("setMenuOffer", res.data);
    });
  },
  async getOffers({ commit }) {
    commit("setCurrentItem", "offers");
    commit("setCurrentItemUrlApi", "offers/admin/offer");
    await axios.get("offers/admin/offer/").then((res) => {
      // console.log("Offers=", res);
      commit("setOffers", res.data);
    });
  },
  async getRooms({ commit }) {
    commit("setCurrentItem", "rooms");
    commit("setCurrentItemUrlApi", "rooms/admin");
    await axios.get("rooms/admin/").then((res) => {
      console.log("Rooms", res);
      commit("setRoom", res.data);
    });
  },
  async getCustomer({ commit }) {
    commit("setCurrentItem", "customer");
    commit("setCurrentItemUrlApi", "user/me");
    await axios.get("user/me/").then((res) => {
      console.log("User me", res);
      commit("setCustomer", res.data.results);
    });
  },
  async getDiscount({ commit }) {
    commit("setCurrentItem", "discounts");
    commit("setCurrentItemUrlApi", "/offers/admin/discount");
    await axios.get("offers/admin/discount/").then((res) => {
      console.log("Discount", res);
      commit("setDiscount", res.data);
    });
  },
  async getReservation({ commit }) {
    commit("setCurrentItem", "reservations");
    commit("setCurrentItemUrlApi", "/reservation/admin");
    await axios.get("reservation/admin/").then((res) => {
      console.log("reservation", res.data);
      commit("setReservation", res.data);
    });
  },
  async getReviews({ commit }) {
    commit("setCurrentItem", "reviews");
    commit("setCurrentItemUrlApi", "/reviews/admin");
    await axios.get("reviews/admin/").then((res) => {
      console.log("reviews", res.data);
      commit("setReviews", res.data);
    });
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});
