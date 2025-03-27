import {
    AcademicCapIcon,
    BookOpenIcon,
    ChartBarIcon,
    ClockIcon,
    ClipboardDocumentIcon,
    UserGroupIcon,
    CalendarIcon,
    BellIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ChatBubbleLeftRightIcon,
    ArrowRightIcon,
    CogIcon,
    LightBulbIcon
  } from '@heroicons/react/24/outline'
  import { Link } from 'react-router-dom'
  
  export default function TeacherDashboard() {
    // Sample data
    const classes = [
      { name: 'Mathematics', grade: 'Grade 4', time: '8:00 AM', students: 32 },
      { name: 'English', grade: 'Grade 4', time: '10:00 AM', students: 32 },
      { name: 'Science', grade: 'Grade 5', time: '1:00 PM', students: 28 }
    ]
  
    const upcomingTasks = [
      { id: 1, title: 'Grade Term Papers', due: 'Tomorrow', priority: 'high' },
      { id: 2, title: 'Prepare Lesson Plan', due: 'Friday', priority: 'medium' },
      { id: 3, title: 'Parent Meetings', due: 'Next Week', priority: 'low' }
    ]
  
    const studentPerformance = [
      { name: 'Mathematics', average: 78, improvement: '+5%' },
      { name: 'English', average: 82, improvement: '+3%' },
      { name: 'Science', average: 75, improvement: '-2%' }
    ]
  
    const announcements = [
      { id: 1, title: 'Staff Meeting Tomorrow', date: '2 hours ago', read: false },
      { id: 2, title: 'New Curriculum Materials', date: '1 day ago', read: true },
      { id: 3, title: 'School Sports Day', date: '3 days ago', read: true }
    ]
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Teacher profile"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Ms. Wanjiku</span>
              </div>
            </div>
          </div>
        </div>
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Good Morning, Ms. Wanjiku</h2>
                <p className="mt-1 text-blue-100">You have 3 classes scheduled today</p>
              </div>
              <Link 
                to="/lessons" 
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50"
              >
                View Weekly Schedule
                <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
              </Link>
            </div>
          </div>
  
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Classes */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Today's Classes</h3>
                  <span className="text-sm text-blue-600 font-medium">Wednesday, May 24</span>
                </div>
                <div className="divide-y divide-gray-200">
                  {classes.map((classItem, index) => (
                    <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                          <BookOpenIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-medium text-gray-900">{classItem.name}</h4>
                            <span className="text-sm text-gray-500">{classItem.time}</span>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <p className="text-sm text-gray-500">{classItem.grade}</p>
                            <p className="text-sm font-medium text-gray-700">{classItem.students} students</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 px-6 py-3 text-right">
                  <Link to="/classes" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View all classes
                  </Link>
                </div>
              </div>
  
              {/* Student Performance */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Class Performance</h3>
                </div>
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {studentPerformance.map((subject, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-700">{subject.name}</h4>
                          <span className={`text-xs font-medium ${subject.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {subject.improvement} from last term
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full bg-blue-600" 
                            style={{ width: `${subject.average}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Class average</span>
                          <span className="text-xs font-medium text-gray-700">{subject.average}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Tasks */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Tasks</h3>
                </div>
                <div className="px-6 py-4 divide-y divide-gray-200">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="py-3">
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 mt-1 ${
                          task.priority === 'high' ? 'text-red-500' : 
                          task.priority === 'medium' ? 'text-yellow-500' : 'text-gray-400'
                        }`}>
                          <ExclamationCircleIcon className="h-5 w-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <p className="text-xs text-gray-500">Due {task.due}</p>
                        </div>
                        <button className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                          <CheckCircleIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 px-6 py-3 text-right">
                  <Link to="/tasks" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View all tasks
                  </Link>
                </div>
              </div>
  
              {/* School Announcements */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Announcements</h3>
                </div>
                <div className="px-6 py-4 divide-y divide-gray-200">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="py-3">
                      <div className="flex items-start">
                        {!announcement.read && (
                          <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3"></span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${announcement.read ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                            {announcement.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 px-6 py-3 text-right">
                  <Link to="/announcements" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View all announcements
                  </Link>
                </div>
              </div>
  
              {/* Quick Links */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Quick Links</h3>
                </div>
                <div className="px-6 py-4 grid grid-cols-2 gap-4">
                  <Link
                    to="/lesson-plans"
                    className="bg-blue-50 p-3 rounded-lg text-center hover:bg-blue-100 transition-colors"
                  >
                    <BookOpenIcon className="mx-auto h-6 w-6 text-blue-600" />
                    <span className="mt-2 block text-sm font-medium text-gray-700">Lesson Plans</span>
                  </Link>
                  <Link
                    to="/gradebook"
                    className="bg-green-50 p-3 rounded-lg text-center hover:bg-green-100 transition-colors"
                  >
                    <ClipboardDocumentIcon className="mx-auto h-6 w-6 text-green-600" />
                    <span className="mt-2 block text-sm font-medium text-gray-700">Gradebook</span>
                  </Link>
                  <Link
                    to="/resources"
                    className="bg-purple-50 p-3 rounded-lg text-center hover:bg-purple-100 transition-colors"
                  >
                    <LightBulbIcon className="mx-auto h-6 w-6 text-purple-600" />
                    <span className="mt-2 block text-sm font-medium text-gray-700">Resources</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="bg-yellow-50 p-3 rounded-lg text-center hover:bg-yellow-100 transition-colors"
                  >
                    <CogIcon className="mx-auto h-6 w-6 text-yellow-600" />
                    <span className="mt-2 block text-sm font-medium text-gray-700">Settings</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }