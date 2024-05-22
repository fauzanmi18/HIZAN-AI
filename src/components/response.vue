<template>
    <textarea v-model="displayedText" class="p-4 bg-zinc-200 rounded-lg my-4 w-1/2 text-gray-600" rows="14" readonly></textarea>
</template>

<script>
import { ref, watchEffect, watch, nextTick  } from 'vue'

export default {
    name: 'InformasiPribadi',
    props: ['text', 'typingSpeed'],
    setup(props){
    const displayedText = ref('Ask me anytime, I will answer you everytime!');
    const currentIndex = ref(0);

    const typeText = async () => {
      while (currentIndex.value < props.text.length) {
        displayedText.value += props.text.charAt(currentIndex.value);
        currentIndex.value++;
        await new Promise(resolve => setTimeout(resolve, props.typingSpeed));
      }
    };

    watch(() => props.text, async (newText) => {
      displayedText.value = '';
      currentIndex.value = 0;
      await nextTick();
      typeText();
    });

    return {
      displayedText
    };
    }
}
</script>