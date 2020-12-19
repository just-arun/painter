<template>
  <div class="v-acordian">
      <div class="v-acordian__label" @click="opened = !opened">
        <span class="v-acordian__label__text">{{ label }}</span>
        <span class="v-acordian__label__icon">
            {{ opened ? '-' : '+' }}
        </span>
      </div>
      <div v-if="opened" class="v-acordian__content">
          <slot></slot>
      </div>
  </div>
</template>
<style lang="scss">
.v-acordian {
    $border-color: rgba(128, 128, 128, 0.4);
    border-bottom: 1px solid $border-color;
    &__label {
        padding: 10px;
        cursor: pointer;
        display: flex;
        color: grey;
        user-select: none;
        &__text {
            flex: 1;
        }
        &__icon {
            height: 20px;
            width: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'accordian',
    props: {
        label: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            opened: true
        }
    }
})
</script>
