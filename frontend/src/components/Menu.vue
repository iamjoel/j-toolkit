<script setup lang="ts">
import { h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { NMenu, NIcon } from 'naive-ui'
import {
  Apps as AppIcon,
  Information as InfoIcon,
  Paw as PawInfo
} from '@vicons/ionicons5'

const route = useRoute()

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
        RouterLink,
        {
          to: {
            path
          },
        },
        { default: () => name }
      ),
    key: path,
    icon: renderIcon(icon)
  }
}
const menuOptions = [
  renderMenuItem({name: '信息', path: '/info', icon: InfoIcon}),
  renderMenuItem({name: '代理', path: '/proxy', icon: PawInfo})
]
</script>


<template>
<n-menu
  :options="menuOptions"
  :value="route.path"
/>
</template>