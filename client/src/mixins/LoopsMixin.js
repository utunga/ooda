import { mapState, mapGetters, mapActions } from "vuex";
import feathersClient from "@/feathers";

export default {
  computed: {
    ...mapState("loops", {
      areLoopsLoading: "isFindPending",
      todosPagination: "pagination"
    }),
    ...mapGetters("loops", {
      findLoopsInStore: "find",
      listLoops: "list"
    })
  },
  methods: {
    ...mapActions("loops", {
      findLoops: "find"
    })
  },
  async created() {
    console.log("LoopsMixin was loaded");

    feathersClient.service("loops").on("created", data => {
      console.log(`Loop created - ${data.title}`);
    });

    try {
      await this.findLoops({});
      console.log("found loops");
    } catch (e) {
      console.error(e);
    }
  }
};
