import React from 'react';
import { v4 } from 'node-uuid';
import { Field } from 'redux-form';
import eventsSelectConfig from './eventsSelectConfig';
import EventSelect from './EventsSelect';

import * as styles from '../Events.scss';

export const getSelectBlockOptions = () => {
  const titles = [];
  for (const key in eventsSelectConfig) {
    if (key) {
      const letter = key.match(/['A-Z']/g);
      let title = key.replace(letter[0], ` ${letter[0].toLowerCase()}`);
      title = title[0].toUpperCase() + title.slice(1);
      titles.push({ fieldName: key, title });
    }
  }
  return titles;
};

const renderSelectFields = (fieldName) => {
  const eventSelectFieldName = eventsSelectConfig[fieldName] || [];
  return eventSelectFieldName.map(select => (<div key={v4()}>
    {<Field field={select.field} options={select.options} name={select.field} component={EventSelect} />}
  </div>)
  );
};

const renderSelectBlock = (fieldName, title, style) => (<div key={v4()}>
  <div className={styles.eventTitle}>{title}</div>
  <div className={styles[style]}>
    {renderSelectFields(fieldName)}
  </div>
</div>);


export const renderSelectBlocks = options =>
  options.map(item => renderSelectBlock(item.fieldName, item.title, item.fieldName));
