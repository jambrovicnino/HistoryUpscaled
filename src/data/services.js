const services = [
  {
    id: 'bw-upscaled',
    name: 'B&W Upscaled',
    icon: '📸',
    description: 'Preserve the classic elegance of your vintage photos with professional upscaling and enhancement.',
    features: [
      'AI-powered resolution enhancement',
      'Noise reduction & sharpening',
      'Scratch & damage repair',
    ],
    basePrice: 79,
    badge: null,
    cardClass: '',
  },
  {
    id: 'colorized',
    name: 'Colorized',
    icon: '🎨',
    description: 'Bring black and white photos to life with historically accurate AI colorization.',
    features: [
      'AI-powered colorization',
      'Realistic color mapping',
      'Period-accurate tones',
    ],
    basePrice: 99,
    badge: 'Most Popular',
    cardClass: 'featured',
  },
  {
    id: 'custom-ai-edit',
    name: 'Custom AI Edit',
    icon: '🤖',
    description: 'Our signature service combining all enhancements with custom artistic touches.',
    features: [
      'Complete AI restoration',
      'Custom artistic editing',
      'Background enhancement',
      'Priority processing',
    ],
    basePrice: 149,
    badge: 'Premium',
    cardClass: 'premium',
  },
];

export default services;
