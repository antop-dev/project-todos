<template>
    <v-layout>
        <h3 v-if="!editing" class="editable" :class="done ? 'done' : ''" @click="_edit">{{ text }}</h3>
        <v-text-field autofocus hide-details single-line append-icon="refresh" class="v-text-field"
                      v-if="editing" v-model="text"
                      @click:append="_reset" @change="_edited" @blur="_blur"/>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class TodoTitle extends Vue {
        // prop
        @Prop() title: string;
        @Prop() done: boolean;
        // data
        text: string = this.title;
        editing: boolean = false;

        // 편집 모드로 전환한다.
        // <h3>가 숨겨지고 <v-text-field>가 나오게 된다.
        _edit(): void {
            this.editing = true;
        }

        // 수정이 되면 input을 blur 한다.
        _edited(): void {
            this._blur();
        }

        // 값을 원래 값으로 변경한다.
        _reset(): void {
            this.text = this.title;
        }

        // 편집 모드를 종료하고 값이 변경 되었을 경우 상위 컴포넌트로 이벤트를 발생한다.
        _blur(): void {
            this.editing = false;
            if (this.title != this.text) {
                this.$emit('edited', this.text);
            }
        }

    }
</script>

<style scoped>
    .editable {
        cursor : text;
    }

    .done {
        text-decoration: line-through;
        color: #8e8e8e;
        font-style: italic;
    }

    .v-text-field {
        margin-top: 0px;
        padding-top: 0px;
    }
</style>
