'use client';
import React from 'react';

export default function Home() {
  const contactInfo = {
    address: "4911 Old Rural Hall Road, Winston-Salem, NC 27105",
    phone: "(336) 406-5502",
    pastor: "Chuck Carver"
  };

  return (
    <div className="min-h-screen bg-purple-50 text-slate-800">
      {/* Top Banner */}
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

      {/* Main Header */}
      <header className="bg-purple-100 text-purple-950 shadow-sm sticky top-0 z-50 border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
         <div className="flex items-center gap-3.5">
  {/* Decorative Logo Badge */}
  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-900 text-white font-serif font-bold text-lg shadow-md ring-2 ring-purple-300/50">
    NH
  </div>

  {/* Two-Tiered Typography */}
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
            <a href="#home" className="hover:text-emerald-600 transition">Home</a>
            <a href="#sermons" className="hover:text-emerald-600 transition">Sermons</a>
            <a href="#college" className="hover:text-emerald-600 transition">Bible College</a>
            <a href="#contact" className="hover:text-emerald-600 transition">Contact</a>
          </nav>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'New Hope Baptist Church & Bible College',
                  text: 'Check out New Hope Baptist Church & Bible College!',
                  url: window.location.href,
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md font-semibold text-sm transition flex items-center justify-center gap-2"
          >
            <span>🔗</span> Share Site
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
    <section id="home" className="bg-purple-50 text-purple-950 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative Eyebrow */}
        <span className="text-xs font-semibold tracking-widest text-purple-700 uppercase mb-2 block">
          ┼ &nbsp; Faith &bull; Family &bull; Fellowship &nbsp; ┼
        </span>

        {/* Main Decorative Heading */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-wide bg-gradient-to-r from-purple-950 via-purple-800 to-indigo-950 bg-clip-text text-transparent drop-shadow-sm pb-2 leading-tight mb-2">
  Welcome to New Hope
</h1>

        {/* Decorative Flourish Divider */}
        <div className="mb-6 flex items-center justify-center gap-3 opacity-80">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-purple-400 to-purple-600"></div>
          <span className="text-amber-500 text-xs">✦</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-purple-400 to-purple-600"></div>
        </div>

        <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-purple-100">
          <img src="/new hope 2.png" alt="New Hope Baptist Church" className="w-full h-auto object-cover" />
        </div>

        <p className="text-lg text-slate-700 font-medium mb-6">
          Loving God, Loving People, Preparing Disciples for The Ministry.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm">
            Sermons
          </button>
          <button className="w-full sm:w-auto border-2 border-purple-700 text-purple-700 hover:bg-purple-100 px-6 py-3 rounded-xl font-semibold transition">
            Bible College
          </button>
        </div>
      </div>
    </section>

        {/* Bible College Section */}
        <section id="college" className="py-12 px-4 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-md border border-purple-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">Academic Ministry</span>
              <h2 className="text-3xl font-extrabold text-purple-950 mt-1 mb-4">New Hope Bible College</h2>
              <p className="text-slate-600 mb-6">
                Equipping future leaders, pastors, and disciples with comprehensive theological education and practical ministry training.
              </p>
              <ul className="space-y-2 mb-6 text-slate-700 text-sm font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> Evening classes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> In-depth Theology and Biblical Studies
                </li>
              </ul>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h3 className="text-emerald-700 font-bold text-base mb-1">Upcoming Semester</h3>
                <p className="text-slate-600 text-sm">
                  Enrollment is open for upcoming courses. Contact the church office for registration details.
                </p>
              </div>
            </div>
            <div className="relative w-full rounded-xl overflow-hidden shadow-sm">
              <img src="/new hope 4.png" alt="Pastor Chuck Carver" className="w-full h-auto object-top rounded-xl" />
            </div>
          </div>
        </section>

        {/* Service Times & Location Section */}
        <section id="contact" className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-purple-100 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Times</h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Sunday Morning Worship</span>
                  <span className="text-emerald-600 font-bold">11:00 AM</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Sunday Evenning Worship</span>
                  <span className="text-emerald-600 font-bold">6:00 PM</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Wednesday Bible Study</span>
                  <span className="text-emerald-600 font-bold">10:00 AM & 7:00 PM</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Location & Contact</h2>
              <div className="space-y-2 text-sm text-slate-800">
                <p><strong>Pastor:</strong> {contactInfo.pastor}</p>
                <p>
                  <strong>Address:</strong>{' '}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:underline font-medium"
                  >
                    {contactInfo.address}
                  </a>
                </p>
                <p className="flex items-center gap-3 pt-1">
                  <strong>Phone:</strong>
                  <a
                    href={`tel:${contactInfo.phone.replace(/[^0-9]/g, '')}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md text-xs font-semibold transition"
                  >
                    Call
                  </a>
                  <a
                    href={`sms:${contactInfo.phone.replace(/[^0-9]/g, '')}`}
                    className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded-md text-xs font-semibold transition"
                  >
                    Text
                  </a>
                  <span className="text-slate-600 font-medium">{contactInfo.phone}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-950 text-purple-200 py-8 px-4 border-t border-purple-900 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} New Hope Baptist Church & Bible College. All rights reserved.</p>
      </footer>
    </div>
  );
}
