import { createServerClient } from '../../lib/supabase/server';

export const dynamic = 'force-dynamic';

type VictoryItem = {
  id: string;
  title: string;
  description: string | null;
  resource_link: string | null;
  video_link: string | null;
};

export default async function VictoryPathPage() {
  const supabase = await createServerClient();
  const { data = [] } = await supabase
    .from('education')
    .select('id,title,description,resource_link,video_link')
    .eq('published', true)
    .eq('category', 'Victory Path')
    .order('created_at', { ascending: false });

  const items = data as VictoryItem[];

  return (
    <main className="min-h-screen bg-[#eef3f8] text-[#10244a]">
      <div className="mx-auto min-h-screen max-w-md bg-white pb-28 shadow-2xl">
        <header className="bg-gradient-to-br from-[#071b43] via-[#0b2b63] to-[#071b43] px-5 pb-7 pt-7 text-center text-white">
          <a href="/" className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4c54d]">← New Hope</a>
          <div className="mt-5 overflow-hidden rounded-[22px] border border-white/20 bg-white shadow-lg">
            <img src="/New Hope Victory Path.png" alt="New Hope partnering with Victory Path mentoring and evangelism program" className="w-full object-contain" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#f4c54d]">Mentoring &amp; Evangelism</p>
          <h1 className="mt-2 font-serif text-4xl font-bold">New Hope / Victory Path</h1>
          <p className="mt-3 text-sm leading-6 text-blue-100">A basketball program for young women focused on faith, mentoring, character, opportunity and the future.</p>
        </header>

        <section className="px-4 py-5">
          <div className="rounded-[24px] border border-[#ead28b] bg-[#fffaf0] p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6511]">Faith • Hope • Future</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-[#0b285c]">Building young women on and off the court</h2>
            <p className="mt-3 text-sm leading-6 text-[#4e596d]">Victory Path partners with New Hope Baptist Church to use basketball, mentoring and evangelism to encourage young women and help them grow in faith and life.</p>
          </div>

          <div className="mt-4 rounded-[24px] bg-[#0b285c] p-5 text-center text-white shadow-lg">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4c54d]">Support Victory Path</p>
            <p className="mt-3 font-serif text-xl font-bold">Send generous donations to:</p>
            <p className="mt-3 leading-6">New Hope / Victory Path<br />P. O. Box 4027<br />Winston-Salem, NC 27115</p>
          </div>

          {items.length ? (
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <article key={item.id} className="rounded-[24px] border border-[#dce4ef] bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a8750a]">Victory Path Update</p>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-[#0b285c]">{item.title}</h2>
                  {item.description ? <p className="mt-3 text-sm leading-6 text-[#596579]">{item.description}</p> : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.resource_link ? <a href={item.resource_link} target="_blank" rel="noreferrer" className="rounded-xl bg-[#0b285c] px-4 py-2 text-sm font-bold text-white">Learn More</a> : null}
                    {item.video_link ? <a href={item.video_link} target="_blank" rel="noreferrer" className="rounded-xl border border-[#0b285c] px-4 py-2 text-sm font-bold text-[#0b285c]">Watch Video</a> : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[24px] border border-[#dce4ef] bg-white p-6 text-center shadow-sm">
              <p className="text-sm leading-6 text-[#596579]">Pastor Carver can publish Victory Path news, program information, registration links and videos from the Pastor Dashboard.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
