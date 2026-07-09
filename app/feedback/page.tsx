'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import Image from 'next/image';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !rating || !text.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setSending(true);
    setError('');

    try {
      let imageUrl = '';

      if (imageFile) {
        const fd = new FormData();
        fd.append('file', imageFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd });
        const uploadData = await uploadRes.json();
        if (uploadData.url) imageUrl = uploadData.url;
      }

      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          text: text.trim(),
          image: imageUrl || undefined,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-dark/50 hover:text-primary text-sm transition-colors font-label mb-8"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-accent font-semibold text-sm font-label tracking-wide uppercase">
              Share Your Experience
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-dark mt-3 mb-3 font-heading">
              We&apos;d Love Your Feedback
            </h1>
            <p className="text-dark/50 max-w-md mx-auto text-sm font-label">
              Your review helps us improve and helps other patients find the care they need.
            </p>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface rounded-3xl p-10 shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-dark mb-3 font-heading">Thank You!</h2>
              <p className="text-dark/60 mb-8 font-label">
                Your feedback has been submitted successfully. It will appear in our testimonials after review.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors font-label"
              >
                Back to Home
              </Link>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="bg-surface rounded-3xl p-8 sm:p-10 shadow-sm space-y-6"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-label">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Johnson"
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-label"
                  required
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-label">
                  Rating <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          star <= (hoveredStar || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-200 hover:text-yellow-300'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="text-sm text-dark/40 font-label self-center ml-2">
                      {rating === 1 && 'Poor'}
                      {rating === 2 && 'Fair'}
                      {rating === 3 && 'Good'}
                      {rating === 4 && 'Very Good'}
                      {rating === 5 && 'Excellent'}
                    </span>
                  )}
                </div>
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-label">
                  Your Review <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us about your experience at Osmani Dental Clinic Aid..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none font-label"
                  required
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-label">
                  Your Photo <span className="text-dark/30 font-normal">(optional)</span>
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden relative ring-2 ring-primary/20">
                      <Image src={imagePreview} alt="Preview" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-card border border-dashed border-border flex items-center justify-center">
                      <span className="text-dark/20 text-xs font-label">Photo</span>
                    </div>
                  )}
                  <label className="cursor-pointer bg-primary/10 text-primary px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-primary/20 transition-colors font-label">
                    Choose Photo
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                  {imageFile && (
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(''); }}
                      className="text-xs text-dark/40 hover:text-red-500 transition-colors font-label"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm font-label">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending || !name.trim() || !rating || !text.trim()}
                className="w-full bg-primary text-white py-3.5 rounded-full font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 font-label"
              >
                {sending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
