import axios from 'axios';

// Available enhancement styles
export const STYLE_OPTIONS = {
  BW_PRESERVE: 'bw-preserve',
  COLORIZE: 'colorize',
  RANDOM: 'random'
};

// Style metadata for UI display
export const STYLE_METADATA = [
  {
    id: STYLE_OPTIONS.BW_PRESERVE,
    label: 'Black & White',
    icon: '📸',
    description: 'Preserve monochrome aesthetic, enhance clarity and remove noise'
  },
  {
    id: STYLE_OPTIONS.COLORIZE,
    label: 'Colorized',
    icon: '🎨',
    description: 'Add historically accurate colorization and enhance quality'
  },
  {
    id: STYLE_OPTIONS.RANDOM,
    label: 'Surprise Me',
    icon: '🎲',
    description: 'Let AI choose the best creative enhancement'
  }
];

/**
 * Upscale and enhance an image using Gemini AI
 * @param {string} imageBase64 - Base64 encoded image data (with or without data URI prefix)
 * @param {string} style - Enhancement style (bw-preserve, colorize, or random)
 * @returns {Promise<{success: boolean, processedImage?: string, metadata?: object, error?: string}>}
 */
export async function upscaleImage(imageBase64, style) {
  try {
    // Validate inputs
    if (!imageBase64) {
      throw new Error('Image data is required');
    }

    if (!Object.values(STYLE_OPTIONS).includes(style)) {
      throw new Error('Invalid style option');
    }

    // Determine API endpoint
    // In development, use Vercel dev server or proxy
    // In production, use relative path (Vercel handles routing)
    const apiEndpoint = '/api/gemini-upscale';

    // Make API request
    const response = await axios.post(
      apiEndpoint,
      {
        imageBase64,
        style,
        originalFilename: 'photo.jpg' // Could be passed as parameter if needed
      },
      {
        timeout: 60000, // 60 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Gemini service error:', error);

    // Handle different error types
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      throw new Error('Enhancement is taking too long. Please check your connection and try again.');
    }

    if (error.response?.status === 429) {
      throw new Error('Service is busy. Please wait a moment and try again.');
    }

    if (error.response?.status === 400) {
      throw new Error(error.response.data?.error || 'Invalid image or request.');
    }

    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    throw new Error('Failed to enhance photo. Please try again.');
  }
}

/**
 * Get style metadata by ID
 * @param {string} styleId - Style ID
 * @returns {object|null} Style metadata or null if not found
 */
export function getStyleMetadata(styleId) {
  return STYLE_METADATA.find(s => s.id === styleId) || null;
}

export default {
  upscaleImage,
  getStyleMetadata,
  STYLE_OPTIONS,
  STYLE_METADATA
};
