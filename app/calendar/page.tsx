import { createServerClient } from '../../lib/supabase/server';

export const dynamic = 'force-dynamic';

type SpecialEvent = {
  id: string;
  event_name: string;
  event_type: string;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  location: string;
  description: string | null;
};

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(value: string | null) {
  if (!value) return '';
  const date = new Date(`1970-01-01T${value}`);
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

export default async function CalendarPage() {
  const supabase = await createServerClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data = [] } = await supabase
    .from('special_events')
    .select('id,event_name,event_type,event_date,start_time,end_time,location,description')
    .eq('published', true)
    .gte('event_date', today)
    .order('event_date', { ascending: true })
    .order('start_time', { ascending: true });

  const events = data as SpecialEvent[];

  return (
    <main className="min-h-screen bg-[#eeeaf3] text-[#211b29]">
      <div className="mx-auto min-h-screen max-w-md bg-[#fbf9fd] shadow-2xl">
        <header className="bg-gradient-to-br from-[#291733] via-[#3a2147] to-[#24152f] px-5 pb-7 pt-7 text-center text-white">
          <a href="/" className="text-xs font-bold uppercase tracking-[0.2em] text-[#eadbb5]">← New Hope</a>
          <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-3xl">🗓️</div>
          <h1 className="mt-3 font-serif text-4xl font-bold">Church Calendar</h1>
          <p className="mt-2 text-sm leading-6 text-[#eadff0]">Upcoming services, gatherings, Bible College events, and special occasions.</p>
        </header>

        <section className="px-4 py-5 pb-28">
          <div className="mb-4 rounded-[22px] border border-[#e4d9e9] bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7d498f]">Weekly Worship</p>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex justify-between gap-3 border-b border-[#eee7f1] pb-3"><span className="font-semibold">Sunday Morning Worship</span><strong className="text-[#714083]">11:00 AM</strong></div>
              <div className="flex justify-between gap-3 border-b border-[#eee7f1] pb-3"><span className="font-semibold">Sunday Evening Worship</span><strong className="text-[#714083]">6:00 PM</strong></div>
              <div className="flex justify-between gap-3"><span className="font-semibold">Wednesday Bible Study</span><strong className="text-right text-[#714083]">10:00 AM<br />&amp; 7:00 PM</strong></div>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="rounded-[24px] border border-[#e4d9e9] bg-white p-7 text-center shadow-sm">
              <div className="text-4xl">📅</div>
              <h2 className="mt-3 font-serif text-2xl font-bold text-[#2f1d38]">No Upcoming Special Events</h2>
              <p className="mt-2 text-sm leading-6 text-[#6a5f70]">When Pastor Carver publishes an event, it will automatically appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <article key={event.id} className="overflow-hidden rounded-[24px] border border-[#e4d9e9] bg-white shadow-sm">
                  <div className="border-l-4 border-[#7a3e8e] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7d498f]">{event.event_type}</p>
                    <h2 className="mt-1 font-serif text-2xl font-bold text-[#2f1d38]">{event.event_name}</h2>
                    <p className="mt-2 font-semibold text-[#5e346e]">{formatDate(event.event_date)}</p>
                    {event.start_time ? (
                      <p className="mt-1 text-sm text-[#514759]">
                        {formatTime(event.start_time)}{event.end_time ? ` – ${formatTime(event.end_time)}` : ''}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm font-medium text-[#514759]">📍 {event.location}</p>
                    {event.description ? <p className="mt-3 text-sm leading-6 text-[#6a5f70]">{event.description}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto grid max-w-md grid-cols-5 border-t border-[#d9c9df] bg-[#fffafd]/98 px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_28px_rgba(47,29,58,0.14)] backdrop-blur-md">
          <a href="/" className="flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-bold text-[#5e346e]"><span className="text-lg">⌂</span>Home</a>
          <a href="/sermons" className="flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-bold text-[#5e346e]"><span className="text-lg">🎙️</span>Sermons</a>
          <a href="/calendar" className="flex flex-col items-center gap-0.5 rounded-xl bg-[#efe4f3] px-1 py-1 text-[10px] font-bold text-[#4f285e]"><span className="text-lg">🗓️</span>Calendar</a>
          <a href="/pictures" className="flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-bold text-[#5e346e]"><span className="text-lg">📷</span>Pictures</a>
          <a href="/#contact" className="flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-bold text-[#5e346e]"><span className="text-lg">☎</span>Contact</a>
        </nav>
      </div>
    </main>
  );
}
