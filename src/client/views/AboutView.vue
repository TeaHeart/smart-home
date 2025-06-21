<template>
  <div class="video-container">
    <video ref="videoPlayer" controls playsinline class="responsive-video">
      <source :src="videoUrl" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import videoUrl from '@/assets/演示.mp4'

const videoPlayer = ref(null)

// 自动适应父容器大小
onMounted(() => {
  const resizeObserver = new ResizeObserver(() => {
    if (videoPlayer.value) {
      const container = videoPlayer.value.parentElement
      videoPlayer.value.style.width = `${container.clientWidth}px`
      videoPlayer.value.style.height = `${container.clientHeight}px`
    }
  })

  if (videoPlayer.value) {
    resizeObserver.observe(videoPlayer.value.parentElement)
  }

  return () => resizeObserver.disconnect()
})
</script>

<style scoped>
.video-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.responsive-video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  /* 保持比例填充 */
  background-color: #000;
}
</style>
