<template>
  <div class="home">
    <div class="container">
      <div class="memory-game">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="@/assets/images/question-mark.png" class="icon" />
            </div>
            <div class="flip-card-back">
              <p>1</p>
            </div>
          </div>
        </div>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="@/assets/images/question-mark.png" class="icon" />
            </div>
            <div class="flip-card-back">
              <p>1</p>
            </div>
          </div>
        </div>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="@/assets/images/question-mark.png" class="icon" />
            </div>
            <div class="flip-card-back">
              <p>1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
