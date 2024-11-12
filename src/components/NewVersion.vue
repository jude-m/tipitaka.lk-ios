<template>
  <div class="button-container">
    <v-btn text class="toast-button" @click="handleDismiss">Dismiss</v-btn>
    <v-btn tile color="#F48045FF" class="toast-button" @click="handleUpdate">Update</v-btn>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
  /* Aligns buttons to the right */
  gap: 8px;
  /* Adds space between the buttons */
}

.toast-button {
  /* Optional: Add button-specific styling */
  padding: 8px 16px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
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
