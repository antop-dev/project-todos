import {createLocalVue, shallowMount} from '@vue/test-utils'
import TodoTitle from '@/components/TodoTitle'
import Vuetify from "vuetify";
import VueBus from "vue-bus";

describe('TodoTitle.vue', () => {
    let wrapper;
    let title = 'Hello';

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(VueBus);

        wrapper = shallowMount(TodoTitle, {
            localVue,
            propsData: {
                title: title,
                done: true
            }
        });
    });

    test('할일 타이틀 체크', () => {
        let h3 = wrapper.find('h3');

        expect(h3.text()).toEqual(title);
        expect(h3.classes('done')).toBeTruthy();
    })
});
