import './globals.css';
import React from 'react';

export default function Home() {
  const contactInfo = {
    pastor: "Chuck Carver",
    phone: "(336) 406-5502",
    address: "4911 Old Rural Hall Road, Winston-Salem, NC  27105",
    sundaySchool: "9:30 AM",
    sundayWorship: "10:45 AM",
    wednesdayService: "7:00 PM",
    heroImage: "/new hope 2.png",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Banner with Quick Address & Phone */}
      {/* Top Notification Bar */}
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
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center font-bold text-lg">
              NH
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">New Hope Baptist Church</h1>
              <span className="text-xs text-slate-400">& Bible College</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#home" className="hover:text-amber-500 transition">Home</a>
            <a href="#sermons" className="hover:text-amber-500 transition">Sermons</a>
            <a href="#college" className="hover:text-amber-500 transition">Bible College</a>
            <a href="#contact" className="hover:text-amber-500 transition">Contact</a>
          </nav>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-semibold text-sm transition">
            Plan Your Visit
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative bg-slate-900 text-white py-20 px-4 text-center">
          <div className="relative max-w-4xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Welcome to New Hope
            </h2> 
            <img
              src="/new hope 2.png" 
              alt="New Hope Baptist Church" 
              className="w-full max-w-3xl mx-auto rounded-xl shadow-lg mb-6" 
              />
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              Loving God, Loving People, Preparing Disciples for The Ministry.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="#sermons" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-bold transition">
                Watch Sermons
              </a>
              <a href="#college" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-md font-bold border border-slate-700 transition">
                Explore Bible College
              </a>
            </div>
          </div>
        </section>

        {/* Dedicated Bible College Highlight Section */}
        <section id="college" className="py-16 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-amber-500 font-semibold tracking-wider text-sm uppercase">Academic Ministry</span>
              <h2 className="text-3xl md:text-4xl font-bold">New Hope Bible College</h2>
              <p className="text-slate-300 leading-relaxed">
                Equipping future leaders, pastors, and disciples with comprehensive theological education and practical ministry training.
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-center space-x-2">
                  <span className="text-amber-500">✓</span>
                  <span>Flexible online and evening classes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-500">✓</span>
                  <span>In-depth Theology and Biblical Studies</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-amber-500">Upcoming Semester</h3>
              <p className="text-sm text-slate-300">Enrollment is open for upcoming courses. Contact the church office for registration details.</p>
            </div>
          </div>
        </section>

        {/* Service Times & Location Section */}
        <section id="contact" className="max-w-7xl mx-auto px-4 py-16 space-y-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Times</h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Sunday School</span>
                  <span className="text-amber-600 font-bold">{contactInfo.sundaySchool}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Sunday Morning Worship</span>
                  <span className="text-amber-600 font-bold">{contactInfo.sundayWorship}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Wednesday Bible Study</span>
                  <span className="text-amber-600 font-bold">{contactInfo.wednesdayService}</span>
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
      <footer className="bg-slate-950 text-slate-400 py-8 px-4 border-t border-slate-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} New Hope Baptist Church & Bible College. All rights reserved.</p>
      </footer>
    </div>
  );
}

 
