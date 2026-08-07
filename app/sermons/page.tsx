import { createServerClient } from '../../lib/supabase/server';
import PublicContentList from './PublicContentList';

export const dynamic = 'force-dynamic';

export default async function SermonsPage() {
  const supabase = await createServerClient();

  const [{ data: sermons = [] }, { data: events = [] }] = await Promise.all([
    supabase.from('sermons').select('*').eq('published', true).order('date', { ascending: false }),
    supabase.from('special_events').select('*').eq('published', true).order('event_date', { ascending: false }),
  ]);

  return (
    <div className="min-h-screen bg-purple-50 text-slate-800">
      <div className="bg-purple-700 text-white py-2 px-4 text-xs sm:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-x-2">
            <a
              href="https://www.google.com/maps/search/?api=1&query=4911+Old+Rural+Hall+Road,+Winston-Salem,+NC+27105"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              📍 4911 Old Rural Hall Road, Winston-Salem, NC 27105
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href="tel:3364065502"
              className="hover:underline flex items-center gap-1 whitespace-nowrap"
            >
              📞 (336) 406-5502
            </a>
          </div>
          <div>Pastor: Chuck Carver</div>
        </div>
      </div>

      <header className="bg-purple-100 text-purple-950 shadow-sm sticky top-0 z-50 border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-900 text-white font-serif font-bold text-lg shadow-md ring-2 ring-purple-300/50">
              NH
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-serif text-slate-900">
                New Hope <span className="text-purple-800">Baptist Church</span>
              </span>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-purple-700/80 -mt-0.5">
                &amp; Bible College
              </span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="/" className="hover:text-emerald-600 transition">Home</a>
            <a href="/sermons" className="hover:text-emerald-600 transition">Sermons & Special Events</a>
            <a href="/#college" className="hover:text-emerald-600 transition">Bible College</a>
            <a href="/#contact" className="hover:text-emerald-600 transition">Contact</a>
          </nav>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest text-purple-700 uppercase mb-2 block">
            ┼ &nbsp; Sermon Study &bull; Biblical Teaching &bull; Encouragement &nbsp; ┼
          </span>

          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wide text-purple-950 leading-tight mb-4">
            Sermons & Special Events
          </h1>

          <p className="text-lg text-slate-700 font-medium mb-6">
            Discover published sermons and special gatherings designed to strengthen your faith and build community.
          </p>

          <div className="rounded-3xl bg-white border border-purple-100 shadow-md p-10">
            <PublicContentList sermons={sermons} events={events} />
          </div>
        </div>
      </main>

      <footer className="bg-purple-950 text-purple-200 py-8 px-4 border-t border-purple-900 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} New Hope Baptist Church & Bible College. All rights reserved.</p>
      </footer>
    </div>
  );
}
