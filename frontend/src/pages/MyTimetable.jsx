import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CalendarIcon,
    ClockIcon,
    BookOpenIcon,
    UserGroupIcon,
    MapPinIcon,
    PrinterIcon,
    ArrowDownTrayIcon,
    FunnelIcon
  } from '@heroicons/react/24/outline'
  import { useState } from 'react'
  
  export default function MyTimetable() {
    const [currentWeek, setCurrentWeek] = useState(new Date())
    const [viewMode, setViewMode] = useState('weekly') // 'weekly' or 'daily'
  
    // Sample timetable data
    const timetableData = {
      Monday: [
        { time: '8:00 - 9:00', subject: 'Mathematics', class: 'Grade 4A', room: 'Room 12', type: 'Lecture' },
        { time: '9:00 - 10:00', subject: 'Mathematics', class: 'Grade 4B', room: 'Room 12', type: 'Lecture' },
        { time: '10:30 - 11:30', subject: 'Science', class: 'Grade 5A', room: 'Lab 3', type: 'Practical' },
        { time: '11:30 - 12:30', subject: 'Science', class: 'Grade 5B', room: 'Lab 3', type: 'Practical' }
      ],
      Tuesday: [
        { time: '8:00 - 9:30', subject: 'English', class: 'Grade 4A', room: 'Room 8', type: 'Discussion' },
        { time: '10:00 - 11:00', subject: 'Physical Education', class: 'Grade 5A', room: 'Field', type: 'Activity' }
      ],
      Wednesday: [
        { time: '8:00 - 9:00', subject: 'Mathematics', class: 'Grade 4A', room: 'Room 12', type: 'Lecture' },
        { time: '9:00 - 10:00', subject: 'Mathematics', class: 'Grade 4B', room: 'Room 12', type: 'Lecture' },
        { time: '11:00 - 12:00', subject: 'Staff Meeting', class: 'All Teachers', room: 'Conference Room', type: 'Meeting' }
      ],
      Thursday: [
        { time: '8:00 - 9:30', subject: 'English', class: 'Grade 4B', room: 'Room 8', type: 'Discussion' },
        { time: '10:00 - 11:30', subject: 'Art', class: 'Grade 5A', room: 'Art Room', type: 'Activity' }
      ],
      Friday: [
        { time: '8:00 - 9:00', subject: 'Mathematics Test', class: 'Grade 4A', room: 'Room 12', type: 'Assessment' },
        { time: '9:30 - 10:30', subject: 'Science', class: 'Grade 5B', room: 'Lab 3', type: 'Practical' },
        { time: '11:00 - 12:00', subject: 'Class Assembly', class: 'Grade 4B', room: 'Hall', type: 'Event' }
      ]
    }
  
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
  
    // Navigation functions
    const prevWeek = () => {
      const newDate = new Date(currentWeek)
      newDate.setDate(newDate.getDate() - 7)
      setCurrentWeek(newDate)
    }
  
    const nextWeek = () => {
      const newDate = new Date(currentWeek)
      newDate.setDate(newDate.getDate() + 7)
      setCurrentWeek(newDate)
    }
  
    const goToToday = () => {
      setCurrentWeek(new Date())
    }
  
    // Get week range for display
    const getWeekRange = (date) => {
      const start = new Date(date)
      start.setDate(start.getDate() - start.getDay() + 1) // Start on Monday
      const end = new Date(start)
      end.setDate(end.getDate() + 4) // End on Friday
      
      return {
        start: start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        end: end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }
    }
  
    const weekRange = getWeekRange(currentWeek)
  
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Timetable</h1>
              <p className="text-sm text-gray-500 mt-1">
                Week of {weekRange.start} - {weekRange.end}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <button
                onClick={goToToday}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Today
              </button>
              <div className="flex items-center">
                <button
                  onClick={prevWeek}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={nextWeek}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="relative">
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <option value="weekly">Weekly View</option>
                  <option value="daily">Daily View</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <PrinterIcon className="h-5 w-5" />
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
  
          {/* Timetable */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            {/* Weekly View */}
            {viewMode === 'weekly' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      {daysOfWeek.map((day) => (
                        <th key={day} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timeSlots.map((time, timeIndex) => (
                      <tr key={time}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                          {time}
                        </td>
                        {daysOfWeek.map((day) => {
                          const classes = timetableData[day] || []
                          const classAtThisTime = classes.find(cls => {
                            const [startTime] = cls.time.split(' - ')
                            return startTime === time
                          })
  
                          return (
                            <td key={`${day}-${time}`} className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {classAtThisTime ? (
                                <div className={`p-2 rounded-md ${
                                  classAtThisTime.type === 'Lecture' ? 'bg-blue-50 border-l-4 border-blue-500' :
                                  classAtThisTime.type === 'Practical' ? 'bg-green-50 border-l-4 border-green-500' :
                                  classAtThisTime.type === 'Meeting' ? 'bg-purple-50 border-l-4 border-purple-500' :
                                  classAtThisTime.type === 'Assessment' ? 'bg-red-50 border-l-4 border-red-500' :
                                  'bg-yellow-50 border-l-4 border-yellow-500'
                                }`}>
                                  <div className="flex items-center">
                                    <BookOpenIcon className="flex-shrink-0 h-4 w-4 text-gray-500 mr-2" />
                                    <span className="font-medium text-gray-900">{classAtThisTime.subject}</span>
                                  </div>
                                  <div className="mt-1 flex items-center text-xs">
                                    <UserGroupIcon className="flex-shrink-0 h-3 w-3 text-gray-400 mr-1" />
                                    {classAtThisTime.class}
                                  </div>
                                  <div className="mt-1 flex items-center text-xs">
                                    <MapPinIcon className="flex-shrink-0 h-3 w-3 text-gray-400 mr-1" />
                                    {classAtThisTime.room}
                                  </div>
                                  <div className="mt-1 flex items-center text-xs">
                                    <ClockIcon className="flex-shrink-0 h-3 w-3 text-gray-400 mr-1" />
                                    {classAtThisTime.time}
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full min-h-[80px]"></div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
  
            {/* Daily View */}
            {viewMode === 'daily' && (
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Daily View (Not implemented in this example)</h2>
                <p className="text-sm text-gray-500">This would show a detailed view for a single selected day.</p>
              </div>
            )}
          </div>
  
          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center text-xs text-gray-500">
            <span className="mr-4 mb-2 flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
              Lecture
            </span>
            <span className="mr-4 mb-2 flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
              Practical
            </span>
            <span className="mr-4 mb-2 flex items-center">
              <span className="w-3 h-3 rounded-full bg-purple-500 mr-1"></span>
              Meeting
            </span>
            <span className="mr-4 mb-2 flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
              Assessment
            </span>
            <span className="mr-4 mb-2 flex items-center">
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
              Activity/Event
            </span>
          </div>
        </div>
      </div>
    )
  }