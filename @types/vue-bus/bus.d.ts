import {VueConstructor} from "vue";

export interface VueBusObject {
    $on(event: string | string[], callback: Function): this

    $once(event: string, callback: Function): this

    $off(event?: string | string[], callback?: Function): this

    $emit(event: string, ...args: any[]): this
}

declare module 'vue/types/vue' {
    export interface Vue {
        $bus: VueBusObject
    }

    export interface VueConstructor {
        bus: VueBusObject
    }
}
