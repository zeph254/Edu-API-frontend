import { 
    AcademicCapIcon,
    BookOpenIcon,
    ChartBarIcon,
    ClockIcon,
    CogIcon,
    DocumentTextIcon,
    ExclamationCircleIcon,
    UserGroupIcon,
    UsersIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    ChatBubbleLeftEllipsisIcon,
    ClipboardDocumentIcon,
    BuildingLibraryIcon,
    BuildingOffice2Icon,
    BellIcon
  } from '@heroicons/react/24/outline'
  import { Link } from 'react-router-dom'
  
  export default function HeadTeacherDashboard() {
    // Sample data
    const stats = [
      { name: 'Total Students', value: '1,248', icon: UserGroupIcon, change: '+5%', trend: 'up', link: '/students' },
      { name: 'Teaching Staff', value: '42', icon: AcademicCapIcon, change: '+2', trend: 'up', link: '/staff' },
      { name: 'Attendance Today', value: '94%', icon: ClipboardDocumentIcon, change: '+2%', trend: 'up', link: '/attendance' },
      { name: 'Pending Tasks', value: '7', icon: ExclamationCircleIcon, change: '-3', trend: 'down', link: '/tasks' },
    ]
  
    const quickActions = [
      { name: 'Timetable Management', icon: ClockIcon, link: '/timetable' },
      { name: 'Performance Reports', icon: ChartBarIcon, link: '/reports' },
      { name: 'Staff Evaluation', icon: ClipboardDocumentIcon, link: '/evaluations' },
      { name: 'School Calendar', icon: CalendarIcon, link: '/calendar' },
    ]
  
    const recentActivities = [
      { id: 1, title: 'Term 1 Exams Scheduled', date: '2 hours ago', read: false },
      { id: 2, title: 'New Teacher Joined', date: '1 day ago', read: true },
      { id: 3, title: 'Parent Meeting Request', date: '2 days ago', read: true },
    ]
  
    const performanceMetrics = [
      { subject: 'Mathematics', average: 78, trend: 'up' },
      { subject: 'English', average: 82, trend: 'up' },
      { subject: 'Science', average: 75, trend: 'down' },
      { subject: 'Kiswahili', average: 85, trend: 'up' },
    ]
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Headteacher Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Headteacher</span>
              </div>
            </div>
          </div>
        </div>
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Link
                key={stat.name}
                to={stat.link}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-all duration-200 border-l-4 border-blue-500"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
  
          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                </div>
                <div className="bg-gray-50 px-6 py-4 grid grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <Link
                      key={action.name}
                      to={action.link}
                      className="bg-white shadow-sm rounded-md p-4 hover:shadow-md transition-all duration-200 flex items-center"
                    >
                      <div className="bg-blue-100 p-3 rounded-md mr-4">
                        <action.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{action.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
  
              {/* Performance Overview */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Subject Performance</h3>
                </div>
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {performanceMetrics.map((metric) => (
                      <div key={metric.subject} className="flex items-center">
                        <div className="w-1/4">
                          <p className="text-sm font-medium text-gray-700">{metric.subject}</p>
                        </div>
                        <div className="w-2/4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${metric.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
                              style={{ width: `${metric.average}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-1/4 text-right">
                          <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.average}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="space-y-8">
              {/* Recent Activities */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
                </div>
                <div className="px-6 py-4 divide-y divide-gray-200">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="py-3">
                      <div className="flex items-center">
                        {!activity.read && (
                          <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500 mr-3"></span>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm ${activity.read ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="py-3 text-center">
                    <Link to="/activities" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      View all activities
                    </Link>
                  </div>
                </div>
              </div>
  
              {/* School Calendar */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
                </div>
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                        <CalendarIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Staff Meeting</p>
                        <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                        <CalendarIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Parent-Teacher Conference</p>
                        <p className="text-sm text-gray-500">May 25, 8:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                        <CalendarIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Sports Day</p>
                        <p className="text-sm text-gray-500">June 5, All Day</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Link to="/calendar" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      View full calendar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }