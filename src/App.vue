<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted, h, onMounted, watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { NConfigProvider, lightTheme, darkTheme, zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui';
import { NFlex, NMenu, type MenuOption, NLayout, NLayoutSider, NIcon, NButton, NSpace, NInput, NDatePicker } from 'naive-ui';
import { DarkTheme24Filled, Code24Regular, BranchForkLink24Regular, LocalLanguage24Filled, ArrowSync24Filled, Settings24Regular, Note24Regular, CellularData124Filled, CellularOff24Filled, WindowDevTools24Regular, Info24Regular } from '@vicons/fluent';
import { sendGet } from '@/utils/request';
import { useMainStore } from '@/stores/main';
import type { Key } from 'naive-ui/es/cascader/src/interface';
import { storeToRefs } from 'pinia';

const route = useRoute();

const mainStore = useMainStore();
const { auto_get_interval } = storeToRefs(mainStore);

const currentTheme = ref();
const currentLang = ref({ 'lang': zhCN, 'dateLang': dateZhCN })

watch(currentTheme, newVal => {
  if (newVal.name === 'light') {
    document.documentElement.style.setProperty('--log-color-time', '#18a058');
    document.documentElement.style.setProperty('--log-color-info', '#2080f0');
    document.documentElement.style.setProperty('--log-color-warning', '#f90');
    document.documentElement.style.setProperty('--log-color-error', '#f03');
    document.documentElement.style.setProperty('--log-color-send', '#ff69b4');
  }
  else {
    document.documentElement.style.setProperty('--log-color-time', '#63e2b7');
    document.documentElement.style.setProperty('--log-color-info', '#70c0e8');
    document.documentElement.style.setProperty('--log-color-warning', '#f2c97d');
    document.documentElement.style.setProperty('--log-color-error', '#e88080');
    document.documentElement.style.setProperty('--log-color-send', '#ff69b4');
  }
})

let auto_get_interval_id: number;
onBeforeMount(() => {
  currentTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme;
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () =>
      currentTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme); // 监听系统主题
});

onMounted(() => {
  auto_get_interval_id = setInterval(() => sendGet(), auto_get_interval.value);
  sendGet();
})


watch(auto_get_interval, () => {
  clearInterval(auto_get_interval_id);
  auto_get_interval_id = setInterval(() => sendGet(), auto_get_interval.value);
});

onUnmounted(() => clearInterval(auto_get_interval_id))

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'cmd-panel',
          }
        },
        { default: () => 'Command' }
      ),
    key: 'cmd-panel',
    icon: () => h(Code24Regular),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'generator',
          }
        },
        { default: () => 'Generator' }
      ),
    key: 'generator',
    icon: () => h(WindowDevTools24Regular),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'connection',
          }
        },
        { default: () => 'Connection' }
      ),
    key: 'connection',
    icon: () => h(BranchForkLink24Regular),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'setting',
          }
        },
        { default: () => 'Setting' }
      ),
    key: 'setting',
    icon: () => h(Settings24Regular)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'about',
          }
        },
        { default: () => 'About' }
      ),
    key: 'about',
    icon: () => h(Info24Regular)
  },
];

const route_name = ref(route.name)
// 根据当前路由设置高亮
watch(() => route.name, newRouteName => route_name.value = newRouteName);

const collapseMenu = ref(true);

</script>

<template>
  <n-config-provider :theme="currentTheme" :locale="currentLang.lang" :date-locale="currentLang.dateLang">
    <n-flex id="outermost" vertical style="gap: 0;">

      <!-- 顶部按钮栏 -->
      <n-flex id="topButtonBarFlex" justify="end">

        <n-button strong tertiary circle tag="div" :type="mainStore.is_connect ? 'default' : 'warning'"
          style="cursor: inherit;background-color: transparent;">
          <n-icon size="28" v-show="mainStore.is_connect">
            <CellularData124Filled />
          </n-icon>
          <n-icon size="28" v-show="!mainStore.is_connect">
            <CellularOff24Filled />
          </n-icon>
        </n-button>

        <n-button strong tertiary circle @click="() => sendGet()">
          <n-icon size="large">
            <ArrowSync24Filled />
          </n-icon>
        </n-button>

        <n-button strong tertiary circle @click="() => {
          if (currentLang.lang.name === 'zh-CN')
            currentLang.lang = enUS, currentLang.dateLang = dateEnUS;
          else
            currentLang.lang = zhCN, currentLang.dateLang = dateZhCN;
        }">
          <n-icon size="large">
            <LocalLanguage24Filled />
          </n-icon>
        </n-button>

        <n-button strong tertiary circle
          @click="() => currentTheme = currentTheme.name === 'light' ? darkTheme : lightTheme">
          <n-icon size="large">
            <DarkTheme24Filled />
          </n-icon>
        </n-button>

      </n-flex>


      <n-flex id="controlSpace">

        <n-layout has-sider>

          <!-- 左侧菜单栏 -->
          <n-layout-sider bordered collapse-mode="width" :width="170" :collapsed="collapseMenu" show-trigger
            @collapse="collapseMenu = true" @expand="collapseMenu = false">
            <n-menu :collapsed="collapseMenu" :options="menuOptions" :value="(route_name as Key)" />
          </n-layout-sider>

          <!-- 右侧编辑区 -->
          <n-layout>
            <RouterView />
          </n-layout>

        </n-layout>
      </n-flex>

    </n-flex>

  </n-config-provider>
</template>

<style scoped>
#outermost {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: v-bind('currentTheme.common.bodyColor');
}

#topButtonBarFlex {
  height: calc(2rem + 2px);
  position: relative;
  gap: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid v-bind('currentTheme.common.borderColor');
}

#controlSpace {
  height: calc(100% - 2rem - 3px);
  position: relative;
}
</style>
