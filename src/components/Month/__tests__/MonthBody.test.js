import React from 'react';
import { shallow } from 'enzyme';
import MonthBody from '../MonthBody';

describe('MonthBody Shallow Render', () => {
  const wrapper = shallow(<MonthBody
    year={2018}
    events={[]}
    month={0}
  />);

  it('render the DUMB component', () => {
    expect(wrapper.length).toEqual(1);
    wrapper.setProps({ month: 11 });
    expect(wrapper.length).toEqual(1);
    wrapper.setProps({ month: 10 });
    expect(wrapper.length).toEqual(1);
  });
});
