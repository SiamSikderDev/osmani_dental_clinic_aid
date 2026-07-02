'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, Plus, Trash2, Users, Phone, MapPin, Image, Settings as SettingsIcon,
  Loader2, CheckCircle, Stethoscope, Sparkles, Smile, Cross, Heart, Baby, Upload,
  MessageSquare, Star, Home, LayoutDashboard, Shield, Globe, HelpCircle, Info,
} from 'lucide-react';
import { SiteSettings, defaultSettings } from '@/lib/settings';

const iconOptions = [
  { value: 'Stethoscope', label: 'Stethoscope', Icon: Stethoscope },
  { value: 'Sparkles', label: 'Sparkles', Icon: Sparkles },
  { value: 'Smile', label: 'Smile', Icon: Smile },
  { value: 'Cross', label: 'Cross', Icon: Cross },
  { value: 'Heart', label: 'Heart', Icon: Heart },
  { value: 'Baby', label: 'Baby', Icon: Baby },
];

const tabs = [
  { id: 'hero', label: 'Hero', icon: Image },
  { id: 'about', label: 'About', icon: Info },
  { id: 'images', label: 'Images', icon: Upload },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'doctors', label: 'Doctors', icon: Users },
  { id: 'services', label: 'Services', icon: Stethoscope },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'social', label: 'Social', icon: Globe },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'map', label: 'Map', icon: MapPin },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (localStorage.getItem('dentacare_admin') === 'true') {
      setAuthenticated(true);
    } else {
      setLoading(false);
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      const storedPassword = data.adminPassword || 'dentacare2024';
      if (password === storedPassword || password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        setAuthenticated(true);
        setAuthError('');
        localStorage.setItem('dentacare_admin', 'true');
      } else {
        setAuthError('Invalid password');
      }
    } catch {
      if (password === 'dentacare2024' || password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        setAuthenticated(true);
        setAuthError('');
        localStorage.setItem('dentacare_admin', 'true');
      } else {
        setAuthError('Invalid password');
      }
    }
  };

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
    } catch {
      console.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      console.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const update = (path: string, value: string) => {
    setSettings((prev) => {
      const keys = path.split('.');
      const next = JSON.parse(JSON.stringify(prev));
      let obj: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]] as Record<string, unknown>;
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  // Doctor helpers
  const addDoctor = () => {
    setSettings((prev) => ({
      ...prev,
      doctors: [
        ...prev.doctors,
        { id: `doc-${Date.now()}`, name: '', specialization: '', credentials: '', image: '/images/doctor-1.jpeg', bio: '' },
      ],
    }));
  };
  const removeDoctor = (id: string) => {
    setSettings((prev) => ({ ...prev, doctors: prev.doctors.filter((d) => d.id !== id) }));
  };
  const updateDoctor = (id: string, field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      doctors: prev.doctors.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
    }));
  };

  // Service helpers
  const addService = () => {
    setSettings((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { id: `svc-${Date.now()}`, name: '', shortDesc: '', description: '', priceRange: '', icon: 'Stethoscope' },
      ],
    }));
  };
  const removeService = (id: string) => {
    setSettings((prev) => ({ ...prev, services: prev.services.filter((s) => s.id !== id) }));
  };
  const updateService = (id: string, field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  // Timeline helpers
  const addTimelineNode = () => {
    setSettings((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        timeline: [
          ...(prev.about?.timeline || []),
          { year: '', title: '', desc: '' },
        ],
      },
    }));
  };
  const removeTimelineNode = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        timeline: (prev.about?.timeline || []).filter((_, i) => i !== index),
      },
    }));
  };
  const updateTimelineNode = (index: number, field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        timeline: (prev.about?.timeline || []).map((t, i) => (i === index ? { ...t, [field]: value } : t)),
      },
    }));
  };

  // Certification helpers
  const addCertification = () => {
    setSettings((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        certifications: [
          ...(prev.about?.certifications || []),
          '',
        ],
      },
    }));
  };
  const removeCertification = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        certifications: (prev.about?.certifications || []).filter((_, i) => i !== index),
      },
    }));
  };
  const updateCertification = (index: number, value: string) => {
    setSettings((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        certifications: (prev.about?.certifications || []).map((c, i) => (i === index ? value : c)),
      },
    }));
  };

  // Image upload helper
  const [uploading, setUploading] = useState<string | null>(null);
  const uploadImage = async (file: File, targetPath: string) => {
    setUploading(targetPath);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) update(targetPath, data.url);
    } catch {
      console.error('Upload failed');
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-bg">
        <div className="bg-white rounded-3xl p-10 shadow-lg max-w-sm mx-4 w-full">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <SettingsIcon className="text-primary" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-dark text-center mb-2 font-heading">Admin Access</h1>
          <p className="text-dark/50 text-sm text-center mb-6 font-label">Enter the admin password to continue</p>
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="Password"
              autoFocus
            />
            {authError && <p className="text-red-600 text-xs">{authError}</p>}
            <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors font-label">
              Sign In
            </button>
          </form>
        </div>
      </section>
    );
  }

  const input = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';
  const label = 'block text-xs font-semibold text-dark/60 mb-1 font-label uppercase tracking-wider';

  return (
    <section className="min-h-screen bg-bg">
      <div className="bg-white border-b border-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SettingsIcon className="text-primary" size={20} />
            <div>
              <h1 className="text-lg font-bold text-dark font-heading">Site Settings</h1>
              <p className="text-dark/50 text-xs font-label">Manage your website content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 text-dark/50 hover:text-primary text-sm transition-colors font-label">
              <Home size={14} /> Home
            </a>
            <span className="text-dark/20">|</span>
            <a href="/admin" className="flex items-center gap-1.5 text-dark/50 hover:text-primary text-sm transition-colors font-label">
              <LayoutDashboard size={14} /> Dashboard
            </a>
            <span className="text-dark/20">|</span>
            <button
              onClick={save}
              disabled={saving}
              className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors inline-flex items-center gap-2 font-label disabled:opacity-50"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle size={14} /> : <Save size={14} />}
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors font-label ${
                activeTab === tab.id ? 'bg-primary text-white' : 'bg-white text-dark/60 hover:bg-card border border-card'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <motion.div key="hero" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
              <h3 className="font-bold text-dark font-heading">Hero Section</h3>
              <div>
                <label className={label}>Headline</label>
                <input className={input} value={settings.hero.title} onChange={(e) => update('hero.title', e.target.value)} />
              </div>
              <div>
                <label className={label}>Subtitle</label>
                <textarea className={`${input} resize-none`} rows={3} value={settings.hero.subtitle} onChange={(e) => update('hero.subtitle', e.target.value)} />
              </div>
              <div>
                <label className={label}>CTA Button Text</label>
                <input className={input} value={settings.hero.ctaText} onChange={(e) => update('hero.ctaText', e.target.value)} />
              </div>
            </motion.div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* General About info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="font-bold text-dark font-heading">About Story & Values</h3>
                <div>
                  <label className={label}>Hero Subtitle</label>
                  <textarea className={`${input} resize-none`} rows={2} value={settings.about?.heroSubtitle || ''} onChange={(e) => update('about.heroSubtitle', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={label}>Story Section Title</label>
                    <input className={input} value={settings.about?.storyTitle || ''} onChange={(e) => update('about.storyTitle', e.target.value)} />
                  </div>
                  <div>
                    <label className={label}>Story Paragraph 1</label>
                    <textarea className={`${input} resize-none`} rows={3} value={settings.about?.storyParagraph1 || ''} onChange={(e) => update('about.storyParagraph1', e.target.value)} />
                  </div>
                  <div>
                    <label className={label}>Story Paragraph 2</label>
                    <textarea className={`${input} resize-none`} rows={3} value={settings.about?.storyParagraph2 || ''} onChange={(e) => update('about.storyParagraph2', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={label}>Our Mission</label>
                    <textarea className={`${input} resize-none`} rows={3} value={settings.about?.mission || ''} onChange={(e) => update('about.mission', e.target.value)} />
                  </div>
                  <div>
                    <label className={label}>Our Vision</label>
                    <textarea className={`${input} resize-none`} rows={3} value={settings.about?.vision || ''} onChange={(e) => update('about.vision', e.target.value)} />
                  </div>
                  <div>
                    <label className={label}>Our Values</label>
                    <textarea className={`${input} resize-none`} rows={3} value={settings.about?.values || ''} onChange={(e) => update('about.values', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Timeline Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="font-bold text-dark font-heading">Our Journey Timeline</h3>
                <div className="space-y-4">
                  {(settings.about?.timeline || []).map((t, idx) => (
                    <div key={idx} className="bg-bg rounded-xl p-4 border border-card">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-primary font-label">Timeline Event {idx + 1}</span>
                        <button onClick={() => removeTimelineNode(idx)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={14} /></button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className={label}>Year</label>
                          <input className={input} value={t.year} onChange={(e) => updateTimelineNode(idx, 'year', e.target.value)} placeholder="e.g. 2024" />
                        </div>
                        <div className="md:col-span-3">
                          <label className={label}>Event Title</label>
                          <input className={input} value={t.title} onChange={(e) => updateTimelineNode(idx, 'title', e.target.value)} placeholder="Event Title" />
                        </div>
                        <div className="md:col-span-4">
                          <label className={label}>Description</label>
                          <textarea className={`${input} resize-none`} rows={2} value={t.desc} onChange={(e) => updateTimelineNode(idx, 'desc', e.target.value)} placeholder="Event description" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={addTimelineNode} className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:text-primary-dark transition-colors font-label px-3 py-1.5 border border-dashed border-gray-200 rounded-lg w-full justify-center">
                    <Plus size={12} /> Add Timeline Event
                  </button>
                </div>
              </div>

              {/* Certifications Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="font-bold text-dark font-heading">Certifications & Affiliations</h3>
                <div className="space-y-3">
                  {(settings.about?.certifications || []).map((c, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input className={input} value={c} onChange={(e) => updateCertification(idx, e.target.value)} placeholder="e.g. American Dental Association (ADA)" />
                      <button onClick={() => removeCertification(idx)} className="text-red-400 hover:text-red-600 p-1 shrink-0"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button onClick={addCertification} className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:text-primary-dark transition-colors font-label px-3 py-1.5 border border-dashed border-gray-200 rounded-lg w-full justify-center">
                    <Plus size={12} /> Add Certification/Affiliation
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Doctors Tab */}
          {activeTab === 'doctors' && (
            <motion.div key="doctors" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {settings.doctors.map((doc, i) => (
                <div key={doc.id} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-dark font-heading">Doctor {i + 1}</h4>
                    <button onClick={() => removeDoctor(doc.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={16} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className={label}>Name</label><input className={input} value={doc.name} onChange={(e) => updateDoctor(doc.id, 'name', e.target.value)} /></div>
                    <div><label className={label}>Specialization</label><input className={input} value={doc.specialization} onChange={(e) => updateDoctor(doc.id, 'specialization', e.target.value)} /></div>
                    <div><label className={label}>Credentials</label><input className={input} value={doc.credentials} onChange={(e) => updateDoctor(doc.id, 'credentials', e.target.value)} /></div>
                    <div><label className={label}>Image Path</label><input className={input} value={doc.image} onChange={(e) => updateDoctor(doc.id, 'image', e.target.value)} /></div>
                    <div className="md:col-span-2"><label className={label}>Bio</label><textarea className={`${input} resize-none`} rows={2} value={doc.bio} onChange={(e) => updateDoctor(doc.id, 'bio', e.target.value)} /></div>
                  </div>
                </div>
              ))}
              <button onClick={addDoctor} className="flex items-center gap-2 bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 w-full justify-center text-dark/50 hover:border-primary hover:text-primary transition-colors font-label text-sm">
                <Plus size={16} /> Add Doctor
              </button>
            </motion.div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {settings.services.map((svc, i) => (
                <div key={svc.id} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-dark font-heading">Service {i + 1}</h4>
                    <button onClick={() => removeService(svc.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={16} /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className={label}>Name</label><input className={input} value={svc.name} onChange={(e) => updateService(svc.id, 'name', e.target.value)} /></div>
                    <div><label className={label}>Price Range</label><input className={input} value={svc.priceRange} onChange={(e) => updateService(svc.id, 'priceRange', e.target.value)} /></div>
                    <div>
                      <label className={label}>Icon</label>
                      <select className={input} value={svc.icon} onChange={(e) => updateService(svc.id, 'icon', e.target.value)}>
                        {iconOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div><label className={label}>Short Description</label><input className={input} value={svc.shortDesc} onChange={(e) => updateService(svc.id, 'shortDesc', e.target.value)} /></div>
                    <div className="md:col-span-2"><label className={label}>Full Description</label><textarea className={`${input} resize-none`} rows={2} value={svc.description} onChange={(e) => updateService(svc.id, 'description', e.target.value)} /></div>
                  </div>
                </div>
              ))}
              <button onClick={addService} className="flex items-center gap-2 bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 w-full justify-center text-dark/50 hover:border-primary hover:text-primary transition-colors font-label text-sm">
                <Plus size={16} /> Add Service
              </button>
            </motion.div>
          )}

          {/* Images Tab */}
          {activeTab === 'images' && (
            <motion.div key="images" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {([
                { key: 'images.hero', label: 'Hero Image', desc: 'Main hero section photo' },
                { key: 'images.clinicInterior', label: 'Clinic Interior', desc: 'Why Choose Us section' },
                { key: 'images.teamPhoto', label: 'Team Photo', desc: 'About page team section' },
                { key: 'images.beforeAfter', label: 'Before & After', desc: 'Gallery comparison slider' },
                { key: 'images.servicesHero', label: 'Services Hero', desc: 'Services page hero background' },
              ] as const).map((item) => {
                const currentValue = item.key.split('.').reduce((obj: Record<string, unknown>, k) => obj[k] as Record<string, unknown>, settings as unknown as Record<string, unknown>) as unknown as string;
                return (
                  <div key={item.key} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-start gap-6">
                      <div className="w-40 h-28 rounded-xl overflow-hidden bg-card border border-card shrink-0">
                        {currentValue && <img src={currentValue} alt={item.label} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-dark font-heading text-sm">{item.label}</h4>
                        <p className="text-dark/40 text-xs mb-3 font-label">{item.desc}</p>
                        <div className="flex gap-2">
                          <label className={`inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer hover:bg-primary/20 transition-colors font-label ${uploading === item.key ? 'opacity-50 pointer-events-none' : ''}`}>
                            {uploading === item.key ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                            {uploading === item.key ? 'Uploading...' : 'Upload New'}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadImage(file, item.key);
                            }} />
                          </label>
                          <input className={`${input} flex-1`} value={currentValue} onChange={(e) => update(item.key, e.target.value)} placeholder="/images/..." />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <motion.div key="testimonials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {settings.testimonials.map((test, i) => (
                <div key={test.id} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-card border border-card shrink-0">
                        {test.image && <img src={test.image} alt={test.name} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-dark font-heading text-sm">{test.name || `Testimonial ${i + 1}`}</h4>
                        <div className="flex gap-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} size={10} className={s < test.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => {
                      setSettings(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => t.id !== test.id) }));
                    }} className="p-1.5 text-dark/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={label}>Patient Name</label>
                      <input className={input} value={test.name} onChange={(e) => {
                        setSettings(prev => ({ ...prev, testimonials: prev.testimonials.map(t => t.id === test.id ? { ...t, name: e.target.value } : t) }));
                      }} />
                    </div>
                    <div>
                      <label className={label}>Rating</label>
                      <div className="flex gap-1 pt-1">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button key={r} onClick={() => {
                            setSettings(prev => ({ ...prev, testimonials: prev.testimonials.map(t => t.id === test.id ? { ...t, rating: r } : t) }));
                          }} className="p-0.5">
                            <Star size={20} className={r <= test.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 hover:text-yellow-300'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className={label}>Review Text</label>
                      <textarea className={`${input} resize-none`} rows={3} value={test.text} onChange={(e) => {
                        setSettings(prev => ({ ...prev, testimonials: prev.testimonials.map(t => t.id === test.id ? { ...t, text: e.target.value } : t) }));
                      }} />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-card">
                    <label className={label}>Photo</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-card border border-card shrink-0">
                        {test.image && <img src={test.image} alt={test.name} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 flex gap-2">
                        <label className={`inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer hover:bg-primary/20 transition-colors font-label ${uploading === `testimonials.${i}.image` ? 'opacity-50 pointer-events-none' : ''}`}>
                          {uploading === `testimonials.${i}.image` ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                          {uploading === `testimonials.${i}.image` ? 'Uploading...' : 'Upload Photo'}
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const fd = new FormData();
                              fd.append('file', file);
                              setUploading(`testimonials.${i}.image`);
                              fetch('/api/upload', { method: 'POST', body: fd })
                                .then(r => r.json())
                                .then(data => {
                                  if (data.url) {
                                    setSettings(prev => ({ ...prev, testimonials: prev.testimonials.map(t => t.id === test.id ? { ...t, image: data.url } : t) }));
                                  }
                                })
                                .catch(() => {})
                                .finally(() => setUploading(null));
                            }
                          }} />
                        </label>
                        <input className={`${input} flex-1`} value={test.image} onChange={(e) => {
                          setSettings(prev => ({ ...prev, testimonials: prev.testimonials.map(t => t.id === test.id ? { ...t, image: e.target.value } : t) }));
                        }} placeholder="/images/..." />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => {
                setSettings(prev => ({
                  ...prev,
                  testimonials: [...prev.testimonials, { id: `test-${Date.now()}`, name: '', rating: 5, image: '/images/patient-review-1.jpeg', text: '' }],
                }));
              }} className="flex items-center gap-2 bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 w-full justify-center text-dark/50 hover:border-primary hover:text-primary transition-colors font-label text-sm">
                <Plus size={16} /> Add Testimonial
              </button>
            </motion.div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
              <h3 className="font-bold text-dark font-heading">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={label}>Phone Number</label><input className={input} value={settings.contact.phone} onChange={(e) => update('contact.phone', e.target.value)} /></div>
                <div><label className={label}>Email</label><input className={input} value={settings.contact.email} onChange={(e) => update('contact.email', e.target.value)} /></div>
              </div>
              <div><label className={label}>Address</label><textarea className={`${input} resize-none`} rows={2} value={settings.contact.address} onChange={(e) => update('contact.address', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className={label}>Weekday Hours</label><input className={input} value={settings.contact.hours.weekday} onChange={(e) => update('contact.hours.weekday', e.target.value)} /></div>
                <div><label className={label}>Saturday Hours</label><input className={input} value={settings.contact.hours.saturday} onChange={(e) => update('contact.hours.saturday', e.target.value)} /></div>
                <div><label className={label}>Sunday Hours</label><input className={input} value={settings.contact.hours.sunday} onChange={(e) => update('contact.hours.sunday', e.target.value)} /></div>
              </div>
            </motion.div>
          )}

          {/* Social Tab */}
          {activeTab === 'social' && (
            <motion.div key="social" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl p-6 shadow-sm space-y-5 max-w-lg">
              <div>
                <h3 className="font-bold text-dark font-heading">Social Media Links</h3>
                <p className="text-dark/40 text-xs font-label mt-1">Links shown in the footer. Leave blank to hide a platform.</p>
              </div>
              <div className="space-y-4">
                {([
                  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
                  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
                  { key: 'twitter', label: 'Twitter / X', placeholder: 'https://x.com/...' },
                  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
                  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
                  { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@...' },
                ] as const).map((item) => (
                  <div key={item.key}>
                    <label className={label}>{item.label}</label>
                    <input
                      className={input}
                      value={settings.socialLinks[item.key]}
                      onChange={(e) => update(`socialLinks.${item.key}`, e.target.value)}
                      placeholder={item.placeholder}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <motion.div key="faq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {settings.faqCategories.map((cat, ci) => (
                <div key={ci} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <input
                      className="text-base font-bold text-dark font-heading bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none transition-colors w-48"
                      value={cat.category}
                      onChange={(e) => {
                        const updated = [...settings.faqCategories];
                        updated[ci] = { ...updated[ci], category: e.target.value };
                        setSettings(prev => ({ ...prev, faqCategories: updated }));
                      }}
                      placeholder="Category name"
                    />
                    <button onClick={() => {
                      setSettings(prev => ({ ...prev, faqCategories: prev.faqCategories.filter((_, i) => i !== ci) }));
                    }} className="p-1.5 text-dark/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {cat.questions.map((qa, qi) => (
                      <div key={qi} className="bg-bg rounded-xl p-4 border border-card">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 space-y-2">
                            <input
                              className={`${input} font-semibold`}
                              value={qa.q}
                              onChange={(e) => {
                                const updated = [...settings.faqCategories];
                                updated[ci] = { ...updated[ci], questions: updated[ci].questions.map((q, j) => j === qi ? { ...q, q: e.target.value } : q) };
                                setSettings(prev => ({ ...prev, faqCategories: updated }));
                              }}
                              placeholder="Question"
                            />
                            <textarea
                              className={`${input} resize-none text-sm`}
                              rows={2}
                              value={qa.a}
                              onChange={(e) => {
                                const updated = [...settings.faqCategories];
                                updated[ci] = { ...updated[ci], questions: updated[ci].questions.map((q, j) => j === qi ? { ...q, a: e.target.value } : q) };
                                setSettings(prev => ({ ...prev, faqCategories: updated }));
                              }}
                              placeholder="Answer"
                            />
                          </div>
                          <button onClick={() => {
                            const updated = [...settings.faqCategories];
                            updated[ci] = { ...updated[ci], questions: updated[ci].questions.filter((_, j) => j !== qi) };
                            setSettings(prev => ({ ...prev, faqCategories: updated }));
                          }} className="p-1.5 text-dark/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0 mt-1">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => {
                      const updated = [...settings.faqCategories];
                      updated[ci] = { ...updated[ci], questions: [...updated[ci].questions, { q: '', a: '' }] };
                      setSettings(prev => ({ ...prev, faqCategories: updated }));
                    }} className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:text-primary-dark transition-colors font-label px-3 py-1.5">
                      <Plus size={12} /> Add Question
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => {
                setSettings(prev => ({
                  ...prev,
                  faqCategories: [...prev.faqCategories, { category: 'New Category', questions: [{ q: '', a: '' }] }],
                }));
              }} className="flex items-center gap-2 bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 w-full justify-center text-dark/50 hover:border-primary hover:text-primary transition-colors font-label text-sm">
                <Plus size={16} /> Add Category
              </button>
            </motion.div>
          )}

          {/* Map Tab */}
          {activeTab === 'map' && (
            <motion.div key="map" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
              <h3 className="font-bold text-dark font-heading">Google Maps Embed</h3>
              <p className="text-dark/50 text-sm">Paste the Google Maps embed URL from Google Maps → Share → Embed → copy the src URL.</p>
              <div><label className={label}>Embed URL</label><textarea className={`${input} resize-none`} rows={3} value={settings.map.embedUrl} onChange={(e) => update('map.embedUrl', e.target.value)} /></div>
              {settings.map.embedUrl && (
                <div className="rounded-xl overflow-hidden h-64 bg-card border border-card">
                  <iframe src={settings.map.embedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              )}
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl p-6 shadow-sm space-y-5 max-w-lg">
              <div>
                <h3 className="font-bold text-dark font-heading">Change Admin Password</h3>
                <p className="text-dark/40 text-xs font-label mt-1">Used to access the admin dashboard and settings</p>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                setPwMsg(null);
                if (newPw !== confirmPw) {
                  setPwMsg({ type: 'error', text: 'New passwords do not match' });
                  return;
                }
                if (newPw.length < 6) {
                  setPwMsg({ type: 'error', text: 'Password must be at least 6 characters' });
                  return;
                }
                setPwLoading(true);
                try {
                  const res = await fetch('/api/admin/password', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
                  });
                  const data = await res.json();
                  if (res.ok) {
                    setPwMsg({ type: 'success', text: 'Password updated successfully' });
                    setCurrentPw('');
                    setNewPw('');
                    setConfirmPw('');
                    setSettings(prev => ({ ...prev, adminPassword: newPw }));
                    localStorage.setItem('dentacare_admin', 'true');
                  } else {
                    setPwMsg({ type: 'error', text: data.error || 'Failed to update password' });
                  }
                } catch {
                  setPwMsg({ type: 'error', text: 'Something went wrong' });
                } finally {
                  setPwLoading(false);
                }
              }} className="space-y-4">
                <div>
                  <label className={label}>Current Password</label>
                  <input type="password" className={input} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="Enter current password" required />
                </div>
                <div>
                  <label className={label}>New Password</label>
                  <input type="password" className={input} value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Min. 6 characters" required />
                </div>
                <div>
                  <label className={label}>Confirm New Password</label>
                  <input type="password" className={input} value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Re-enter new password" required />
                </div>
                {pwMsg && (
                  <p className={`text-xs font-label ${pwMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{pwMsg.text}</p>
                )}
                <button type="submit" disabled={pwLoading} className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors inline-flex items-center gap-2 font-label disabled:opacity-50">
                  {pwLoading ? <Loader2 size={14} className="animate-spin" /> : <Shield size={14} />}
                  {pwLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
