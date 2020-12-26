<template>
  <div class="search-with-option">
      <button id="place" style="transform: scale(0)"></button>
    <input type="search" list="searchSuggest" v-model="search" name="" id="" />
    <!-- <ul>
      <li
        v-for="item in searchedItems"
        :key="`select-${item._id}`"
        @click="clicked()"
      >
        {{ item.name }}
      </li>
    </ul> -->
    <datalist id="searchSuggest">
      <option
        v-for="item in searchedItems"
        :key="`select-${item._id}`"
        :value="item.name"
        @click="clicked()"
      >
        {{ item.name }}
      </option>
    </datalist>
  </div>
</template>

<style scoped lang="scss">
.search-with-option {
  position: relative;
  width: 100%;
  input {
    padding: 2px;
    width: 100%;
    &:focus + ul {
      display: block;
    }
  }
  ul {
    z-index: 2;
    display: none;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class SearchOption extends Vue {
  @Prop({ required: true }) items!: any[];
  search = "";

  get searchedItems() {
    return this.items.filter((res) => {
      if (
        String(res.name).toLowerCase().indexOf(this.search.toLowerCase()) != -1
      ) {
        return res;
      }
    });
  }

  @Emit("click")
  clicked(id: string) {
    alert("shit");
    this.search = "";
    let ele: any = document.querySelector("#place");
    ele.focus();
    return id;
  }
}
</script>
