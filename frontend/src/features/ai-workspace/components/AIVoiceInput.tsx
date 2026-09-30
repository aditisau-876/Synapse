import { Mic, MicOff } from "lucide-react";
import { useState } from "react";

interface SpeechRecognitionResultEventLike { results: ArrayLike<ArrayLike<{ transcript: string }>>; }
type SpeechRecognitionCtor = new () => { lang: string; interimResults: boolean; maxAlternatives: number; onstart: (() => void) | null; onend: (() => void) | null; onerror: (() => void) | null; onresult: ((event: SpeechRecognitionResultEventLike) => void) | null; start: () => void; stop: () => void; };
interface Props {
  onTranscript?: (text: string) => void;
}

export default function AIVoiceInput({
  onTranscript,
}: Props) {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    const speechWindow = window as typeof window & { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Recognition) { setIsListening(false); return; }
    if (isListening) { setIsListening(false); return; }
    const recognition = new Recognition();
    recognition.lang = "en-US"; recognition.interimResults = false; recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => onTranscript?.(event.results[0][0].transcript);
    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      aria-label={
        isListening
          ? "Stop voice input"
          : "Start voice input"
      }
      className={`
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        transition-all
        duration-200

        ${
          isListening
            ? "bg-[var(--synapse-accent-500)] text-white shadow-lg"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
      `}
    >
      {isListening ? (
        <MicOff size={19} />
      ) : (
        <Mic size={19} />
      )}
    </button>
  );
}