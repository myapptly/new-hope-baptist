import { redirect } from 'next/navigation';
import { createServerClient, getSupabaseClaims } from '../../lib/supabase/server';

export const dynamic = 'force-dynamic';

async function handleSignOut() {
  'use server';
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect('/pastor/login');
}

export default async function PastorDashboardPage() {
  const claimsResponse = await getSupabaseClaims();
  const { data: claimsData } = claimsResponse;

  if (!claimsData?.claims?.sub) {
    redirect('/pastor/login');
  }

  return (
    <div className="min-h-screen bg-purple-50 px-4 py-16 text-slate-800">
      <div className="mx-auto max-w-4xl rounded-3xl border border-purple-100 bg-white p-8 shadow-lg md:p-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-700">
              Protected Area
            </p>
            <h1 className="mt-2 text-3xl font-serif font-bold text-slate-900">Pastor Dashboard</h1>
            <p className="mt-3 text-base text-slate-600">
              Sermon management will appear here.
            </p>
          </div>

          <form action={handleSignOut}>
            <button
              type="submit"
              className="rounded-xl border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
