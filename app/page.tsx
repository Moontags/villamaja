'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Anchor, Waves, Mail, Phone, MapPin, Users, Wind, Flame, Navigation, Menu, X, Check, Zap } from 'lucide-react';

type Lang = 'fi' | 'en';

const translations = {
  fi: {
    nav: {
      home: 'Etusivu',
      about: 'Tietoa',
      location: 'Sijainti',
      booking: 'Varaus',
      contact: 'Yhteystiedot'
    },
    hero: {
      subtitle: 'Kesäparatiisi Päijänteen saaressa',
      cta: 'Varaa'
    },
    about: {
      title: 'Tervetuloa Villa Majaan',
      description: 'Villa Maja on viihtyisä mökkiparatiiisi Päijänteen kauniilla Säynätsalon saarella Kuhmoisten alueella. Täydellinen kesäkohde veneilijöille ja perheille, jotka etsivät rauhaa ja luonnonläheisyyttä.',
      capacity: '4 + 2 henkilöä',
      accommodations: {
        title: 'Majoitustilat',
        saunaCottage: '2 yöymispaikkaa saunamökissä',
        mainCottage: '2 yöymispaikkaa päämökissä',
        guestHouse: 'Vierasmaja'
      },
      features: {
        title: 'Mukavuudet',
        sauna: 'Puulämmitteinen sauna',
        grill: 'Grillipaikka',
        dock: 'Oma laituri',
        beach: 'Hiekkaranta',
        firewood: 'Polttopuut',
        solar: 'Aurinkosähköjärjestelmä puhelimen lataukseen'
      },
      activities: {
        title: 'Aktiviteetit',
        canoe: 'Kanootiiretket',
        fishing: 'Kalastus',
        swimming: 'Uiminen'
      }
    },
    forBoaters: {
      title: 'Veneilijöille',
      descriptionLine1: 'Villa Maja sijaitsee Päijänteen sydämmessä Tehin selän vierellä.',
      descriptionLine2: 'Oma laituri ja turvallinen ankkuripaikka.',
      gps: 'GPS-koordinaatit',
      coordinates: 'Koordinaatit toimitetaan varauksen yhteydessä',
      dockInfo: 'Laituri',
      dockDetails: 'Tilava laituri helpolla lähestymistavalla'
    },
    location: {
      title: 'Sijainti',
      area: 'Säynätsalon saari, Kuhmoinen',
      description: 'Saavutettavissa vain veneellä - aito saarielämys keskellä Päijänteen kirkkaita vesiä.',
      beforeBookingInfo: 'Tarkka sijainti ja ajo-ohjeet toimitetaan varauksen vahvistamisen jälkeen.',
      beforeBookingDistance: 'Kuhmoisten keskustasta saareen noin 10 km rantaviivoja pitkin. Saavutettavissa vain veneellä.'
    },
    booking: {
      title: 'Varauskalenteri',
      period: 'Vuokraus kesä-heinäkuussa 2026',
      description: 'Valitse varausjakso kalenterista.',
      selectStart: 'Valitse saapumispäivä',
      selectEnd: 'Valitse lähtöpäivä',
      selectedPeriod: 'Valittu jakso',
      nights: 'yötä',
      name: 'Nimi',
      email: 'Sähköposti',
      phone: 'Puhelin',
      message: 'Viesti (valinnainen)',
      book: 'Lähetä varaus',
      cancel: 'Peruuta valinta',
      bookingSuccess: 'Varauspyyntö lähetetty onnistuneesti!',
      bookingError: 'Virhe varauksessa. Yritä uudelleen.',
      selectDates: 'Valitse ensin päivämäärät',
      invalidDates: 'Valitse kelvollinen aikajakso',
      legend: 'Selite',
      available: 'Vapaa',
      booked: 'Varattu',
      selected: 'Valittu',
      pricePerWeek: '1 viikko 1 000 €',
      priceTwoWeeks: '2 viikkoa 1 800 €',
      pricePerMonth: 'Kuukausi 3 500 €',
      includesTitle: 'Hinta sisältää',
      includes: 'Polttopuut',
      clientResponsible: 'Siivous ja lakanat kuuluvat asiakkaalle',
      estimatedPrice: 'Arvioitu hinta'
    },
    contact: {
      title: 'Ota yhteyttä',
      description: 'Kysymyksiä tai haluatko lisätietoja? Ota rohkeasti yhteyttä!'
    },
    footer: {
      rights: 'Kaikki oikeudet pidätetään'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      location: 'Location',
      booking: 'Booking',
      contact: 'Contact'
    },
    hero: {
      subtitle: 'Summer Paradise on Lake Päijänne Island',
      cta: 'Book Now'
    },
    about: {
      title: 'Welcome to Villa Maja',
      description: 'Villa Maja is a cozy cottage paradise on the beautiful Säynätsalo island in Lake Päijänne, Kuhmoinen area. Perfect summer destination for boaters and families seeking peace and closeness to nature.',
      capacity: '8 persons',
      accommodations: {
        title: 'Accommodations',
        saunaCottage: '2 sleeping places in sauna cottage',
        mainCottage: '2 sleeping places in main cottage',
        guestHouse: 'Guest house'
      },
      features: {
        title: 'Amenities',
        sauna: 'Wood-heated sauna',
        grill: 'BBQ area',
        dock: 'Private dock',
        beach: 'Sandy beach',
        firewood: 'Firewood included',
        solar: 'Solar power system for phone charging'
      },
      activities: {
        title: 'Activities',
        canoe: 'Canoeing',
        fishing: 'Fishing',
        swimming: 'Swimming'
      }
    },
    forBoaters: {
      title: 'For Boaters',
      descriptionLine1: 'Villa Maja is located in the heart of Lake Päijänne, next to Tehi open waters.',
      descriptionLine2: 'Private dock and safe anchoring spot.',
      gps: 'GPS Coordinates',
      coordinates: 'Coordinates will be provided with your booking',
      dockInfo: 'Dock',
      dockDetails: 'Spacious dock with easy approach'
    },
    location: {
      title: 'Location',
      area: 'Säynätsalo Island, Kuhmoinen',
      description: 'Accessible only by boat - an authentic island experience in the crystal-clear waters of Lake Päijänne.',
      beforeBookingInfo: 'Exact location and directions will be provided after booking confirmation.',
      beforeBookingDistance: 'Approximately 10 km from Kuhmoinen town center along the shoreline. Accessible only by boat.'
    },
    booking: {
      title: 'Booking Calendar',
      period: 'Rental period June-July 2026',
      description: 'Select your booking period from the calendar.',
      selectStart: 'Select arrival date',
      selectEnd: 'Select departure date',
      selectedPeriod: 'Selected period',
      nights: 'nights',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message (optional)',
      book: 'Send Booking Request',
      cancel: 'Cancel Selection',
      bookingSuccess: 'Booking request sent successfully!',
      bookingError: 'Booking error. Please try again.',
      selectDates: 'Please select dates first',
      invalidDates: 'Please select a valid period',
      legend: 'Legend',
      available: 'Available',
      booked: 'Booked',
      selected: 'Selected',
      pricePerWeek: '1 week €1,000',
      priceTwoWeeks: '2 weeks €1,800',
      pricePerMonth: 'Month €3,500',
      includesTitle: 'Price includes',
      includes: 'Firewood and rowing boat',
      clientResponsible: 'Cleaning and bed linens are the responsibility of the customer',
      estimatedPrice: 'Estimated price'
    },
    contact: {
      title: 'Contact Us',
      description: 'Questions or need more information? Feel free to reach out!'
    },
    footer: {
      rights: 'All rights reserved'
    }
  }
} as const;

