<template>
  <div id="app">
    <div id="nav">
      <h4>{{$route.meta.title}}</h4>
        <div id="items">
          <label class="header-select-label" for="select-items">Vista: </label>
          <select name="select-items" id="select-items" v-model="item">
            <option v-for="(viewable, index) in viewables" :key="viewable.id" :value="index">
              {{viewable.data.name}}
            </option>
          </select>
        </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "app",
  computed: {
    viewables() {
      return this.$store.state.viewer.viewables;
    },
    item: {
      get() {
        return this.$store.state.viewer.itemIndex;
      },
      set(val) {
        this.$store.commit("changeItem", val);
      }
    }
  },
  methods: {
    changeItem(ev) {
      this.$store.commit("changeItem", ev.target.value);
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  display: grid;
  grid-template-rows: 60px auto;
}
#nav {
  background-color: teal;
  display: flex;
  color: white;
  padding: 8px;
}
#items {
  margin-left: auto;
  height: 20px;
}
.header-select-label {
  display: inline;
}
#select-items {
  height: 35px;
  color: black;
}
</style>
