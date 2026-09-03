'use client';

import React from 'react';

export default function Home() {
  const contactInfo = { address: '4911 Old Rural Hall Road, Winston-Salem, NC 27105', phone: '(336) 406-5502', phoneDigits: '3364065502', pastor: 'Chuck Carver' };

  async function shareSite() {
    try {
      if (navigator.share) await navigator.share({ title: 'New Hope Baptist Church & Bible College', text: 'Check out New Hope Baptist Church & Bible College!', url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); alert('New Hope link copied!'); }
    } catch (error) { console.log('Share cancelled', error); }
  }

  return (
    <main className="min-h-screen bg-[#eeeaf3] text-[#211b29]">
      <div className="mx-auto min-h-screen max-w-md overflow-hidden bg-[#fbf9fd] pb-24 shadow-2xl">
        <section id="home" className="relative overflow-hidden bg-[#24152f]">
          <div className="relative h-[285px] sm:h-[320px]">
            <img src="/new hope 2.png" alt="New Hope Baptist Church" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/15" />
            <div className="absolute inset-x-0 top-4 px-4 text-center"><p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white drop-shadow-lg">Winston-Salem, North Carolina</p></div>
          </div>
          <div className="bg-gradient-to-br from-[#291733] via-[#341d40] to-[#24152f] px-5 py-5 text-center text-white">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#eadbb5]">Faith • Family • Fellowship</p>
            <h1 className="font-serif text-[42px] font-bold leading-[0.98]">New Hope</h1>
            <p className="mt-2 text-base font-semibold uppercase tracking-[0.22em] text-[#d8b6e8]">Baptist Church</p>
            <p className="mt-1 text-sm font-medium text-[#f4eaf7]">&amp; Bible College</p>
          </div>
        </section>

        <section className="px-5 py-5 text-center"><p className="font-serif text-xl leading-7 text-[#35263f]">Loving God, Loving People, Preparing Disciples for The Ministry.</p></section>

        <section className="grid grid-cols-2 gap-3 px-4">
          <a href="/sermons" className="rounded-[22px] bg-[#25152f] p-5 text-center text-white shadow-lg"><div className="text-2xl">🎙️</div><p className="mt-2 font-serif text-lg font-semibold">Sermons</p><p className="mt-1 text-xs text-[#dbc9e3]">Messages &amp; Special Events</p></a>
          <a href="/bible-college" className="rounded-[22px] bg-gradient-to-br from-[#7a3e8e] to-[#4d245f] p-5 text-center text-white shadow-lg"><div className="text-2xl">📖</div><p className="mt-2 font-serif text-lg font-semibold">Bible College</p><p className="mt-1 text-xs text-[#eadcf0]">Learn • Grow • Serve</p></a>
          <a href="/calendar" className="rounded-[22px] border border-[#decfe5] bg-white p-5 text-center shadow-sm"><div className="text-2xl">📅</div><p className="mt-2 font-serif text-lg font-semibold text-[#4f285e]">Calendar</p><p className="mt-1 text-xs text-[#6b6070]">Services &amp; Events</p></a>
          <a href="/pictures" className="rounded-[22px] border border-[#decfe5] bg-white p-5 text-center shadow-sm"><div className="text-2xl">📷</div><p className="mt-2 font-serif text-lg font-semibold text-[#4f285e]">Pictures</p><p className="mt-1 text-xs text-[#6b6070]">New Hope Gallery</p></a>
        </section>

        <section className="mt-3 grid grid-cols-2 gap-3 px-4">
          <a href={`tel:${contactInfo.phoneDigits}`} className="rounded-[18px] border border-[#decfe5] bg-white px-3 py-4 text-center shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6e3c7f]">Call Church</p><p className="mt-1 text-sm font-semibold">{contactInfo.phone}</p></a>
          <button type="button" onClick={shareSite} className="rounded-[18px] border border-[#decfe5] bg-white px-3 py-4 text-center shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6e3c7f]">Share</p><p className="mt-1 text-sm font-semibold">New Hope App</p></button>
        </section>

        <section className="mx-4 mt-4 overflow-hidden rounded-[24px] border border-[#e4d9e9] bg-white shadow-sm"><div className="p-5"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7d498f]">Welcome</p><h2 className="mt-1 font-serif text-2xl font-bold text-[#26192f]">A Place to Worship, Learn &amp; Grow</h2><p className="mt-3 text-sm leading-6 text-[#665b6c]">New Hope Baptist Church welcomes you to worship with us and grow in faith through biblical teaching, fellowship, and ministry.</p></div></section>

        <section className="mx-4 mt-4 overflow-hidden rounded-[24px] border border-[#d8b84e] bg-gradient-to-br from-[#fffaf0] to-[#f5ecce] shadow-sm">
          <img src="/New Hope Victory Path.png" alt="New Hope partnering with Victory Path mentoring and evangelism program" className="w-full object-contain" />
          <div className="p-5 text-center"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8b6511]">Mentoring &amp; Evangelism</p><h2 className="mt-2 font-serif text-2xl font-bold text-[#0b285c]">New Hope / Victory Path</h2><p className="mt-2 text-sm leading-6 text-[#62583f]">A basketball program for young women centered on faith, mentoring, character and opportunity.</p><a href="/victory-path" className="mt-4 block rounded-[16px] bg-[#0b285c] px-4 py-3 text-sm font-bold text-white">Visit Victory Path</a></div>
        </section>

        <section className="mx-4 mt-4 overflow-hidden rounded-[24px] bg-[#25152f] text-white shadow-lg"><img src="/new hope 4.png" alt="Pastor Chuck Carver" className="h-56 w-full object-cover object-top" /><div className="p-5"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e1bd73]">Academic Ministry</p><h2 className="mt-1 font-serif text-2xl font-bold">New Hope Bible College</h2><p className="mt-3 text-sm leading-6 text-[#e1d5e6]">Equipping future leaders, pastors, and disciples with comprehensive theological education and practical ministry training.</p><div className="mt-4 space-y-2 text-sm"><p>✓ Evening classes</p><p>✓ In-depth Theology and Biblical Studies</p></div><a href="/bible-college" className="mt-4 block rounded-[16px] bg-white px-4 py-3 text-center text-sm font-bold text-[#4f285e]">Visit Bible College</a></div></section>

        <section className="mx-4 mt-4 rounded-[24px] border border-[#e4d9e9] bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7d498f]">Join Us</p><h2 className="mt-1 font-serif text-2xl font-bold">Service Times</h2><div className="mt-4 space-y-3 text-sm"><div className="flex justify-between border-b pb-3"><span className="font-semibold">Sunday Morning Worship</span><strong className="text-[#714083]">11:00 AM</strong></div><div className="flex justify-between border-b pb-3"><span className="font-semibold">Sunday Evening Worship</span><strong className="text-[#714083]">6:00 PM</strong></div><div className="flex justify-between"><span className="font-semibold">Wednesday Bible Study</span><strong className="text-right text-[#714083]">10:00 AM<br />&amp; 7:00 PM</strong></div></div></section>

        <section id="contact" className="mx-4 mt-4 rounded-[24px] bg-gradient-to-br from-[#7a3e8e] to-[#4b245b] p-5 text-white shadow-lg"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f0d58f]">Visit New Hope</p><h2 className="mt-1 font-serif text-2xl font-bold">Location &amp; Contact</h2><div className="mt-4 space-y-3 text-sm"><p><span className="text-[#ddc8e5]">Pastor:</span> {contactInfo.pastor}</p><p>{contactInfo.address}</p><p>{contactInfo.phone}</p></div><div className="mt-5 grid grid-cols-3 gap-2"><a href={`tel:${contactInfo.phoneDigits}`} className="rounded-[14px] bg-white/15 px-2 py-3 text-center text-sm font-semibold">Call</a><a href={`sms:${contactInfo.phoneDigits}`} className="rounded-[14px] bg-white/15 px-2 py-3 text-center text-sm font-semibold">Text</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`} target="_blank" rel="noopener noreferrer" className="rounded-[14px] bg-white px-2 py-3 text-center text-sm font-bold text-[#5b2c6b]">Directions</a></div></section>

        <section className="mx-4 mt-5 rounded-[22px] border-2 border-[#5e346e] bg-[#f8f1fb] p-5 text-center shadow-md"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7d498f]">Church Administration</p><h2 className="mt-1 font-serif text-xl font-bold text-[#2f1d38]">Pastor Dashboard</h2><p className="mt-2 text-sm text-[#6b6070]">Manage sermons, calendar events, pictures, education and Victory Path updates.</p><a href="/pastor/login" className="mt-4 block rounded-[16px] bg-[#4f285e] px-4 py-3.5 text-center text-sm font-bold text-white shadow-lg">🔐 Pastor Login</a></section>

        <footer className="px-5 py-7 text-center text-xs text-[#756b7b]">© {new Date().getFullYear()} New Hope Baptist Church &amp; Bible College</footer>
      </div>
    </main>
  );
}
