import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneratorStore = defineStore('generator', () => {
    const builded_text = computed(() =>
        [
            input.value && input.value !== "fd" ? `-i ${input.value} ` : "",
            vpy_filter.value ? `-pipe ${vpy_filter.value} ` : "",
            subtitle.value ? `-sub ${subtitle.value} ` : "",
            output.value ? `-o ${output.value} ` : "",
            output_dir.value ? `-o:dir ${output_dir.value} ` : "",
            preset.value ? `-preset ${preset.value} ` : "",
            param_name.value !== "N/A" ? `-crf ${video_crf.value} ` : "",
            param_name.value !== "N/A" && params.value ? `${param_name.value} "${params.value}" ` : "",
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

    const param_name = computed(() => preset.value.startsWith("x264") ? "-x264-params" : preset.value.startsWith("x265") ? "-x265-params" : "N/A");
    const params = ref("");

    const video_crf = ref(18);

    const audio_enc = ref(null as string | null);
    const audio_bitrate = ref(128);
    const audio_bitrate_disable = computed(() => audio_enc.value == null || audio_enc.value === 'copy');

    const muxer = ref(null as string | null);
    const muxer_fr = ref("");

    const vpy_filter = ref("");
    const subtitle = ref("");

    return { builded_text, input, output, output_dir, preset, param_name, params, audio_enc, audio_bitrate, audio_bitrate_disable, vpy_filter, subtitle, muxer, video_crf, muxer_fr }
})
