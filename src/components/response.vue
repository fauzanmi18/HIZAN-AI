<template>
    <textarea v-model="displayedText" class="border p-4 bg-slate-50 rounded-lg my-4 w-full lg:w-1/2 text-gray-600 text-sm md:text-base lg:text-base" rows="14" readonly></textarea>
</template>

<script>
import { ref, watchEffect, watch, nextTick  } from 'vue'

export default {
    name: 'InformasiPribadi',
    props: ['text', 'typingSpeed'],
    setup(props){
    const displayedText = ref('Processing your request...');
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