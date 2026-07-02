'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ProgressBar from '@/components/ProgressBar';
import { timeSlots } from '@/lib/data';
import { useSettings } from '@/lib/useSettings';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  doctor: string;
  date: Date | null;
  time: string;
}

export default function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const { settings } = useSettings();
  const { services, doctors } = settings;
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    defaultValues: { date: null },
  });

  const selectedService = watch('service');
  const selectedDoctor = watch('doctor');
  const selectedDate = watch('date');
  const selectedTime = watch('time');

  const onSubmit = async (data: FormData) => {
    setSending(true);
    setSendError('');
    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: services.find((s) => s.id === data.service)?.name || data.service,
          doctor: data.doctor,
          date: data.date?.toISOString(),
          time: data.time,
        }),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSubmitted(true);
    } catch {
      setSendError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSending(false);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-bg pt-20">
        <ScrollReveal>
          <div className="bg-white rounded-3xl p-12 shadow-lg text-center max-w-md mx-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="text-accent mx-auto mb-6" size={64} />
            </motion.div>
            <h2 className="text-2xl font-bold text-dark mb-3 font-heading">
              Request Received!
            </h2>
            <p className="text-dark/60 mb-8">
              Your appointment request has been submitted. Our team will review it
              and you&apos;ll receive a confirmation email once it&apos;s approved.
            </p>
            <a
              href="/"
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors font-label"
            >
              Back to Home
            </a>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-bg to-accent/5 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl font-bold text-dark mb-4 font-heading">
              Book an Appointment
            </h1>
            <p className="text-dark/60 max-w-xl mx-auto">
              Fill in the details below to schedule your visit. We&apos;ll confirm
              your appointment via email.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-bg">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressBar currentStep={step} totalSteps={3} />

          <form onSubmit={handleSubmit(onSubmit)}>
            {sendError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-600 text-sm">{sendError}</p>
              </div>
            )}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-xl font-bold text-dark mb-6 font-heading">
                      Personal Information
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                        Full Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                        Phone Number *
                      </label>
                      <input
                        {...register('phone', { required: 'Phone is required' })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                        Email Address *
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                        })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-xl font-bold text-dark mb-6 font-heading">
                      Select Service & Schedule
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                        Service *
                      </label>
                      <select
                        {...register('service', { required: 'Please select a service' })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      >
                        <option value="">Choose a service</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-600 text-xs mt-1">{errors.service.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                        Preferred Doctor
                      </label>
                      <select
                        {...register('doctor')}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      >
                        <option value="">No preference</option>
                        {doctors.map((d) => (
                          <option key={d.name} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                        Preferred Date *
                      </label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date | null) => setValue('date', date)}
                        minDate={new Date()}
                        dateFormat="MMMM d, yyyy"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                        placeholderText="Select a date"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5 font-label">
                        Preferred Time *
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setValue('time', slot)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors font-label ${
                              selectedTime === slot
                                ? 'bg-accent text-white border-accent'
                                : 'bg-white text-dark border-gray-200 hover:border-accent'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-xl font-bold text-dark mb-6 font-heading">
                      Confirm Your Appointment
                    </h3>
                    <div className="bg-card rounded-xl p-6 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-dark/50 text-sm font-label">Name</span>
                        <span className="text-dark font-medium text-sm">{watch('name') || '—'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/50 text-sm font-label">Phone</span>
                        <span className="text-dark font-medium text-sm">{watch('phone') || '—'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/50 text-sm font-label">Email</span>
                        <span className="text-dark font-medium text-sm">{watch('email') || '—'}</span>
                      </div>
                      <div className="border-t border-primary/10 my-3" />
                      <div className="flex justify-between">
                        <span className="text-dark/50 text-sm font-label">Service</span>
                        <span className="text-dark font-medium text-sm">
                          {services.find((s) => s.id === selectedService)?.name || '—'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/50 text-sm font-label">Doctor</span>
                        <span className="text-dark font-medium text-sm">{selectedDoctor || 'No preference'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/50 text-sm font-label">Date</span>
                        <span className="text-dark font-medium text-sm">
                          {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/50 text-sm font-label">Time</span>
                        <span className="text-dark font-medium text-sm">{selectedTime || '—'}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 text-dark/60 hover:text-dark transition-colors font-label"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <div />
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-accent text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-accent-dark transition-colors flex items-center gap-2 font-label"
                  >
                    Next <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-primary text-white px-8 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors font-label disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
