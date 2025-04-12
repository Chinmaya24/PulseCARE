import React, { useState } from "react";
import axios from "axios";
import { RiSpeakFill } from "react-icons/ri";
import { HiSpeakerXMark } from "react-icons/hi2";

// Define API response type
interface TextToSpeechResponse {
  audioContent: string;
}

const TextToSpeech: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // ⚠️ Note: In a production application, you should never expose your API key in the frontend
  // Store this in an environment variable and use a backend proxy to make API calls
  const API_KEY = "AIzaSyDQbc5sxwrvdn1WzY9__uM8RxZkATbvuFM"; // Replace with your API key

  // Function to fetch the readable content of the page
  const getPageContent = (): string => {
    const headings = [...document.querySelectorAll("h1, h2, p, span, h3")];
    const content = headings.map((heading) => (heading as HTMLElement).innerText).join(" ");

    return content || "No readable content found.";
  };

  // Function to detect language
  const detectLanguage = (text: string): string => {
    if (/[अ-ह]/.test(text)) return "hi-IN"; // Hindi
    if (/[ಕ-ಹ]/.test(text)) return "kn-IN"; // Kannada
    if (/[అ-హ]/.test(text)) return "te-IN"; // Telugu
    if (/[മ-ഹ]/.test(text)) return "ml-IN"; // Malayalam
    if (/[ଅ-ହ]/.test(text)) return "or-IN"; // Odia
    if (/[ਗ-ਹ]/.test(text)) return "pa-IN"; // Punjabi
    if (/[গ-হ]/.test(text)) return "bn-IN"; // Bengali
    if (/[उ-य़]/.test(text)) return "mr-IN"; // Marathi
    if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN"; // Tamil
    if (/[அ]/.test(text)) return "ta-IN"; // Tamil
    if (/[௰-௹]/.test(text)) return "ta-IN"; // Tamil-specific symbols
    if (/[અ-હ]/.test(text)) return "gu-IN"; // Gujarati
    if (/[ऋ-ह]/.test(text)) return "sa-IN"; // Sanskrit
    
    return "en-US"; // Default to English
  };

  // Function to fetch audio using Google Cloud API
  const fetchAudio = async (text: string, language: string): Promise<string | null> => {
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

    const data = {
      input: { text },
      voice: {
        languageCode: language,
        ssmlGender: "FEMALE", // Change to "MALE" or "NEUTRAL" if needed
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: language !== "en-US" ? 0.7 : 1, // Adjust speed for non-English languages
        pitch: 0,
      },
    };

    try {
      const response = await axios.post<TextToSpeechResponse>(url, data);
      return response.data.audioContent;
    } catch (error) {
      console.error("Error fetching audio:", error);
      return null;
    }
  };

  // Function to handle read-out
  const handleReadOut = async (): Promise<void> => {
    const content = getPageContent();
    const language = detectLanguage(content);

    setIsLoading(true);

    // Fetch synthesized speech
    const audioContent = await fetchAudio(content, language);

    setIsLoading(false);

    if (audioContent) {
      const audioBlob = new Blob(
        [new Uint8Array(atob(audioContent).split("").map((c) => c.charCodeAt(0)))],
        { type: "audio/mp3" }
      );
      const audioUrl = URL.createObjectURL(audioBlob);

      const audioElement = new Audio(audioUrl);
      setAudio(audioElement);

      // Play audio
      audioElement.play();
      setIsSpeaking(true);

      audioElement.onended = () => {
        setIsSpeaking(false);
        setAudio(null);
      };
    }
  };

  // Function to stop audio playback
  const handleStopSpeech = (): void => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
      setIsSpeaking(false);
    }
  };

  return (
    <>
      <style>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div>
        {!isSpeaking ? (
          <button
            onClick={handleReadOut}
            className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-400"
            aria-label="Read aloud"
            title="Text to speech"
          >
            <RiSpeakFill className="cursor-pointer hover:text-black" />
          </button>
        ) : (
          <button
            onClick={handleStopSpeech}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-400"
            aria-label="Stop speaking"
            title="Stop speaking"
          >
            <HiSpeakerXMark className="cursor-pointer hover:text-black" />
          </button>
        )}

        {isLoading && <div className="loader" />}
      </div>
    </>
  );
};

export default TextToSpeech;