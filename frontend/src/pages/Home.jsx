import { 
    AcademicCapIcon, 
    CalendarIcon, 
    ChartBarIcon, 
    DocumentTextIcon,
    UserGroupIcon, 
    BookOpenIcon, 
    ClockIcon, 
    TrophyIcon,
    ArrowRightIcon,
    CheckCircleIcon
  } from '@heroicons/react/24/outline'
  import { Link } from 'react-router-dom'
  
  export default function HomePage() {
    // Sample data for dashboard cards
    const stats = [
      { name: 'Total Students', value: '1,248', icon: UserGroupIcon, change: '+5%', trend: 'up' },
      { name: 'Active Teachers', value: '42', icon: AcademicCapIcon, change: '+2', trend: 'up' },
      { name: 'Ongoing Classes', value: '16', icon: BookOpenIcon, change: '3 new', trend: 'up' },
      { name: 'School Events', value: '5', icon: CalendarIcon, change: '2 upcoming', trend: 'neutral' },
    ]
  
    const quickActions = [
      { name: 'View Timetable', href: '#', icon: ClockIcon, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
      { name: 'Enter Marks', href: '#', icon: DocumentTextIcon, bgColor: 'bg-green-100', textColor: 'text-green-600' },
      { name: 'Performance Reports', href: '#', icon: ChartBarIcon, bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
      { name: 'School Events', href: '#', icon: TrophyIcon, bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' },
    ]
  
    const announcements = [
      { id: 1, title: 'Term 1 Exams Schedule', date: 'May 15, 2023', read: false },
      { id: 2, title: 'Staff Meeting Agenda', date: 'May 10, 2023', read: true },
      { id: 3, title: 'Sports Day Preparation', date: 'May 5, 2023', read: true },
    ]
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Kambata Primary</span>
                <span className="block text-blue-200">School Management System</span>
              </h1>
              <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Streamlining timetable management and student performance tracking for CBC curriculum.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <Link
                  to="#"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:shadow-lg"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="#"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:shadow-lg"
                >
                  Live Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
  
        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">School Overview</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200 border-l-4 border-blue-500">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                          <stat.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                        </div>
                        <div className="ml-5 flex-1">
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd className="flex items-baseline justify-between">
                            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                            <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-gray-500'}`}>
                              {stat.change}
                            </span>
                          </dd>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Quick Actions + Announcements */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    to={action.href}
                    className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 ${action.bgColor} rounded-md p-3`}>
                          <action.icon className={`h-6 w-6 ${action.textColor}`} aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dt className="text-sm font-medium text-gray-500 truncate">{action.name}</dt>
                        </div>
                        <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
  
            {/* Announcements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Announcements</h2>
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {announcements.map((announcement) => (
                    <li key={announcement.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-center">
                        {!announcement.read && (
                          <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500 mr-3"></span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${announcement.read ? 'text-gray-500' : 'text-gray-900'} truncate`}>
                            {announcement.title}
                          </p>
                          <p className="text-xs text-gray-500">{announcement.date}</p>
                        </div>
                        <CheckCircleIcon className={`h-5 w-5 ${announcement.read ? 'text-green-500' : 'text-gray-300'}`} />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 px-6 py-3 text-right">
                  <Link to="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View all
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Features Section */}
        <div className="py-12 bg-white mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Comprehensive School Management
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Designed specifically for CBC curriculum requirements
              </p>
            </div>
  
            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {/* Timetable Management */}
                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white group-hover:bg-blue-600 transition-colors duration-200">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Timetable Management</h3>
                    <ul className="mt-2 text-base text-gray-500 list-disc pl-5 space-y-1">
                      <li>Admin-controlled timetable creation</li>
                      <li>Teacher-specific schedule views</li>
                      <li>Non-academic activity integration</li>
                      <li>Conflict detection and resolution</li>
                    </ul>
                  </div>
                </div>
  
                {/* Student Performance */}
                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white group-hover:bg-blue-600 transition-colors duration-200">
                    <ChartBarIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Student Performance Tracking</h3>
                    <ul className="mt-2 text-base text-gray-500 list-disc pl-5 space-y-1">
                      <li>CBC competency-based assessment</li>
                      <li>Subject teacher mark entry</li>
                      <li>Automated report generation</li>
                      <li>Role-based access control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 mt-12">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to transform your school management?</span>
                <span className="block text-blue-200">Start your free trial today.</span>
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-blue-100">
                Join hundreds of schools already using our platform to streamline their operations.
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
              <Link
                to="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all duration-200 hover:shadow-lg"
              >
                Get started
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 bg-opacity-60 hover:bg-opacity-70 transition-all duration-200 hover:shadow-lg"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }