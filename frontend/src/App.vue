<script setup lang="ts">
import { darkTheme, NConfigProvider, NLayout, NLayoutHeader, NLayoutSider } from 'naive-ui'
import Menu from '@/components/Menu.vue'
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-layout>
      <n-layout-header class="header" bordered>
        <router-link class="name" to="/">
          Joel 的工具箱
        </router-link>
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
            inverted
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
.main {
  height: calc(100vh - 64px);
}

.main-body {
  padding: 16px;
}
</style>
