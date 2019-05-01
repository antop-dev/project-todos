<template>
    <v-card class="mt-1" :id="item.id">
        <v-container pa-0>
            <v-layout align-center row fill-height>
                <v-flex>
                    <v-btn flat icon :color="done ? 'green' : 'grey lighten-1'" @click="_changeDone">
                        <v-icon>check</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex md12 xs12>
                    <todo-title xs12 md12 :done="done" :title="item.title" @edited="_changeTitle"/>
                </v-flex>
                <v-flex>
                    <v-btn flat icon color="red" @click="_remove">
                        <v-icon>{{removeIcon}}</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex class="handle-item" pa-2>
                    <v-icon>drag_handle</v-icon>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Emit, Prop} from 'vue-property-decorator';
    import TodoTitle from '@/components/TodoTitle';
    import {Todo} from '@/model/Todo';
    import {RemoveState} from '@/consts/RemoveState';

    @Component({
        components: {
            TodoTitle
        }
    })
    export default class TodoItem extends Vue {
        /**
         * 상위 컴포넌트로부터 받게 되는 속성
         */
        @Prop({required: true}) item: Todo;
        /**
         * 내부 속성
         */
        title: string = this.item.title;
        done: boolean = this.item.done;
        removeStatus: RemoveState = RemoveState.Waiting;

        /**
         * 삭제 상태에 따른 아이콘 선택
         */
        get removeIcon(): string {
            switch (this.removeStatus) {
                case RemoveState.Waiting:
                    return 'delete';
                case RemoveState.Question:
                    return 'live_help';
                case RemoveState.Complete:
                    return 'done';
            }
        }

        /**
         * 상위 컴포넌트로 'edited' 이벤트를 발생시킨다.
         */
        @Emit('edited')
        edited(): Todo {
            return {
                id: this.item.id,
                title: this.title,
                done: this.done,
                order: this.item.order
            };
        }

        timer: number;

        /**
         * 상위 컴포넌트로 'removed' 이벤트를 발생시킨다.
         */
        _remove(): void {
            switch (this.removeStatus
                ) {
                case RemoveState.Waiting:
                    // 질문 상태로 변경
                    this.removeStatus = RemoveState.Question;
                    // 1.5초 후 대기 상태로 돌아는 타이머 시작
                    this.timer = window.setTimeout(() => {
                        this.removeStatus = RemoveState.Waiting;
                    }, 1500);
                    break;
                case RemoveState.Question:
                    // 타이머 종료
                    window.clearTimeout(this.timer);
                    // 삭제 상태 완료로 변경
                    this.removeStatus = RemoveState.Complete;
                    // removed 이벤트 발생
                    this.$emit('removed', this.item.id);
                    break;
            }
        }

        /**
         * TodoTitle 컴포넌트로부터 title 값이 변경된 이벤트를 받으면 처리한다.
         * @param title
         * @private
         */
        _changeTitle(title: string): void {
            this.title = title;
            this.edited();
        }

        /**
         * <v-btn> 으로부터 클릭 이벤트를 받아서
         * @private
         */
        _changeDone(): void {
            this.done = !this.done;
            this.edited();
        }

        beforeDestroy(): void {
            clearTimeout(this.timer);
        }

    }
</script>

<style scoped>
    .handle-item {
        cursor: all-scroll;
    }

    .sortable-chosen {
        border: solid !important;
    }
</style>
