import KanbanColumn from "./KanbanColumn";

import { useKanban } from "../hooks/useKanban";

export default function KanbanBoard() {

  const {

    todo,

    progress,

    review,

    done,

  } = useKanban();

  return (

    <div
      className="
      grid
      gap-6
      xl:grid-cols-4
      "
    >

      <KanbanColumn
        title="Todo"
        tasks={todo}
      />

      <KanbanColumn
        title="In Progress"
        tasks={progress}
      />

      <KanbanColumn
        title="Review"
        tasks={review}
      />

      <KanbanColumn
        title="Done"
        tasks={done}
      />

    </div>

  );

}