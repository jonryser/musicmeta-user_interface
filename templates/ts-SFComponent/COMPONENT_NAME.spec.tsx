import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
// Components.
import COMPONENT_NAME from './COMPONENT_NAME';

describe(`COMPONENT_NAME `, () => {
    it(`should render correctly.`, () => {
        const wrapper = shallow((
            <COMPONENT_NAME
                data={``}
                options={``}
            />
        ));
        expect(wrapper).toBeDefined();
        wrapper.setProps({
            data: undefined,
            options: undefined,
        });
        expect(wrapper).toBeDefined();
    });
});
