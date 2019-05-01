import {mount, shallowMount, createLocalVue} from '@vue/test-utils'
import TodoList from '@/components/TodoList'
import TodoItem from '@/components/TodoItem'
import Vuetify from 'vuetify';
import VueBus from 'vue-bus';
import uuidv4 from 'uuid/v4';
import moxios from 'moxios';



describe('TodoList', () => {
    let wrapper;

    beforeEach(() => {
        moxios.install();

        const localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(VueBus);

        wrapper = shallowMount(TodoList, {localVue});
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('items 수 만큼 TodoItem이 생성 된다', function () {
        const items = [{
            id: uuidv4(),
            title: '할일2',
            done: false,
            order: 2
        }, {
            id: uuidv4(),
            title: '할일1',
            done: true,
            order: 1
        }];

        wrapper.setData({
            items: items
        });

        expect(wrapper.findAll(TodoItem)).toHaveLength(items.length);
    });

    test('added 이벤트 발생 시 처리한다', (done) => {
        // Mock axios requests for testing
        moxios.stubRequest('/todo', {
            status: 200,
            response: {
                id: uuidv4(),
                title: 'Added Title!',
                done: false,
                order: 100
            }
        });

        wrapper.vm.$bus.$emit('added', 'Added Title');

        moxios.wait(() => {
            expect(wrapper.findAll(TodoItem)).toHaveLength(1);
            done();
        });

    });

});
