import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneratorStore = defineStore('generator', () => {
    const builded_text = computed(() =>
        [
            input.value && input.value !== "fd" ? `-i ${input.value} ` : "",

            vpy_filter.value ? `-pipe ${vpy_filter.value} ` : "",
            hard_subtitle.value ? `-sub ${hard_subtitle.value} ` : "",
            soft_subtitle.value ? `-soft-sub ${soft_subtitle.value} ` : "",

            output.value ? `-o ${output.value} ` : "",
            output_dir.value ? `-o:dir ${output_dir.value} ` : "",

            preset.value ? `-preset ${preset.value} ` : "",
            param_name.value != null ? `-crf ${video_crf.value} ` : "",
            ...Object.keys(param_name.value === "-x265-params" ?
                x265_params.value : {})
                .map(key => {
                    const value = x265_params.value[key];
                    if (value != null)
                        return `-${key} ${value} `;
                    return null;
                })
                .filter(item => item != null),
            param_name.value != null && params_override.value ? `${param_name.value} "${params_override.value}" ` : "",

            audio_enc.value ? `-c:a ${audio_enc.value} ` : "",
            !audio_bitrate_disable.value && audio_bitrate.value ? `-b:a ${audio_bitrate.value} ` : "",

            muxer.value ? `-muxer ${muxer.value} ` : "",
            muxer_fr.value ? `-r ${muxer_fr.value} ` : "",
        ].join('')
    );


    const input = ref("");

    const output = ref("");

    const output_dir = ref("");

    const preset = ref("");

    const param_name = computed(() => preset.value.startsWith("x264") ? "-x264-params" : preset.value.startsWith("x265") ? "-x265-params" : null);
    const params_override = ref("");

    const video_crf = ref(18);
    const x265_params = ref<Record<string, number | null>>({
        rd: (null as number | null),
        'psy-rd': (null as number | null),
        'rdoq-level': (null as number | null),
        'psy-rdoq': (null as number | null),
    });

    const audio_enc = ref(null as string | null);
    const audio_bitrate = ref(128);
    const audio_bitrate_disable = computed(() => audio_enc.value == null || audio_enc.value === 'copy');

    const muxer = ref(null as string | null);
    const muxer_fr = ref("");

    const vpy_filter = ref("");
    const hard_subtitle = ref("");
    const soft_subtitle = ref("");

    return { builded_text, input, output, output_dir, preset, param_name, params_override, audio_enc, audio_bitrate, audio_bitrate_disable, vpy_filter, hard_subtitle, soft_subtitle, muxer, video_crf, muxer_fr, x265_params }
})
