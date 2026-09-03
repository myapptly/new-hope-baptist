'use client';

import React from 'react';

export default function Home() {
  const contactInfo = {
    address: '4911 Old Rural Hall Road, Winston-Salem, NC 27105',
    phone: '(336) 406-5502',
    phoneDigits: '3364065502',
    pastor: 'Chuck Carver',
  };

  async function shareSite() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'New Hope Baptist Church & Bible College',
          text: 'Check out New Hope Baptist Church & Bible College!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('New Hope link copied!');
      }
    } catch (error) {
      console.log('Share cancelled', error);
    }
  }

  return (
    <main className="min-h-screen bg-[#eeeaf3] text-[#211b29]">
      <div className="mx-auto min-h-screen max-w-md overflow-hidden bg-[#fbf9fd] shadow-2xl">
        {/* Hero photo */}
        <section id="home" className="relative overflow-hidden bg-[#24152f]">
          <div className="relative h-[285px] sm:h-[320px]">
            <img
              src="/new hope 2.png"
              alt="New Hope Baptist Church"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/15" />

            <div className="absolute inset-x-0 top-4 px-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white drop-shadow-lg">
                Winston-Salem, North Carolina
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#291733] via-[#341d40] to-[#24152f] px-5 py-5 text-center text-white">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#eadbb5]">
              Faith • Family • Fellowship
            </p>
            <h1 className="font-serif text-[42px] font-bold leading-[0.98]">
              New Hope
            </h1>
            <p className="mt-2 text-base font-semibold uppercase tracking-[0.22em] text-[#d8b6e8]">
              Baptist Church
            </p>
            <p className="mt-1 text-sm font-medium text-[#f4eaf7]">&amp; Bible College</p>
          </div>
        </section>

        {/* Mission */}
        <section className="px-5 py-5 text-center">
          <p className="font-serif text-xl leading-7 text-[#35263f]">
            Loving God, Loving People, Preparing Disciples for The Ministry.
          </p>
        </section>

        {/* Primary actions */}
        <section className="grid grid-cols-2 gap-3 px-4">
          <a
            href="/sermons"
            className="rounded-[22px] bg-[#25152f] p-5 text-center text-white shadow-lg transition active:scale-[0.98]"
          >
            <div className="text-2xl">🎙️</div>
            <p className="mt-2 font-serif text-lg font-semibold">Sermons</p>
            <p className="mt-1 text-xs text-[#dbc9e3]">Messages &amp; Special Events</p>
          </a>

          <a
            href="/bible-college"
            className="rounded-[22px] bg-gradient-to-br from-[#7a3e8e] to-[#4d245f] p-5 text-center text-white shadow-lg transition active:scale-[0.98]"
          >
            <div className="text-2xl">📖</div>
            <p className="mt-2 font-serif text-lg font-semibold">Bible College</p>
            <p className="mt-1 text-xs text-[#eadcf0]">Learn • Grow • Serve</p>
          </a>
        </section>

        <section className="mt-3 grid grid-cols-2 gap-3 px-4">
          <a
            href={`tel:${contactInfo.phoneDigits}`}
            className="rounded-[18px] border border-[#decfe5] bg-white px-3 py-4 text-center shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6e3c7f]">Call Church</p>
            <p className="mt-1 text-sm font-semibold text-[#3a2d42]">{contactInfo.phone}</p>
          </a>

          <button
            type="button"
            onClick={shareSite}
            className="rounded-[18px] border border-[#decfe5] bg-white px-3 py-4 text-center shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6e3c7f]">Share</p>
            <p className="mt-1 text-sm font-semibold text-[#3a2d42]">New Hope App</p>
          </button>
        </section>

        {/* Welcome card */}
        <section className="mx-4 mt-4 overflow-hidden rounded-[24px] border border-[#e4d9e9] bg-white shadow-sm">
          <div className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7d498f]">Welcome</p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#26192f]">A Place to Worship, Learn &amp; Grow</h2>
            <p className="mt-3 text-sm leading-6 text-[#665b6c]">
              New Hope Baptist Church welcomes you to worship with us and grow in faith through biblical teaching, fellowship, and ministry.
            </p>
          </div>
        </section>

        {/* Victory placeholder */}
        <section id="victory" className="mx-4 mt-4 overflow-hidden rounded-[24px] border border-[#ddc98f] bg-gradient-to-br from-[#fffaf0] to-[#f5ecce] shadow-sm scroll-mt-20">
          <div className="p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7b6433]">Reserved Feature</p>
            <div className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#3d2348] text-2xl text-white shadow">✦</div>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#2f1d38]">Victory</h2>
            <p className="mt-2 text-sm leading-6 text-[#6e6048]">
              A dedicated place has been reserved here for the Victory feature Pastor Carver discussed.
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b7442]">Details Coming Soon</p>
          </div>
        </section>

        {/* Bible College */}
        <section className="mx-4 mt-4 overflow-hidden rounded-[24px] bg-[#25152f] text-white shadow-lg">
          <img
            src="/new hope 4.png"
            alt="Pastor Chuck Carver"
            className="h-56 w-full object-cover object-top"
          />
          <div className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e1bd73]">Academic Ministry</p>
            <h2 className="mt-1 font-serif text-2xl font-bold">New Hope Bible College</h2>
            <p className="mt-3 text-sm leading-6 text-[#e1d5e6]">
              Equipping future leaders, pastors, and disciples with comprehensive theological education and practical ministry training.
            </p>
            <div className="mt-4 space-y-2 text-sm text-[#f4edf7]">
              <p>✓ Evening classes</p>
              <p>✓ In-depth Theology and Biblical Studies</p>
            </div>
            <div className="mt-4 rounded-[18px] bg-white/10 p-4">
              <p className="font-semibold text-[#f0d690]">Upcoming Semester</p>
              <p className="mt-1 text-sm leading-5 text-[#eee5f2]">
                Enrollment is open for upcoming courses. Contact the church office for registration details.
              </p>
            </div>
            <a
              href="/bible-college"
              className="mt-4 block rounded-[16px] bg-white px-4 py-3 text-center text-sm font-bold text-[#4f285e]"
            >
              Visit Bible College
            </a>
          </div>
        </section>

        {/* Service Times */}
        <section className="mx-4 mt-4 rounded-[24px] border border-[#e4d9e9] bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7d498f]">Join Us</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#26192f]">Service Times</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4 border-b border-[#eee7f1] pb-3">
              <span className="font-semibold text-[#45384c]">Sunday Morning Worship</span>
              <span className="whitespace-nowrap font-bold text-[#714083]">11:00 AM</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-[#eee7f1] pb-3">
              <span className="font-semibold text-[#45384c]">Sunday Evening Worship</span>
              <span className="whitespace-nowrap font-bold text-[#714083]">6:00 PM</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="font-semibold text-[#45384c]">Wednesday Bible Study</span>
              <span className="text-right font-bold text-[#714083]">10:00 AM<br />&amp; 7:00 PM</span>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-4 mt-4 scroll-mt-20 rounded-[24px] bg-gradient-to-br from-[#7a3e8e] to-[#4b245b] p-5 text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f0d58f]">Visit New Hope</p>
          <h2 className="mt-1 font-serif text-2xl font-bold">Location &amp; Contact</h2>

          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#ddc8e5]">Pastor</p>
              <p className="mt-1 font-semibold">{contactInfo.pastor}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[#ddc8e5]">Address</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-semibold underline decoration-white/40 underline-offset-4"
              >
                {contactInfo.address}
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[#ddc8e5]">Phone</p>
              <p className="mt-1 font-semibold">{contactInfo.phone}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <a
              href={`tel:${contactInfo.phoneDigits}`}
              className="rounded-[14px] bg-white/15 px-2 py-3 text-center text-sm font-semibold"
            >
              Call
            </a>
            <a
              href={`sms:${contactInfo.phoneDigits}`}
              className="rounded-[14px] bg-white/15 px-2 py-3 text-center text-sm font-semibold"
            >
              Text
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[14px] bg-white px-2 py-3 text-center text-sm font-bold text-[#5b2c6b]"
            >
              Directions
            </a>
          </div>
        </section>

        {/* QR / install */}
        <section className="mx-4 mt-4 rounded-[24px] border border-[#e4d9e9] bg-white p-5 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7d498f]">Keep New Hope With You</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#26192f]">Add the App to Your Phone</h2>
          <p className="mt-2 text-sm leading-5 text-[#6b6070]">Scan the QR code or add New Hope directly to your home screen.</p>

          <img
            src="/new-hope-baptist-qr-code.png"
            alt="New Hope Baptist Church QR Code"
            className="mx-auto mt-5 h-44 w-44 object-contain"
          />

          <div className="mt-5 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-[18px] bg-[#f5f0f7] p-4">
              <p className="font-bold text-[#4f285e]">Android</p>
              <p className="mt-1 text-xs leading-5 text-[#6a5f70]">Chrome → three-dot menu → Add to Home screen or Install app.</p>
            </div>
            <div className="rounded-[18px] bg-[#f5f0f7] p-4">
              <p className="font-bold text-[#4f285e]">iPhone</p>
              <p className="mt-1 text-xs leading-5 text-[#6a5f70]">Safari → Share → Add to Home Screen.</p>
            </div>
          </div>
        </section>

        <footer className="px-5 pb-28 pt-7 text-center text-xs text-[#756b7b]">
          <p>© {new Date().getFullYear()} New Hope Baptist Church &amp; Bible College</p>
          <a href="/pastor/login" className="mt-2 inline-block font-semibold text-[#6b3a7c] underline underline-offset-4">
            Pastor Login
          </a>
        </footer>

        {/* Persistent mobile navigation */}
        <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto grid max-w-md grid-cols-5 border-t border-[#d9c9df] bg-[#fffafd]/98 px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_28px_rgba(47,29,58,0.14)] backdrop-blur-md">
          <a href="#home" className="flex flex-col items-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-bold text-[#5e346e]">
            <span className="text-lg leading-none">⌂</span>
            Home
          </a>
          <a href="/sermons" className="flex flex-col items-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-bold text-[#5e346e]">
            <span className="text-lg leading-none">🎙️</span>
            Sermons
          </a>
          <a href="/bible-college" className="flex flex-col items-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-bold text-[#5e346e]">
            <span className="text-lg leading-none">📖</span>
            College
          </a>
          <a href="#victory" className="flex flex-col items-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-bold text-[#5e346e]">
            <span className="text-lg leading-none">✦</span>
            Victory
          </a>
          <a href="#contact" className="flex flex-col items-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-bold text-[#5e346e]">
            <span className="text-lg leading-none">☎</span>
            Contact
          </a>
        </nav>
      </div>
    </main>
  );
}
