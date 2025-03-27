import { useState } from 'react'
import {
  AcademicCapIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  BookOpenIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

export default function SchoolAdminDashboard() {
  // State for active tab and data
  const [activeTab, setActiveTab] = useState('students')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('create')
  const [currentItem, setCurrentItem] = useState(null)
  
  // Sample data - in a real app this would come from an API
  const [data, setData] = useState({
    students: [
      { id: 1, name: 'John Doe', grade: 'Grade 4', parent: 'Mary Doe', contact: '0712345678' },
      { id: 2, name: 'Jane Smith', grade: 'Grade 5', parent: 'James Smith', contact: '0723456789' }
    ],
    teachers: [
      { id: 1, name: 'Ms. Wanjiku', subject: 'Mathematics', contact: '0711223344', email: 'wanjiku@school.edu' },
      { id: 2, name: 'Mr. Omondi', subject: 'English', contact: '0722334455', email: 'omondi@school.edu' }
    ],
    classes: [
      { id: 1, name: 'Grade 4A', teacher: 'Ms. Wanjiku', students: 32, room: 'Room 12' },
      { id: 2, name: 'Grade 5B', teacher: 'Mr. Omondi', students: 28, room: 'Room 8' }
    ],
    subjects: [
      { id: 1, name: 'Mathematics', code: 'MATH', teacher: 'Ms. Wanjiku' },
      { id: 2, name: 'English', code: 'ENG', teacher: 'Mr. Omondi' }
    ]
  })

  // CRUD Operations
  const handleCreate = (newItem) => {
    setData(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], { ...newItem, id: Date.now() }]
    }))
  }

  const handleUpdate = (updatedItem) => {
    setData(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    }))
  }

  const handleDelete = (id) => {
    setData(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(item => item.id !== id)
    }))
  }

  // Modal handlers
  const openCreateModal = () => {
    setModalType('create')
    setCurrentItem(null)
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setModalType('edit')
    setCurrentItem(item)
    setShowModal(true)
  }

  const openViewModal = (item) => {
    setModalType('view')
    setCurrentItem(item)
    setShowModal(true)
  }

  // Tab configuration
  const tabs = [
    { id: 'students', name: 'Students', icon: UserGroupIcon },
    { id: 'teachers', name: 'Teachers', icon: AcademicCapIcon },
    { id: 'classes', name: 'Classes', icon: BuildingOffice2Icon },
    { id: 'subjects', name: 'Subjects', icon: BookOpenIcon },
    { id: 'timetable', name: 'Timetable', icon: CalendarIcon },
    { id: 'reports', name: 'Reports', icon: ChartBarIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">School Administration</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className={`h-5 w-5 mr-2 ${
                  activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'
                }`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Grades</option>
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>Grade 3</option>
              <option>Grade 4</option>
              <option>Grade 5</option>
            </select>
          </div>
          
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={openCreateModal}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {activeTab === 'students' && (
                    <>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </>
                  )}
                  {activeTab === 'teachers' && (
                    <>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </>
                  )}
                  {activeTab === 'classes' && (
                    <>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </>
                  )}
                  {activeTab === 'subjects' && (
                    <>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data[activeTab]?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {activeTab === 'students' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.grade}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parent}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.contact}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => openViewModal(item)} className="text-blue-600 hover:text-blue-900 mr-3">
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => openEditModal(item)} className="text-yellow-600 hover:text-yellow-900 mr-3">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </>
                    )}
                    {activeTab === 'teachers' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.contact}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => openViewModal(item)} className="text-blue-600 hover:text-blue-900 mr-3">
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => openEditModal(item)} className="text-yellow-600 hover:text-yellow-900 mr-3">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </>
                    )}
                    {activeTab === 'classes' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.teacher}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.room}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => openViewModal(item)} className="text-blue-600 hover:text-blue-900 mr-3">
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => openEditModal(item)} className="text-yellow-600 hover:text-yellow-900 mr-3">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </>
                    )}
                    {activeTab === 'subjects' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.teacher}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => openViewModal(item)} className="text-blue-600 hover:text-blue-900 mr-3">
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => openEditModal(item)} className="text-yellow-600 hover:text-yellow-900 mr-3">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* CRUD Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {modalType === 'create' && `Add New ${activeTab.slice(0, -1)}`}
                {modalType === 'edit' && `Edit ${activeTab.slice(0, -1)}`}
                {modalType === 'view' && `${activeTab.slice(0, -1)} Details`}
              </h3>
            </div>
            <div className="px-6 py-4">
              {activeTab === 'students' && (
                <StudentForm 
                  item={currentItem} 
                  mode={modalType} 
                  onSave={modalType === 'create' ? handleCreate : handleUpdate}
                  onCancel={() => setShowModal(false)}
                />
              )}
              {activeTab === 'teachers' && (
                <TeacherForm 
                  item={currentItem} 
                  mode={modalType} 
                  onSave={modalType === 'create' ? handleCreate : handleUpdate}
                  onCancel={() => setShowModal(false)}
                />
              )}
              {activeTab === 'classes' && (
                <ClassForm 
                  item={currentItem} 
                  mode={modalType} 
                  onSave={modalType === 'create' ? handleCreate : handleUpdate}
                  onCancel={() => setShowModal(false)}
                />
              )}
              {activeTab === 'subjects' && (
                <SubjectForm 
                  item={currentItem} 
                  mode={modalType} 
                  onSave={modalType === 'create' ? handleCreate : handleUpdate}
                  onCancel={() => setShowModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Form components would be defined here or in separate files
function StudentForm({ item, mode, onSave, onCancel }) {
  const [formData, setFormData] = useState(item || {
    name: '',
    grade: '',
    parent: '',
    contact: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            readOnly={mode === 'view'}
          />
        </div>
        {/* Other fields... */}
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        {mode !== 'view' && (
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {mode === 'create' ? 'Create' : 'Update'}
          </button>
        )}
      </div>
    </form>
  )
}

// Similar form components would be created for Teacher, Class, Subject
function TeacherForm({ item, mode, onSave, onCancel }) {
  // Implementation similar to StudentForm
}

function ClassForm({ item, mode, onSave, onCancel }) {
  // Implementation similar to StudentForm
}

function SubjectForm({ item, mode, onSave, onCancel }) {
  // Implementation similar to StudentForm
}