<script setup lang="ts">
import { computed } from 'vue'
import useConfigStore from '@/stores/config'
import { darkTheme, NConfigProvider, NLayout, NLayoutHeader, NLayoutSider, NButton } from 'naive-ui'
import Menu from '@/components/Menu.vue'

const config = useConfigStore()
const isDarkTheme = computed(() => config.isDarkTheme)
</script>

<template>
  <n-config-provider :theme="isDarkTheme ? darkTheme : null">
    <n-layout :class="config.theme">
      <n-layout-header class="header" bordered>
        <router-link class="name" to="/">
          Joel 的工具箱
        </router-link>

        <div class="actions">
          <n-button @click="config.toggleTheme()">
            {{isDarkTheme ? '深色' : '浅色'}}
          </n-button>
        </div>
      </n-layout-header>
      <n-layout
        class="main"
        has-sider
      >
          <n-layout-sider
            bordered
            show-trigger
            collapse-mode="width"
            :collapsed-width="52"
            :width="240"
            :native-scrollbar="false"
          >
            <Menu />
          </n-layout-sider>
          <n-layout>
            <div class="main-body">
              <router-view />
            </div>
          </n-layout>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 64px;
}

.name {
  font-size: 18px;
  color: #fff;
  text-decoration: none;
}
.light .name {
  color: #333;
}
.main {
  height: calc(100vh - 64px);
}

.main-body {
  padding: 16px;
}
</style>
