'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Users, Clock, CheckCircle, XCircle,
  RefreshCw, Search, Filter, LogOut, Settings, ChevronDown, Home,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-600 border-red-200',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function AdminPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data);
    } catch {
      console.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const updateStatus = async (id: string, status: Appointment['status']) => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch {
      console.error('Failed to update status');
    }
  };

  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEditingStatus(null);
      }
    };
    if (editingStatus) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [editingStatus]);

  const filtered = appointments.filter((a) => {
    const matchesFilter = filter === 'all' || a.status === filter;
    const matchesSearch =
      search === '' ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search);
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
  };

  return (
    <section className="min-h-screen bg-bg">
      <div className="bg-white border-b border-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-dark font-heading">
              DentaCare Admin
            </h1>
            <p className="text-dark/50 text-xs font-label">Appointment Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 text-dark/50 hover:text-primary text-sm transition-colors font-label"
            >
              <Home size={14} /> Home
            </a>
            <span className="text-dark/20">|</span>
            <a
              href="/admin/settings"
              className="flex items-center gap-1.5 text-dark/50 hover:text-primary text-sm transition-colors font-label"
            >
              <Settings size={14} /> Settings
            </a>
            <span className="text-dark/20">|</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-dark/50 hover:text-dark text-sm transition-colors font-label"
            >
              <LogOut size={16} /> Lock
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, icon: Users, color: 'bg-primary/10 text-primary' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
            { label: 'Confirmed', value: stats.confirmed, icon: Calendar, color: 'bg-blue-100 text-blue-600' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark font-heading">{s.value}</p>
                  <p className="text-dark/50 text-xs font-label">{s.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              placeholder="Search name, email, phone..."
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-dark/40" />
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors font-label ${
                  filter === f
                    ? 'bg-accent text-white'
                    : 'bg-card text-dark/60 hover:bg-primary/10'
                }`}
              >
                {f}
              </button>
            ))}
            <button
              onClick={fetchAppointments}
              className="ml-2 p-2 rounded-lg hover:bg-card transition-colors"
              title="Refresh"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-dark/40 font-label">No appointments found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-card">
                    <th className="px-6 py-4 text-xs font-semibold text-dark/50 uppercase tracking-wider font-label">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-dark/50 uppercase tracking-wider font-label">
                      Service
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-dark/50 uppercase tracking-wider font-label">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-dark/50 uppercase tracking-wider font-label">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-dark/50 uppercase tracking-wider font-label">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-dark/50 uppercase tracking-wider font-label">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((appt) => (
                      <motion.tr
                        key={appt.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-card last:border-0 hover:bg-bg/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-dark">{appt.name}</p>
                          <p className="text-xs text-dark/50">{appt.email}</p>
                          <p className="text-xs text-dark/40">{appt.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-dark/70">{appt.service}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-dark">
                            {new Date(appt.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-xs text-dark/50">{appt.time}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-dark/70">{appt.doctor || '—'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative" ref={editingStatus === appt.id ? dropdownRef : undefined}>
                            <button
                              onClick={() => setEditingStatus(editingStatus === appt.id ? null : appt.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all hover:shadow-sm font-label ${statusColors[appt.status]}`}
                            >
                              {statusLabels[appt.status]}
                              <ChevronDown size={12} />
                            </button>
                            {editingStatus === appt.id && (
                              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-card z-20 py-1 min-w-[140px]">
                                {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => {
                                      updateStatus(appt.id, s);
                                      setEditingStatus(null);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs font-medium font-label hover:bg-bg transition-colors flex items-center gap-2 ${
                                      appt.status === s ? 'text-primary bg-primary/5' : 'text-dark/70'
                                    }`}
                                  >
                                    <span className={`w-2 h-2 rounded-full ${statusColors[s].split(' ')[0]}`} />
                                    {statusLabels[s]}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1.5">
                            {appt.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateStatus(appt.id, 'confirmed')}
                                  className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                  title="Confirm"
                                >
                                  <CheckCircle size={14} />
                                </button>
                                <button
                                  onClick={() => updateStatus(appt.id, 'cancelled')}
                                  className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                  title="Cancel"
                                >
                                  <XCircle size={14} />
                                </button>
                              </>
                            )}
                            {appt.status === 'confirmed' && (
                              <button
                                onClick={() => updateStatus(appt.id, 'completed')}
                                className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                                title="Mark Completed"
                              >
                                <CheckCircle size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
