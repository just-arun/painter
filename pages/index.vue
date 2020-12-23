<template>
  <div class="container">
    <div>
      <toggle :value.sync="value" :name="'damn'" :items="items"></toggle>
      <nuxt-link to="/board/my-board/d/new-stuff">new link</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ToggleButton from "~/components/ui/toggle-button/toggle-button.vue";

export default Vue.extend({
  components: {
    toggle: ToggleButton,
  },
  data() {
    return {
      value: 'left',
      items: [
        { value: "left", img: 'h_align_left' },
        { value: "center", img: 'h_align_center'},
        { value: "right", img: 'h_align_right'},
      ],
    };
  },
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
