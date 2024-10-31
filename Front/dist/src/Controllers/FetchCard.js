document.addEventListener('DOMContentLoaded', function () {
  getAllTasks();
});

function getAllTasks() {
  const taskContainer = document.getElementById('taskContainer');
  let lastTaskId = localStorage.getItem("lastTaskId");

  // Check if `lastTaskId` exists and that `taskContainer` is available
  if (!lastTaskId || !taskContainer) { 
      console.log("No tasks found or taskContainer is missing.");
      return;
  }

  // Parse the last task ID as an integer
  lastTaskId = parseInt(lastTaskId);

  for (let i = 1; i <= lastTaskId; i++) {
      const taskKey = `task-${i}`;
      const task = localStorage.getItem(taskKey);

      // Check if the task data exists in localStorage
      if (task) {
          const [title, description, dueDate, workarea] = task.split(';');
          const postItColour = getColor(workarea);

          // Create a TaskStickerController element for each task
          const taskStickerController = document.createElement('task-sticker-controller');
          taskStickerController.setAttribute('title', title);
          taskStickerController.setAttribute('data-key', taskKey);
          taskStickerController.setAttribute('description', description);
          taskStickerController.setAttribute('postItColour', postItColour);
          taskStickerController.setAttribute('dueDate', new Date(dueDate).toISOString().split('T')[0]);

          // Wrap the task sticker controller in a div for draggable functionality
          const wrapper = document.createElement('div');
          wrapper.classList.add('drag'); // For drag-and-drop capability
          wrapper.appendChild(taskStickerController);

          // Append the wrapper to the taskContainer
          taskContainer.appendChild(wrapper);
      } else {
          console.log(`Task ${i} does not exist.`);
      }
  }
}

// Helper function to determine color based on the work area
function getColor(workarea) {
  switch (workarea) {
      case "Front": return "pink";
      case "Back": return "blue";
      case "Server": return "yellow";
      case "Testing": return "green";
      default: return "yellow"; // default color if no match
  }
}
