import {mount, createLocalVue, shallowMount} from '@vue/test-utils'
import sinon from 'sinon';
import TodoInput from '@/components/TodoInput'
import Vuetify from 'vuetify';
import VueBus from 'vue-bus';
import moxios from "moxios";

describe('TodoInput Component', () => {
    let wrapper;

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(VueBus);

        moxios.install();
        wrapper = mount(TodoInput, {localVue});
    });

    test('값 입력 후 EventBus(vm.$bus)에 이벤트를 발생시킨다', function () {
        let inputValue = 'Todo Input!';

        let sandbox = sinon.createSandbox();
        let $on = sandbox.spy(wrapper.vm.$bus, '$emit');
        let _submit = sandbox.spy(wrapper.vm, '_submit');

        wrapper.find('input[type=text]').setValue(inputValue);
        wrapper.find('form').trigger('submit');

        expect(_submit.calledOnce).toBeTruthy();

        expect($on.calledOnce).toBeTruthy();
        expect($on.getCall(0).args[0]).toEqual('added');
        expect($on.getCall(0).args[1]).toEqual(inputValue);
    });

});