const ImageCarousel = () => {
  const images = [
    '01.webp', '02.webp', '03.webp', '04.webp', '05.webp',
    '06.webp', '07.webp', '08.webp', '09.webp', '10.webp',
    '11.webp', '12.webp', '13.webp', '14.webp', '15.webp',
    '16.webp', '17.webp', '18.webp', '19.webp', '20.webp',
  ];

  const [current, setCurrent] = useState(0);
  const totalImages = images.length;

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const next = () => setCurrent((c) => (c + 1) % totalImages);
  const prev = () => setCurrent((c) => (c - 1 + totalImages) % totalImages);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (!isSwiping.current && (absDeltaX > 10 || absDeltaY > 10)) {
      if (absDeltaX > absDeltaY * 1.5) {
        isSwiping.current = true;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 70) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      deltaX > 0 ? prev() : next();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden group"
      style={{ touchAction: 'pan-y' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image 
        src={`/images/webp/${images[current]}`}
        alt={`Villa Maja - Kuva ${current + 1}`}
        fill
        className="object-cover transition-all duration-700 ease-in-out"
        priority={true}
        loading="eager"
        quality={85}
        sizes="(max-width: 1024px) 100vw, 75vw"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50 z-10" />

      {/* Navigation buttons - Bottom positioned */}
      <button 
        onClick={prev} 
        aria-label="Previous image"
        className="absolute left-4 md:left-20 lg:left-32 bottom-16 md:bottom-20 z-30 bg-white/95 hover:bg-white active:bg-gray-100 p-3 md:p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 opacity-70 md:opacity-0 group-hover:opacity-100 hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-gray-800" />
      </button>
      <button 
        onClick={next} 
        aria-label="Next image"
        className="absolute right-4 md:right-20 lg:right-32 bottom-16 md:bottom-20 z-30 bg-white/95 hover:bg-white active:bg-gray-100 p-3 md:p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 opacity-70 md:opacity-0 group-hover:opacity-100 hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-gray-800" />
      </button>

      {/* Indicator dots - Mobile optimized positioning */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 md:gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${i === current ? 'w-6 h-2.5 md:w-8 md:h-2 bg-white' : 'w-2 h-2 md:w-2 md:h-2 bg-white/60 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </div>
  );
};

interface BookingCalendarProps {
  lang: Lang;
  onBookingConfirmed: () => void;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface BookedDate {
  contact: ContactInfo;
  bookedAt: string;
}

const BookingCalendar = ({ lang, onBookingConfirmed }: BookingCalendarProps) => {
  const t = translations[lang].booking;
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1)); // June 2026
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Record<string, BookedDate>>({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ContactInfo>({ name: '', email: '', phone: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const stored = localStorage.getItem('villa-maja-bookings');
      if (stored) {
        setBookedDates(JSON.parse(stored));
      }
    } catch {
      console.log('No existing bookings');
    } finally {
      setLoading(false);
    }
  };

  const saveBooking = async (start: Date, end: Date, contact: ContactInfo) => {
    const newBookings = { ...bookedDates };
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split('T')[0];
      newBookings[key] = { contact, bookedAt: new Date().toISOString() };
    }

    try {
      localStorage.setItem('villa-maja-bookings', JSON.stringify(newBookings));
      setBookedDates(newBookings);
      return true;
    } catch {
      console.error('Error saving booking');
      return false;
    }
  };

  const getDaysInMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const isDateBooked = (date: Date) => {
    const key = date.toISOString().split('T')[0];
    return !!bookedDates[key];
  };

  const isDateSelected = (date: Date) => {
    if (!selectedStart) return false;
    if (!selectedEnd) return date.getTime() === selectedStart.getTime();
    return date >= selectedStart && date <= selectedEnd;
  };

  const handleDateClick = (date: Date) => {
    if (isDateBooked(date)) return;

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else if (date < selectedStart) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else {
      let hasBookedInRange = false;
      for (let d = new Date(selectedStart); d <= date; d.setDate(d.getDate() + 1)) {
        if (isDateBooked(d)) {
          hasBookedInRange = true;
          break;
        }
      }
      if (!hasBookedInRange) {
        setSelectedEnd(date);
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedStart || !selectedEnd || !formData.name || !formData.email || !formData.phone) {
      alert(t.selectDates);
      return;
    }

    const nights = calculateNights();
    const subject = `Varaus: ${selectedStart.toLocaleDateString('fi-FI')} - ${selectedEnd.toLocaleDateString('fi-FI')}`;
      const gpsCoordinates = '61°34\'36.5"N, 25°19\'17.2"E';
      const mapsLink = 'https://maps.google.com/?q=61.576806,25.319422';
    const body = `Hei,

Haluaisin tehdä varauksen Villa Majaan:

VARAUSAIKA:
Saapuminen: ${selectedStart.toLocaleDateString('fi-FI')}
Lähtö: ${selectedEnd.toLocaleDateString('fi-FI')}
Yöt: ${nights}

YHTEYSTIEDOT:
Nimi: ${formData.name}
Sähköposti: ${formData.email}
Puhelin: ${formData.phone || '-'}

    SIJAINTI:
    GPS-koordinaatit: ${gpsCoordinates}
    Google Maps: ${mapsLink}

VIESTI:
${formData.message || '-'}

Ystävällisin terveisin,
${formData.name}`;

    const mailtoLink = `mailto:info@villamaja.fi?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    // Tallennetaan varaus selaimeen 
    saveBooking(selectedStart, selectedEnd, formData);
    onBookingConfirmed(); // Merkitse varaus tehdyksi
    
    setShowSuccess(true);
    setSelectedStart(null);
    setSelectedEnd(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const renderMonth = (monthDate: Date) => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(monthDate);
    const days = [];
    const monthYear = monthDate.getFullYear();
    const month = monthDate.getMonth();

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(monthYear, month, day);
      const isBooked = isDateBooked(date);
      const isSelected = isDateSelected(date);
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

      days.push(
        <button
          key={day}
          onClick={() => !isBooked && !isPast && handleDateClick(date)}
          disabled={isBooked || isPast}
          className={`aspect-square p-2 rounded-lg text-sm font-bold transition-all
            ${isBooked ? 'bg-red-100 text-red-600 cursor-not-allowed' : ''}
            ${isSelected ? 'bg-blue-600 text-white ring-2 ring-blue-700 shadow-lg' : ''}
            ${!isBooked && !isSelected && !isPast ? 'bg-green-100 text-green-800 hover:bg-green-200 hover:shadow-md' : ''}
            ${isPast && !isBooked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const monthNames = lang === 'fi' 
    ? ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = lang === 'fi' ? ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calculateNights = () => {
    if (!selectedStart || !selectedEnd) return 0;
    const diff = selectedEnd.getTime() - selectedStart.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const calculateEstimatedPrice = () => {
    const nights = calculateNights();
    if (nights === 0) return null;
    const pricePerWeek = 1000;
    const pricePerTwoWeeks = 1800;
    const pricePerMonth = 3500;
    const week = 7;
    const twoWeeks = 14;
    const month = 30;
    
    if (nights >= month) {
      const months = Math.floor(nights / month);
      const remainingNights = nights % month;
      const monthPrice = months * pricePerMonth;
      let remainingPrice = 0;
      if (remainingNights >= twoWeeks) {
        remainingPrice = Math.ceil(remainingNights / twoWeeks) * pricePerTwoWeeks;
      } else if (remainingNights >= week) {
        remainingPrice = Math.ceil(remainingNights / week) * pricePerWeek;
      } else {
        remainingPrice = pricePerWeek;
      }
      return monthPrice + remainingPrice;
    } else if (nights >= twoWeeks) {
      return Math.ceil(nights / twoWeeks) * pricePerTwoWeeks;
    } else if (nights >= week) {
      return Math.ceil(nights / week) * pricePerWeek;
    } else {
      return pricePerWeek;
    }
  };

  if (loading) {
    return <div className="text-center py-12">Ladataan...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <h3 className="text-xl font-bold text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-700">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {renderMonth(currentMonth)}
          </div>

          <div className="mt-6 flex gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
              <span className="font-medium">{t.available}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded" />
              <span className="font-medium">{t.booked}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded" />
              <span className="font-medium">{t.selected}</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {showSuccess && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
              <Check className="w-5 h-5" />
              {t.bookingSuccess}
            </div>
          )}

          {selectedStart && selectedEnd && (
            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <div className="font-semibold mb-2 text-gray-900">{t.selectedPeriod}:</div>
              <div className="text-sm text-gray-800">
                {selectedStart.toLocaleDateString(lang)} - {selectedEnd.toLocaleDateString(lang)}
              </div>
              <div className="text-sm text-gray-700 mt-1">
                {calculateNights()} {t.nights}
              </div>
              {calculateEstimatedPrice() && (
                <div className="text-lg font-bold text-blue-600 mt-3 pt-3 border-t border-blue-200">
                  {t.estimatedPrice}: {calculateEstimatedPrice()} €
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">{t.name} *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">{t.email} *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">{t.phone} *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">{t.message}</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={!selectedStart || !selectedEnd || !formData.name || !formData.email || !formData.phone}
                className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-200 disabled:from-gray-400 disabled:to-gray-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                {t.book}
              </button>
              {selectedStart && (
                <button
                  onClick={() => {
                    setSelectedStart(null);
                    setSelectedEnd(null);
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-gray-800 transition-all"
                >
                  {t.cancel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LanguageSwitcherProps {
  currentLang: Lang;
  onLanguageChange: (lang: Lang) => void;
}

const LanguageSwitcher = ({ currentLang, onLanguageChange }: LanguageSwitcherProps) => {
  return (
    <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1">
    <button
        onClick={() => onLanguageChange('fi')}
     
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          currentLang === 'fi' 
            ? 'bg-white text-black shadow-md' 
            : 'text-black border border-gray-400 hover:bg-black/10' 
        }`}
      >
        FI
      </button>
    <button
        onClick={() => onLanguageChange('en')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          currentLang === 'en' 
            ? 'bg-white text-black shadow-md'
          
            : 'text-black border border-gray-400 hover:bg-black/10'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default function VillaMajaWebsite() {
  const [lang, setLang] = useState<Lang>('fi');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className={`text-2xl font-bold transition-colors ${scrolled ? 'text-blue-600' : 'text-white'}`}>
            Villa Maja
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className={`hover:opacity-75 transition-opacity ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              {t.nav.home}
            </a>
            <a href="#about" className={`hover:opacity-75 transition-opacity ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              {t.nav.about}
            </a>
            <a href="#location" className={`hover:opacity-75 transition-opacity ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              {t.nav.location}
            </a>
            <a href="#booking" className={`hover:opacity-75 transition-opacity ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              {t.nav.booking}
            </a>
            <a href="#contact" className={`hover:opacity-75 transition-opacity ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              {t.nav.contact}
            </a>
            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden z-40">
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#home" onClick={closeMobileMenu} className="text-gray-800 hover:text-blue-600 py-2">{t.nav.home}</a>
              <a href="#about" onClick={closeMobileMenu} className="text-gray-800 hover:text-blue-600 py-2">{t.nav.about}</a>
              <a href="#location" onClick={closeMobileMenu} className="text-gray-800 hover:text-blue-600 py-2">{t.nav.location}</a>
              <a href="#booking" onClick={closeMobileMenu} className="text-gray-800 hover:text-blue-600 py-2">{t.nav.booking}</a>
              <a href="#contact" onClick={closeMobileMenu} className="text-gray-800 hover:text-blue-600 py-2">{t.nav.contact}</a>
              <div className="pt-2 border-t border-gray-200">
                <LanguageSwitcher currentLang={lang} onLanguageChange={(l: Lang) => { setLang(l); closeMobileMenu(); }} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative section-smooth h-[80vh] md:h-screen min-h-96">
        <ImageCarousel />
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="hidden md:block text-2xl md:text-3xl mb-8 drop-shadow-lg bg-black/5 backdrop-blur-sm px-6 py-3 rounded-xl font-bold">
              {t.hero.subtitle}
            </h1>
                      <a
              href="#booking"
              className="
                hidden md:inline-block
                pointer-events-auto
                bg-white/10 hover:bg-white/25 backdrop-blur-sm
                text-white px-8 py-4 rounded-full text-lg font-semibold
                shadow-xl hover:shadow-2xl transition-all hover:scale-105
              "
            >
              {t.hero.cta}
            </a>
          </div>
        </div>
        {/* --- LISÄTTY Sumuinen Liuku (Fade Effect) --- */}
        <div className="absolute bottom-0 left-0 w-full h-18 z-20 bg-linear-to-t from-white to-transparent"></div>
      </section>

      {/* About Section */}
      <section id="about" className="relative pt-20 pb-32 px-4 bg-linear-to-b from-white via-blue-50 to-white section-smooth">
        {/* Subtle background image */}
        <Image
          src="/images/webp/07.webp"
          alt="Taustakuva – Villa Maja"
          fill
          className="object-cover absolute inset-0 opacity-20 pointer-events-none"
          quality={70}
        />
        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-gray-800 animate-fade-in">{t.about.title}</h2>
          <p className="text-xl text-center mb-16 text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            {t.about.description}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className=" p-8 rounded-2xl  hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{t.about.capacity}</h3>
            </div>
            <div className=" p-8 rounded-2xl  hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in ">
              <Waves className="w-12 h-12 text-cyan-600 mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{t.about.features.beach}</h3>
            </div>
            <div className=" p-8 rounded-2xl  hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in ">
              <Anchor className="w-12 h-12 text-blue-700 mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{t.about.features.dock}</h3>
            </div>
          </div>

          <div className="bg-white/20 rounded-3xl p-12 transition-all duration-300 animate-fade-in mb-12">
            <h3 className="text-3xl font-bold mb-8 text-gray-800">{t.about.accommodations.title}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-blue-600" />
                <span className="text-lg text-gray-700">{t.about.accommodations.saunaCottage}</span>
              </div>
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-blue-600" />
                <span className="text-lg text-gray-700">{t.about.accommodations.mainCottage}</span>
              </div>
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-blue-600" />
                <span className="text-lg text-gray-700">{t.about.accommodations.guestHouse}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/20 rounded-3xl p-12 transition-all duration-300 animate-fade-in mb-12">
            <h3 className="text-3xl font-bold mb-8 text-gray-800">{t.about.features.title}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <Flame className="w-8 h-8 text-orange-600" />
                <span className="text-lg text-gray-700">{t.about.features.sauna}</span>
              </div>
              <div className="flex items-center gap-4">
                <Flame className="w-8 h-8 text-red-600" />
                <span className="text-lg text-gray-700">{t.about.features.grill}</span>
              </div>
              <div className="flex items-center gap-4">
                <Wind className="w-8 h-8 text-green-600" />
                <span className="text-lg text-gray-700">{t.about.features.firewood}</span>
              </div>
              <div className="flex items-center gap-4">
                <Zap className="w-8 h-8 text-yellow-500" />
                <span className="text-lg text-gray-700">{t.about.features.solar}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/20 rounded-3xl p-12 transition-all duration-300 animate-fade-in">
            <h3 className="text-3xl font-bold mb-8 text-gray-800">{t.about.activities.title}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <Waves className="w-8 h-8 text-cyan-600" />
                <span className="text-lg text-gray-700">{t.about.activities.canoe}</span>
              </div>
              <div className="flex items-center gap-4">
                <Anchor className="w-8 h-8 text-blue-600" />
                <span className="text-lg text-gray-700">{t.about.activities.fishing}</span>
              </div>
              <div className="flex items-center gap-4">
                <Waves className="w-8 h-8 text-blue-500" />
                <span className="text-lg text-gray-700">{t.about.activities.swimming}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Boaters Section */}
      <section className="relative py-32 px-4 overflow-hidden section-smooth">
        <Image 
          src={`/images/webp/IMG_0600.webp`}
          alt="Veneilijöille"
          fill
          className="object-cover absolute inset-0"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Navigation className="w-12 h-12 text-white drop-shadow-lg" />
            <h2 className="text-5xl font-bold text-white drop-shadow-lg">{t.forBoaters.title}</h2>
          </div>
          <div className="text-center mb-12 max-w-3xl mx-auto text-white drop-shadow-lg">
            <p className="text-xl">{t.forBoaters.descriptionLine1}</p>
            <p className="text-xl mt-2">{t.forBoaters.descriptionLine2}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-white">{t.forBoaters.gps}</h3>
              <p className="text-lg opacity-90 text-white">{t.forBoaters.coordinates}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-white">{t.forBoaters.dockInfo}</h3>
              <p className="text-lg opacity-90 text-white">{t.forBoaters.dockDetails}</p>
            </div>
          </div>
        </div>
        {/* --- LISÄTTY Sumuinen Liuku (Fade Effect) --- */}
        <div className="absolute bottom-0 left-0 w-full h-8 z-20 bg-linear-to-t from-white to-transparent"></div>
      </section>

      {/* Location Section */}
      <section id="location" className="relative pt-20 pb-32 px-4 bg-linear-to-b from-white via-cyan-50 to-blue-50 section-smooth">
        {/* Subtle background image */}
        <Image
          src="/images/webp/05.webp"
          alt="Taustakuva – Sijainti"
          fill
          className="object-cover absolute inset-0 opacity-10 pointer-events-none"
          quality={70}
        />
        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-8 text-gray-800 animate-fade-in">{t.location.title}</h2>

          {!bookingConfirmed ? (
            /* 🔒 ENNEN VARAUSTA */
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-2xl text-gray-700 mb-4 font-semibold">
                {t.location.area}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                {t.location.beforeBookingInfo}
              </p>
              <p className="text-gray-700 font-medium">
                {t.location.beforeBookingDistance}
              </p>
            </div>
          ) : (
            /* 🔓 VARAUKSEN JÄLKEEN */
            <>
              <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
                <MapPin className="w-6 h-6 text-blue-600" />
                <p className="text-2xl text-gray-700">{t.location.area}</p>
              </div>
              <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12 animate-fade-in">{t.location.description}</p>
              <div className="rounded-3xl shadow-xl overflow-hidden h-96 hover:shadow-2xl transition-all duration-300 animate-fade-in">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1943.0840280392!2d25.319422!3d61.576806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNjHCsDM0JzM2LjUiTiAyNcKwMTknMTcuMiJF!5e0!3m2!1sen!2sfi!4v1702000000000!5m2!1sen!2sfi"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Villa Maja sijainti kartalla"
                />
              </div>
              <p className="text-center text-gray-700 mt-8 text-lg">
                <strong>GPS:</strong> 61&deg;34&rsquo;36.5&rdquo;N, 25&deg;19&rsquo;17.2&rdquo;E
              </p>
            </>
          )}
        </div>
        {/* --- LISÄTTY Sumuinen Liuku (Fade Effect) --- */}
        <div className="absolute bottom-0 left-0 w-full h-48 z-20 bg-linear-to-t from-white to-transparent"></div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="relative pt-20 pb-32 px-4 overflow-hidden section-smooth">
        <Image 
          src={`/images/webp/IMG_2828.webp`}
          alt="Taustakuva – Varaus"
          fill
          className="object-cover absolute inset-0 opacity-15"
          quality={70}
        />
        <div className="absolute inset-0 bg-white/95" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center text-gray-900 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{t.booking.title}</h2>
            <p className="text-base md:text-xl mb-2 drop-shadow-lg px-2">{t.booking.period}</p>
            <p className="text-sm md:text-lg opacity-90 drop-shadow-md px-2">{t.booking.description}</p>
            
            <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto px-2">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-xs md:text-sm opacity-80 mb-1">{t.booking.pricePerWeek}</div>
                <div className="text-xl md:text-2xl font-bold">1 000 €</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-xs md:text-sm opacity-80 mb-1">{t.booking.priceTwoWeeks}</div>
                <div className="text-xl md:text-2xl font-bold">1 800 €</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-xs md:text-sm opacity-80 mb-1">{t.booking.pricePerMonth}</div>
                <div className="text-xl md:text-2xl font-bold">3 500 €</div>
              </div>
            </div>
            
            <div className="mt-4 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm opacity-80 mb-2">{t.booking.includesTitle}</div>
                <div className="text-sm">{t.booking.includes}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm opacity-80 mb-2">Asiakkaan vastuu</div>
                <div className="text-sm">{t.booking.clientResponsible}</div>
              </div>
            </div>
          </div>
          <div className="bg-white/95 rounded-3xl p-8 border border-gray-200 shadow-2xl">
            <BookingCalendar lang={lang} onBookingConfirmed={() => setBookingConfirmed(true)} />
          </div>
        </div>
      </section>

      
      {/* Contact Section */}
      <section 
        id="contact" 
        className="relative pt-20 pb-52 px-4 overflow-hidden section-smooth min-h-[90vh]"  
      >
        <Image
          src="/images/webp/02.webp"
          alt="Taustakuva – Yhteystiedot"
          fill
          className="absolute inset-0 object-cover"
          quality={70}
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Sisältökontti: Otsikko ja Kuvaus */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-lg animate-fade-in">{t.contact.title}</h2>
          <p className="text-xl text-white drop-shadow-lg mb-2 animate-fade-in">{t.contact.description}</p>
        </div>
        
        {/* Kontaktikorttien kontti: Absolute-sijoittelu */}
       
          
      <div className="
          absolute bottom-10 left-1/2 -translate-x-1/2 z-20 
          grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center 
          animate-fade-in max-w-xl w-full px-4
        ">
          {/* Kortti 1: Sähköposti */}
          <div className="flex flex-col items-center gap-2 p-3 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Mail className="w-6 h-6 text-blue-400" />
            <span className="font-semibold text-white">info@villamaja.fi</span>
          </div>
          
          {/* Kortti 2: Puhelin */}
          <div className="flex flex-col items-center gap-2 p-3 sm:p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Phone className="w- h-6 text-blue-400" />
            <span className="font-semibold text-white">040 2183270</span>
          </div>
        </div>
        
        {/* --- LISÄTTY Sumuinen Liuku (Fade Effect) --- */}
        <div className="absolute bottom-0 left-0 w-full h-18 z-20 bg-linear-to-t from-gray-900 to-transparent"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-14 pb-12 px-4 relative z-0"> 
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Villa Maja</h3>
          <p className="text-gray-400 mb-8">Säynätsalon saari, Kuhmoinen, Päijänne</p>
          <div className="flex justify-center gap-8 mb-8">
            <Mail className="w-6 h-6 cursor-pointer hover:text-blue-400 transition-colors" />
            <Phone className="w-6 h-6 cursor-pointer hover:text-blue-400 transition-colors" />
            <MapPin className="w-6 h-6 cursor-pointer hover:text-blue-400 transition-colors" />
          </div>
          <p className="text-gray-500 text-sm">© 2024 Villa Maja. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}