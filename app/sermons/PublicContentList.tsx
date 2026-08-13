'use client';

import { useMemo, useState } from 'react';

type Sermon = {
  id: string;
  title: string;
  sermon_date: string;
  passage: string;
  speaker: string;
  body: string;
  video_link: string;
  published: boolean;
  created_at: string;
};

type SpecialEvent = {
  id: string;
  event_name: string;
  event_type: string;
  event_date: string;
  start_time: string;
  end_time: string | null;
  location: string;
  description: string;
  photo_paths?: string[] | null;
  published: boolean;
  created_at: string;
};

type Props = {
  sermons?: Sermon[] | null;
  events?: SpecialEvent[] | null;
};

const tabs = ['All', 'Sermons', 'Special Events'] as const;
type Tab = (typeof tabs)[number];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

function formatTime(value: string) {
  if (!value) return '';
  const date = new Date(`1970-01-01T${value}`);
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function PublicContentList({ sermons, events }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const sermonList = useMemo(() => sermons ?? [], [sermons]);
  const eventList = useMemo(() => events ?? [], [events]);

  const items = useMemo(() => {
    const sermonItems = sermonList.map((item) => ({
      id: item.id,
      title: item.title,
      label: 'SERMON',
      date: item.sermon_date,
      subtitle: item.passage || item.speaker,
      body: item.body,
      speaker: item.speaker,
      video_link: item.video_link,
      type: 'sermon' as const,
      created_at: item.created_at,
      event_type: '',
      location: '',
      description: '',
      photo_paths: [] as string[],
      start_time: '',
      end_time: null,
    }));

    const eventItems = eventList.map((item) => ({
      id: item.id,
      title: item.event_name,
      label: 'SPECIAL EVENT',
      date: item.event_date,
      subtitle: `${item.event_type} • ${item.location}`,
      body: item.description,
      speaker: '',
      video_link: '',
      type: 'event' as const,
      created_at: item.created_at,
      event_type: item.event_type,
      location: item.location,
      description: item.description,
      photo_paths: item.photo_paths ?? [],
      start_time: item.start_time,
      end_time: item.end_time,
    }));

    return [...sermonItems, ...eventItems].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [sermonList, eventList]);

  const filteredItems = useMemo(() => {
    if (activeTab === 'Sermons') return items.filter((item) => item.type === 'sermon');
    if (activeTab === 'Special Events') return items.filter((item) => item.type === 'event');
    return items;
  }, [activeTab, items]);

  const publicUrl = (path: string) => {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    return base ? `${base}/storage/v1/object/public/special-event-photos/${encodeURIComponent(path)}` : path;
  };

  return (
    <div className="mt-10 space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab ? 'bg-purple-900 text-white' : 'border border-purple-200 bg-white text-purple-700 hover:bg-purple-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-purple-100 bg-white p-10 text-center text-slate-600 shadow-sm">
            No published sermons or special events found.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-700">
                    {item.label}
                  </span>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {formatDate(item.date)}
                    {item.type === 'sermon' && item.speaker ? ` • ${item.speaker}` : ''}
                    {item.type === 'event' && item.event_type ? ` • ${item.event_type}` : ''}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{item.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                  className="rounded-2xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
                >
                  {activeItem === item.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {activeItem === item.id ? (
                <div className="mt-6 space-y-6">
                  {item.type === 'sermon' ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Scripture / Passage</p>
                        <p className="mt-1 text-slate-700">{item.subtitle}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Message</p>
                        <p className="mt-2 whitespace-pre-line text-slate-700">{item.body}</p>
                      </div>
                      {item.video_link ? (
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Video</p>
                          <a href={item.video_link} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">
                            Watch Video
                          </a>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Location</p>
                          <p className="mt-1 text-slate-700">{item.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Time</p>
                          <p className="mt-1 text-slate-700">
                            {formatTime(item.start_time)}{item.end_time ? ` - ${formatTime(item.end_time)}` : ''}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Details</p>
                        <p className="mt-2 whitespace-pre-line text-slate-700">{item.description}</p>
                      </div>
                      {item.photo_paths.length > 0 ? (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {item.photo_paths.map((path) => (
                            <img
                              key={path}
                              src={publicUrl(path)}
                              alt={item.title}
                              className="h-44 w-full rounded-3xl object-cover"
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
