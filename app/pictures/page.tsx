import { createServerClient } from '../../lib/supabase/server';

export const dynamic = 'force-dynamic';

type SpecialEvent = {
  id: string;
  event_name: string;
  event_date: string;
  description: string | null;
  photo_paths: string[] | null;
};

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function PicturesPage() {
  const supabase = await createServerClient();

  const { data = [] } = await supabase
    .from('special_events')
    .select('id,event_name,event_date,description,photo_paths')
    .eq('published', true)
    .order('event_date', { ascending: false });

  const albums = (data as SpecialEvent[]).filter(
    (event) => event.photo_paths && event.photo_paths.length > 0
  );

  return (
    <main className="min-h-screen bg-[#eeeaf3] text-[#211b29]">
      <div className="mx-auto min-h-screen max-w-md bg-[#fbf9fd] shadow-2xl">
        <header className="bg-gradient-to-br from-[#291733] via-[#3a2147] to-[#24152f] px-5 pb-7 pt-7 text-center text-white">
          <a href="/" className="text-xs font-bold uppercase tracking-[0.2em] text-[#eadbb5]">
            ← New Hope
          </a>
          <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-3xl">📷</div>
          <h1 className="mt-3 font-serif text-4xl font-bold">Photo Gallery</h1>
          <p className="mt-2 text-sm leading-6 text-[#eadff0]">
            Celebrating worship, fellowship, special events, and life at New Hope.
          </p>
        </header>

        <section className="px-4 py-5 pb-28">
          {albums.length === 0 ? (
            <div className="rounded-[24px] border border-[#e4d9e9] bg-white p-7 text-center shadow-sm">
              <div className="text-4xl">📸</div>
              <h2 className="mt-3 font-serif text-2xl font-bold text-[#2f1d38]">Pictures Coming Soon</h2>
              <p className="mt-2 text-sm leading-6 text-[#6a5f70]">
                Published event pictures added by the church will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {albums.map((album) => (
                <article key={album.id} className="overflow-hidden rounded-[24px] border border-[#e4d9e9] bg-white shadow-sm">
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7d498f]">{formatDate(album.event_date)}</p>
                    <h2 className="mt-1 font-serif text-2xl font-bold text-[#2f1d38]">{album.event_name}</h2>
                    {album.description ? (
                      <p className="mt-2 text-sm leading-6 text-[#6a5f70]">{album.description}</p>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-2 gap-1 bg-[#eee7f1] p-1">
                    {album.photo_paths!.map((path, index) => {
                      const { data: publicUrlData } = supabase.storage
                        .from('special-event-photos')
                        .getPublicUrl(path);

                      return (
                        <a
                          key={path}
                          href={publicUrlData.publicUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={album.photo_paths!.length === 1 ? 'col-span-2' : ''}
                        >
                          <img
                            src={publicUrlData.publicUrl}
                            alt={`${album.event_name} photo ${index + 1}`}
                            className="aspect-square h-full w-full object-cover"
                          />
                        </a>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto grid max-w-md grid-cols-5 border-t border-[#d9c9df] bg-[#fffafd]/98 px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_28px_rgba(47,29,58,0.14)] backdrop-blur-md">
          <a href="/" className="flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-bold text-[#5e346e]"><span className="text-lg">⌂</span>Home</a>
          <a href="/sermons" className="flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-bold text-[#5e346e]"><span className="text-lg">🎙️</span>Sermons</a>
          <a href="/calendar" className="flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-bold text-[#5e346e]"><span className="text-lg">🗓️</span>Calendar</a>
          <a href="/pictures" className="flex flex-col items-center gap-0.5 rounded-xl bg-[#efe4f3] px-1 py-1 text-[10px] font-bold text-[#4f285e]"><span className="text-lg">📷</span>Pictures</a>
          <a href="/#contact" className="flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-bold text-[#5e346e]"><span className="text-lg">☎</span>Contact</a>
        </nav>
      </div>
    </main>
  );
}
