<template>
  <div class="bg-white my-4 mx-4 flex flex-col items-center min-h-[80vh]">
    <!--<h1 class="mt-6 text-2xl font-semibold text-[#1e1e1e]">HIZAN, Your personal AI Partner</h1>-->
    
    <div v-if="!isResponReady" class="w-full lg:w-1/2 my-7 lg:my-12 min-h-[50dvh]">
      <div class="flex flex-col">
        <h1 class="font-rubik text-gradient text-4xl lg:text-6xl font-semibold">
          HIZAN here,
        </h1>
        <h1 class="font-sora text-base lg:text-xl font-light text-[#1e1e1e]">
          Is there anything i can help?
        </h1>
      </div>

      <div class="my-20 flex gap-2 justify-start md:justify-center items-center overflow-x-auto hide-scrollbar lg:overflow-x-clip">
        <div @click="handleCardClick('HIZAN, what movie is popular right now?')" 
        class="cursor-pointer shrink-0 lg:shrink p-3 w-[186px] lg:w-1/2 bg-white drop-shadow-md rounded-lg border hover:border-[#1e1e1e]">
          <p class="p-2 text-zinc-600 text-sm text-wrap text-center">
            HIZAN, what movie is popular right now?
          </p>
        </div>
        <div @click="handleCardClick('HIZAN, what is programming?')" 
        class="cursor-pointer shrink-0 lg:shrink p-3 w-[186px] lg:w-1/2 bg-white drop-shadow-md rounded-lg border hover:border-[#1e1e1e]">
          <p class="p-2 text-zinc-600 text-sm text-wrap text-center">
            HIZAN, what is programming?
          </p>
        </div>
        <div @click="handleCardClick('HIZAN, please give me a romantic poem')" 
        class="cursor-pointer shrink-0 lg:shrink p-3 w-[186px] lg:w-1/2 bg-white drop-shadow-md rounded-lg border hover:border-[#1e1e1e]">
          <p class="p-2 text-zinc-600 text-sm text-wrap text-center">
            HIZAN, please give me a romantic poem
          </p>
        </div>
      </div>
    </div>

    <responseComp v-if="isResponReady" :text="responseMessage" :typingSpeed="50"/>

    <input @keydown.enter.prevent="handleRequest" v-model="contentMessage" class="w-full lg:w-1/2 bg-slate-50 my-2 p-3 text-[#1e1e1e] rounded-lg placeholder:text-base placeholder:text-gray-600 border focus:border-[#1e1e1e] outline-none" name="content" placeholder="Put your question here...">
    
    <button v-if="!loading" @click="handleRequest" class="bg-[#1e1e1e] my-2 px-4 py-2 rounded-lg text-white">
      Ask Zan
    </button>

    <button v-if="loading" disabled="" type="button" class="font-medium bg-[#1e1e1e] text-white my-2 py-2 px-4 rounded-md hover:shadow-lg inline-flex justify-center items-center">
        <svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
        </svg>
        Loading...
    </button>

    <footer id="footer" class="bg-white pt-4 pb-4 lg:mb-0">
         <div class="container mx-auto">
             <div class="flex justify-center container mx-auto w-full">
                <p class="font-medium text-xs lg:text-sm text-[#1e1e1e] text-center">
                    © {{ currentYear }} ZDevsCode - <a class="underline" href="https://www.instagram.com/fauzanmi18/">
                      Fauzan M Iqbal.</a>
                     All Rights Reserved.
                </p>
             </div>
         </div>
     </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { groqRequest } from './utils/groq';
import responseComp from './components/response.vue'

const currentYear = ref(new Date().getFullYear())

const loading = ref(false)
const isResponReady = ref(false)

const contentMessage = ref('')
const responseMessage = ref('')

const handleRequest = async() => {
  loading.value = true
  isResponReady.value = true
  const ai = await groqRequest(contentMessage.value)
  responseMessage.value = ai.content
  loading.value = false
}

const handleCardClick = (message) => {
  contentMessage.value = message
  handleRequest()
}
</script>

<style scoped>
.text-gradient {
  -webkit-text-fill-color: transparent;
  background: -webkit-linear-gradient(30deg,#15ca82,#c084fc);
    background-clip: border-box;
  -webkit-background-clip: text;
  display: inline-block;
  position: relative;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>