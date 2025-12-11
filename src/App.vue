<script setup lang="ts">
import { useMainStore } from '@/stores/main';
import { sendGet } from '@/utils/request';
import { ArrowSync24Filled, BranchForkLink24Regular, CellularData124Filled, CellularOff24Filled, Code24Regular, DarkTheme24Filled, Info24Regular, LocalLanguage24Filled, Settings24Regular, WindowDevTools24Regular } from '@vicons/fluent';
import { NButton, NConfigProvider, NFlex, NIcon, NLayout, NLayoutSider, NMenu, NProgress, darkTheme, dateEnUS, dateZhCN, enUS, lightTheme, zhCN, type MenuOption } from 'naive-ui';
import type { Key } from 'naive-ui/es/cascader/src/interface';
import { storeToRefs } from 'pinia';
import { computed, h, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { log } from './utils/log';

const route = useRoute();

const mainStore = useMainStore();
const { progress, auto_get_interval } = storeToRefs(mainStore);

const currentTheme = ref()
const css_data_theme = ref<string>()
const currentLang = ref({ 'lang': zhCN, 'dateLang': dateZhCN })

watch(currentTheme, newVal => {
  log.info(currentTheme.value.name)
  css_data_theme.value = currentTheme.value.name
})

let auto_get_interval_id: number;
onBeforeMount(() => {
  currentTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () =>
      currentTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme) // 监听系统主题
});

onMounted(() => {
  auto_get_interval_id = setInterval(sendGet, auto_get_interval.value)
  sendGet()
})


watch(auto_get_interval, () => {
  clearInterval(auto_get_interval_id)
  auto_get_interval_id = setInterval(sendGet, auto_get_interval.value)
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

const comput_time_left = computed(() => {
  if (progress.value['duration'] && progress.value['out_time_us'] && progress.value['speed']) {
    const seconds = (progress.value['duration'] * 1000_000 - progress.value['out_time_us']) / progress.value['speed'] / 1000_000;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = secs.toString().padStart(2, "0");

    return `-${formattedHours}:${formattedMinutes}:${formattedSeconds} |`;
  }
  return null;
})

</script>

<template>
  <n-config-provider :theme="currentTheme" :data-theme="css_data_theme" :locale="currentLang.lang"
    :date-locale="currentLang.dateLang">
    <n-flex id="outermost" vertical style="gap: 0;">

      <!-- 顶部按钮栏 -->
      <n-flex id="topButtonBarFlex" justify="end">

        <n-progress v-show="progress['frame_count']" type="line"
          :percentage="100 * (progress['frame'] || 0) / (progress['frame_count'] || -1)" indicator-placement="inside"
          indicator-text-color="var(--n-text-color)" processing style="width: 60%;margin: auto;">
          {{ comput_time_left }}
          {{ Math.round(100000 * (progress['frame'] || 0) / (progress['frame_count'] || -1)) / 1000 }} %
        </n-progress>

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
[data-theme="light"] {
  --log-color-time: #18a058;
  --log-color-debug: #18a058;
  --log-color-info: #2080f0;
  --log-color-warning: #f90;
  --log-color-error: #f03;
  --log-color-send: #ff69b4;
}

[data-theme="dark"] {
  --log-color-time: #63e2b7;
  --log-color-debug: #63e2b7;
  --log-color-info: #70c0e8;
  --log-color-warning: #f2c97d;
  --log-color-error: #e88080;
  --log-color-send: #ff69b4;
}

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
