import { useRef, useState } from "react";
import { FileUp, FileText, X } from "lucide-react";

interface Props {
  onFileSelect?: (file: File) => void;
}

export default function AIFileUpload({
  onFileSelect,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    onFileSelect?.(selectedFile);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg,.jpeg"
        onChange={handleChange}
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            border
            border-dashed
            border-border
            bg-background
            px-4
            py-3
            text-left
            transition
            hover:border-[var(--synapse-accent-500)]
            hover:bg-[var(--synapse-accent-500)]/5
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[var(--synapse-accent-500)]/10
              text-[var(--synapse-accent-500)]
            "
          >
            <FileUp size={19} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium">
              Upload a file
            </p>

            <p className="text-xs text-muted-foreground">
              PDF, Word, PowerPoint, text or image
            </p>
          </div>
        </button>
      ) : (
        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-border
            bg-card
            px-4
            py-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[var(--synapse-accent-500)]/10
              text-[var(--synapse-accent-500)]
            "
          >
            <FileText size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {file.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="
              rounded-xl
              p-2
              text-muted-foreground
              transition
              hover:bg-muted
              hover:text-foreground
            "
            aria-label="Remove file"
          >
            <X size={17} />
          </button>
        </div>
      )}
    </div>
  );
}