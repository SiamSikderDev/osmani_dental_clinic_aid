export interface SiteSettings {
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: {
      weekday: string;
      saturday: string;
      sunday: string;
    };
  };
  map: {
    embedUrl: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  images: {
    hero: string;
    clinicInterior: string;
    teamPhoto: string;
    beforeAfter: string;
    servicesHero: string;
  };
  testimonials: {
    id: string;
    name: string;
    rating: number;
    image: string;
    text: string;
  }[];
  doctors: {
    id: string;
    name: string;
    specialization: string;
    credentials: string;
    image: string;
    bio: string;
  }[];
  services: {
    id: string;
    name: string;
    shortDesc: string;
    description: string;
    priceRange: string;
    icon: string;
  }[];
  adminPassword?: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  };
  faqCategories: {
    category: string;
    questions: { q: string; a: string }[];
  }[];
  about: {
    heroSubtitle: string;
    storyTitle: string;
    storyParagraph1: string;
    storyParagraph2: string;
    mission: string;
    vision: string;
    values: string;
    timeline: {
      year: string;
      title: string;
      desc: string;
    }[];
    certifications: string[];
  };
}

export const defaultSettings: SiteSettings = {
  contact: {
    phone: '+1 (555) 123-4567',
    email: 'info@dentacare.com',
    address: '123 Dental Avenue, Suite 100\nNew York, NY 10001',
    hours: {
      weekday: '8:00 AM - 7:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: 'Closed',
    },
  },
  map: {
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-73.99078228459418!3d40.74013294379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus',
  },
  hero: {
    title: 'Your Healthiest Smile Starts Here',
    subtitle:
      'Experience compassionate, world-class dental care in a comfortable environment. Our team of experts is dedicated to giving you the smile you\u0027ve always dreamed of.',
    ctaText: 'Book Appointment',
  },
  images: {
    hero: '/images/hero-image.jpeg',
    clinicInterior: '/images/clinic-interior.jpeg',
    teamPhoto: '/images/team-photo.jpeg',
    beforeAfter: '/images/before-after-1.jpeg',
    servicesHero: '/images/services-hero.jpeg',
  },
  testimonials: [
    {
      id: 'test-1',
      name: 'Emily Rodriguez',
      rating: 5,
      image: '/images/patient-review-1.jpeg',
      text: 'Absolutely amazing experience! The staff was incredibly gentle and professional. My teeth whitening results exceeded expectations.',
    },
    {
      id: 'test-2',
      name: 'Michael Thompson',
      rating: 5,
      image: '/images/patient-review-2.jpeg',
      text: 'I was terrified of dentists until I found DentaCare. Dr. Mitchell made my root canal completely painless. Highly recommend!',
    },
    {
      id: 'test-3',
      name: 'Priya Sharma',
      rating: 5,
      image: '/images/patient-review-3.jpeg',
      text: 'My kids actually look forward to their dental visits now! Dr. Okafor is wonderful with children. Best pediatric dentist in town.',
    },
  ],
  doctors: [
    {
      id: 'doc-1',
      name: 'Dr. Sarah Mitchell',
      specialization: 'General & Cosmetic Dentistry',
      credentials: 'DDS, FAGD',
      image: '/images/doctor-1.jpeg',
      bio: 'With over 15 years of experience, Dr. Mitchell specializes in cosmetic dentistry and smile makeovers.',
    },
    {
      id: 'doc-2',
      name: 'Dr. James Chen',
      specialization: 'Orthodontics',
      credentials: 'DMD, MS Orthodontics',
      image: '/images/doctor-2.jpeg',
      bio: 'Dr. Chen is a board-certified orthodontist with expertise in Invisalign and complex bite corrections.',
    },
    {
      id: 'doc-3',
      name: 'Dr. Amara Okafor',
      specialization: 'Pediatric Dentistry',
      credentials: 'DDS, Pediatric Specialty',
      image: '/images/doctor-3.jpeg',
      bio: 'Dr. Okafor is passionate about creating positive dental experiences for children of all ages.',
    },
  ],
  services: [
    {
      id: 'general-dentistry',
      name: 'General Dentistry',
      shortDesc: 'Comprehensive check-ups, cleanings, and preventive care to keep your smile healthy.',
      description:
        'Our general dentistry services cover everything from routine check-ups and professional cleanings to fillings and preventive treatments.',
      priceRange: '$80 - $300',
      icon: 'Stethoscope',
    },
    {
      id: 'teeth-whitening',
      name: 'Teeth Whitening',
      shortDesc: 'Professional whitening treatments for a brighter, more confident smile.',
      description:
        'Achieve a dazzling smile with our professional teeth whitening options, both in-office and take-home kits.',
      priceRange: '$250 - $600',
      icon: 'Sparkles',
    },
    {
      id: 'orthodontics',
      name: 'Orthodontics (Braces)',
      shortDesc: 'Straighten your teeth with modern braces and clear aligner options.',
      description:
        'From traditional metal braces to invisible aligners, our orthodontic treatments give you a perfectly aligned smile.',
      priceRange: '$3,000 - $7,000',
      icon: 'Smile',
    },
    {
      id: 'dental-implants',
      name: 'Dental Implants',
      shortDesc: 'Permanent tooth replacement that looks and feels natural.',
      description:
        'Dental implants are the gold standard for missing tooth replacement with beautiful, permanent results.',
      priceRange: '$2,000 - $5,000',
      icon: 'Cross',
    },
    {
      id: 'root-canal',
      name: 'Root Canal',
      shortDesc: 'Pain-free root canal therapy to save your natural tooth.',
      description:
        'Modern root canal treatment is comfortable and efficient, saving your natural tooth with a crown restoration.',
      priceRange: '$700 - $1,500',
      icon: 'Heart',
    },
    {
      id: 'pediatric-dentistry',
      name: 'Pediatric Dentistry',
      shortDesc: 'Gentle, fun dental care designed specifically for children.',
      description:
        'Our pediatric dentists specialize in making dental visits fun and stress-free for kids of all ages.',
      priceRange: '$60 - $250',
      icon: 'Baby',
    },
  ],
  socialLinks: {
    facebook: 'https://facebook.com/dentacare',
    instagram: 'https://instagram.com/dentacare',
    twitter: 'https://twitter.com/dentacare',
    linkedin: 'https://linkedin.com/company/dentacare',
    youtube: '',
    tiktok: '',
  },
  faqCategories: [
    {
      category: 'General',
      questions: [
        { q: 'How often should I visit the dentist?', a: 'We recommend visiting the dentist every 6 months for a routine check-up and professional cleaning. This helps prevent cavities, gum disease, and other oral health issues.' },
        { q: 'Do you accept new patients?', a: 'Yes! We are always accepting new patients. You can book your first appointment online or call our office directly.' },
        { q: 'What should I bring to my first appointment?', a: 'Please bring a valid ID, your insurance card (if applicable), any recent dental records, and a list of medications you are currently taking.' },
      ],
    },
    {
      category: 'Treatments',
      questions: [
        { q: 'Does teeth whitening damage enamel?', a: 'No, professional teeth whitening performed by our dentists is completely safe and does not damage your enamel. We use clinically proven methods that protect your teeth.' },
        { q: 'How long do dental implants last?', a: 'With proper care, dental implants can last a lifetime. They are designed to be a permanent solution for missing teeth.' },
        { q: 'Is orthodontic treatment only for kids?', a: 'Absolutely not! We treat patients of all ages. Adults make up a significant portion of our orthodontic patients, and we offer discreet options like clear aligners.' },
      ],
    },
    {
      category: 'Payments',
      questions: [
        { q: 'Do you accept dental insurance?', a: 'We accept most major dental insurance plans. Please contact our office with your insurance details and we will verify your coverage before your appointment.' },
        { q: 'Do you offer payment plans?', a: 'Yes, we offer flexible payment plans and financing options through CareCredit and Lending Club. We also offer a discount for patients without insurance.' },
        { q: 'What forms of payment do you accept?', a: 'We accept cash, credit cards (Visa, MasterCard, American Express), debit cards, and dental financing options.' },
      ],
    },
    {
      category: 'Emergency',
      questions: [
        { q: 'What counts as a dental emergency?', a: 'Dental emergencies include severe toothache, knocked-out teeth, cracked or broken teeth, lost fillings or crowns, abscesses, and uncontrolled bleeding.' },
        { q: 'Do you offer same-day emergency appointments?', a: 'Yes, we reserve slots each day for dental emergencies. Call our emergency line at +1 (555) 123-4567 for immediate assistance.' },
        { q: 'What should I do if a tooth is knocked out?', a: 'Place the tooth back in the socket if possible (hold by the crown, not the root). If not, keep it in milk or saliva. Seek dental care immediately \u2014 within 30 minutes for best results.' },
      ],
    },
  ],
  about: {
    heroSubtitle: 'For over 15 years, DentaCare has been a trusted name in dental health, combining cutting-edge technology with compassionate care.',
    storyTitle: 'A Legacy of Exceptional Care',
    storyParagraph1: 'DentaCare was founded in 2009 with a simple mission: to provide world-class dental care in a warm, welcoming environment. What started as a small practice has grown into one of the most trusted dental clinics in the region.',
    storyParagraph2: 'Our philosophy is built on the belief that everyone deserves a healthy, beautiful smile. We combine the latest technology with gentle, personalized care to ensure every patient leaves our clinic with confidence.',
    mission: 'To provide compassionate, high-quality dental care that empowers our patients to achieve optimal oral health and beautiful smiles.',
    vision: 'To be the leading dental care provider, recognized for clinical excellence, innovative technology, and exceptional patient experience.',
    values: 'Integrity, compassion, excellence, and innovation guide everything we do. We treat every patient like family.',
    timeline: [
      { year: '2009', title: 'Founded', desc: 'DentaCare opened its doors with a vision for patient-first dental care.' },
      { year: '2013', title: 'Expansion', desc: 'Expanded to a state-of-the-art facility with 8 treatment rooms.' },
      { year: '2017', title: 'Technology Upgrade', desc: 'Introduced 3D imaging, laser dentistry, and digital impressions.' },
      { year: '2020', title: 'Award Winning', desc: 'Named "Best Dental Clinic" by the City Health Awards.' },
      { year: '2024', title: 'Growth', desc: 'Reached 2000+ patients and expanded our specialist team to 10 doctors.' },
    ],
    certifications: [
      'American Dental Association (ADA)',
      'Accreditation Association for Ambulatory Health Care',
      'International Congress of Oral Implantologists',
      'Board Certified Specialists',
    ]
  }
};
