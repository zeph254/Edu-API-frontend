import { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample user data
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    role: 'Mathematics Teacher',
    email: 'alex.johnson@school.edu',
    phone: '(555) 123-4567',
    bio: 'Passionate educator with 8 years of experience teaching algebra and geometry. Committed to student success and innovative teaching methods.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverPhoto: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    subjects: ['Algebra', 'Geometry', 'Calculus'],
    joinedDate: 'September 2015',
    lastActive: '2 hours ago'
  });

  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="h-48 bg-blue-600 relative">
        <img 
          src={user.coverPhoto} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end justify-center">
          <div className="max-w-6xl w-full px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative -mt-16">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex-1 text-white">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold bg-white bg-opacity-20 rounded px-3 py-1 mb-1 w-full md:w-auto"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-lg bg-white bg-opacity-20 rounded px-3 py-1 w-full md:w-auto"
                  />
                ) : (
                  <p className="text-lg">{user.role}</p>
                )}
              </div>
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 transition flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="md:w-1/3 space-y-6">
            {/* About Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full h-32 p-3 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-600">{user.bio}</p>
              )}
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    <span>{user.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    <span>{user.phone}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Subjects Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Subjects</h2>
              <div className="flex flex-wrap gap-2">
                {user.subjects.map((subject, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-2/3">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <nav className="flex overflow-x-auto">
                {['overview', 'schedule', 'performance', 'documents'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Joined</h4>
                      <p className="text-lg font-semibold">{user.joinedDate}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Last Active</h4>
                      <p className="text-lg font-semibold">{user.lastActive}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Activity</h4>
                    <div className="space-y-4">
                      {[
                        { id: 1, action: 'Graded Algebra quizzes', time: '2 hours ago' },
                        { id: 2, action: 'Updated lesson plans', time: '5 hours ago' },
                        { id: 3, action: 'Attended staff meeting', time: '1 day ago' },
                      ].map(activity => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-blue-500"></div>
                          <div>
                            <p className="text-sm">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Weekly Schedule</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500">Schedule will appear here</p>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500">Performance charts will appear here</p>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Documents</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500">Uploaded documents will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;