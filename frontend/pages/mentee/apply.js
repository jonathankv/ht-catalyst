import { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export default function ApplyMenteePage() {
  const { currentUser } = useAuth();
  const [formValues, setFormValues] = useState({
    full_name: '',
    goals: '',
    background: '',
    areas: '',
    time_commitment: '',
    timezone: '',
    linkedin: '',
    github: '',
    expectations: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessId(null);
    if (!formValues.goals || formValues.goals.trim().length < 10) {
      setError('Please describe your goals (at least 10 characters).');
      setSubmitting(false);
      return;
    }
    try {
      const payload = { user_email: currentUser?.email, ...formValues };
      const res = await axios.post(`${API_BASE}/mentoring/applications`, payload);
      setSuccessId(res.data.id);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Apply as a Mentee</title>
        </Head>
        <div className="max-w-3xl mx-auto px-4 py-24">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Apply as a Mentee</h1>
            <Link href="/mentoring" className="text-primary-600 hover:underline">Back to Mentoring</Link>
          </div>

          {successId ? (
            <div className="rounded-md bg-green-50 p-4 mb-6 text-green-800">
              Thank you! Your application has been submitted. We will reach out via email.
            </div>
          ) : null}

          {error ? (
            <div className="rounded-md bg-red-50 p-4 mb-6 text-red-800">{error}</div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formValues.full_name}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Your Goals</label>
              <textarea
                name="goals"
                value={formValues.goals}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 h-28"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Background</label>
                <input
                  type="text"
                  name="background"
                  value={formValues.background}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Focus Areas</label>
                <input
                  type="text"
                  name="areas"
                  value={formValues.areas}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Time Commitment</label>
                <input
                  type="text"
                  name="time_commitment"
                  value={formValues.time_commitment}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Timezone</label>
                <input
                  type="text"
                  name="timezone"
                  value={formValues.timezone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formValues.linkedin}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={formValues.github}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Expectations</label>
              <textarea
                name="expectations"
                value={formValues.expectations}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 h-28"
              />
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={submitting}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-500 disabled:bg-primary-300"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
            </div>
          </form>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}


