<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
const loading = ref(false)
const copyTranscriptLoading = ref(false)
const currentTab = ref()
const isYoutubeWatchUrl = computed(() => {
  const url = currentTab.value.url;
  return url.startsWith('https://www.youtube.com/watch')
})

onMounted(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    currentTab.value = tabs[0]!
  })
})


function openTranscript() {
  loading.value = true;
  chrome.tabs.sendMessage(currentTab.value.id, {
    action: 'open_transcript',
    selector: '[aria-label="Show transcript"]'
  }, function(response) {
    if (response && response.success) {
      loading.value = false;
      console.log('OPEN DONE');
    } else {
      // Handle errors if the element is not found
    }
  });
}

function copyTranscript() {
  copyTranscriptLoading.value = true;
  chrome.tabs.sendMessage(currentTab.value.id, {
    action: 'copy_transcript'
  }, function(response) {
    if (response && response.success) {
      copyTranscriptLoading.value = false;
      console.log('COPY DONE');
    } else {
      // Handle errors if the element is not found
    }
  });
}

</script>

<template>
  <main class="bg-gradient-to-b from-pink-100 to-gray-50 rounded-2xl">
    <h1 class="text-2xl font-bold bg-yellow-200 border-2 border-black p-1 text-center mb-2">
      Ms.Ly Tool <span class="animate-spin">😍</span>
    </h1>
    <div class="flex gap-2 items-start p-4">
      <button
        @click="openTranscript"
        type="button"
        class="bg-pink-400 border-2 border-black hover:bg-pink-500 flex items-center p-2 rounded-md">
        <template v-if="loading">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-white italic font-bold">loading...</span>
        </template>
        <template v-else>
          <span class="font-bold">Open Transcript</span>
        </template>
      </button>

      <button
        @click="copyTranscript"
        type="button"
        class="bg-pink-400 border-2 border-black hover:bg-pink-500 flex items-center p-2 rounded-md">
        <template v-if="copyTranscriptLoading">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-white italic font-bold">loading...</span>
        </template>
        <template v-else>
          <span class="font-bold">Copy Transcript</span>
        </template>
      </button>
    </div>
  </main>
</template>

