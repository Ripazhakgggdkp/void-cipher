<template>
  <div class="grid grid-cols-3 gap-4">
    <input
      v-on:change="onBlockClick()"
      v-model="activeCipher"
      value="0"
      id="0"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick()"
      v-model="activeCipher"
      value="1"
      id="1"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick()"
      v-model="activeCipher"
      value="2"
      id="2"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick()"
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
      v-on:change="onBlockClick()"
      v-model="activeCipher"
      value="4"
      id="4"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick()"
      v-model="activeCipher"
      value="5"
      id="5"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick()"
      v-model="activeCipher"
      value="6"
      id="6"
      type="checkbox"
      class="appearance-none checked:bg-cipher-dark checked:border-transparent h-16 w-16 bg-cipher-block"
    />
    <input
      v-on:change="onBlockClick()"
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
    onBlockClick: function () {
      const key = this.activeCipher.sort((a, b) => a - b).join("");
      if (!key) {
        return;
      }
      this.letter = this.cipher.get(key) ?? "";
    },
    onLetterChanged: function () {
      const key = this.activeCipher.sort((a, b) => a - b).join("");
      if (!key) {
        return;
      }
      this.cipher.set(key, this.letter);
      localStorage.cipher = JSON.stringify([...this.cipher]);
    },
    debugMe: function () {
      console.log(this.cipher);
    },
  },
});
</script>


