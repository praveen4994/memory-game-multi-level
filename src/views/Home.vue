<template>
  <div class="home">
    <p class="heading">LEVEL {{ level }}</p>
    <div class="container">
      <div class="stats">
        <p class="time">
          Time left: <strong>{{ timer }}</strong>
        </p>
        <p class="time">
          Moves made: <strong>{{ moves }}</strong>
        </p>
      </div>
      <div class="memory-game" :class="`level-${level}`">
        <div
          class="flip-card"
          v-for="(item, index) in gameElements"
          :key="index"
          @click="selectElement(index)"
          :class="{
            active: activateAll,
            active: activeIndexes.includes(index),
            completed: completedIndexes.includes(index),
          }"
        >
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="@/assets/images/question-mark.png" class="icon" />
            </div>
            <div class="flip-card-back">
              <p>
                {{ item }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LEVEL_CONFIG } from "@/lib/consts";
import { shuffleArray } from "@/lib/utils";

@Component({
  components: {},
})
export default class Home extends Vue {
  private level = 8;
  private timer = 60;
  private moves = 0;
  private gameElements: number[] = [];
  private activeIndexes: number[] = [];
  private completedIndexes: number[] = [];
  private evaluating = false;
  private activateAll = false;

  private created() {
    this.setGame(this.level);
  }

  private setGame(level: number) {
    const config = LEVEL_CONFIG[level];
    this.timer = config.time;
    this.moves = 0;
    this.activeIndexes = [];
    this.completedIndexes = [];
    const elements = [];
    for (let i = 0, j = 0; i < config.rows * config.columns; i++) {
      if (i % 2 === 0) j++;
      elements.push(j);
    }
    // this.activateAll = true;
    this.evaluating = true;
    this.gameElements = shuffleArray(elements);
    setTimeout(() => {
      // this.activateAll = false;
      this.evaluating = false;
    }, 1000);
  }

  private selectElement(index: number) {
    if (!this.evaluating) {
      if (!this.activeIndexes.includes(index)) {
        this.activeIndexes.push(index);
        this.moves++;
      }
      if (this.activeIndexes.length == 2) {
        this.evaluating = true;
        setTimeout(() => {
          if (
            this.gameElements[this.activeIndexes[0]] ===
            this.gameElements[this.activeIndexes[1]]
          ) {
            this.completedIndexes.push(...this.activeIndexes);
          }
          this.activeIndexes = [];
          this.evaluating = false;
          if (this.completedIndexes.length === this.gameElements.length) {
            // goto next level
            this.setGame(++this.level);
          }
        }, 500);
      }
    }
  }
}
</script>

<style lang="scss" src="@/styles/home.scss"></style>
