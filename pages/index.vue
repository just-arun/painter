<template>
  <div class="container">
    <div>
      <b>Note:</b> <em>still under construction a extream rearly preview</em>
      <br>
      <nuxt-link to="/board/my-board/d/new-project">Playaround</nuxt-link>
      <!-- <button @click="crateDiagram()">Create Diagram</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ToggleButton from "~/components/ui/toggle-button/toggle-button.vue";
import { DiagramService } from './../service/diagram';

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
  methods: {
    async crateDiagram() {
      try {
        const { data } = await DiagramService
        .createDiagram({
          name: "new-diagram",
          users: {
            id: localStorage.getItem("user"),
            access: 1
          },
          shapes: []
        });
        let id = data.data._id;
        this.$router.push(`/board/my-board/d/${id}`);
      } catch (err) {
        console.log(err);
      }
    }
  }
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
