import * as React from 'react';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

/* Calendar */
export default function HomeSchedule(props: { scheduleCard: ScheduleEvent[]; dateCard: Dates }) {
  /* Event Colors */
  const eventColors = {
    All: 'border-gray-500 text-gray-500',
    ChallengeOpensCloses: 'border-[#FC012E] text-[#FC012E]',
    General: 'border-[#56E100] text-[#56E100]',
    Activities: 'border-[#FFB900] text-[#FFB900]',
    Workshops: 'border-[#008CF1] text-[#008CF1]',
    Food: 'border-[#5200FF] text-[#5200FF]',
    'All-Filter': 'border-gray-500 bg-gray-500 text-white',
    'ChallengeOpensCloses-Filter': 'border-[#FC012E] bg-[#FC012E] text-white',
    'General-Filter': 'border-[#56E100] bg-[#56E100] text-white',
    'Activities-Filter': 'border-[#FFB900] bg-[#FFB900] text-white',
    'Workshops-Filter': 'border-[#008CF1] bg-[#008CF1] text-white',
    'Food-Filter': 'border-[#5200FF] bg-[#5200FF] text-white',
  };

  /* Dates Values */
  const dateValues = {
    year: props.dateCard[0]?.year,
    day1: props.dateCard[0]?.day1,
    day1Month: props.dateCard[0]?.day1Month,
    day2: props.dateCard[0]?.day2,
    day2Month: props.dateCard[0]?.day2Month,
    endTime: props.dateCard[0]?.endTime,
    startTime: props.dateCard[0]?.startTime,
  };

  /* Set event dates and times */
  const day1StartDateAndTime = new Date(
    dateValues['2025'],
    dateValues['March'],
    dateValues['Saturday'],
    dateValues['9:00AM'],
    0,
  );
  const day2StartDateAndTime = new Date(
    dateValues['2025'],
    dateValues['March'],
    dateValues['Sunday'],
    dateValues['9:00AM'],
    0,
  );
  const eventEndDateAndTime = new Date(
    dateValues['2025'],
    dateValues['March'],
    dateValues['Sunday'] + 1,
    dateValues['5:00PM'],
    0,
  );

  /* Filter Functionality */
  const [filter, setFilter] = useState('All');

  const changeFilter = (newFilter: string) => {
    if (newFilter === filter) {
      setFilter('All');
    } else {
      setFilter(newFilter);
    }
  };

  /* Event Component */
  const Event = ({ data, index, arrayLength }) => {
    const startDate = new Date(data.startDate);
    const formattedTime = startDate
      .toLocaleString([], { hour: 'numeric', minute: 'numeric' })
      .replace(' ', '')
      .replace('AM', 'am')
      .replace('PM', 'pm');

    const showEvent = filter === 'All' || filter === data.type;
    const showFilteredEvents = filter !== 'All';

    const isLastEvent = index === arrayLength - 1;
    const hasEvenIndex = index % 2 === 0;

    return (
      showEvent && (
        <>
          <div
            className={`${
              !showFilteredEvents
                ? `${!hasEvenIndex && filter === 'All' ? 'bg-[#F2F3FF]' : 'bg-white'} 
                             ${
                               !isLastEvent && filter === 'All'
                                 ? 'p-4 border-b border-[#05149C]'
                                 : 'rounded-b-xl p-4'
                             }`
                : 'p-4 border-b border-[#05149C]'
            }
                          `}
          >
            <div className="flex justify-between pb-1">
              <div className="text-md font-bold font-dmSans">{formattedTime}</div>
              <div className="text-md font-bold font-dmSans">{data.title}</div>
            </div>
            <div className="flex justify-between">
              <div
                className={`bg-white text-xs rounded-xl py-1 px-2 border-2 font-dmSans ${
                  eventColors[data.type]
                }`}
              >
                {data.type}
              </div>
              <div className="text-gray-600 flex items-center font-dmSans">
                <LocationOnIcon style={{ fontSize: 'large', marginRight: '2px' }} />
                {data.location}
              </div>
            </div>
          </div>
        </>
      )
    );
  };

  /* Filter Daily Events */
  const getDailyEvents = (startTime, endTime) => {
    return props.scheduleCard
      .sort((a, b) => {
        return +new Date(a.startDate) - +new Date(b.startDate);
      })
      .filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startTime && eventDate <= endTime;
      })
      .map((event, index, array) => (
        <Event data={event} key={event.title + index} index={index} arrayLength={array.length} />
      ));
  };

  // const day1Events = getDailyEvents(day1StartDateAndTime, day2StartDateAndTime);
  // const day2Events = getDailyEvents(day2StartDateAndTime, eventEndDateAndTime);

  const schedule = {
    day1: [
      { time: '9:00AM', description: 'Breakfast / Check-in / Team Building', category: 'general' },
      { time: '9:30AM', description: 'Opening Ceremony', category: 'general' },
      { time: '10:00AM', description: '**Challenge Opens**', category: 'challenge' },
      {
        time: '11:00AM',
        description: 'College 101 + Why You Should Consider a Career in Tech',
        category: 'workshop',
      },
      { time: '12:00PM', description: 'Lunch', category: 'general' },
      { time: '1:00PM', description: 'ACM Presents: Projects & Research', category: 'workshop' },
      { time: '2:00PM', description: 'Workshop Refresher Roulette', category: 'workshop' },
      { time: '4:00PM', description: 'ACM Presents: Education', category: 'workshop' },
      { time: '5:00PM', description: 'Dinner', category: 'general' },
      { time: '6:00PM', description: 'Just Dance Tournament', category: 'activity' },
      { time: '8:30PM', description: 'Doors Close', category: 'general' },
    ],
    day2: [
      { time: '9:00AM', description: 'Breakfast / Check-in', category: 'general' },
      { time: '9:30AM', description: 'Remarks', category: 'general' },
      { time: '10:00AM', description: 'Tower Building Tournament', category: 'activity' },
      { time: '11:00AM', description: 'Women in STEM Panel', category: 'panel' },
      { time: '12:00PM', description: 'Lunch', category: 'general' },
      { time: '12:00PM', description: 'Pie Game Show', category: 'activity' },
      { time: '2:00PM', description: '**Challenge Closes**', category: 'challenge' },
      { time: '2:30PM', description: 'Presentations', category: 'general' },
      { time: '4:00PM', description: 'Closing Ceremony', category: 'general' },
      { time: '5:00PM', description: 'Doors Close', category: 'general' },
    ],
  };

  const categoryColors = {
    general: 'bg-green-200 text-green-900',
    challenge: 'bg-red-200 text-red-900',
    workshop: 'bg-blue-200 text-blue-900',
    panel: 'bg-blue-200 text-blue-900',
    activity: 'bg-yellow-200 text-yellow-900',
  };

  const renderEvents = (events) =>
    events.map((event, index) => (
      <div key={index} className={`p-2 m-2 rounded-md ${categoryColors[event.category]}`}>
        <div className="font-bold">{event.time}</div>
        <div>{event.description}</div>
      </div>
    ));

  const day1Events = renderEvents(schedule.day1);
  const day2Events = renderEvents(schedule.day2);

  return (
    <div id="schedule-section" className="bg-[#F2F3FF]">
      <div className="text-center text-5xl font-bold text-[#05149C] p-4 font-fredoka">
        What to Expect?
      </div>

      {/* Filter */}
      <div className="md:flex justify-center items-center mx-8">
        <div className="bg-white border-2 border-blue-900 rounded-3xl px-8 my-4 border-opacity-40">
          <div className="text-center py-1 text-xl font-bold text-[#05149C] font-poppins">
            Filters
          </div>
          <div className="flex flex-wrap justify-center mb-2 font-poppins">
            <div
              onClick={() => changeFilter('All')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl border-gray-500 mb-1
              ${filter === 'All' ? eventColors['All-Filter'] : eventColors['All']}`}
            >
              All
            </div>

            <div
              onClick={() => changeFilter('ChallengeOpensCloses')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${
                filter === 'ChallengeOpensCloses'
                  ? eventColors['ChallengeOpensCloses-Filter']
                  : eventColors['ChallengeOpensCloses']
              }`}
            >
              Challenge Opens & Closes
            </div>

            <div
              onClick={() => changeFilter('Workshops')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${
                filter === 'Workshops' ? eventColors['Workshops-Filter'] : eventColors['Workshops']
              }`}
            >
              Workshops/Panels
            </div>

            <div
              onClick={() => changeFilter('General')}
              className={`text-sm cursor-pointer	mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'General' ? eventColors['General-Filter'] : eventColors['General']}`}
            >
              General
            </div>

            {/* <div
              onClick={() => changeFilter('Food')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'Food' ? eventColors['Food-Filter'] : eventColors['Food']}`}
            >
              Food
            </div> */}

            <div
              onClick={() => changeFilter('Activities')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${
                filter === 'Activities'
                  ? eventColors['Activities-Filter']
                  : eventColors['Activities']
              }`}
            >
              Activities
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="md:flex p-1 overflow-y-auto overflow-x-hidden mx-auto lg:w-[80%] w-full h-full">
        <div className="w-full lg:w-1/2 px-4 md:px-0">
          <div className="text-3xl font-black py-6 text-[#05149C] font-fredoka">
            Day 1: Saturday
          </div>
          <div className="bg-white mb-8 mx-2 p-2 border-2 rounded-2xl border-[#05149C] border-opacity-20">
            {day1Events}
          </div>
        </div>

        <div className="w-full lg:w-1/2 md:ml-6 px-4 md:px-0">
          <div className="text-3xl font-black py-6 text-[#05149C] font-fredoka">Day 2: Sunday</div>
          <div className="bg-white mb-8 mx-2 p-2 border-2 rounded-2xl border-[#05149C] border-opacity-20">
            {day2Events}
          </div>
        </div>
      </div>
    </div>
  );
}
