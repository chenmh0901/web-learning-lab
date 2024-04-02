<template>
    <a-card class="m-4">
      <h1 class="text-2xl">List</h1>
      <input
        type="text"
        v-model="searchQuery"
        @input="filterData"
        placeholder="搜索..."
      />
      <ol>
        <li v-for="(item, index) in pagedData" :key="index">{{ item }}</li>
      </ol>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage <= 1">上一页</button>
        <span>第 {{ currentPage }} 页</span>
        <button @click="nextPage" :disabled="currentPage >= totalPage">
          下一页
        </button>
      </div>
      <button @click="addData('列表项0')">添加列表项</button>
    </a-card>
  </template>
  
  <script setup>
  import { computed, reactive, ref } from 'vue';
  const searchQuery = ref('');
  
  const pseudoArray = reactive({
    0: '列表项 1',
    1: '列表项 2',
    2: '列表项 3',
    3: '列表项 4',
    4: '列表项 5',
    5: '列表项 6',
    6: '列表项 7',
    7: '列表项 8',
    8: '列表项 9',
    9: '列表项 10',
    10: '列表项 11',
    11: '列表项 12',
    12: '列表项 13'
  });
  
  const perPage = 3;
  const currentPage = ref(1);
  
  // 使用 Object.keys 和 map 转换伪数组为真正的数组
  const realArray = computed(() =>
    Object.keys(pseudoArray).map((key) => pseudoArray[key])
  );
  
  const totalPage = computed(() =>
    Math.ceil(filteredArray.value.length / perPage)
  );
  
  const pagedData = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    const end = start + perPage;
    return filteredArray.value.slice(start, end);
  });
  
  const filteredArray = computed(() => {
    if (!searchQuery.value) {
      return realArray.value;
    }
    return realArray.value.filter((item) => item.includes(searchQuery.value));
  });
  function filterData() {
    currentPage.value = 1; // 搜索时重置到第一页
  }
  // 翻页函数
  function nextPage() {
    if (currentPage.value < totalPage.value) {
      currentPage.value++;
    }
  }
  
  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }
  function addData(newItem) {
    // 将新项添加到对象的开始
    // 需要转换为数组，添加数据，然后重建伪数组
    const items = Object.entries(pseudoArray).sort(
      (a, b) => parseInt(a[0], 10) - parseInt(b[0], 10)
    );
    items.unshift([Object.keys(pseudoArray).length.toString(), newItem]); // 添加新项
  
    // 清除原有的pseudoArray对象
    for (const key in pseudoArray) {
      delete pseudoArray[key];
    }
  
    // 重新添加项目，确保其索引顺序是正确的
    items.forEach(([key, value], index) => {
      pseudoArray[index] = value;
    });
  
    // 如果不在第一页，则跳转回第一页
    if (currentPage.value !== 1) {
      currentPage.value = 1;
    }
  }
  </script>
  