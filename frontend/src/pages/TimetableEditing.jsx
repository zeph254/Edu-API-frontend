import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const TimetableEditing = ({ userRole }) => {
  // State for timetable data
  const [timetable, setTimetable] = useState({
    week: 15,
    semester: 'Spring',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: Array(8).fill().map((_, i) => ({
      id: i,
      start: `${8 + i}:00`,
      end: `${9 + i}:00`
    })),
    events: []
  });

  // State for modal
  const [modal, setModal] = useState({
    isOpen: false,
    mode: 'add', // 'add' or 'edit'
    currentEvent: null,
    dayIndex: null,
    timeSlotId: null
  });

  // Sample subjects data (would come from API in real app)
  const subjects = [
    { id: 1, name: 'Mathematics', color: 'bg-blue-500' },
    { id: 2, name: 'English', color: 'bg-green-500' },
    { id: 3, name: 'Science', color: 'bg-yellow-500' },
    { id: 4, name: 'History', color: 'bg-purple-500' },
    { id: 5, name: 'PE', color: 'bg-red-500' },
  ];

  // Add new event
  const handleAddEvent = (dayIndex, timeSlotId) => {
    if (userRole !== 'admin' && userRole !== 'headteacher') return;
    
    setModal({
      isOpen: true,
      mode: 'add',
      currentEvent: null,
      dayIndex,
      timeSlotId
    });
  };

  // Edit existing event
  const handleEditEvent = (event) => {
    if (userRole !== 'admin' && userRole !== 'headteacher') return;
    
    setModal({
      isOpen: true,
      mode: 'edit',
      currentEvent: event,
      dayIndex: null,
      timeSlotId: null
    });
  };

  // Save event (add or edit)
  const handleSaveEvent = (eventData) => {
    if (modal.mode === 'add') {
      // Add new event
      setTimetable(prev => ({
        ...prev,
        events: [
          ...prev.events,
          {
            ...eventData,
            id: Date.now(),
            day: timetable.days[modal.dayIndex],
            timeSlotId: modal.timeSlotId
          }
        ]
      }));
    } else {
      // Update existing event
      setTimetable(prev => ({
        ...prev,
        events: prev.events.map(e => 
          e.id === modal.currentEvent.id ? { ...e, ...eventData } : e
        )
      }));
    }
    setModal({ ...modal, isOpen: false });
  };

  // Delete event
  const handleDeleteEvent = (eventId) => {
    if (userRole !== 'admin' && userRole !== 'headteacher') return;
    
    setTimetable(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== eventId)
    }));
  };

  // Move event via drag and drop
  const moveEvent = (id, dayIndex, timeSlotId) => {
    setTimetable(prev => ({
      ...prev,
      events: prev.events.map(e => 
        e.id === id ? { ...e, day: timetable.days[dayIndex], timeSlotId } : e
      )
    }));
  };

  // Filter events based on user role
  const getFilteredEvents = () => {
    if (userRole === 'admin' || userRole === 'headteacher') {
      return timetable.events;
    } else if (userRole === 'teacher') {
      // In real app, filter by teacher's subjects
      return timetable.events.filter(e => e.subjectId === 1); // Example filter
    }
    return [];
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Timetable Editor - Week {timetable.week} ({timetable.semester} Semester)
          </h1>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l-4-4m0 0l-4 4m4-4V3" />
              </svg>
              Print
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
          </div>
        </div>

        {/* Timetable Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Week {timetable.week} Schedule</h3>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-6 border-b border-gray-200">
            <div className="p-3 bg-blue-700 text-white font-medium text-center"></div>
            {timetable.days.map((day, dayIndex) => (
              <div key={dayIndex} className="p-3 bg-blue-700 text-white font-medium text-center">
                {day}
              </div>
            ))}
          </div>

          {timetable.timeSlots.map((timeSlot, timeIndex) => (
            <div key={timeSlot.id} className="grid grid-cols-6 border-b border-gray-200 last:border-b-0">
              <div className="p-3 bg-gray-50 text-gray-700 font-medium flex items-center justify-center border-r border-gray-200">
                {timeSlot.start} - {timeSlot.end}
              </div>

              {timetable.days.map((day, dayIndex) => {
                const cellEvents = getFilteredEvents().filter(
                  e => e.day === day && e.timeSlotId === timeSlot.id
                );

                return (
                  <TimetableCell
                    key={`${dayIndex}-${timeSlot.id}`}
                    dayIndex={dayIndex}
                    timeSlotId={timeSlot.id}
                    events={cellEvents}
                    onAddEvent={handleAddEvent}
                    onEditEvent={handleEditEvent}
                    onDeleteEvent={handleDeleteEvent}
                    moveEvent={moveEvent}
                    userRole={userRole}
                    subjects={subjects}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Event Modal */}
        {modal.isOpen && (
          <EventModal
            mode={modal.mode}
            event={modal.currentEvent}
            subjects={subjects}
            onSave={handleSaveEvent}
            onClose={() => setModal({ ...modal, isOpen: false })}
          />
        )}
      </div>
    </DndProvider>
  );
};

// Timetable Cell Component
const TimetableCell = ({ dayIndex, timeSlotId, events, onAddEvent, onEditEvent, onDeleteEvent, moveEvent, userRole, subjects }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'event',
    drop: (item) => moveEvent(item.id, dayIndex, timeSlotId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div
      ref={drop}
      className={`p-2 min-h-[100px] relative ${isOver ? 'bg-blue-50' : 'bg-white'}`}
      onClick={() => onAddEvent(dayIndex, timeSlotId)}
    >
      {events.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-400 hover:text-blue-500 cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      )}

      {events.map((event) => (
        <EventItem
          key={event.id}
          event={event}
          subject={subjects.find(s => s.id === event.subjectId)}
          onEdit={onEditEvent}
          onDelete={onDeleteEvent}
        />
      ))}
    </div>
  );
};

// Event Item Component
const EventItem = ({ event, subject, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'event',
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 rounded-lg text-white cursor-move ${subject?.color || 'bg-gray-500'} shadow-sm ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onEdit(event);
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{subject?.name || 'Activity'}</h4>
          <p className="text-xs opacity-90">{event.teacher || 'Teacher'}</p>
          <p className="text-xs opacity-90">{event.room || 'Room'}</p>
        </div>
        <button
          className="text-white hover:text-red-200 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(event.id);
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Event Modal Component
const EventModal = ({ mode, event, subjects, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    subjectId: '',
    teacher: '',
    room: '',
    notes: ''
  });

  useEffect(() => {
    if (mode === 'edit' && event) {
      setFormData({
        subjectId: event.subjectId || '',
        teacher: event.teacher || '',
        room: event.room || '',
        notes: event.notes || ''
      });
    }
  }, [mode, event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {mode === 'add' ? 'Add New Event' : 'Edit Event'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="subjectId">
              Subject
            </label>
            <select
              id="subjectId"
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="teacher">
              Teacher
            </label>
            <input
              type="text"
              id="teacher"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="room">
              Room
            </label>
            <input
              type="text"
              id="room"
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="notes">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {mode === 'add' ? 'Add Event' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimetableEditing;