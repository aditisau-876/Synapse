import {
  Download,
  Share2,
  Sparkles,
  Undo2,
  Redo2,
} from "lucide-react";

import { useWhiteboard } from "../../hooks/useWhiteboard";

export default function WhiteboardHeader() {

  const {

    undo,

    redo,

    elements,

  } = useWhiteboard();

  //----------------------------------------
  // Export JSON
  //----------------------------------------

  function exportBoard() {

    const data = JSON.stringify(
      elements,
      null,
      2
    );

    const blob = new Blob(
      [data],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "whiteboard.json";

    a.click();

    URL.revokeObjectURL(url);

  }

  //----------------------------------------
  // Share (placeholder)
  //----------------------------------------

  function shareBoard() {

    alert(
      "Sharing will be available after backend integration."
    );

  }

  //----------------------------------------

  return (

    <header
      className="
      flex
      items-center
      justify-between
      border-b
      border-border
      bg-card/70
      px-8
      py-5
      backdrop-blur-xl
      "
    >

      <div>

        <h1 className="text-xl font-bold">
          Whiteboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Infinite collaborative workspace
        </p>

      </div>

      <div className="flex items-center gap-3">

        {/* Undo */}

        <button

          onClick={undo}

          title="Undo"

          className="
          rounded-xl
          border
          border-border
          bg-background/60
          p-2.5
          transition
          hover:border-[color:var(--synapse-accent-500)]
          hover:text-brand
          "

        >

          <Undo2 size={18}/>

        </button>

        {/* Redo */}

        <button

          onClick={redo}

          title="Redo"

          className="
          rounded-xl
          border
          border-border
          bg-background/60
          p-2.5
          transition
          hover:border-[color:var(--synapse-accent-500)]
          hover:text-brand
          "

        >

          <Redo2 size={18}/>

        </button>

        {/* AI */}

        <button

          title="AI Assistant"

          className="
          rounded-xl
          border
          border-border
          bg-background/60
          p-2.5
          transition
          hover:border-[color:var(--synapse-accent-500)]
          hover:text-brand
          "

        >

          <Sparkles size={18}/>

        </button>

        {/* Export */}

        <button

          onClick={exportBoard}

          title="Export"

          className="
          rounded-xl
          border
          border-border
          bg-background/60
          p-2.5
          transition
          hover:border-[color:var(--synapse-accent-500)]
          hover:text-brand
          "

        >

          <Download size={18}/>

        </button>

        {/* Share */}

        <button

          onClick={shareBoard}

          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-[var(--synapse-accent-500)]
          px-5
          py-2.5
          text-white
          shadow-lg
          "

        >

          <Share2 size={18}/>

          Share

        </button>

      </div>

    </header>

  );

}