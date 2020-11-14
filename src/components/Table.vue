<template>
  <div class="table-responsive">
    <!-- <Loader v-if="loader" /> -->
     
    <table 
      class="table table-bordered table-hover table-striped table-light mb-0"
    >
      <THead :theads="theads" />
      <TBody v-if="tbodies.length" :tbodies="tbodies" :objs="objects" :button="button" @getEditItemParent="getEditSuperParent" />
      <Empty v-else :colspan="objects.length" />
    </table>
  </div>
</template>
<script>
import THead from "./THead";
import TButton from "./TButton";
import Empty from "./Empty";
import TBody from "./TBody";
import Loader from './Loader';
export default {
  props: ["theads", "tbodies", "button", "objects"],
  components: {
    THead,
    TButton,
    Empty,
    TBody,
    Loader,
  },
  data() {
    return {
      };
  },
  methods: {
    getEditSuperParent(val) {
      this.$emit("getItemEdit", val);
    },
  },
};
</script>

