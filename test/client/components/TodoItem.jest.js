import {mount, createLocalVue} from '@vue/test-utils'
import TodoItem from '@/components/TodoItem'
import TodoTitle from '@/components/TodoTitle'
import {RemoveState} from '@/consts/RemoveState'
import uuidv4 from 'uuid/v4';
import Vuetify from "vuetify";
import VueBus from "vue-bus";

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueBus);

describe('TodoItem.vue', () => {
    // base item
    const item = {
        id: uuidv4(),
        title: 'Homework',
        done: false,
        order: 1
    };

    let wrapper;

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(VueBus);

        wrapper = mount(TodoItem, {
            localVue,
            propsData: {
                item: item
            }
        });
    });

    test('랜더링된 타이틀 텍스트 확인', function () {
        expect(wrapper.find('h3.editable').text()).toEqual(item.title);
    });

    // question -> 2sec -> waiting
    test('삭제 버튼 클릭 후 상태와 2초 후 상태 RemoveState 값 확인', async () => {
        // 삭제 버튼 한번 클릭됨
        wrapper.vm._remove();
        expect(wrapper.vm.$data.removeStatus).toEqual(RemoveState.Question);
        // delay 2sec
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });

        expect(wrapper.vm.$data.removeStatus).toEqual(RemoveState.Waiting);
    });

    test('TodoTitle 컴포넌트로부터 edited 이벤트를 받아서 다시 edited 이벤트 발생', function () {
        let title = '변경된 타이틀';
        wrapper.find(TodoTitle).vm.$emit('edited', title);
        expect(wrapper.emitted().edited[0][0]).toMatchObject({
            id: expect.anything(),
            title : title,
            done : false,
            order: expect.anything()
        });
    });

});
