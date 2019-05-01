declare module 'vue-bus' {
    import {PluginFunction} from 'vue';

    interface VueBus {
        install: PluginFunction<VueBusUseOptions>
    }

    interface VueBusUseOptions {
        name?: string;
    }

    let k: VueBus;
    export = k;
}
