import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  LogOut, Plus, Trash2, LayoutDashboard, Settings,
  MessageSquare, Truck, Menu, X, CheckCircle, AlertCircle,
  Mail, ChevronRight, Image, Loader2, UploadCloud, Link2
} from 'lucide-react';

/* ─── Toast ─────────────────────────────────────── */
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-5 right-5 z-[999] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border text-sm font-medium animate-slideIn
    ${type === 'success'
      ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
      : 'bg-red-950 border-red-500/40 text-red-300'}`}>
    {type === 'success'
      ? <CheckCircle size={18} className="shrink-0" />
      : <AlertCircle size={18} className="shrink-0" />}
    {message}
    <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X size={14} /></button>
  </div>
);

/* ─── Stat Card ──────────────────────────────────── */
const StatCard = ({ icon, label, count, color }) => (
  <div className="admin-stat-card">
    <div className={`admin-stat-icon ${color}`}>{icon}</div>
    <div>
      <p className="text-2xl sm:text-3xl font-extrabold text-white">{count}</p>
      <p className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────── */
const AdminDashboard = () => {
  const [services,    setServices]    = useState([]);
  const [vehicles,    setVehicles]    = useState([]);
  const [contacts,    setContacts]    = useState([]);
  const [activeTab,   setActiveTab]   = useState('services');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [toast,       setToast]       = useState(null);

  const [newService, setNewService] = useState({ title: '', description: '' });
  const [newVehicle, setNewVehicle] = useState({ name: '', capacity: '', description: '', imageUrl: '' });

  const navigate      = useNavigate();
  const token         = localStorage.getItem('adminToken');
  const sidebarRef    = useRef(null);
  const fileInputRef  = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_PX   = 800;   // max width OR height in px
    const QUALITY  = 0.75;  // JPEG compression quality (0–1)

    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      // Calculate new dimensions keeping aspect ratio
      let { width, height } = img;
      if (width > height) {
        if (width > MAX_PX) { height = Math.round(height * MAX_PX / width); width = MAX_PX; }
      } else {
        if (height > MAX_PX) { width = Math.round(width * MAX_PX / height); height = MAX_PX; }
      }

      const canvas = document.createElement('canvas');
      canvas.width  = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);

      const compressed = canvas.toDataURL('image/jpeg', QUALITY);
      setNewVehicle((prev) => ({ ...prev, imageUrl: compressed }));
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
    // reset so same file can be re-selected
    e.target.value = '';
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (!token) { navigate('/admin/login'); return; }
    fetchData();
  }, [token]);

  useEffect(() => {
    const handler = (e) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [sidebarOpen]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const cfg = { headers: { Authorization: `Bearer ${token}` } };
      const [sRes, vRes, cRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/services`),
        axios.get(`${import.meta.env.VITE_API_URL}/vehicles`),
        axios.get(`${import.meta.env.VITE_API_URL}/contact`, cfg),
      ]);
      setServices(sRes.data);
      setVehicles(vRes.data);
      setContacts(cRes.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        showToast('Failed to load data.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const authCfg = { headers: { Authorization: `Bearer ${token}` } };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/services`, newService, authCfg);
      setNewService({ title: '', description: '' });
      showToast('Service added successfully!');
      fetchData();
    } catch { showToast('Failed to add service.', 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`, authCfg);
      showToast('Service deleted.');
      fetchData();
    } catch { showToast('Failed to delete.', 'error'); }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/vehicles`, newVehicle, authCfg);
      setNewVehicle({ name: '', capacity: '', description: '', imageUrl: '' });
      showToast('Vehicle added successfully!');
      fetchData();
    } catch { showToast('Failed to add vehicle.', 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm('Delete this vehicle?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/vehicles/${id}`, authCfg);
      showToast('Vehicle deleted.');
      fetchData();
    } catch { showToast('Failed to delete.', 'error'); }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/contact/${id}`, authCfg);
      showToast('Message deleted.');
      fetchData();
    } catch { showToast('Failed to delete.', 'error'); }
  };

  const tabs = [
    { id: 'services', label: 'Services', icon: <Settings size={18} />,      count: services.length },
    { id: 'vehicles', label: 'Vehicles', icon: <Truck size={18} />,         count: vehicles.length },
    { id: 'contacts', label: 'Messages', icon: <MessageSquare size={18} />, count: contacts.length },
  ];

  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="min-h-screen bg-[#060810] flex">

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full z-50 w-72 bg-[#0a0c14]
          border-r border-white/[0.06] flex flex-col p-6
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:w-64 lg:shrink-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#F5C71A] to-[#E0A800] flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <LayoutDashboard size={18} className="text-black" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-none">Admin Panel</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Alwan Car Go</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1.5 flex-1">
          {tabs.map(({ id, label, icon, count }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 border
                ${activeTab === id
                  ? 'bg-[#F5C71A]/10 text-[#F5C71A] border-[#F5C71A]/20'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-white border-transparent'
                }`}
            >
              {icon}
              <span className="flex-1">{label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold
                ${activeTab === id ? 'bg-[#F5C71A]/20 text-[#F5C71A]' : 'bg-white/[0.06] text-slate-400'}`}>
                {count}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 rounded-xl text-sm font-semibold
            bg-red-500/10 border border-red-500/20 text-red-400
            hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3.5 bg-[#060810]/95 backdrop-blur border-b border-white/[0.05] lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#F5C71A] to-[#E0A800] flex items-center justify-center">
              <LayoutDashboard size={13} className="text-black" />
            </div>
            <span className="text-sm font-bold text-white">Admin Panel</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </header>

        {/* Page Body */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          {/* Breadcrumb + Title */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
              <span>Dashboard</span>
              <ChevronRight size={12} />
              <span className="text-[#F5C71A] capitalize">{activeTab}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {activeTab === 'services' && 'Manage Services'}
              {activeTab === 'vehicles' && 'Manage Vehicles'}
              {activeTab === 'contacts' && 'Customer Messages'}
            </h1>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <StatCard icon={<Settings size={18} />} label="Services" count={services.length}
              color="text-blue-400 bg-blue-500/10 border-blue-500/20" />
            <StatCard icon={<Truck size={18} />}    label="Vehicles" count={vehicles.length}
              color="text-[#F5C71A] bg-[#F5C71A]/10 border-[#F5C71A]/20" />
            <StatCard icon={<Mail size={18} />}     label="Messages" count={contacts.length}
              color="text-emerald-400 bg-emerald-500/10 border-emerald-500/20" />
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader2 size={32} className="animate-spin text-[#F5C71A]" />
              <p className="text-slate-400 text-sm">Loading data...</p>
            </div>
          ) : (
            <>
              {/* ══ SERVICES TAB ══ */}
              {activeTab === 'services' && (
                <div className="space-y-5">
                  {/* Add Form */}
                  <form onSubmit={handleAddService} className="admin-card space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <Plus size={14} className="text-[#F5C71A]" /> Add New Service
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="text" placeholder="Service Title"
                        className="admin-input" value={newService.title}
                        onChange={(e) => setNewService({ ...newService, title: e.target.value })} required
                      />
                    </div>
                    <textarea
                      placeholder="Service Description" rows="3"
                      className="admin-input resize-none" value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })} required
                    />
                    <button type="submit" disabled={submitting} className="admin-btn-primary">
                      {submitting ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                      {submitting ? 'Adding...' : 'Add Service'}
                    </button>
                  </form>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {services.map((s) => (
                      <div key={s._id} className="admin-card flex items-start justify-between gap-4 hover:border-white/10 transition-colors">
                        <div className="min-w-0">
                          <h4 className="font-semibold text-white text-sm truncate">{s.title}</h4>
                          <p className="text-slate-400 text-xs mt-1 line-clamp-2">{s.description}</p>
                        </div>
                        <button onClick={() => handleDeleteService(s._id)} className="admin-delete-btn shrink-0">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                    {services.length === 0 && (
                      <div className="col-span-full admin-empty-state">
                        <Settings size={32} className="opacity-30 mb-2" />
                        <p>No services added yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ══ VEHICLES TAB ══ */}
              {activeTab === 'vehicles' && (
                <div className="space-y-5">
                  {/* Add Form */}
                  <form onSubmit={handleAddVehicle} className="admin-card space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <Plus size={14} className="text-[#F5C71A]" /> Add New Vehicle
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text" placeholder="Vehicle Name"
                        className="admin-input" value={newVehicle.name}
                        onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })} required
                      />
                      <input
                        type="text" placeholder="Capacity (e.g. 2-4 Cars)"
                        className="admin-input" value={newVehicle.capacity}
                        onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })} required
                      />
                    </div>
                    <textarea
                      placeholder="Description" rows="3"
                      className="admin-input resize-none" value={newVehicle.description}
                      onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })} required
                    />
                    {/* ── Image Section ── */}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Vehicle Image</p>

                      {/* Photo preview / drop zone */}
                      <div
                        className={`relative w-full rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden cursor-pointer
                          ${newVehicle.imageUrl
                            ? 'border-[#F5C71A]/30 h-44'
                            : 'border-white/10 h-32 hover:border-[#F5C71A]/40 hover:bg-white/[0.02]'}`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {newVehicle.imageUrl ? (
                          <>
                            <img
                              src={newVehicle.imageUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            {/* overlay on hover */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                              <UploadCloud size={22} className="text-white" />
                              <span className="text-white text-xs font-medium">Change Photo</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full gap-2 select-none">
                            <UploadCloud size={24} className="text-slate-500" />
                            <p className="text-slate-500 text-xs">Click to choose a photo from your computer</p>
                          </div>
                        )}
                      </div>

                      {/* Hidden file input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />

                      {/* Choose Photo button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                          bg-white/[0.05] border border-white/10 text-slate-300
                          hover:bg-[#F5C71A]/10 hover:border-[#F5C71A]/30 hover:text-[#F5C71A]
                          transition-all duration-200"
                      >
                        <UploadCloud size={15} />
                        {newVehicle.imageUrl ? 'Change Photo' : 'Choose Photo from Computer'}
                      </button>

                      {/* Divider */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-white/[0.06]" />
                        <span className="text-slate-600 text-xs">or paste a URL</span>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                      </div>

                      {/* URL input */}
                      <div className="relative">
                        <Link2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          className="admin-input pl-10"
                          value={newVehicle.imageUrl.startsWith('data:') ? '' : newVehicle.imageUrl}
                          onChange={(e) => setNewVehicle({ ...newVehicle, imageUrl: e.target.value })}
                        />
                      </div>

                      {/* Clear image */}
                      {newVehicle.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setNewVehicle({ ...newVehicle, imageUrl: '' })}
                          className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                        >
                          ✕ Remove image
                        </button>
                      )}
                    </div>
                    <button type="submit" disabled={submitting} className="admin-btn-primary">
                      {submitting ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                      {submitting ? 'Adding...' : 'Add Vehicle'}
                    </button>
                  </form>

                  {/* Vehicles Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {vehicles.map((v) => (
                      <div key={v._id} className="admin-card !p-0 overflow-hidden hover:border-white/10 transition-all group">
                        <div className="relative h-44 bg-slate-900">
                          <img
                            src={v.imageUrl || FALLBACK_IMG}
                            alt={v.name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            onError={(e) => { e.target.src = FALLBACK_IMG; }}
                          />
                          <button
                            onClick={() => handleDeleteVehicle(v._id)}
                            className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur text-red-400 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                          <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider text-[#F5C71A] bg-black/60 backdrop-blur px-2 py-1 rounded-md">
                            {v.capacity}
                          </span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-white text-sm">{v.name}</h4>
                          {v.description && <p className="text-slate-400 text-xs mt-1 line-clamp-2">{v.description}</p>}
                        </div>
                      </div>
                    ))}
                    {vehicles.length === 0 && (
                      <div className="col-span-full admin-empty-state">
                        <Truck size={32} className="opacity-30 mb-2" />
                        <p>No vehicles added yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ══ CONTACTS TAB ══ */}
              {activeTab === 'contacts' && (
                <div className="space-y-4">
                  {contacts.length === 0 ? (
                    <div className="admin-empty-state">
                      <MessageSquare size={32} className="opacity-30 mb-2" />
                      <p>No messages received yet.</p>
                    </div>
                  ) : contacts.map((c) => (
                    <div key={c._id} className="admin-card hover:border-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div className="min-w-0">
                          <h4 className="font-semibold text-white">{c.name}</h4>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                            <span className="text-slate-400 text-xs">{c.email}</span>
                            {c.phone && (
                              <>
                                <span className="text-slate-700">·</span>
                                <span className="text-slate-400 text-xs">{c.phone}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-slate-500 text-xs whitespace-nowrap">
                            {new Date(c.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric', month: 'short', day: 'numeric'
                            })}
                          </span>
                          <button onClick={() => handleDeleteContact(c._id)} className="admin-delete-btn">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="bg-[#0e1018] rounded-lg p-4 border border-white/[0.04]">
                        <p className="text-slate-300 text-sm leading-relaxed">{c.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;