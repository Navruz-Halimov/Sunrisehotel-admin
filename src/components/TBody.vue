<template>
  <tbody v-if="this.$route.path == '/amenty'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj == 'title'">{{ tbody[obj] }}</span>
        <span
          v-else-if="obj == 'description'"
          v-html="tbody.description"
        ></span>
        <a :href="tbody.icon" v-else-if="obj == 'icon'" target="_blank">
          <img :src="tbody.icon" alt="" width="50" height="50" />
        </a>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="this.$route.path == '/gallery'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <a :href="tbody.image" target="_blank">
          <img
            class="gallery__img"
            v-if="obj == 'image'"
            :src="tbody.image"
            alt=""
          />
        </a>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="$route.path == '/event'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj == 'title'">{{ tbody[obj] }}</span>
        <a
          v-if="obj == 'thumbnail'"
          :href="tbody.thumbnail"
          target="_blank"
          style="display:block;"
        >
          <img
            class="gallery__img"
            v-if="obj == 'thumbnail'"
            :src="tbody.thumbnail"
            alt=""
          />
        </a>
        <span v-if="obj == 'date'">{{ tbody[obj] }}</span>
        <span v-if="obj == 'content'" v-html="tbody[obj]"></span>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="$route.path == '/menu'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj == 'title'">{{ tbody[obj] }}</span>
        <a :href="tbody.image" target="_blank">
          <img
            class="gallery__img"
            v-if="obj == 'image'"
            :src="tbody.image"
            alt=""
          />
        </a>
        <span v-if="obj == 'description'">{{ tbody[obj] }}</span>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="$route.path == '/menu-offer'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj == 'title'">{{ tbody.title }}</span>
        <a :href="tbody.image" target="_blank">
          <img
            class="gallery__img"
            v-if="obj == 'image'"
            :src="tbody.image"
            alt=""
          />
        </a>
        <span v-if="obj == 'description'">{{ tbody.description }}</span>
        <span v-if="obj == 'is_active'">{{ tbody.is_active }}</span>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="this.$route.path === '/offers'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj === 'title'">{{ tbody[obj] }}</span>
        <span
          v-else-if="obj === 'description_1'"
          v-html="tbody.description_1"
        ></span>
        <span
          v-else-if="obj === 'description_2'"
          v-html="tbody.description_2"
        ></span>
        <a :href="tbody.image" v-else-if="obj === 'image'" target="_blank">
          <img :src="tbody.image" width="200px" height="150px" alt="" />
        </a>
        <span v-else-if="obj == 'is_active'">{{ tbody[obj] }}</span>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="this.$route.path === '/rooms'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj === 'title'">{{ tbody[obj] }}</span>
        <span
          v-else-if="obj === 'description_1'"
          v-html="tbody.description_1"
        ></span>
        <span
          v-else-if="obj === 'description_2'"
          v-html="tbody.description_2"
        ></span>
        <a :href="tbody.image" v-else-if="obj === 'image'" target="_blank">
          <img :src="tbody.image" width="200px" height="150px" alt="" />
        </a>
        <span v-if="obj == 'is_active'">{{ tbody[obj] }}</span>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="this.$route.path === '/customer'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj === 'firstName'" v-html="tbody.firstname"></span>
        <span v-else-if="obj === 'lastName'" v-html="tbody.lastname"></span>
        <span v-else-if="obj === 'phoneNum'" v-html="tbody.phone_number"></span>
        <span v-else-if="obj === 'email'" v-html="tbody.email"></span>
        <span v-else-if="obj === 'state'" v-html="tbody.state"></span>
        <span v-else-if="obj === 'city'" v-html="tbody.city"></span>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="this.$route.path === '/room'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj === 'cost_per_day'">{{ tbody.cost_per_day }}</span>
        <span
          v-else-if="obj === 'description_1'"
          v-html="tbody.description_1"
        ></span>
        <span
          v-else-if="obj === 'description_2'"
          v-html="tbody.description_2"
        ></span>
        <span v-else-if="obj === 'floor'" v-html="tbody.floor"></span>
        <span
          v-else-if="obj === 'is_occupied'"
          v-html="tbody.is_occupied"
        ></span>
        <span v-else-if="obj === 'room_num'" v-html="tbody.room_num"></span>
        <span v-else-if="obj === 'room_size'" v-html="tbody.room_size"></span>
        <span v-else-if="obj === 'room_type'" v-html="tbody.room_type"></span>
        <a
          v-else-if="obj == 'image_set'"
          :href="image.image"
          target="_blank"
          v-for="image of tbody.image_set"
          :key="image.id"
        >
          <img :src="image.image" alt="" width="70" height="70"  style="margin-bottom:10px;"/>
        </a>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>

  <tbody v-else-if="this.$route.path === '/discount'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj === 'end_date'">{{ tbody.end_date }}</span>
        <span
          v-else-if="obj === 'start_date'"
          v-html="tbody.start_date"
        ></span>
        <span
          v-else-if="obj === 'is_active'"
          v-html="tbody.is_active"
        ></span>
        <span
          v-else-if="obj === 'percentage'"
          v-html="tbody.percentage"
        ></span>
         <span
          v-else-if="obj === 'room_group'"
          v-html="tbody.room_group"
        ></span>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="this.$route.path === '/reservation'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj === 'end_date'">{{ tbody.end_date }}</span>
        <span
          v-else-if="obj === 'start_date'"
          v-html="tbody.start_date"
        ></span>
        <span
          v-else-if="obj === 'is_paid'"
          v-html="tbody.is_paid"
        ></span>
        <span
          v-else-if="obj === 'overall_cost'"
          v-html="tbody.overall_cost"
        ></span>
         <span
          v-else-if="obj === 'room'"
          v-html="tbody.room.room_num"
        ></span>
         <span
          v-else-if="obj === 'user'"
          
        >{{tbody.user.firstname}} <br>{{tbody.user.lastname}}</span>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="this.$route.path === '/discount'">
    <tr v-for="(tbody, index) of tbodies" :key="index">
      <td v-for="(obj, i) of objs" :key="i">
        <span v-if="obj === 'end_date'">{{ tbody.end_date }}</span>
        <span
          v-else-if="obj === 'start_date'"
          v-html="tbody.start_date"
        ></span>
        <span
          v-else-if="obj === 'is_active'"
          v-html="tbody.is_active"
        ></span>
        <span
          v-else-if="obj === 'percentage'"
          v-html="tbody.percentage"
        ></span>
         <span
          v-else-if="obj === 'room_group'"
          v-html="tbody.room_group"
        ></span>
      </td>
      <td class="text-centers">
        <TButton :id="tbody.id" :show="button" @editModalParent="getEditItem" />
        <DModal :id="tbody.id" />
      </td>
    </tr>
  </tbody>

</template>
<script>
import TButton from "./TButton";
import DModal from "@/components/DModal";
import axios from "axios";
export default {
  props: ["tbodies", "button", "objs"],
  components: {
    TButton,
    DModal,
  },
  data() {
    return {
      temp: [],
    };
  },
  methods: {
    getEditItem(val) {
      console.log(val);
      this.$emit("getEditItemParent", val);
    },
  },

  mounted() {
    console.log(this.tbodies);
  },
  
};
</script>
<style scoped>
.gallery__img {
  max-width: 250px;
  width: 100%;
  max-height: 200px;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
</style>
