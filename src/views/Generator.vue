<script setup lang="ts">
import { useCmdPanelStore } from '@/stores/cmdPanel';
import { useGeneratorStore } from '@/stores/generator';
import { useMainStore } from '@/stores/main';
import { Copy24Regular, SendCopy24Filled } from '@vicons/fluent';
import { NButton, NCascader, NIcon, NInput, NInputGroup, NInputGroupLabel, NInputNumber, NSlider, NSpace } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const mainStore = useMainStore();
const { } = storeToRefs(mainStore);

const cmdPanelStore = useCmdPanelStore();
const { new_command } = storeToRefs(cmdPanelStore);

const generatorStore = useGeneratorStore();
const { builded_text, input, output, output_dir, preset, param_name, params_override, audio_enc, audio_bitrate, audio_bitrate_disable, vpy_filter, hard_subtitle, soft_subtitle, muxer, video_crf, muxer_fr, x265_params } = storeToRefs(generatorStore);


const copyText = async () => {
    try {
        await navigator.clipboard.writeText(builded_text.value);
    } catch (err) {
        console.error(err);
    }
};

/**
 * 复制到 cmd panel
 */
const copySend = async () => {
    new_command.value.push(builded_text.value);
    router.push('/');
};


const preset_options = [
    {
        label: 'FLAC',
        value: 'flac'
    },
    {
        label: 'x264',
        value: 'x264',
        children: [
            {
                label: 'fast',
                value: 'x264fast'
            },
            {
                label: 'slow',
                value: 'x264slow'
            }
        ]
    },
    {
        label: 'x265',
        value: 'x265',
        children: [
            {
                label: 'fast4',
                value: 'x265fast4'
            },
            {
                label: 'fast3',
                value: 'x265fast3'
            },
            {
                label: 'fast2',
                value: 'x265fast2'
            },
            {
                label: 'fast',
                value: 'x265fast'
            },
            {
                label: 'slow',
                value: 'x265slow'
            },
            {
                label: 'full',
                value: 'x265full'
            }
        ]
    },
    {
        label: 'SVT-AV1',
        value: 'svtav1'
    },
    {
        label: 'QSV',
        value: 'qsv',
        children: [
            {
                label: 'AVC',
                value: 'h264_qsv'
            },
            {
                label: 'HEVC',
                value: 'hevc_qsv'
            },
            {
                label: 'AV1',
                value: 'av1_qsv'
            }
        ]
    },
    {
        label: 'NVENC',
        value: 'nvenc',
        children: [
            {
                label: 'AVC',
                value: 'h264_nvenc'
            },
            {
                label: 'HEVC',
                value: 'hevc_nvenc'
            },
            {
                label: 'AV1',
                value: 'av1_nvenc'
            }
        ]
    },
    {
        label: 'AMF',
        value: 'amf',
        children: [
            {
                label: 'AVC',
                value: 'h264_amf'
            },
            {
                label: 'HEVC',
                value: 'hevc_amf'
            },
            {
                label: 'AV1',
                value: 'av1_amf'
            }
        ]
    },
];


const audio_enc_options = [
    {
        label: 'copy',
        value: 'copy'
    },
    {
        label: 'libopus',
        value: 'libopus'
    }
];


const muxer_options = [
    {
        label: 'mp4',
        value: 'mp4'
    },
    {
        label: 'mkv',
        value: 'mkv'
    }
];
</script>


