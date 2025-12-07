"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

type FormState = {
  name: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const CATEGORY_OPTIONS = [
  "Conference",
  "Workshop",
  "Meetup",
  "Webinar",
  "Festival",
  "Expo",
];

const CITY_OPTIONS = [
  "San Francisco, CA",
  "Austin, TX",
  "New York, NY",
  "Chicago, IL",
  "Seattle, WA",
  "Los Angeles, CA",
  "London, UK",
];

export default function CreateEventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id"); // if you later implement edit

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image uploads
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [eventImagePreview, setEventImagePreview] = useState<string | null>(
    null
  );

  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(
    null
  );

  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ========= Helpers =========
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // live-clear error for that field
    setErrors((prev) => ({ ...prev, [field]: "" }));

    if (field === "location") {
      if (!value.trim()) {
        setLocationSuggestions([]);
      } else {
        const lower = value.toLowerCase();
        setLocationSuggestions(
          CITY_OPTIONS.filter((city) => city.toLowerCase().includes(lower))
        );
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!form.name.trim()) newErrors.name = "Event Name is required.";
    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (form.description.length < 20) {
      newErrors.description = "Description should be at least 20 characters.";
    }

    if (!form.category) newErrors.category = "Category is required.";
    if (!form.date) newErrors.date = "Date is required.";
    if (!form.time) newErrors.time = "Time is required.";
    if (!form.location.trim()) newErrors.location = "Location is required.";

    if (!form.maxAttendees) {
      newErrors.maxAttendees = "Max attendees is required.";
    } else if (Number(form.maxAttendees) <= 0) {
      newErrors.maxAttendees = "Max attendees must be greater than 0.";
    }

    // Date can't be in the past
    if (form.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(form.date);
      if (selected < today) {
        newErrors.date = "Event date cannot be in the past.";
      }
    }

    // Image validations (if provided)
    const validateImage = (file: File | null, fieldKey: keyof FormState) => {
      if (!file) return;
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        newErrors[fieldKey] = "Only JPG, PNG or WEBP images are allowed.";
      }
      const maxSizeMB = 2;
      if (file.size > maxSizeMB * 1024 * 1024) {
        newErrors[fieldKey] = `Image must be smaller than ${maxSizeMB}MB.`;
      }
    };

    validateImage(eventImage, "name"); // attach error somewhere (name as a placeholder)
    validateImage(bannerImage, "category"); // likewise

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ========= Image handlers =========
  const handleImageFile = (
    file: File | null,
    type: "event" | "banner"
  ) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      showToast("Only JPG, PNG or WEBP images are allowed.");
      return;
    }
    const maxSizeMB = 2;
    if (file.size > maxSizeMB * 1024 * 1024) {
      showToast(`Image must be smaller than ${maxSizeMB}MB.`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (type === "event") {
      setEventImage(file);
      setEventImagePreview(previewUrl);
    } else {
      setBannerImage(file);
      setBannerImagePreview(previewUrl);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    type: "event" | "banner"
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file, type);
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "event" | "banner"
  ) => {
    const file = e.target.files?.[0] ?? null;
    if (file) handleImageFile(file, type);
  };

  // ========= Submit =========
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Fake delay to show loading
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(editId ? "Event updated successfully!" : "Event created successfully!");

      // TODO: Save to backend / DB; get new event id
      // For now, just redirect to browse or fake details
      router.push("/dashboard/browse");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* ================= SIDEBAR DESKTOP ================= */}
      <aside className="hidden md:flex flex-col w-64 bg-white p-6 shadow-md h-screen fixed left-0 top-0 z-40">
        <h2 className="text-xl font-bold">EventHub</h2>
        <p className="text-xs text-gray-500">Event Management</p>

        <nav className="space-y-3 mt-6 text-sm">
          <a
            href="/dashboard"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/overviewico.png" width={20} height={20} alt="" />
            Overview
          </a>

          <a
            href="/dashboard/browse"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/browseeventico.png" width={20} height={20} alt="" />
            Browse Events
          </a>

          <a
            href="/dashboard/attendee-insights"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/atendeeico.png" width={20} height={20} alt="" />
            Attendee Insights
          </a>
        </nav>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <button
          className="text-2xl mb-6"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold">EventHub</h2>
        <p className="text-xs text-gray-500">Event Management</p>

        <nav className="space-y-3 mt-6 text-sm">
          <a
            href="/dashboard"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/overviewico.png" width={20} height={20} alt="" />
            Overview
          </a>

          <a
            href="/dashboard/browse"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/browseeventico.png" width={20} height={20} alt="" />
            Browse Events
          </a>

          <a
            href="/dashboard/attendee-insights"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/atendeeico.png" width={20} height={20} alt="" />
            Attendee Insights
          </a>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 md:ml-64 p-6 sm:p-10">
        {/* MOBILE HAMBURGER */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <button
            className="text-3xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
        </div>

        <h1 className="text-2xl font-bold">
          {editId ? "Edit Event" : "Create Event"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details to {editId ? "update" : "create"} your event.
        </p>

        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-[70] bg-black text-white text-sm px-4 py-2 rounded-xl shadow-lg">
            {toastMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white rounded-xl shadow-sm p-6 sm:p-8 space-y-6"
        >
          {/* Top: Name + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium">
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event name"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                handleChange("description", e.target.value.slice(0, 500))
              }
              rows={4}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Describe your event..."
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description ? (
                <p className="text-xs text-red-500">
                  {errors.description}
                </p>
              ) : (
                <span className="text-xs text-gray-500">
                  A short but clear description works best.
                </span>
              )}
              <span className="text-xs text-gray-400">
                {form.description.length}/500
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.date && (
                <p className="text-xs text-red-500 mt-1">{errors.date}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.time && (
                <p className="text-xs text-red-500 mt-1">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Location + Max Attendees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location with autocomplete */}
            <div className="relative">
              <label className="block text-sm font-medium">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) =>
                  handleChange("location", e.target.value)
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location (type city name)"
              />
              {errors.location && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.location}
                </p>
              )}

              {locationSuggestions.length > 0 && (
                <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-sm max-h-40 overflow-y-auto text-sm">
                  {locationSuggestions.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        handleChange("location", city);
                        setLocationSuggestions([]);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Max Attendees */}
            <div>
              <label className="block text-sm font-medium">
                Max Attendees <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                value={form.maxAttendees}
                onChange={(e) =>
                  handleChange("maxAttendees", e.target.value)
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 200"
              />
              {errors.maxAttendees && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.maxAttendees}
                </p>
              )}
            </div>
          </div>

          {/* Image uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Image */}
            <div>
              <label className="block text-sm font-medium">
                Event Image (card) <span className="text-red-500">*</span>
              </label>
              <div
                className="mt-1 border-2 border-dashed rounded-xl px-4 py-6 text-center text-xs text-gray-500 cursor-pointer hover:border-blue-400"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "event")}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileInputChange(e, "event")
                  }
                  className="hidden"
                  id="event-image-input"
                />
                <label htmlFor="event-image-input" className="cursor-pointer">
                  Drag &amp; drop image here, or{" "}
                  <span className="text-blue-600 underline">
                    browse
                  </span>
                </label>
                <p className="mt-1">
                  JPG, PNG, WEBP – max 2MB recommended
                </p>
              </div>

              {eventImagePreview && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">
                    Preview
                  </p>
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                    <Image
                      src={eventImagePreview}
                      alt="Event preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEventImage(null);
                      setEventImagePreview(null);
                    }}
                    className="mt-2 text-xs text-red-500 underline"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            {/* Banner Image */}
            <div>
              <label className="block text-sm font-medium">
                Event Banner (optional)
              </label>
              <div
                className="mt-1 border-2 border-dashed rounded-xl px-4 py-6 text-center text-xs text-gray-500 cursor-pointer hover:border-blue-400"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "banner")}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileInputChange(e, "banner")
                  }
                  className="hidden"
                  id="banner-image-input"
                />
                <label htmlFor="banner-image-input" className="cursor-pointer">
                  Drag &amp; drop banner here, or{" "}
                  <span className="text-blue-600 underline">
                    browse
                  </span>
                </label>
                <p className="mt-1">
                  Wide image works best for header (JPG/PNG/WEBP)
                </p>
              </div>

              {bannerImagePreview && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">
                    Preview
                  </p>
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                    <Image
                      src={bannerImagePreview}
                      alt="Banner preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBannerImage(null);
                      setBannerImagePreview(null);
                    }}
                    className="mt-2 text-xs text-red-500 underline"
                  >
                    Remove banner
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard/browse")}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Saving..." : editId ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
