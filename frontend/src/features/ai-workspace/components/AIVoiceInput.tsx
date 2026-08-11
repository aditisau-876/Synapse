import { Mic, MicOff } from "lucide-react";
import { useState } from "react";

interface Props {
  onTranscript?: (text: string) => void;
}

export default function AIVoiceInput({
  onTranscript,
}: Props) {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening((current) => !current);

    /*
     * Actual speech recognition will be connected later.
     *
     * When the backend / browser speech API is connected,
     * the resulting transcript can be passed to:
     *
     * onTranscript?.(transcript);
     */
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