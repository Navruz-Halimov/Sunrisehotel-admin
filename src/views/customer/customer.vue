<template>
    <div>
        <Table
                :button="bshow"
                :theads="thead"
                :tbodies="customer"
                :objects="obj"
        />

    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import Table from "@/components/Table";

    export default {
        components: {
            Table,
        },
        data() {
            return {
                customerUser: [],
                bshow: { warning: false, delete: true },
                imgSet: false,
                imagevalidation: true,
                addimagevalidation: false,
                showAddModal: false,
                showAddModaledit: false,
                form: "",
                firstName: '',
                lastName: '',
                phoneNum: '',
                email: '',
                state: '',
                city: '',
                paid: '',
                thead: ["First name", "Last name", "Phone number", "Email", "State", "City", "Paid", "Amallar"],
                obj: ["firstName", "lastName", "phoneNum", "email", "state", "city", "paid"],
            };
        },
        methods: {},
        computed: {
            ...mapGetters(["customer"]),
        },
        created() {
            this.$store.dispatch("getCustomer");
        },
    };
</script>