<template>
    <div style="padding: 1rem;position: relative;overflow-x: hidden;">

        <n-space vertical>

            <div class="input-group-line">
                <n-input-group>
                    <n-input-group-label>
                        -i
                    </n-input-group-label>
                    <n-input placeholder="Input file pathname" v-model:value="input" />
                </n-input-group>
                <n-input-group>
                    <n-input-group-label>
                        -o
                    </n-input-group-label>
                    <n-input placeholder="Output file basename prefix" v-model:value="output" />
                </n-input-group>
                <n-input-group>
                    <n-input-group-label>
                        -o:dir
                    </n-input-group-label>
                    <n-input placeholder="Output file directory" v-model:value="output_dir" />
                </n-input-group>
            </div>

            <div class="input-group-line">
                <n-input-group>
                    <n-input-group-label>
                        -preset
                    </n-input-group-label>
                    <n-cascader placeholder="Preset name" :options="preset_options" @update-value="val => preset = val"
                        label-field="label" value-field="value" expand-trigger="hover" check-strategy="child"
                        separator=" - " />
                </n-input-group>
                <n-input-group>
                    <n-input-group-label>
                        -c:a
                    </n-input-group-label>
                    <n-cascader placeholder="Audio encoder" @update-value="val => audio_enc = val"
                        :options="audio_enc_options" label-field="label" value-field="value" expand-trigger="hover"
                        check-strategy="child" separator="" :clearable="true" />
                </n-input-group>
                <n-input-group>
                    <n-input-group-label>
                        -muxer
                    </n-input-group-label>
                    <n-cascader placeholder="Muxer" @update-value="val => muxer = val" :options="muxer_options"
                        label-field="label" value-field="value" expand-trigger="hover" check-strategy="child"
                        separator="" :clearable="true" />
                </n-input-group>
                <n-input-group>
                    <n-input-group-label>
                        -r
                    </n-input-group-label>
                    <n-input placeholder="Force frame rate" :disabled="muxer == null" v-model:value="muxer_fr">
                        <template #suffix>
                            FPS
                        </template>
                    </n-input>
                </n-input-group>
            </div>

            <div class="input-group-line">
                <n-input-group>
                    <n-input-group-label>
                        -pipe
                    </n-input-group-label>
                    <n-input placeholder="vpy filter file pathname" v-model:value="vpy_filter" />
                </n-input-group>
                <n-input-group>
                    <n-input-group-label>
                        -sub
                    </n-input-group-label>
                    <n-input placeholder="Burned-in subtitle" v-model:value="hard_subtitle"
                        :disabled="computed(() => Boolean(soft_subtitle)).value" />
                </n-input-group>
                <n-input-group>
                    <n-input-group-label>
                        -soft-sub
                    </n-input-group-label>
                    <n-input placeholder="Soft subtitle" v-model:value="soft_subtitle"
                        :disabled="computed(() => Boolean(hard_subtitle)).value" />
                </n-input-group>
            </div>

            <n-input-group>
                <n-input-group-label>
                    -crf
                </n-input-group-label>
                <n-input-number placeholder="Video CRF" :value="param_name && video_crf"
                    @update-value="val => video_crf = Number(val)" :disabled="param_name == null" :min="0" :max="51"
                    :step="0.5" />
                &nbsp;
                <n-slider v-model:value="video_crf" :disabled="param_name == null" :marks="{ 0: '0', 51: '51' }"
                    :min="0" :max="51" :step="0.1" style="padding: 0 1.4rem;font-size: 0.8rem;" />
            </n-input-group>

            <n-input-group>
                <n-input-group-label>
                    -b:a
                </n-input-group-label>
                <n-input-number placeholder="Audio bitrate" :value="audio_bitrate_disable ? null : audio_bitrate"
                    @update-value="val => audio_bitrate = (val as number)" :disabled="audio_bitrate_disable" :min="20"
                    :step="16">
                    <template #suffix>
                        Kbps
                    </template>
                </n-input-number>
                &nbsp;
                <n-slider v-model:value="audio_bitrate" :disabled="audio_bitrate_disable"
                    :marks="{ 32: '32k', 64: '64k', 96: '96k', 128: '128k', 192: '192k', 256: '256k', 320: '320k' }"
                    step="mark" :min="0" :max="320" style="padding: 0 1.4rem;font-size: 0.8rem;" />
            </n-input-group>


            <div class="input-group-line">
                <n-input-group>
                    <n-input-group-label>
                        -rd
                    </n-input-group-label>
                    <n-input-number :disabled="param_name !== '-x265-params'" v-model:value="x265_params.rd" :min="1"
                        :max="6" :step="1" :validator="x => Number.isInteger(x)" />
                </n-input-group>
                <n-input-group>
                    <n-input-group-label>
                        -psy-rd
                    </n-input-group-label>
                    <n-input-number :disabled="param_name !== '-x265-params'" v-model:value="x265_params['psy-rd']"
                        :min="0" :max="5" :step="0.1" :validator="x => Number.isInteger(x * 10)" />
                </n-input-group>
                <n-input-group>
                    <n-input-group-label>
                        -rdoq-level
                    </n-input-group-label>
                    <n-input-number :disabled="param_name !== '-x265-params'" v-model:value="x265_params['rdoq-level']"
                        :min="0" :max="2" :step="1" :validator="x => Number.isInteger(x)" />
                </n-input-group>
                <n-input-group>
                    <n-input-group-label>
                        -psy-rdoq
                    </n-input-group-label>
                    <n-input-number :disabled="param_name !== '-x265-params'" v-model:value="x265_params['psy-rdoq']"
                        :min="0" :max="50" :step="0.1" :validator="x => Number.isInteger(x * 10)" />
                </n-input-group>
            </div>


            <n-input-group>
                <n-input-group-label>
                    {{ param_name || "N/A" }}
                </n-input-group-label>
                <n-input
                    :placeholder="param_name == null ? 'Video encoder params override' : param_name.replace(/-/g, ' ').trim() + ' override'"
                    :disabled="param_name == null" v-model:value="params_override" />
            </n-input-group>


            <n-input-group>
                <n-input type="text" :value="builded_text" placeholder="Builded" :disabled="true" />
                <n-button strong secondary type="info" @click="copyText">
                    <n-icon size="large">
                        <Copy24Regular />
                    </n-icon>
                </n-button>
                <n-button strong secondary type="info" @click="copySend">
                    <n-icon size="large">
                        <SendCopy24Filled />
                    </n-icon>
                </n-button>
            </n-input-group>

        </n-space>

    </div>
</template>

<style scoped>
.input-group-line {
    display: flex;
    justify-content: space-between;
    gap: 0.2rem;

    >.n-input-group {
        justify-content: center;
    }
}
</style>