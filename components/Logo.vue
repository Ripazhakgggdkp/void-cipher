<template>
  <div class="grid grid-cols-3 gap-4">
    <input
      v-on:change="onBlockClick(0)"
      v-model="activeCipher"
      value="0"
      id="0"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick(1)"
      v-model="activeCipher"
      value="1"
      id="1"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick(2)"
      v-model="activeCipher"
      value="2"
      id="2"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick(3)"
      v-model="activeCipher"
      value="3"
      id="3"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onLetterChanged()"
      class="text-center uppercase h-16 w-16 bg-cipher-block appearance-none border-gray-200 text-gray-700 leading-tight focus:outline-none"
      id="inline-full-name"
      type="text"
      maxlength="1"
      v-model="letter"
    />
    <input
      v-on:change="onBlockClick(4)"
      v-model="activeCipher"
      value="4"
      id="4"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick(5)"
      v-model="activeCipher"
      value="5"
      id="5"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick(6)"
      v-model="activeCipher"
      value="6"
      id="6"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick(7)"
      v-model="activeCipher"
      value="7"
      id="7"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Pizzicato from "pizzicato";

function playSound(id: string) {
  const sound = new Pizzicato.Sound(
    {
      source: "file",
      options: { path: require(`@/assets/${id}.ogg`), attack: 0 },
    },
    () => {
      const delay = new Pizzicato.Effects.Delay({
        feedback: 0.4,
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
    }
  },
  data() {
    return {
      activeCipher: [],
      letter: "",
      cipher: new Map<string, string>(),
    };
  },
  methods: {
    onBlockClick: function (id: string) {
      const key = this.activeCipher.sort((a, b) => a - b).join("");
      this.letter = this.cipher.get(key) ?? "";
      playSound(id);
    },
    onLetterChanged: function () {
      const key = this.activeCipher.sort((a, b) => a - b).join("");
      this.cipher.set(key, this.letter);
      localStorage.cipher = JSON.stringify([...this.cipher]);
      playSound("8");
    },
    debugMe: function () {
      console.log(this.cipher);
    },
  },
});
</script>


