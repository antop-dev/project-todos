<template>
    <v-app>
        <v-toolbar app>
            <v-flex xs12 md12>
                <todo-input/>
            </v-flex>
        </v-toolbar>

        <v-container>
            <todo-list/>
        </v-container>

        <!-- error dialog -->
        <v-dialog v-model="dialog" persistent width="400">
            <v-card>
                <v-card-title class="headline error" primary-title>{{ error.name }}</v-card-title>
                <v-card-text>{{ error.message }}</v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="dialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch} from 'vue-property-decorator';
    import TodoInput from '@/components/TodoInput';
    import TodoList from '@/components/TodoList';
    import {Error} from '@/model/Error';

    @Component({
        components: {
            TodoInput,
            TodoList
        }
    })
    export default class App extends Vue {
        /**
         * dialog 를 보여줄 지 여부
         */
        dialog: boolean = false;
        /**
         * 에러 메세지. 다이얼로그에 바인딩 되어 있다.
         */
        error: Error = {
            name: '',
            message: ''
        };

        @Watch('dialog')
        onDialogWatch(v: boolean) {
            // 다이얼로그가 숨겨지면 에러 메세지를 비운다.
            if (v === false) {
                this.error.name = '';
                this.error.message = '';
            }
        }

        created(): void {
            this.$bus.$on('error', (e: Error) => {
                this.error = e;
                this.dialog = true;
            });
        }

    };
</script>
