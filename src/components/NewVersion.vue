<template>
  <div class="update-notification">
    <p class="update-message" readonly>නව අනුවාදයක් තිබේ.</p>
    <div class="button-container">
      <v-btn text class="toast-button" @click="handleDismiss">අවශ්‍ය නැ​ත</v-btn>
      <v-btn tile color="#F48045FF" class="toast-button" @click="handleUpdate" style="font-weight: bold">යාවත්කාල කරන්​න</v-btn>
    </div>
  </div>
</template>

<style scoped>

.update-message {
  background: transparent; 
  font-size: 1.5rem; 
  font-weight: bold; 
  flex-grow: 1; 
  margin-bottom: 18px; 
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.toast-button {
  /* Optional: Add button-specific styling */
  padding: 6px 14px;
  font-size: 1rem; 
  color: white;
  cursor: pointer;
  border-radius: 4px;
  min-width: 60px;
}
</style>

<script>
import { platform, IOS } from '@/constants.js'

export default {
  name: 'CustomToastButtons',
  methods: {
    handleDismiss() {
      console.log('Dismiss button clicked');
    },
    async handleUpdate() {
      if (platform === IOS) {
        try {
          window.open(`https://apps.apple.com/us/app/sinhala-tripitaka-atuwa/id6615068500`, '_blank');
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  }
};
</script>
