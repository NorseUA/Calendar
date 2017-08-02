import React from 'react';
import { FormInput } from 'react-form';
import Select from 'react-select';

export default (field, ...rest) =>
  (
    <FormInput field={field}>
      {({ setValue, getValue, setTouched }) =>
        <Select
          {...rest}
          value={getValue()}
          onChange={val => setValue(val)}
          onBlur={() => setTouched()}
        />
      }
    </FormInput>
  );
