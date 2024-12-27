<script setup>

</script>

<template>
  <div class="flash-card">
    <button class="flash-card__refuse-button" :style="{'opacity': isAnswerDisplayed ? '100%' : '0%'}">
      <img src="/cross-svgrepo-com.svg" alt="Raté">
    </button>
    <div class="flash-card__inside">
      <div class="flash-card__card" :class="{ 'is-flipped': isAnswerDisplayed }">
        <div class="flash-card__card__face flash-card__card__face--front">
          <div class="flash-card__top">
            <h2 class="h5 flash-card__top__title">{{ title }}</h2>
            <div class="separator" style="height: 0.1rem;"/>
            <div class="flash-card__top__subtitle">
              <p class="small" style="color: var(--color-background);">{{ subject }}</p>
            </div>
          </div>
          <div class="flash-card__main">
            <p>{{ question }}</p>
          </div>
        </div>
        <div class="flash-card__card__face flash-card__card__face--back">
          <div class="flash-card__top">
            <h2 class="h5 flash-card__top__title">Réponse</h2>
            <div class="separator" style="height: 0.1rem;"/>
            <div class="flash-card__top__subtitle">
              <p class="small" style="color: var(--color-background);">{{ subject }}</p>
            </div>
          </div>
          <div class="flash-card__main">
            <p>{{ answer }}</p>
          </div>
        </div>
      </div>
      <button class="flash-card__reveal" @click="displayAnswer">
        {{ buttonText }}
      </button>
    </div>
    <button class="flash-card__validate-button" :style="{'opacity': isAnswerDisplayed ? '100%' : '0%'}">
      <img src="/ok-svgrepo-com.svg" alt="OK">
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAnswerDisplayed: false,
      buttonText: "Révéler la réponse"
    }
  },
  methods: {
    displayAnswer() {
      this.isAnswerDisplayed = !this.isAnswerDisplayed;
      this.buttonText = this.isAnswerDisplayed ? "Cacher la réponse" : "Révéler la réponse";
    }
  },
  props: {
    "subject": {
      required: true,
    },
    "title": {
      required: true,
    },
    "question": {
      required: true,
    },
    "answer": {
      required: true
    }
  }
}
</script>

<style scoped>

.flash-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
}

.flash-card__inside {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  perspective: 1000px;
}

.flash-card__card {
  width: 275px;
  height: 400px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flash-card p {
  margin: 0;
}

.flash-card__top__title {
  margin-bottom: 0;
}

.flash-card__top__subtitle {
  opacity: 65%;
  background: var(--color-primary);
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
  width: fit-content;
}

.flash-card__main {
  margin-top: 1rem;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.flash-card__card.is-flipped {
  transform: rotateY(180deg);
}

.flash-card__card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  color: white;
  padding: 1rem;
}

.flash-card__card__face--front {
  background: var(--color-secondary);
}

.flash-card__card__face--back {
  background: var(--color-secondary);
  transform: rotateY(180deg);
}

.flash-card__validate-button, .flash-card__refuse-button {
  border-radius: 50%;
  padding: 0.5rem 0.6rem;
  transition: opacity 0.3s;
}

.flash-card__validate-button {
  background: #86E75F;
}

.flash-card__refuse-button {
  background: #E95620;
}

.flash-card__validate-button img, .flash-card__refuse-button img {
  width: 35px;
  height: 35px;
}

</style>