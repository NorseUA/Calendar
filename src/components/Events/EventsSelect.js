import React from 'react';
import { Select } from 'react-form';


const EventsSelect = (field, placeholder, options, value) =>
  (<Select
    field={field}
    options={options}
    placeholder={placeholder}
    value={value}
  />);


export default EventsSelect;
