<template>
    <v-form ref="form" @submit.prevent="_submit">
        <v-text-field hide-details clearable placeholder="할 일을 입력하세요" class="v-text-field"
                      ref="input" v-model="title"/>
    </v-form>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class TodoInput extends Vue {
        // data
        title: string = '';
        // method
        _submit(): void {
            if (!this.title) {
                return;
            }
            // 이벤트 버스를 통한 이벤트 전달 사용
            this.$bus.$emit('added', this.title);
            // init
            this.title = '';
            this.input.focus();
        }

        // computed
        get input(): HTMLInputElement {
            return this.$refs.input as HTMLInputElement;
        }
    }
</script>

<style scoped>
    .v-text-field {
        padding-top: 0;
    }
</style>
