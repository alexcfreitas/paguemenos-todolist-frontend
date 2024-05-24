import React from "react";
import { useSwipeable } from "react-swipeable";
import { ProjectTask } from "../domains/ProjectTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faArrowRight,
  faTrashAlt,
  faTrashCanArrowUp,
  faChevronCircleRight,
  faTruckArrowRight,
  faArrowUpRightFromSquare,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

interface SwipeableTaskItemProps {
  projectTask: ProjectTask;
  onToggleCompletion: () => void;
  onDelete: () => void;
}

const SwipeableTaskItem: React.FC<SwipeableTaskItemProps> = ({
  projectTask,
  onToggleCompletion,
  onDelete,
}) => {
  const handlers = useSwipeable({
    onSwipedRight: onDelete,
    trackMouse: true,
  });

  return (
    <li
      key={projectTask.id}
      id={`task-${projectTask.id}`}
      className={`task-item ${projectTask.isCompleted ? "completed" : ""}`}
      {...handlers}
    >
      <div className="task-details">
        <input
          type="checkbox"
          checked={projectTask.isCompleted}
          onChange={onToggleCompletion}
          className="task-checkbox"
        />
        <div>
          <span className="task-title">{projectTask.title}</span>
          {projectTask.description && (
            <div
              className={`task-description ${
                projectTask.isCompleted ? "completed-description" : ""
              }`}
            >
              {projectTask.description}
            </div>
          )}
        </div>
      </div>
      <div className="delete-icon">
        <FontAwesomeIcon icon={faArrowRightLong} />
      </div>
    </li>
  );
};

export default SwipeableTaskItem;
