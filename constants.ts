import { Product } from './types';

export const COLORS = {
  primaryGradient: 'linear-gradient(135deg, #0fb8ad 0%, #1fc8db 100%)',
  accentGradient: 'linear-gradient(135deg, #ff9a76 0%, #ff6a88 100%)',
  text: '#212528',
  glassBorder: 'rgba(255,255,255,0.12)',
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Titanium Ergo Walker Pro',
    category: 'Mobility Aid',
    priceRef: 450,
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop',
    shortDescription: 'Ultra-lightweight titanium frame designed for post-operative recovery and maximum stability.',
    clinicalSummary: 'Clinically recommended for patients < 8 weeks post-TKA (Total Knee Arthroplasty). Reduces wrist strain by 40% compared to standard aluminum models. Features shock-absorbing flex frame.',
    badges: ['Titanium', 'Foldable', 'Shock-Absorb'],
    specs: { 
        'Weight': '2.1kg', 
        'Max Load': '150kg', 
        'Grip': 'Ergo-Form', 
        'Wheels': '6" All-Terrain' 
    }
  },
  {
    id: 'p2',
    name: 'HydroLift Smart Bath Chair',
    category: 'Bathroom Safety',
    priceRef: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    shortDescription: 'Automated hydraulic lift system for safe, independent bathtub entry and exit.',
    clinicalSummary: 'Essential for fall prevention in high-risk wet environments. Zero-effort hydraulic assist allows seated transfer without caregiver strain. Anti-slip textural seating surface.',
    badges: ['Hydraulic', 'Waterproof IP68', 'Swivel Seat'],
    specs: { 
        'Seat Width': '45cm', 
        'Lift Mechanism': 'Hydraulic', 
        'Battery': 'Rechargeable', 
        'Install': 'Tool-free' 
    }
  },
  {
    id: 'p3',
    name: 'NeuroStep Gait Stabilizer',
    category: 'Rehab Robotics',
    priceRef: 890,
    imageUrl: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1000&auto=format&fit=crop',
    shortDescription: 'Active feedback wearable that corrects foot drop and stabilizes gait patterns after stroke.',
    clinicalSummary: 'Uses functional electrical stimulation (FES) to lift the foot at the correct phase of walking. Proven to improve walking speed by 25% in post-stroke patients.',
    badges: ['AI Sensor', 'Gait Correction', 'Bluetooth'],
    specs: { 
        'Battery Life': '24 Hours', 
        'Response Time': '<10ms', 
        'Weight': '350g', 
        'Size': 'Universal Adjustable' 
    }
  },
  {
    id: 'p4',
    name: 'CloudRest Zero-G Lift Chair',
    category: 'Home Comfort',
    priceRef: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1000&auto=format&fit=crop',
    shortDescription: 'Medical-grade recliner with dual-motor lift assist and zero-gravity positioning.',
    clinicalSummary: 'Reduces lower back pressure and edema. The vertical lift function assists patients with limited core strength to stand safely without knee strain.',
    badges: ['Dual Motor', 'Zero-Gravity', 'Heat Therapy'],
    specs: { 
        'Fabric': 'Anti-microbial Weave', 
        'Recline Angle': '165°', 
        'Motors': 'Heavy Duty Dual', 
        'Warranty': '5 Years' 
    }
  },
  {
    id: 'p5',
    name: 'SwiftGlider 4-Wheel Scooter',
    category: 'Outdoor Mobility',
    priceRef: 3200,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1664302152996-037785c49080?q=80&w=1932&auto=format&fit=crop',
    shortDescription: 'All-terrain mobility scooter with long-range battery and full suspension system.',
    clinicalSummary: 'Ideal for users with limited walking endurance (COPD, CHF) who wish to maintain community independence. Features a tight turning radius for indoor/outdoor versatility.',
    badges: ['40km Range', 'Full Suspension', 'LED Lights'],
    specs: { 
        'Speed': '15km/h', 
        'Range': '40km', 
        'Capacity': '160kg', 
        'Tires': 'Pneumatic' 
    }
  },
  {
    id: 'p6',
    name: 'TheraSleep Adjustable Bed',
    category: 'Bedroom Safety',
    priceRef: 1850,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?q=80&w=2070&auto=format&fit=crop',
    shortDescription: 'Hospital-grade functionality with a home-style aesthetic. Wireless remote control.',
    clinicalSummary: 'Elevates head/feet to improve circulation and reduce acid reflux/snoring. Hi-Lo function assists with safe transfers in and out of bed for fall prevention.',
    badges: ['Hi-Lo Lift', 'Massage', 'Under-light'],
    specs: { 
        'Size': 'Twin XL / Queen', 
        'Motor': 'Whisper Quiet', 
        'Height': 'Adjustable 10-30"', 
        'Remote': 'Wireless' 
    }
  },
  {
    id: 'p7',
    name: 'OxyFlow Portable Conc.',
    category: 'Respiratory',
    priceRef: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1631541909061-71e349d1f241?q=80&w=1973&auto=format&fit=crop',
    shortDescription: 'Lightweight portable oxygen concentrator with pulse-dose technology.',
    clinicalSummary: 'Provides medical-grade oxygen on the go. Pulse-dose delivery extends battery life up to 8 hours. FAA approved for air travel.',
    badges: ['2.2kg', 'FAA Approved', '8hr Battery'],
    specs: { 
        'Flow': '1-5L Pulse', 
        'Noise': '<40dB', 
        'Screen': 'LCD Touch', 
        'Charging': 'AC/DC/Car' 
    }
  },
  {
    id: 'p8',
    name: 'EzAccess Modular Ramp',
    category: 'Accessibility',
    priceRef: 600,
    imageUrl: 'https://images.unsplash.com/photo-1622394208003-827827807218?q=80&w=2004&auto=format&fit=crop',
    shortDescription: 'Customizable aluminum modular ramp system for home entryways.',
    clinicalSummary: 'Essential for wheelchair/scooter access. High-traction surface prevents slips in Canadian winters. Modular design allows fitting to any staircase configuration.',
    badges: ['Aluminum', 'High-Traction', 'Modular'],
    specs: { 
        'Material': 'Aircraft Alum.', 
        'Width': '36 inches', 
        'Load': '400kg', 
        'Install': 'Within 2 hours' 
    }
  }
];

export const UI_TEXT = {
    heroTitle: 'AliTaram.',
    heroSubtitle: 'Advanced rehabilitation solutions tailored to your recovery journey. Excellence in mobility care.',
    bookConsult: 'Book Consultation',
    browseProducts: 'Browse Products',
    consultRequired: 'Consultation Required',
    viewDetails: 'View Details',
    chatWithAgent: 'Chat with Specialist',
    categories: 'Categories',
    searchPlaceholder: 'Describe your needs...',
    startChat: 'Start Chat',
    chatPlaceholder: 'Type your message...',
    consultationTitle: 'Request Consultation',
    stepContact: 'Contact',
    stepCondition: 'Condition',
    stepContext: 'Context',
    stepConfirm: 'Confirm',
    submit: 'Submit Request',
    next: 'Next',
    back: 'Back',
    privacyConsent: 'By chatting you consent to us storing your messages to assist with recommendations.',
    footerText: '© 2024 AliTaram. Designed & Developed by Teco.'
};