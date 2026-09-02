'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase/client';

type Sermon = {
  id: string;
  slug: string;
  title: string;
  sermon_date: string;
  passage: string;
  speaker: string;
  content: string;
  body?: string;
  video_link: string;
  published: boolean;
  created_by: string | null;
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
  photo_paths: string[];
  published: boolean;
  created_by: string | null;
  created_at: string;
};

type Education = {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  resource_link: string | null;
  video_link: string | null;
  published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}; 

type ContentListItem = {
  id: string;
  type: 'sermon' | 'event' | 'education';
  title: string;
  subtitle: string;
  status: 'Published' | 'Draft';
  created_at: string;
  raw: Sermon | SpecialEvent | Education;
};

type SelectedPhoto = {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
};

const initialSermon: Sermon = {
  id: '',
  slug: '',
  title: '',
  sermon_date: '',
  passage: '',
  speaker: '',
  content: '',
  body: '',
  video_link: '',
  published: false,
  created_by: null,
  created_at: '',
};

const initialEvent: SpecialEvent = {
  id: '',
  event_name: '',
  event_type: 'Revival',
  event_date: '',
  start_time: '',
  end_time: null,
  location: '',
  description: '',
  photo_paths: [],
  published: false,
  created_by: null,
  created_at: '',
};

const initialEducation: Education = {
  id: '',
  title: '',
  category: null,
  description: null,
  resource_link: null,
  video_link: null,
  published: false,
  created_by: null,
  created_at: '',
  updated_at: '',
};

const eventOptions = [
  'Revival',
  'Homecoming',
  'Special Service',
  'Guest Speaker',
  'Fellowship',
  'Bible College Event',
  'Other',
] as const;

function formatDate(value: string) {
  return value ? new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';
}

function formatTime(value: string) {
  if (!value) return '';
  const date = new Date(`1970-01-01T${value}`);
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function generateSermonSlug(title: string) {
  const normalized = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s+/g, '-');

  return normalized || 'sermon';
}

