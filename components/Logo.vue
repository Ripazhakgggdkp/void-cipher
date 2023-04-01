<template>
  <div class="grid grid-cols-3 gap-4" v-on:keydown="onPress">
    <input v-for="(n, i) in 4" :key="i" v-on:change="onBlockClick(i)" v-model="activeCipher" :value="i" :id="i"
      type="checkbox"
      class="shadow-xl z-10 ripple-white relative appearance-none checked:bg-cipher-dark focus:outline-none border-transparent h-16 w-16 bg-cipher-block"
      :class="isChecked(i) ? 'ripple-white' : 'ripple-white-checked'" />
    <input v-on:change="onLetterChanged()"
      class="text-center shadow-xl z-10 uppercase text-white text-4xl h-16 w-16 bg-cipher-gray appearance-none leading-tight focus:outline-none"
      id="inline-full-name" type="text" maxlength="1" v-model="letter" />
    <input v-for="(n, i) in 4" :key="i + 4" v-on:change="onBlockClick(i + 4)" v-model="activeCipher" :value="i + 4"
      :id="i + 4" type="checkbox"
      class="shadow-xl z-10 ripple-white relative appearance-none checked:bg-cipher-dark focus:outline-none border-transparent h-16 w-16 bg-cipher-block"
      :class="isChecked(i + 4) ? 'ripple-white' : 'ripple-white-checked'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Pizzicato from "pizzicato";
import { compareSequences, keys_pressed, predefinedSequence } from "~/cheat/listener";

const cheat = new Map([
  ["06", "a"],
  ["067", "c"],
  ["05", "d"],
  ["056", "e"],
  ["04", "h"],
  ["046", "i"],
  ["047", "j"],
  ["0467", "k"],
  ["045", "l"],
  ["0456", "m"],
  ["0457", "n"],
  ["04567", "o"],
  ["03", "p"],
  ["037", "r"],
  ["0367", "s"],
  ["035", "t"],
  ["0356", "u"],
  ["0346", "y"],
])

function playSound(id: string) {
  const sound = new Pizzicato.Sound(
    {
      source: "file",
      options: { path: require(`@/static/${id}.ogg`), attack: 0 },
    },
    () => {
      const delay = new Pizzicato.Effects.Delay({
        feedback: 0.25,
        time: 0.45,
        mix: 0.15,
      });
      sound.addEffect(delay);
      sound.play();
    }
  );
}
export default Vue.extend({
  mounted() {
    if (localStorage.cipher) {
      this.cipher = new Map(JSON.parse(localStorage.cipher));
      this.letter = this.cipher.get("") ?? "";
    }
  },
  data() {
    return {
      activeCipher: [""],
      letter: "",
      cipher: new Map<string, string>(),
    };
  },
  methods: {
    onPress: function (event: KeyboardEvent) {
      keys_pressed.shift() // remove the oldest item from the start of the array
      keys_pressed.push(event.key) // push the newest item to the end
      if (compareSequences(predefinedSequence, keys_pressed)) {
        localStorage.cipher = JSON.stringify([...cheat])
        this.cipher = new Map(JSON.parse(localStorage.cipher))
        this.letter = this.cipher.get("") ?? "";
        playSound("8");
      }
    },
    onBlockClick: function (id: string) {
      const key = this.activeCipher.sort((a, b) => +a - +b).join("");
      this.letter = this.cipher.get(key) ?? "";
      playSound(id);
    },
    onLetterChanged: function () {
      const key = this.activeCipher.sort((a, b) => +a - +b).join("");
      this.cipher.set(key, this.letter);
      localStorage.cipher = JSON.stringify([...this.cipher]);
      playSound("8");
    },
    debugMe: function () {
      console.log(this.cipher);
    },
    isChecked: function (id: string) {
      if (this.activeCipher.some((x) => x === id)) {
        return true;
      }
    },
  },
});
</script>

<style scoped>
.ripple-white::before {
  content: "";
  position: absolute;
  align-items: center;
  justify-content: center;
  border: 2px solid #818081;
  transform-origin: center;
  width: 63px;
  height: 63px;
  z-index: 1;
  animation-name: from-white;
  animation-duration: 2s;
  pointer-events: none;
  opacity: 1;
}

.ripple-white-checked::before {
  animation-name: from-black;
  z-index: 1;
  animation-duration: 2s;
  border: 2px solid white;
}

@keyframes from-white {
  0% {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }

  50% {
    opacity: 0;
  }

  100% {
    transform: rotate(45deg) scale(20);
    opacity: 0;
  }
}

@keyframes from-black {
  0% {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }

  50% {
    opacity: 0;
  }

  100% {
    transform: rotate(45deg) scale(20);
    opacity: 0;
  }
}
</style>


