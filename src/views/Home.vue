<template>
  <div class="home">
    <select v-model="docId" name="scenes" id="scenes">
      <option v-for="scene in scenes" :key="scene.name" :value="scene.urn">
        {{scene.name}}
      </option>
    </select>
    <select name="items" id="items" @input="changeItem">
      <option v-for="(viewable, index) in viewables" :key="viewable.id" :value="index">
        {{viewable.data.name}}
      </option>
    </select>
    <Viewer 
      :documentId="docId"
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
      docId: "",
      viewItem: 0
    };
  },
  computed: {
    scenes() {
      return this.$store.state.scenes;
    },
    viewables() {
      return this.$store.state.viewer.viewables;
    }
  },
  mounted() {
    this.docId = this.$store.state.scenes[0].urn;
    this.viewItem = this.$store.state.viewer.itemIndex;
  },
  methods: {
    changeItem(val) {
      this.$store.commit("changeItem", val.target.value);
    }
  }
};
</script>
