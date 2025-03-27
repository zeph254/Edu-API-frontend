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
    MagnifyingGlassIcon,
    FunnelIcon,
    UserCircleIcon
  } from '@heroicons/react/24/outline'
  import { useState } from 'react'
  
  export default function SchoolTimetable() {
    const [currentWeek, setCurrentWeek] = useState(new Date())
    const [viewMode, setViewMode] = useState('weekly') // 'weekly' or 'daily'
    const [selectedTeacher, setSelectedTeacher] = useState('all') // Filter by teacher
    const [searchTerm, setSearchTerm] = useState('')
  
    // Sample data - in a real app this would come from your backend
    const teachers = [
      { id: 't1', name: 'Ms. Wanjiku', subjects: ['Mathematics', 'Physics'] },
      { id: 't2', name: 'Mr. Omondi', subjects: ['English', 'Literature'] },
      { id: 't3', name: 'Mrs. Akinyi', subjects: ['Biology', 'Chemistry'] },
      { id: 't4', name: 'Mr. Kamau', subjects: ['History', 'Geography'] }
    ]
  
    const timetableData = [
      {
        day: 'Monday',
        slots: [
          { time: '8:00 - 9:00', subject: 'Mathematics', class: 'Form 1A', room: 'Room 12', teacher: 'Ms. Wanjiku', type: 'Lecture' },
          { time: '9:00 - 10:00', subject: 'English', class: 'Form 2B', room: 'Room 8', teacher: 'Mr. Omondi', type: 'Lecture' },
          { time: '10:30 - 11:30', subject: 'Biology', class: 'Form 3A', room: 'Lab 1', teacher: 'Mrs. Akinyi', type: 'Practical' }
        ]
      },
      {
        day: 'Tuesday',
        slots: [
          { time: '8:00 - 9:30', subject: 'Physics', class: 'Form 4A', room: 'Lab 2', teacher: 'Ms. Wanjiku', type: 'Practical' },
          { time: '10:00 - 11:00', subject: 'History', class: 'Form 1B', room: 'Room 5', teacher: 'Mr. Kamau', type: 'Lecture' }
        ]
      },
      // ... more days
    ]
  
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
  
    // Filter timetable data based on selections
    const filteredData = timetableData.map(dayData => ({
      ...dayData,
      slots: dayData.slots.filter(slot => {
        const matchesTeacher = selectedTeacher === 'all' || slot.teacher === selectedTeacher
        const matchesSearch = searchTerm === '' || 
          slot.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
          slot.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
          slot.teacher.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesTeacher && matchesSearch
      })
    }))
  
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">School Timetable</h1>
              <p className="text-sm text-gray-500 mt-1">
                Week of {weekRange.start} - {weekRange.end}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Teacher Filter */}
              <div className="relative flex-1 md:w-48">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircleIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">All Teachers</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
                  ))}
                </select>
              </div>
  
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search classes..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
  
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
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
              <span className="text-sm font-medium text-gray-700">
                {currentWeek.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
              </span>
            </div>
  
            <div className="flex items-center space-x-2">
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
              <button className="p-1.5 border border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                <PrinterIcon className="h-5 w-5" />
              </button>
              <button className="p-1.5 border border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50">
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
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                        Time
                      </th>
                      {filteredData.map((day) => (
                        <th key={day.day} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {day.day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Time slots */}
                    {['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map((time) => (
                      <tr key={time}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                          {time}
                        </td>
                        {filteredData.map((day) => {
                          const classSlot = day.slots.find(slot => {
                            const [startTime] = slot.time.split(' - ')
                            return startTime === time
                          })
  
                          return (
                            <td key={`${day.day}-${time}`} className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {classSlot ? (
                                <div className={`p-3 rounded-md ${
                                  classSlot.type === 'Lecture' ? 'bg-blue-50 border-l-4 border-blue-500' :
                                  classSlot.type === 'Practical' ? 'bg-green-50 border-l-4 border-green-500' :
                                  classSlot.type === 'Meeting' ? 'bg-purple-50 border-l-4 border-purple-500' :
                                  'bg-yellow-50 border-l-4 border-yellow-500'
                                }`}>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="flex items-center">
                                        <BookOpenIcon className="flex-shrink-0 h-4 w-4 text-gray-500 mr-2" />
                                        <span className="font-medium text-gray-900">{classSlot.subject}</span>
                                      </div>
                                      <div className="mt-2 flex items-center text-xs">
                                        <UserGroupIcon className="flex-shrink-0 h-3 w-3 text-gray-400 mr-1" />
                                        {classSlot.class}
                                      </div>
                                      <div className="mt-1 flex items-center text-xs">
                                        <MapPinIcon className="flex-shrink-0 h-3 w-3 text-gray-400 mr-1" />
                                        {classSlot.room}
                                      </div>
                                    </div>
                                    <span className="text-xs font-medium bg-white px-2 py-1 rounded-full shadow-sm">
                                      {classSlot.teacher.split(' ')[0]}
                                    </span>
                                  </div>
                                  <div className="mt-2 flex items-center text-xs">
                                    <ClockIcon className="flex-shrink-0 h-3 w-3 text-gray-400 mr-1" />
                                    {classSlot.time}
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full min-h-[100px]"></div>
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
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Daily View</h2>
                <p className="text-sm text-gray-500">Select a day to see detailed schedule.</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                  {filteredData.map(day => (
                    <button
                      key={day.day}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                    >
                      <h3 className="font-medium text-gray-900">{day.day}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {day.slots.length} {day.slots.length === 1 ? 'class' : 'classes'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
  
          {/* Legend */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Legend</h3>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span>Lecture</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span>Practical/Lab</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                <span>Meeting</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                <span>Activity/Event</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }