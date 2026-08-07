'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase/client';

export default function PastorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage('Login failed. Please check your email and password and try again.');
      return;
    }

    router.push('/pastor');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-purple-50 px-4 py-16 text-slate-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-purple-100 bg-white p-8 shadow-lg md:flex-row md:p-12">
        <div className="flex-1 rounded-2xl bg-gradient-to-br from-purple-950 via-purple-800 to-indigo-900 p-8 text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-200">
            Pastor Access
          </p>
          <h1 className="mb-4 text-3xl font-serif font-bold">New Hope Baptist Church</h1>
          <p className="text-sm leading-7 text-purple-100">
            Sign in to manage sermons and special events for the church ministry pages.
          </p>
        </div>

        <div className="flex-1">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-700">
              Secure Sign In
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Pastor Login</h2>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                placeholder="Enter password"
              />
            </div>

            {errorMessage ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-purple-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:bg-purple-400"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
