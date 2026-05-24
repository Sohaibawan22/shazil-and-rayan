import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Plus, Trash2, LayoutDashboard, Settings, MessageSquare, Truck } from 'lucide-react';

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('services');
  const [newService, setNewService] = useState({ title: '', description: '' });
  const [newVehicle, setNewVehicle] = useState({ name: '', capacity: '', description: '', image: null });

  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) { navigate('/admin/login'); return; }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [servicesRes, vehiclesRes, contactsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/services`),
        axios.get(`${import.meta.env.VITE_API_URL}/vehicles`),
        axios.get(`${import.meta.env.VITE_API_URL}/contact`, config),
      ]);
      setServices(servicesRes.data);
      setVehicles(vehiclesRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      if (error.response?.status === 401) { localStorage.removeItem('adminToken'); navigate('/admin/login'); }
    }
  };

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const handleLogout = () => { localStorage.removeItem('adminToken'); navigate('/admin/login'); };

  const handleAddService = async (e) => {
    e.preventDefault();
    try { await axios.post(`${import.meta.env.VITE_API_URL}/services`, newService, config); setNewService({ title: '', description: '' }); fetchData(); }
    catch (error) { console.error(error); }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try { await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`, config); fetchData(); }
    catch (error) { console.error(error); }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newVehicle.name);
    formData.append('capacity', newVehicle.capacity);
    formData.append('description', newVehicle.description);
    if (newVehicle.image) formData.append('image', newVehicle.image);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/vehicles`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      setNewVehicle({ name: '', capacity: '', description: '', image: null });
      fetchData();
    } catch (error) { console.error(error); }
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm('Delete this vehicle?')) return;
    try { await axios.delete(`${import.meta.env.VITE_API_URL}/vehicles/${id}`, config); fetchData(); }
    catch (error) { console.error(error); }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try { await axios.delete(`${import.meta.env.VITE_API_URL}/contact/${id}`, config); fetchData(); }
    catch (error) { console.error(error); }
  };

  const tabs = [
    { id: 'services', label: 'Services', icon: <Settings size={18} /> },
    { id: 'vehicles', label: 'Vehicles', icon: <Truck size={18} /> },
    { id: 'contacts', label: 'Messages', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-gray-800 border-r border-gray-700 flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-8">
          <LayoutDashboard size={22} className="text-blue-400" />
          <h2 className="text-lg font-bold text-white">Admin Panel</h2>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout} 
          className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="animate-fadeIn">
            <h3 className="text-2xl font-bold text-white mb-6">Manage Services</h3>

            <form onSubmit={handleAddService} className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700 space-y-4">
              <h4 className="font-semibold text-gray-300">Add New Service</h4>
              <input 
                type="text" 
                placeholder="Service Title" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                value={newService.title} 
                onChange={(e) => setNewService({ ...newService, title: e.target.value })} 
                required 
              />
              <textarea 
                placeholder="Service Description" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                rows="3" 
                value={newService.description} 
                onChange={(e) => setNewService({ ...newService, description: e.target.value })} 
                required 
              />
              <button 
                type="submit" 
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Plus size={16} /> Add Service
              </button>
            </form>

            <div className="space-y-4">
              {services.map((service) => (
                <div key={service._id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 flex items-start justify-between gap-4 hover:border-gray-600 transition-colors">
                  <div>
                    <h4 className="font-semibold text-white">{service.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteService(service._id)} 
                    className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {services.length === 0 && (
                <p className="text-gray-400 text-center py-8 bg-gray-800 rounded-xl border border-gray-700">No services added yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div className="animate-fadeIn">
            <h3 className="text-2xl font-bold text-white mb-6">Manage Vehicles</h3>

            <form onSubmit={handleAddVehicle} className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700 space-y-4">
              <h4 className="font-semibold text-gray-300">Add New Vehicle</h4>
              <input 
                type="text" 
                placeholder="Vehicle Name" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                value={newVehicle.name} 
                onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Capacity (e.g., 2 Tons)" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                value={newVehicle.capacity} 
                onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })} 
                required 
              />
              <textarea 
                placeholder="Description" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                rows="3" 
                value={newVehicle.description} 
                onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })} 
                required 
              />
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Vehicle Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  onChange={(e) => setNewVehicle({ ...newVehicle, image: e.target.files[0] })} 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Plus size={16} /> Add Vehicle
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle._id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all hover:shadow-xl group">
                  <img
                    src={`http://localhost:5000${vehicle.imageUrl}`}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800'; }}
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-white text-lg">{vehicle.name}</h4>
                        <p className="text-gray-400 text-sm mt-1">{vehicle.capacity}</p>
                        {vehicle.description && (
                          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{vehicle.description}</p>
                        )}
                      </div>
                      <button 
                        onClick={() => handleDeleteVehicle(vehicle._id)} 
                        className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {vehicles.length === 0 && (
                <p className="text-gray-400 text-center py-8 bg-gray-800 rounded-xl border border-gray-700 col-span-full">No vehicles added yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold text-white">Customer Messages</h3>
              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">{contacts.length}</span>
            </div>

            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact._id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-white text-lg">{contact.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-gray-400 text-sm">{contact.email}</p>
                        {contact.phone && (
                          <>
                            <span className="text-gray-600">·</span>
                            <p className="text-gray-400 text-sm">{contact.phone}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-xs">
                        {new Date(contact.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <button 
                        onClick={() => handleDeleteContact(contact._id)} 
                        className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <p className="text-gray-300 text-sm leading-relaxed">{contact.message}</p>
                  </div>
                </div>
              ))}
              {contacts.length === 0 && (
                <p className="text-gray-400 text-center py-8 bg-gray-800 rounded-xl border border-gray-700">No messages received yet.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;