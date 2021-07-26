<template>
  <div class="home">
    <p class="heading">LEVEL {{ level }}</p>
    <div class="container">
      <div class="stats">
        <p class="time">
          Time left: <strong>{{ gameTime | timeFormat }}</strong>
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
    <popup class="game-over" v-if="showGameOver">
      <p class="title">GAME OVER</p>
      <p class="subtitle">Time ran out!</p>
      <div class="actions">
        <button class="btn item" @click="restartGame">Retry</button>
      </div>
    </popup>
    <popup class="congrats" v-if="showCongrats">
      <template v-if="rating > 4">
        <p class="title green">CONGRATULATIONS</p>
        <p class="subtitle">You cleared level {{ this.level }}</p>
      </template>
      <template v-else>
        <p class="title green">LEVEL CLEARED</p>
        <p class="subtitle">Too many moves, Get better rating to continue</p>
      </template>
      <div class="rating">
        <img
          src="@/assets/images/star.png"
          v-for="index in 10"
          :class="{ active: index > rating }"
          :key="index"
          class="star"
        />
      </div>
      <div class="actions">
        <button class="btn item" @click="restartGame">Retry</button>
        <button
          class="btn btn-success item"
          @click="nextLevel"
          v-if="rating > 4"
        >
          Next level
        </button>
      </div>
    </popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LEVEL_CONFIG } from "@/lib/consts";
import { shuffleArray } from "@/lib/utils";
import Popup from "@/components/Popup.vue";
import { WinningData } from "@/interface";

@Component({
  components: { Popup },
  filters: {
    timeFormat: (time: number) => {
      const mins = Math.floor(time / 60);
      const secs = time % 60;
      return `${mins < 10 ? "0" + mins : mins}:${
        secs < 10 ? "0" + secs : secs
      }`;
    },
  },
})
export default class Home extends Vue {
  private level = 1;
  private gameTime = 0;
  private moves = 0;
  private gameElements: number[] = [];
  private activeIndexes: number[] = [];
  private completedIndexes: number[] = [];
  private evaluating = false;
  private activateAll = false;
  private showGameOver = false;
  private showCongrats = false;
  private rating = 0;
  private gameTimer: any;

  private sequenceTracker: number[] = [];

  private created() {
    this.level = this.$store.getters.level;
    this.setGame(this.level);
  }

  private restartGame() {
    this.setGame(this.level);
  }

  private nextLevel() {
    this.setGame(++this.level);
  }

  private startTimer() {
    this.gameTimer = setInterval(() => {
      this.gameTime--;
      if (this.gameTime <= 0) {
        // game over
        this.showGameOver = true;
        clearInterval(this.gameTimer);
      }
    }, 1000);
  }

  private setGame(level: number) {
    const config = LEVEL_CONFIG[level];
    this.gameTime = config.time;
    this.moves = 0;
    this.activeIndexes = [];
    this.completedIndexes = [];
    this.sequenceTracker = [];
    this.showGameOver = false;
    this.showCongrats = false;
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
      this.startTimer();
    }, 1000);
  }

  private selectElement(index: number) {
    if (!this.evaluating) {
      if (!this.activeIndexes.includes(index)) {
        this.activeIndexes.push(index);
        this.sequenceTracker.push(index);
        this.moves++;
      }
      this.checkMatching();
    }
  }

  private checkMatching() {
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
          this.levelCleared();
        }
      }, 500);
    }
  }

  private levelCleared() {
    this.showCongrats = true;
    clearInterval(this.gameTimer);
    const config = LEVEL_CONFIG[this.level];
    // minimum moves required
    const min = config.rows * config.columns;
    const diff = this.moves - min;

    // reduce 1 point for every extra [level number] of moves
    const pointsToReduce = Math.floor(diff / this.level);
    this.rating = 10 - pointsToReduce;

    // handling edge cases
    if (this.rating > 10) {
      this.rating = 10;
    } else if (this.rating < 1) {
      this.rating = 1;
    }
    const data: WinningData = {
      level: this.level,
      timeLeft: this.gameTime,
      moves: this.moves,
      rating: this.rating,
      sequence: this.sequenceTracker,
    };
    this.$store.dispatch("NEXT_LEVEL", data);
  }
}
</script>

<style lang="scss" src="@/styles/home.scss"></style>
