import {
  FileText,
  Download,
} from "lucide-react";

const files = [
  {
    name: "Design.pdf",
    size: "3.2 MB",
  },
  {
    name: "Meeting Notes.docx",
    size: "520 KB",
  },
];

export default function SharedFiles() {
  return (
    <div className="border-b border-border p-6">

      <h3 className="mb-4 font-semibold">
        Shared Files
      </h3>

      <div className="space-y-3">

        {files.map((file) => (
          <div
            key={file.name}
            className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-border
            p-3
            hover:bg-muted
            "
          >
            <div className="flex items-center gap-3">

              <FileText className="text-[var(--synapse-accent-500)]" />

              <div>

                <p className="font-medium">
                  {file.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {file.size}
                </p>

              </div>

            </div>

            <Download size={18} />

          </div>
        ))}

      </div>

    </div>
  );
}