import { useState } from 'react'
import {
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

export default function StudentPerformanceDashboard() {
  // State management
  const [view, setView] = useState('all') // 'all' or 'single'
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('create') // 'create' or 'edit'
  const [currentRecord, setCurrentRecord] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')

  // Sample data - in a real app this would come from your backend
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      grade: 'Grade 4',
      avatar: 'https://randomuser.me/api/portraits/boy/1.jpg',
      performance: [
        { subject: 'Mathematics', score: 85, grade: 'A', term: 'Term 1' },
        { subject: 'English', score: 78, grade: 'B+', term: 'Term 1' },
        { subject: 'Science', score: 92, grade: 'A', term: 'Term 1' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      grade: 'Grade 5',
      avatar: 'https://randomuser.me/api/portraits/girl/1.jpg',
      performance: [
        { subject: 'Mathematics', score: 90, grade: 'A', term: 'Term 1' },
        { subject: 'English', score: 88, grade: 'A-', term: 'Term 1' },
        { subject: 'Science', score: 85, grade: 'A', term: 'Term 1' }
      ]
    }
    // More students...
  ])

  // Available subjects for filtering
  const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography']

  // CRUD Operations
  const handleCreate = (newRecord) => {
    setStudents(prev => prev.map(student => 
      student.id === selectedStudent.id 
        ? { ...student, performance: [...student.performance, newRecord] }
        : student
    ))
  }

  const handleUpdate = (updatedRecord) => {
    setStudents(prev => prev.map(student => 
      student.id === selectedStudent.id
        ? { 
            ...student, 
            performance: student.performance.map(record => 
              record.subject === updatedRecord.subject && record.term === updatedRecord.term 
                ? updatedRecord 
                : record
            )
          }
        : student
    ))
  }

  const handleDelete = (subject, term) => {
    setStudents(prev => prev.map(student => 
      student.id === selectedStudent.id
        ? { 
            ...student, 
            performance: student.performance.filter(
              record => !(record.subject === subject && record.term === term)
            )
          }
        : student
    ))
  }

  // Filter students based on search and subject selection
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.grade.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || 
                          student.performance.some(p => p.subject === selectedSubject)
    return matchesSearch && matchesSubject
  })

  // Calculate average score for a student
  const calculateAverage = (performance) => {
    if (performance.length === 0) return 0
    const sum = performance.reduce((total, record) => total + record.score, 0)
    return Math.round(sum / performance.length)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        {view === 'all' ? (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Performance</h1>
              <p className="text-sm text-gray-500 mt-1">
                View and manage student academic records
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Subject Filter */}
              <div className="relative flex-1 sm:w-48">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setView('all')}
              className="mr-4 p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {selectedStudent.grade} • Performance Overview
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        {view === 'all' ? (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            {/* All Students View */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subjects
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Average
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={student.avatar} alt={student.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {student.performance.map((record, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {record.subject}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${calculateAverage(student.performance)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {calculateAverage(student.performance)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedStudent(student)
                            setView('single')
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Student Summary Card */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center">
                  <img className="h-12 w-12 rounded-full" src={selectedStudent.avatar} alt={selectedStudent.name} />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-sm text-gray-500">{selectedStudent.grade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Overall Average</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {calculateAverage(selectedStudent.performance)}%
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
                {selectedStudent.performance.map((record, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{record.subject}</p>
                    <div className="mt-1 flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{record.score}%</p>
                      <span className="ml-2 text-sm font-medium text-gray-500">({record.grade})</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{record.term}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Records Table */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Performance Records</h3>
                <button
                  onClick={() => {
                    setModalType('create')
                    setCurrentRecord(null)
                    setShowModal(true)
                  }}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Record
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Term
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedStudent.performance.map((record, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {record.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.term}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.score}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.grade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setModalType('edit')
                              setCurrentRecord(record)
                              setShowModal(true)
                            }}
                            className="text-yellow-600 hover:text-yellow-900 mr-3"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(record.subject, record.term)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Trends */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Performance Trends</h3>
              </div>
              <div className="px-6 py-4">
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Performance chart visualization would appear here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Performance Record Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {modalType === 'create' ? 'Add New Performance Record' : 'Edit Performance Record'}
              </h3>
            </div>
            <div className="px-6 py-4">
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const record = {
                  subject: formData.get('subject'),
                  term: formData.get('term'),
                  score: parseInt(formData.get('score')),
                  grade: formData.get('grade')
                }
                modalType === 'create' ? handleCreate(record) : handleUpdate(record)
                setShowModal(false)
              }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      defaultValue={currentRecord?.subject || ''}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">Select a subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                      Term
                    </label>
                    <select
                      id="term"
                      name="term"
                      defaultValue={currentRecord?.term || ''}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">Select a term</option>
                      <option value="Term 1">Term 1</option>
                      <option value="Term 2">Term 2</option>
                      <option value="Term 3">Term 3</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="score" className="block text-sm font-medium text-gray-700">
                      Score (%)
                    </label>
                    <input
                      type="number"
                      id="score"
                      name="score"
                      min="0"
                      max="100"
                      defaultValue={currentRecord?.score || ''}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                      Grade
                    </label>
                    <input
                      type="text"
                      id="grade"
                      name="grade"
                      defaultValue={currentRecord?.grade || ''}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {modalType === 'create' ? 'Add Record' : 'Update Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}