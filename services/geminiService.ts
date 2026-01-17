import { GoogleGenAI, Modality } from "@google/genai";
import { BUSINESS_INFO } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSystemInstruction = () => `
  You are the AI assistant for ${BUSINESS_INFO.name}, a B2B wholesale sanitary products store in ${BUSINESS_INFO.location}.
  Tone: Friendly, professional, and business-focused.
  Knowledge: 
  - Products: Lavabos (washbasins), Meubles (furniture), Robinetterie (faucets), Baignoires (tubs).
  - Business: Location is Ouled Moussa, Algeria. Hours: ${BUSINESS_INFO.hours}.
  - Pricing: Generally €€€€ range (High-ticket).
  Rules:
  - If unsure, say "Let me check that for you."
  - Collect: Name, email/phone, and inquiry details for quote requests.
  - Never invent prices or specific legal policies.
  - Use Google Maps to help users find our location or related points if they ask.
  - Encourage users to request a formal quote or visit the showroom.
`;

export const chatWithGemini = async (message: string) => {
  let latLng = undefined;
  
  // Attempt to get user location for better grounding if permissions allow
  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
    });
    latLng = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
  } catch (e) {
    console.debug("Location access denied or unavailable.");
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-latest', // Changed to 2.5 series for Maps support
    contents: message,
    config: {
      systemInstruction: getSystemInstruction(),
      temperature: 0.7,
      tools: [{ googleMaps: {} }, { googleSearch: {} }],
      toolConfig: latLng ? {
        retrievalConfig: { latLng }
      } : undefined
    },
  });
  
  return response.text;
};

// Audio Helpers
export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}