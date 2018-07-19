  <template>
  <div class="home">
    <Viewer 
      :documentId="$route.meta.urn"
    ></Viewer>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Viewer from "@/components/Viewer.vue";

export default {
  name: "home",
  components: {
    Viewer
  },
  data() {
    return {
      viewItem: 0
    };
  },
  computed: {},
  methods: {
    changeItem(val) {
      this.$store.commit("changeItem", val.target.value);
    }
  }
};
</script>
<style>
.home {
}
</style>
