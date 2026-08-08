export default function BibleCollegePage() {
  return (
    <div className="min-h-screen bg-purple-50 text-slate-900">
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
            <a href="/bible-college" className="font-semibold text-purple-800">Bible College</a>
          </nav>
        </div>
      </header>

      <main className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold tracking-widest text-purple-700 uppercase mb-2 block">
              ┼ &nbsp; Equipping Leaders &bull; Biblical Scholarship &bull; Spiritual Growth &nbsp; ┼
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wide text-purple-950 leading-tight">
              Bible College
            </h1>
            <p className="mt-4 text-slate-700 text-base md:text-lg max-w-2xl mx-auto">
              A ministry of New Hope Baptist Church focused on biblical education and ministry preparation.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-purple-100 bg-white shadow-xl mx-auto max-w-5xl">
            <img
              src="/new hope bible college.png"
              alt="New Hope Bible College"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="mt-10 rounded-3xl bg-white border border-purple-100 shadow-md p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
              <div>
                <h2 className="text-3xl font-extrabold text-purple-950 mb-4">About Bible College</h2>
                <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                  New Hope Bible College offers a Christ-centered academic experience that honors the church’s legacy and prepares students for lifelong ministry.
                </p>
              </div>
              <div className="rounded-3xl bg-purple-50 border border-purple-100 p-6">
                <p className="text-purple-800 font-semibold uppercase tracking-[0.18em] text-xs mb-3">
                  Learn more
                </p>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li>• Faith-driven curriculum</li>
                  <li>• Practical ministry training</li>
                  <li>• Small classroom community</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-purple-950 text-purple-200 py-8 px-4 border-t border-purple-900 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} New Hope Baptist Church & Bible College. All rights reserved.</p>
      </footer>
    </div>
  );
}
