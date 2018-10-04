import moment from 'moment';
import { createNewEvent } from './../helpers/eventsHelpers';


describe('eventHelpers, function createNewEvent', () => {
  const values = {
    description: 'description',
    endDay: '1',
    endHours: '02',
    endMinutes: '02',
    endMonth: 'February',
    endYear: '2017',
    name: 'Hello',
    startDay: '1',
    startHours: '01',
    startMinutes: '01',
    startMonth: 'February',
    startYear: '2017'
  };

  it('should return new event', () => {
    const newEvent = createNewEvent(values, 0);
    const eventDate = moment([2017, 1, 1, 1, 1]);
    const expected = {
      date: eventDate,
      event: {
        description: 'description',
        endDay: 1,
        endHours: '02',
        endMinutes: '02',
        endMonth: 1,
        endYear: 2017,
        name: 'Hello',
        startDay: 1,
        startHours: '01',
        startMinutes: '01',
        startMonth: 1,
        startYear: 2017
      },
      id: 0
    };
    expect(newEvent).toEqual(expected);
  });
});
