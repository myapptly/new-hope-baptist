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
            <span>📍 4911 Old Rural Hall Road, Winston-Salem, NC 27105</span>
            <span className="hidden sm:inline">|</span>
            <span className="whitespace-nowrap">📞 (336) 406-5502</span>
          </div>
          <div>Pastor: Chuck Carver</div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-purple-100 text-purple-950 shadow-sm sticky top-0 z-50 border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              NH
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">New Hope Baptist Church</h1>
              <span className="text-xs text-purple-700 font-medium">& Bible College</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#home" className="hover:text-emerald-600 transition">Home</a>
            <a href="#sermons" className="hover:text-emerald-600 transition">Sermons</a>
            <a href="#college" className="hover:text-emerald-600 transition">Bible College</a>
            <a href="#contact" className="hover:text-emerald-600 transition">Contact</a>
          </nav>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-semibold text-sm transition">
            Plan Your Visit
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="bg-purple-50 text-purple-950 py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Welcome to New Hope</h1>
            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-purple-100">
              <img src="/new hope 2.png" alt="New Hope Baptist Church" className="w-full h-auto object-cover" />
            </div>
            <p className="text-lg text-slate-700 font-medium mb-6">
              Loving God, Loving People, Preparing Disciples for The Ministry.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm">
                Watch Sermons
              </button>
              <button className="w-full sm:w-auto border-2 border-purple-700 text-purple-700 hover:bg-purple-100 px-6 py-3 rounded-xl font-semibold transition">
                Explore Bible College
              </button>
             
              {/* Share Button */}
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
                className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-5 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>🔗</span> Share Site
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
                  <span className="text-emerald-600">✓</span> Flexible online and evening classes
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
                  <span className="font-semibold">Sunday School</span>
                  <span className="text-emerald-600 font-bold">9:30 AM</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Sunday Morning Worship</span>
                  <span className="text-emerald-600 font-bold">10:45 AM</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Wednesday Bible Study</span>
                  <span className="text-emerald-600 font-bold">7:00 PM</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Location & Contact</h2>
              <div className="space-y-2 text-sm text-slate-800">
                <p><strong>Pastor:</strong> {contactInfo.pastor}</p>
                <p><strong>Address:</strong> {contactInfo.address}</p>
                <p><strong>Phone:</strong> {contactInfo.phone}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-950 text-purple-200 py-8 px-4 border-t border-purple-900 text-center text-sm">
        <p>© {new Date().getFullYear()} New Hope Baptist Church & Bible College. All rights reserved.</p>
      </footer>
    </div>
  );
}
