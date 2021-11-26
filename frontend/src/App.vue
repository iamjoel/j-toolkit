<script setup lang="ts">
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { h, resolveComponent } from 'vue'
import { darkTheme, NConfigProvider , NMenu, NLayout, NLayoutHeader, NLayoutSider, NIcon } from 'naive-ui'
import {
  Apps as AppIcon,
  Information as InfoIcon,
  Paw as PawInfo
} from '@vicons/ionicons5'
const handleUpdateValue = () => {}

const  renderIcon  = (icon: any) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}
interface Menu {
  path: string
  name: string
  icon?: any
}
const renderMenuItem = ({
  path,
  name,
  icon = AppIcon
} : Menu) => {
  return {
    label: () =>
      h(
        resolveComponent('router-link') as any,
        {
          to: {
            path
          }
        },
        { default: () => name }
      ),
    key: 'info',
    icon: renderIcon(icon)
  }
}
const menuOptions = [
  renderMenuItem({name: '信息', path: '/info', icon: InfoIcon}),
  renderMenuItem({name: '代理', path: '/proxy', icon: PawInfo})
]

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
            <n-menu @update:value="handleUpdateValue" :options="menuOptions" />
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