export default function DashboardClient() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
const [activeTab, setActiveTab] = useState<'sermon' | 'event' | 'education'>('sermon'); 
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [selectedSermon, setSelectedSermon] = useState<Sermon>(initialSermon);
  const [selectedEvent, setSelectedEvent] = useState<SpecialEvent>(initialEvent);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null); 
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [actionPending, setActionPending] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedPhoto[]>([]);
  const [removedPhotoPaths, setRemovedPhotoPaths] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  function resetEducationForm() {
  setSelectedEducation(null);
}

  const contentItems = useMemo<ContentListItem[]>(() => {
    const sermonItems: ContentListItem[] = sermons.map((sermon) => ({
      id: sermon.id,
      type: 'sermon',
      title: sermon.title || 'Untitled Sermon',
      subtitle: sermon.passage || sermon.speaker || formatDate(sermon.sermon_date),
      status: sermon.published ? 'Published' : 'Draft',
      created_at: sermon.created_at,
      raw: sermon,
    }));

    const eventItems: ContentListItem[] = events.map((event) => ({
      id: event.id,
      type: 'event',
      title: event.event_name || 'Untitled Event',
      subtitle: `${event.event_type} · ${formatDate(event.event_date)}`,
      status: event.published ? 'Published' : 'Draft',
      created_at: event.created_at,
      raw: event,
    }));

    const educationItems: ContentListItem[] = education.map((education) => ({
      id: education.id,
      type: 'education',
      title: education.title || 'Untitled Education',
      subtitle: education.category || 'No Category',
      status: education.published ? 'Published' : 'Draft',
      created_at: education.created_at,
      raw: education,
    }));

    return [...sermonItems, ...eventItems, ...educationItems].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  }, [sermons, events, education]);

  useEffect(() => {
    fetchSessionAndContent();
  }, []);

  useEffect(() => {
    return () => {
      selectedFiles.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, [selectedFiles]);

  async function fetchSessionAndContent() {
    setLoading(true);
    const { data } = await supabase.auth.getSession();
    setUserId(data.session?.user.id ?? null);
    await fetchContent();
    setLoading(false);
  }

  async function fetchContent() {
    const [sermonRes, eventRes, educationRes] = await Promise.all([
      supabase.from('sermons').select('*').order('created_at', { ascending: false }),
      supabase.from('special_events').select('*').order('created_at', { ascending: false }),
      supabase.from('education').select('*').order('created_at', { ascending: false }),
    ]);

    if (sermonRes.error) {
      setStatusMessage(`Could not load sermons: ${sermonRes.error.message}`);
    } else {
      setSermons(sermonRes.data ?? []);
    }

    if (eventRes.error) {
      setStatusMessage(`Could not load events: ${eventRes.error.message}`);
    } else {
      setEvents(eventRes.data ?? []);
    }

    if (educationRes.error) {
      setStatusMessage(`Could not load education: ${educationRes.error.message}`);
    } else {
      setEducation(educationRes.data ?? []);
    }
  }

  function resetSermonForm() {
    setSelectedSermon(initialSermon);
  }

  function resetEventForm() {
    setSelectedEvent(initialEvent);
    selectedFiles.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    setSelectedFiles([]);
    setRemovedPhotoPaths([]);
  }

  function startEditingSermon(sermon: Sermon) {
    setActiveTab('sermon');
    setSelectedSermon(sermon);
  }

  function startEditingEvent(event: SpecialEvent) {
    setActiveTab('event');
    setSelectedEvent(event);
    selectedFiles.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    setSelectedFiles([]);
    setRemovedPhotoPaths([]);
  }

  function startEditingEducation(education: Education) {
    setActiveTab('education');
    setSelectedEducation(education);
}

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;

    const newPhotos: SelectedPhoto[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
    }));

    setSelectedFiles((current) => [...current, ...newPhotos]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function removeSelectedFile(id: string) {
    setSelectedFiles((current) => {
      const removed = current.find((photo) => photo.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.previewUrl);
      }
      return current.filter((photo) => photo.id !== id);
    });
  }

  function removeExistingPhoto(path: string) {
    setRemovedPhotoPaths((current) => [...current, path]);
    setSelectedEvent((current) => ({
      ...current,
      photo_paths: current.photo_paths.filter((photo) => photo !== path),
    }));
  }

  async function uploadEventPhotos(eventId: string) {
    if (!selectedFiles.length) {
      return [] as string[];
    }

    const uploadedPaths: string[] = [];
    for (const photo of selectedFiles) {
      const filePath = `events/${eventId}/${Date.now()}-${photo.file.name.replaceAll(' ', '_')}`;
      const { data, error } = await supabase.storage
        .from('special-event-photos')
        .upload(filePath, photo.file, { cacheControl: '3600', upsert: false });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.path) {
        uploadedPaths.push(data.path);
      }
    }

    return uploadedPaths;
  }

  async function saveSermon(publish: boolean) {
    if (!selectedSermon.title.trim() || !selectedSermon.sermon_date) {
      setStatusMessage('A sermon title and date are required.');
      return;
    }

    if (!userId) {
      setStatusMessage('You must be signed in to save content.');
      return;
    }

    setActionPending(true);
    setStatusMessage(null);

    const sermonText = selectedSermon.content ?? selectedSermon.body ?? '';
    const generatedSlug = generateSermonSlug(selectedSermon.title.trim());

    const payload = {
      slug: generatedSlug,
      title: selectedSermon.title,
      sermon_date: selectedSermon.sermon_date,
      passage: selectedSermon.passage,
      speaker: selectedSermon.speaker,
      content: sermonText,
      video_link: selectedSermon.video_link,
      published: publish,
      created_by: selectedSermon.id ? selectedSermon.created_by ?? userId : userId,
      updated_at: new Date().toISOString(),
    };

    try {
      let response;
      if (selectedSermon.id) {
        response = await supabase.from('sermons').update(payload).eq('id', selectedSermon.id).select().single();
      } else {
        response = await supabase.from('sermons').insert({ ...payload }).select().single();
      }

      if (response.error) {
        throw response.error;
      }

      await fetchContent();
      resetSermonForm();
      setStatusMessage(publish ? 'Sermon published successfully.' : 'Sermon saved as draft.');
    } catch (error) {
      setStatusMessage(`Could not save sermon: ${(error as Error).message}`);
    } finally {
      setActionPending(false);
    }
  }

  async function saveEvent(publish: boolean) {
    if (!selectedEvent.event_name.trim() || !selectedEvent.event_date || !selectedEvent.location.trim()) {
      setStatusMessage('Event name, date, and location are required.');
      return;
    }

    if (!userId) {
      setStatusMessage('You must be signed in to save content.');
      return;
    }

    setActionPending(true);
    setStatusMessage(null);

    const eventId = selectedEvent.id || crypto.randomUUID();

    try {
      const uploadPaths = await uploadEventPhotos(eventId);
      const photoPaths = [...selectedEvent.photo_paths.filter((path) => !removedPhotoPaths.includes(path)), ...uploadPaths];

      const payload = {
        event_name: selectedEvent.event_name,
        event_type: selectedEvent.event_type,
        event_date: selectedEvent.event_date,
        start_time: selectedEvent.start_time,
        end_time: selectedEvent.end_time,
        location: selectedEvent.location,
        description: selectedEvent.description,
        photo_paths: photoPaths,
        published: publish,
        created_by: selectedEvent.id ? selectedEvent.created_by ?? userId : userId,
        updated_at: new Date().toISOString(),
      };

      let response;
      if (selectedEvent.id) {
        response = await supabase.from('special_events').update(payload).eq('id', selectedEvent.id).select().single();
      } else {
        response = await supabase.from('special_events').insert({ id: eventId, ...payload }).select().single();
      }

      if (response.error) {
        throw response.error;
      }

      await fetchContent();
      resetEventForm();
      setStatusMessage(publish ? 'Event published successfully.' : 'Event saved as draft.');
    } catch (error) {
      setStatusMessage(`Could not save event: ${(error as Error).message}`);
    } finally {
      setActionPending(false);
    }
  }

  async function deleteContent(item: ContentListItem) {
    setActionPending(true);
    setStatusMessage(null);

    const table = item.type === 'sermon' ? 'sermons' : item.type === 'event' ? 'special_events' : 'education';    
    const { error } = await supabase.from(table).delete().eq('id', item.id);

    if (error) {
      setStatusMessage(`Could not delete ${item.type}: ${error.message}`);
    } else {
      setStatusMessage(`${item.type === 'sermon' ? 'Sermon' : item.type === 'event' ? 'Event' : 'Education'} deleted.`);
      await fetchContent();
    }

    setActionPending(false);
  }

  async function togglePublish(item: ContentListItem) {
  setActionPending(true);
  setStatusMessage(null);

  const table =
    item.type === 'sermon'
      ? 'sermons'
      : item.type === 'event'
        ? 'special_events'
        : 'education';

  const { error } = await supabase
    .from(table)
    .update({ published: item.status !== 'Published' })
    .eq('id', item.id);

  if (error) {
    setStatusMessage(`Could not update ${item.type}: ${error.message}`);
  } else {
    setStatusMessage(item.status === 'Published' ? 'Content unpublished.' : 'Content published.');
    await fetchContent();
  }

  setActionPending(false);
}

  const eventPhotoPreviews = useMemo(() => {
    const existing = selectedEvent.photo_paths.map((path) => ({
      path,
      url: supabase.storage.from('special-event-photos').getPublicUrl(path).data.publicUrl,
      name: path.split('/').pop() ?? path,
      type: 'existing' as const,
    }));
    const newFiles = selectedFiles.map((photo) => ({
      path: photo.id,
      url: photo.previewUrl,
      name: photo.name,
      type: 'new' as const,
    }));
    return [...existing, ...newFiles];
  }, [selectedEvent.photo_paths, selectedFiles]);

  return (
    <div className="mt-8">
      <div className="rounded-3xl border border-purple-100 bg-white p-8 shadow-lg">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-700">Content Manager</p>
                <h2 className="mt-2 text-3xl font-serif font-bold text-slate-900">Sermons & Special Events</h2>
                <p className="mt-3 text-base text-slate-600">Create, edit, publish and manage sermon and event content for the public page.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('sermon');
                    resetSermonForm();
                  }}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${activeTab === 'sermon' ? 'bg-purple-700 text-white' : 'border border-purple-200 bg-white text-purple-800 hover:bg-purple-50'}`}
                >
                  Add Sermon
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('event');
                    resetEventForm();
                  }}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${activeTab === 'event' ? 'bg-purple-700 text-white' : 'border border-purple-200 bg-white text-purple-800 hover:bg-purple-50'}`}
                >
                  Add Special Event
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {statusMessage ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {statusMessage}
                </div>
              ) : null}

              {activeTab === 'sermon' ? (
                <div className="space-y-5 rounded-3xl border border-purple-100 bg-purple-50 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-semibold">Sermon Title</span>
                      <input
                        value={selectedSermon.title}
                        onChange={(event) => setSelectedSermon({ ...selectedSermon, title: event.target.value })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-semibold">Date</span>
                      <input
                        type="date"
                        value={selectedSermon.sermon_date}
                        onChange={(event) => setSelectedSermon({ ...selectedSermon, sermon_date: event.target.value })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-semibold">Scripture / Passage</span>
                      <input
                        value={selectedSermon.passage}
                        onChange={(event) => setSelectedSermon({ ...selectedSermon, passage: event.target.value })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        placeholder="John 3:16"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-semibold">Speaker</span>
                      <input
                        value={selectedSermon.speaker}
                        onChange={(event) => setSelectedSermon({ ...selectedSermon, speaker: event.target.value })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        placeholder="Pastor Chuck Carver"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-semibold">Sermon Text</span>
                    <textarea
                      value={selectedSermon.content ?? selectedSermon.body ?? ''}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        setSelectedSermon({ ...selectedSermon, content: nextValue, body: nextValue });
                      }}
                      rows={8}
                      className="w-full rounded-3xl border border-purple-200 bg-white px-4 py-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      placeholder="Write the sermon message here..."
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-semibold">Optional Video Link</span>
                    <input
                      value={selectedSermon.video_link}
                      onChange={(event) => setSelectedSermon({ ...selectedSermon, video_link: event.target.value })}
                      className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      placeholder="https://youtube.com/..."
                    />
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <button
                      type="button"
                      disabled={actionPending}
                      onClick={() => saveSermon(false)}
                      className="rounded-2xl border border-purple-300 bg-white px-6 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Save Draft
                    </button>
                    <button
                      type="button"
                      disabled={actionPending}
                      onClick={() => saveSermon(true)}
                      className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 rounded-3xl border border-purple-100 bg-purple-50 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-semibold">Event Name</span>
                      <input
                        value={selectedEvent.event_name}
                        onChange={(event) => setSelectedEvent({ ...selectedEvent, event_name: event.target.value })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-semibold">Event Type</span>
                      <select
                        value={selectedEvent.event_type}
                        onChange={(event) => setSelectedEvent({ ...selectedEvent, event_type: event.target.value })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      >
                        {eventOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-semibold">Date</span>
                      <input
                        type="date"
                        value={selectedEvent.event_date}
                        onChange={(event) => setSelectedEvent({ ...selectedEvent, event_date: event.target.value })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-semibold">Start Time</span>
                      <input
                        type="time"
                        value={selectedEvent.start_time}
                        onChange={(event) => setSelectedEvent({ ...selectedEvent, start_time: event.target.value })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <span className="font-semibold">End Time</span>
                      <input
                        type="time"
                        value={selectedEvent.end_time || ''}
                        onChange={(event) => setSelectedEvent({ ...selectedEvent, end_time: event.target.value || null })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-semibold">Location</span>
                    <input
                      value={selectedEvent.location}
                      onChange={(event) => setSelectedEvent({ ...selectedEvent, location: event.target.value })}
                      className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-semibold">Description</span>
                    <textarea
                      value={selectedEvent.description}
                      onChange={(event) => setSelectedEvent({ ...selectedEvent, description: event.target.value })}
                      rows={6}
                      className="w-full rounded-3xl border border-purple-200 bg-white px-4 py-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      placeholder="Add event details and special notes here..."
                    />
                  </label>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-purple-200 bg-white px-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Event Photos</p>
                        <p className="text-sm text-slate-600">Upload multiple images from phone or computer.</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="text-sm text-slate-700"
                      />
                    </div>

                    {eventPhotoPreviews.length > 0 ? (
                      <div className="grid gap-3 sm:grid-cols-3">
                        {eventPhotoPreviews.map((photo) => (
                          <div key={photo.path} className="group relative overflow-hidden rounded-3xl border border-purple-200 bg-purple-50">
                            <img
                              src={photo.url}
                              alt={photo.name}
                              className="h-36 w-full object-cover"
                            />
                            <div className="absolute left-2 top-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                              {photo.name}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                if (photo.type === 'new') {
                                  removeSelectedFile(photo.path);
                                } else {
                                  removeExistingPhoto(photo.path);
                                }
                              }}
                              className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-rose-600 shadow-sm transition hover:bg-white"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600">No photos selected yet.</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <button
                      type="button"
                      disabled={actionPending}
                      onClick={() => saveEvent(false)}
                      className="rounded-2xl border border-purple-300 bg-white px-6 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Save Draft
                    </button>
                    <button
                      type="button"
                      disabled={actionPending}
                      onClick={() => saveEvent(true)}
                      className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4 rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <div className="rounded-3xl bg-purple-50 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-700">Content List</p>
                <p className="mt-2 text-sm text-slate-600">Edit or change the status of your sermons and special events.</p>
              </div>
              <div className="space-y-3">
                {contentItems.length ? (
                  contentItems.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="rounded-3xl border border-purple-100 bg-purple-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{item.type === 'sermon' ? 'Sermon' : 'Special Event'}</span>
                          <h3 className="mt-2 text-base font-semibold text-slate-900">{item.title}</h3>
                          <p className="mt-1 text-sm text-slate-600">{item.subtitle}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${item.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>{item.status}</span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => (item.type === 'sermon' ? startEditingSermon(item.raw as Sermon) : startEditingEvent(item.raw as SpecialEvent))}
                          className="rounded-2xl border border-purple-200 bg-white px-3 py-2 text-xs font-semibold text-purple-700 transition hover:bg-purple-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => togglePublish(item)}
                          className="rounded-2xl border border-purple-200 bg-white px-3 py-2 text-xs font-semibold text-purple-700 transition hover:bg-purple-50"
                        >
                          {item.status === 'Published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteContent(item)}
                          className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-600">No sermons or events yet. Create a draft to get started.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 rounded-3xl border border-purple-100 bg-white p-6 text-center text-slate-600 shadow-sm">Loading content...</div>
      ) : null}
    </div>
  );
}
