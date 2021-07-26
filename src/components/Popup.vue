<template>
  <div class="popup">
    <div class="bg"></div>
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Popup extends Vue {}
</script>

<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 30px;
    border-radius: 6px;
    min-width: 300px;
    max-width: 90%;
  }
}
</style>
