# Joel 工具箱 前端
[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

Vue3 + TypeScript。

## 文档
* [单文件组件](https://v3.cn.vuejs.org/api/sfc-script-setup.html)。 可以通过 `getCurrentInstance` 拿到实例。
* [Vite](https://cn.vitejs.dev/config/)
* 路由
  * [vue-router-next](https://next.router.vuejs.org/zh/index.html)
* 组件库
  * [Naive UI](https://www.naiveui.com/zh-CN/os-theme)
  * [xicons](https://www.xicons.org/#/)
* 状态管理
  * [Pinia](https://pinia.esm.dev/)

## 注意
### reactive 的子项的响应式
reactive 的子项在自定义hooks中返回，是不响应的。返回整个 reactive 是响应的。

### v-model
```
<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

改其他属性值的简写：
```
<ChildComponent v-model:title="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```



### naive-ui
naive-ui 里的 n-layout-sider 加了 inverted 属性后，皮肤切换会出问题。

## 工具
* [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) VSCode 插件。
* 代码格式化
  * [JavaScript Standard Style](https://standardjs.com/)
  * [ts-standard](https://github.com/standard/ts-standard)
  * [eslint rules](https://eslint.org/docs/rules/)
  * [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)
  * [vscode-standard](https://marketplace.visualstudio.com/items?itemName=standard.vscode-standard)
