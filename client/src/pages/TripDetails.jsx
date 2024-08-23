import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import TopBar from '../components/TopBar';

export const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [newGroupItem, setNewGroupItem] = useState('');
  const [newPersonalItem, setNewPersonalItem] = useState('');
  const [groupChecklistNames, setGroupChecklistNames] = useState({});

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BACKEND_URL}/api/trips/${id}`, {
          headers: { token: `${token}` }
        });
        setTrip(res.data);
        setIsCreator(res.data.creator === localStorage.getItem('userId'));
      } catch (error) {
        console.error('Error fetching trip details:', error);
      }
    };

    fetchTripDetails();
  }, [id]);

  useEffect(() => {
    if (trip && trip.groupChecklist.length > 0) {
      const fetchNames = async () => {
        try {
          const names = {};
          for (let item of trip.groupChecklist) {
            if (item.doneBy) {
              const res = await axios.get(`${BACKEND_URL}/api/users/${item.doneBy}`);
              names[item.doneBy] = res.data.name;
            }
          }
          setGroupChecklistNames(names);
        } catch (error) {
          console.error('Error fetching user names:', error);
        }
      };
      fetchNames();
    }
  }, [trip]);

  const handleSectionToggle = (section) => {
    setActiveSection(activeSection === section ? '' : section); 
  };

  const handleDeleteGroupItem = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const updatedChecklist = trip.groupChecklist.filter((_, i) => i !== index);
      await axios.put(`${BACKEND_URL}/api/trips/${id}/group-checklist`, 
        { groupChecklist: updatedChecklist },
        { headers: { token: `${token}` } }
      );
      setTrip({ ...trip, groupChecklist: updatedChecklist });
    } catch (error) {
      console.error('Error deleting group checklist item:', error);
    }
  };

  const handleAddGroupItem = async () => {
    if (!newGroupItem) return;
    try {
      const token = localStorage.getItem('token');
      const updatedChecklist = [...trip.groupChecklist, { item: newGroupItem, doneBy: null }];
      await axios.put(`${BACKEND_URL}/api/trips/${id}/group-checklist`, 
        { groupChecklist: updatedChecklist },
        { headers: { token: `${token}` } }
      );
      setTrip({ ...trip, groupChecklist: updatedChecklist });
      setNewGroupItem('');
    } catch (error) {
      console.error('Error adding group checklist item:', error);
    }
  };

  const handleDeletePersonalItem = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const updatedChecklist = trip.personalChecklists.find(cl => cl.userId === localStorage.getItem('userId')).checklist.filter((_, i) => i !== index);
      await axios.put(`${BACKEND_URL}/api/trips/${id}/personal-checklist`, 
        { checklist: updatedChecklist },
        { headers: { token: `${token}` } }
      );
      setTrip({
        ...trip, 
        personalChecklists: trip.personalChecklists.map(cl => 
          cl.userId === localStorage.getItem('userId') ? { ...cl, checklist: updatedChecklist } : cl
        )
      });
    } catch (error) {
      console.error('Error deleting personal checklist item:', error);
    }
  };

  const handleAddPersonalItem = async () => {
    if (!newPersonalItem) return;
  
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      const userPersonalChecklist = trip.personalChecklists.find(cl => cl.userId === userId)?.checklist || [];

      const updatedChecklist = [...userPersonalChecklist, { item: newPersonalItem, doneBy: null }];
  

      await axios.put(`${BACKEND_URL}/api/trips/${id}/personal-checklist`, 
        { checklist: updatedChecklist },
        { headers: { token: `${token}` } }
      );
  
      setTrip({
        ...trip, 
        personalChecklists: trip.personalChecklists.map(cl => 
          cl.userId === userId ? { ...cl, checklist: updatedChecklist } : cl
        )
      });
      setNewPersonalItem('');
    } catch (error) {
      console.error('Error adding personal checklist item:', error);
    }
  };

  const handleMarkDoneGroupItem = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); 
      const updatedChecklist = trip.groupChecklist.map((item, i) =>
        i === index ? { ...item, doneBy: userId } : item
      );
      await axios.put(`${BACKEND_URL}/api/trips/${id}/group-checklist`, 
        { groupChecklist: updatedChecklist },
        { headers: { token: `${token}` } }
      );
      setTrip({ ...trip, groupChecklist: updatedChecklist });
      
    } catch (error) {
      console.error('Error marking group checklist item as done:', error);
    }
  };

  const handleMarkDonePersonalItem = async (index) => {
    try {
      const token = localStorage.getItem('token');
  
      const updatedChecklist = trip.personalChecklists.find(cl => cl.userId === localStorage.getItem('userId')).checklist.map((item, i) =>
        i === index ? { ...item, done: true } : item
      );
      
      await axios.put(`${BACKEND_URL}/api/trips/${id}/personal-checklist`, 
        { checklist: updatedChecklist },
        { headers: { token: `${token}` } }
      );
      setTrip({
        ...trip, 
        personalChecklists: trip.personalChecklists.map(cl => 
          cl.userId === localStorage.getItem('userId') ? { ...cl, checklist: updatedChecklist } : cl
        )
      });
    } catch (error) {
      console.error('Error marking personal checklist item as done:', error);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BACKEND_URL}/api/trips/${id}/members/${memberId}`, {
        headers: { token: `${token}` }
      });
      setTrip({ ...trip, members: trip.members.filter(member => member._id !== memberId) });
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  if (!trip) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{trip.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{trip.description}</p>
          {isCreator && (
            <p className="text-sm text-gray-500 bg-gray-100 rounded px-3 py-1 inline-block">
              Trip Code: <span className="font-semibold">{trip.code}</span>
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['groupChecklist', 'personalChecklist', 'members'].map((section) => (
            <button
              key={section}
              onClick={() => handleSectionToggle(section)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                activeSection === section
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {section.replace('Checklist', ' Checklist').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeSection === 'groupChecklist' && (
            <ChecklistSection
              title="Group Checklist"
              items={trip.groupChecklist}
              onMarkDone={handleMarkDoneGroupItem}
              onDelete={handleDeleteGroupItem}
              onAdd={handleAddGroupItem}
              newItem={newGroupItem}
              setNewItem={setNewGroupItem}
              groupChecklistNames={groupChecklistNames}
            />
          )}

          {activeSection === 'personalChecklist' && (
            <ChecklistSection
              title="Personal Checklist"
              items={trip.personalChecklists.find(cl => cl.userId === localStorage.getItem('userId'))?.checklist || []}
              onMarkDone={handleMarkDonePersonalItem}
              onDelete={handleDeletePersonalItem}
              onAdd={handleAddPersonalItem}
              newItem={newPersonalItem}
              setNewItem={setNewPersonalItem}
            />
          )}

          {activeSection === 'members' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Members</h2>
              <ul className="space-y-2">
                {trip.members.map((member, index) => (
                  <li 
                    key={index} 
                    className={`flex justify-between items-center p-3 rounded ${
                      member._id === localStorage.getItem('userId') ? 'bg-blue-50 text-blue-600' : 'bg-gray-50'
                    }`}
                  >
                    <span>{member.name} - {member.phone}</span>
                    {isCreator && member._id !== localStorage.getItem('userId') && (
                      <button 
                        onClick={() => handleRemoveMember(member._id)} 
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChecklistSection = ({ title, items, onMarkDone, onDelete, onAdd, newItem, setNewItem, groupChecklistNames }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <ul className="space-y-2 mb-4">
      {items.map((item, index) => (
        <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span>{item.item}</span>
          <div>
            {item.doneBy || item.done ? (
              <span className="text-sm text-green-500 mr-2">
                {groupChecklistNames ? `Done by: ${groupChecklistNames[item.doneBy] || 'Loading...'}` : 'Done'}
              </span>
            ) : (
              <button 
                onClick={() => onMarkDone(index)} 
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                Mark as Done
              </button>
            )}
            <button 
              onClick={() => onDelete(index)} 
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
    <div className="flex gap-2">
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder={`Add new ${title.toLowerCase()} item`}
        className="flex-grow px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        onClick={onAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
      >
        Add Item
      </button>
    </div>
  </div>
);

export default TripDetails;