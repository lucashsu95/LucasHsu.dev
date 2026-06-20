<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  filePath: { type: String, required: false }, // 可选，如果不提供则自动检测
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: false }, // 可选，如果不提供则自动检测
  downloadUrl: { type: String, required: true },
});

// 文件图标 SVG（颜色由 CSS .file-icon 控制）
const fileIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 2V9H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 12V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

// 格式化文件大小显示
const formattedFileSize = computed(() => {
  const size = props.fileSize || detectedFileSize.value;
  if (!size) return "未知大小";
  
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
});

// 自动检测文件大小
const detectedFileSize = ref(null);

const detectFileSize = async () => {
  if (props.fileSize) return; // 如果用户提供了 fileSize，则跳过检测
  
  try {
    // 尝试从 filePath 获取文件大小
    if (props.filePath) {
      const response = await fetch(props.filePath);
      if (response.ok && response.headers.get('content-length')) {
        detectedFileSize.value = parseInt(response.headers.get('content-length'));
        return;
      }
    }
    
    // 尝试从 downloadUrl 获取文件大小
    const response = await fetch(props.downloadUrl);
    if (response.ok && response.headers.get('content-length')) {
      detectedFileSize.value = parseInt(response.headers.get('content-length'));
    }
  } catch (error) {
    console.warn('无法自动检测文件大小:', error);
  }
};

// 触发下载函数
const triggerDownload = () => {
  const link = document.createElement('a');
  link.href = props.downloadUrl;
  link.download = props.fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 处理卡片点击
const handleCardClick = (event) => {
  // 不要触发下载，如果点击的是下载按钮
  if (event.target.closest('.download-btn')) {
    return;
  }
  triggerDownload();
};

// 初始化时检测文件大小
onMounted(() => {
  detectFileSize();
});
</script>

<template>
  <article 
    class="file-download-card"
    @click="handleCardClick"
    role="button"
    tabindex="0"
    @keydown.enter="handleCardClick"
  >
    <div class="file-icon" v-html="fileIconSvg"></div>
    
    <div class="file-info">
      <h3 class="file-name">{{ fileName }}</h3>
      <span class="file-size">{{ formattedFileSize }}</span>
    </div>
    
    <button 
      class="download-btn" 
      @click.stop="triggerDownload"
      aria-label="Download file"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </article>
</template>

<style scoped>
.file-download-card {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 16px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.file-download-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background-color: var(--vp-c-bg-soft);
}

.file-download-card:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  color: var(--vp-c-brand-text);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.download-btn:hover {
  background-color: var(--vp-c-brand-dark);
  transform: scale(1.05);
}

.download-btn:active {
  transform: scale(0.95);
}

/* Focus styles for accessibility */
.file-download-card:focus-within {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

/* Responsive design */
@media (max-width: 640px) {
  .file-download-card {
    max-width: none;
    padding: 12px;
  }
  
  .file-icon {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  
  .download-btn {
    width: 32px;
    height: 32px;
  }
  
  .file-name {
    font-size: 0.875rem;
  }
  
  .file-size {
    font-size: 0.75rem;
  }
}
</style>
