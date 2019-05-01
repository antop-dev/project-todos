<template>
    <v-content>
        <!-- https://vuejs.org/v2/guide/list.html#key -->
        <draggable v-model="items" :options="sortable" @end="_dragEnd">
            <transition-group>
                <todo-item v-if="items.length" v-for="item in items" :key="item.id" :item="item"
                           @edited="_edited" @removed="_removed"/>
            </transition-group>
        </draggable>
        <v-layout v-if="!items.length" align-center justify-center mt-4 class="text-xs-center">
            <v-flex xs12 sm8 md4>
                <v-icon class="big">error_outline</v-icon>
                <h2>할일 없냐?</h2>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script lang="ts">
    import axios from 'axios';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import TodoItem from '@/components/TodoItem';
    import {Todo} from '@/model/Todo';
    import api from '@/config/api';
    import draggable from 'vuedraggable';

    @Component({
        components: {
            TodoItem,
            draggable
        }
    })
    export default class TodoList extends Vue {

        items: Array<Todo> = [];

        sortable: object = {
            name: 'todo',
            handle: '.handle-item'
        };

        /**
         * 할 일을 하나 추가한다.
         * @param title 할 일 제목
         * @public
         * */
        addTodo(title: string): void {
            axios({
                url: api('/todo'),
                method: 'post',
                data: {
                    title: title
                }
            }).then(({data}) => {
                // 배열 맨 앞에 추가
                this.items.unshift(data);
            }).catch(e => {
                this.$bus.$emit('error', e);
            });
        }

        /**
         * TodoItem 으로부터 수정되었다는 이벤트(edited)가 발생하면 처리한다.
         * @param item Todo
         * @private
         */
        _edited(item: Todo): void {
            axios.put(api('/todo/' + item.id), {
                title: item.title,
                done: item.done,
                order: item.order
            }).then(() => {
                this.items
                    .filter((v: Todo) => v.id === item.id)
                    .forEach((v: Todo) => {
                        v.title = item.title;
                        v.done = item.done;
                    });
            }).catch(e => {
                this.$bus.$emit('error', e);
            });
        }

        /**
         * TodoItem 컴포넌트에서 삭제되었다는 이벤트(removed)가 발생하면 처리한다.
         * @param id 할 일 고유 아이디
         * @private
         */
        _removed(id: string): void {
            axios.delete(api('/todo/' + id))
                .then(() => {
                    // TODO 받은 id 로 배열에서 찾아서 지우는 로직 개선하면 좋을듯
                    this.items = this.items.filter(v => v.id != id);
                })
                .catch(e => {
                    this.$bus.$emit('error', e);
                });
        }

        _dragEnd(e: any): void {
            if (e.oldIndex === e.newIndex) {
                // 이동이 없었을 경우 아무것도 하지 않음
                return;
            }

            // oldIndex -> newIndex
            let begin: number = e.newIndex < e.oldIndex ? e.newIndex : e.oldIndex;
            let end: number = e.newIndex > e.oldIndex ? e.newIndex : e.oldIndex;
            // order 값만 추출하여 내림차순 정렬
            const orders: number[] = this.items.slice(begin, end + 1).map(v => v.order);
            orders.sort((x: number, y: number) => y - x);
            // 정렬된 order 값으로 대체
            let j: number = 0;
            for (let i: number = begin; i <= end; i++) {
                const todo: Todo = this.items[i];
                todo.order = orders[j++];
                // to server api
                this._edited(todo);
            }
        }

        /**
         * 인스턴스가 작덩된 후. $el 사용 불가
         */
        created(): void {
            // TodoInput 컴포넌트 -> EventBus 로부터 할일 추가 이벤트(added)가 발생하면 처리한다.
            this.$bus.$on('added', (title: string) => {
                this.addTodo(title);
            });
        }

        /**
         * Vue 인스턴스가 마운트 되었을 때
         */
        mounted(): void {
            this.$nextTick(() => {
                axios.get(api('/todo'))
                    .then(res => {
                        this.items = res.data;
                    })
                    .catch(e => {
                        this.$bus.$emit('error', e);
                    });
            });

        }
    };
</script>

<style scoped>
    .big {
        font-size: 120px;
    }
</style>
