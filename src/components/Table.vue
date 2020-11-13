<template>
  <div class="table-responsive">
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

export default {
  props: ["theads", "tbodies", "button", "objects"],
  components: {
    THead,
    TButton,
    Empty,
    TBody,
  },
  data() {
    return {};
  },
  methods: {
    getEditSuperParent(val) {
      this.$emit("getItemEdit", val);
    },
  },
  mounted() {},
};
</script>
