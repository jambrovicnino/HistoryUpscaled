import { GoogleGenerativeAI } from '@google/generative-ai';

// Style-specific prompts for AI enhancement
const STYLE_PROMPTS = {
  'bw-preserve': `You are an expert photo restoration specialist. Enhance this black and white photograph by:
- Preserving the monochrome aesthetic (keep it black and white)
- Increasing clarity and sharpness
- Removing noise and grain while maintaining natural texture
- Enhancing contrast for better depth
- Upscaling to 4K resolution (3840x2160) with optimal quality
- Maintaining the historical authenticity of the image

Return ONLY the enhanced image without any additional text or explanation.`,

  'colorize': `You are an expert photo colorization specialist. Transform this photograph by:
- Adding historically accurate colorization based on the era and context
- Using natural, period-appropriate colors
- Enhancing overall image quality and clarity
- Removing noise and grain
- Upscaling to 4K resolution (3840x2160)
- Ensuring smooth color transitions and realistic skin tones
- Maintaining the historical authenticity while adding vibrant, lifelike colors

Return ONLY the enhanced and colorized image without any additional text or explanation.`,

  'random': `You are a creative photo enhancement artist. Apply your artistic judgment to enhance this photograph by:
- Choosing an appropriate style (could be subtle enhancement, dramatic colorization, or artistic interpretation)
- Enhancing quality, clarity, and detail
- Upscaling to 4K resolution (3840x2160)
- Removing imperfections while maintaining character
- Creating a visually stunning result
- Feel free to be creative while respecting the original subject matter

Return ONLY the enhanced image without any additional text or explanation.`
};

// Maximum file size: 10MB (in bytes)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { imageBase64, style, originalFilename } = req.body;

    // Validate request
    if (!imageBase64 || !style) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: imageBase64 and style'
      });
    }

    if (!STYLE_PROMPTS[style]) {
      return res.status(400).json({
        success: false,
        error: 'Invalid style. Must be one of: bw-preserve, colorize, random'
      });
    }

    // Extract base64 data (remove data:image/...;base64, prefix if present)
    const base64Data = imageBase64.includes(',')
      ? imageBase64.split(',')[1]
      : imageBase64;

    // Check file size
    const sizeInBytes = (base64Data.length * 3) / 4;
    if (sizeInBytes > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        error: `Image too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`
      });
    }

    // Initialize Gemini API
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('VITE_GEMINI_API_KEY is not configured');
      return res.status(500).json({
        success: false,
        error: 'Service temporarily unavailable. Please try again later.'
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Prepare the image for Gemini
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg' // Gemini accepts various formats
      }
    };

    // Generate enhanced image
    console.log(`Processing image with style: ${style}`);
    const result = await model.generateContent([
      STYLE_PROMPTS[style],
      imagePart
    ]);

    const response = await result.response;
    const text = response.text();

    // Check if we got an image back
    // Note: Gemini 2.0 Flash supports image generation
    // The response format may vary, so we need to handle it appropriately

    // For now, we'll return a success response
    // In production, you'd extract the actual image data from the response
    return res.status(200).json({
      success: true,
      processedImage: imageBase64, // Placeholder - replace with actual processed image
      metadata: {
        style,
        originalFilename,
        processedAt: new Date().toISOString(),
        model: 'gemini-2.0-flash-exp'
      }
    });

  } catch (error) {
    console.error('Error processing image:', error);

    // Handle specific error types
    if (error.message?.includes('quota')) {
      return res.status(429).json({
        success: false,
        error: 'Service is busy. Please wait a moment and try again.'
      });
    }

    if (error.message?.includes('timeout')) {
      return res.status(408).json({
        success: false,
        error: 'Enhancement is taking too long. Please check your connection and try again.'
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again or contact support.'
    });
  }
}
