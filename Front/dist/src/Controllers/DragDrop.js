window.dragInit = function () {
    const columns = [
        document.querySelector('#on-hold [slot="content"]'),
        document.querySelector('#not-started [slot="content"]'),
        document.querySelector('#in-progress [slot="content"]'),
        document.querySelector('#review-ready [slot="content"]'),
        document.querySelector('#done [slot="content"]')
    ];

    // Add placeholders for empty columns
    columns.forEach(column => updatePlaceholder(column));

    // Initialize drag and drop on all draggable items
    const draggableItems = document.querySelectorAll('.drag');
    draggableItems.forEach(item => {
        item.setAttribute('draggable', 'true');
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    // Set up dragover and drop events for columns
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
    });

    // Functions to handle drag-and-drop events
    let draggedItem = null;
    let sourceColumn = null;

    function handleDragStart(e) {
        draggedItem = e.target;
        sourceColumn = draggedItem.parentNode;

        // Temporarily remove the item and update placeholder for source column
        updatePlaceholder(sourceColumn);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", e.target.id);
    }

    function handleDragEnd(e) {
        draggedItem = null;
        sourceColumn = null;
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const targetColumn = e.currentTarget;

        if (draggedItem) {
            // Append the item to the target column
            targetColumn.appendChild(draggedItem);

            // Update placeholders for both source and target columns
            updatePlaceholder(sourceColumn);
            updatePlaceholder(targetColumn);
        }
    }

    // Function to add/remove placeholder based on column content
    function updatePlaceholder(column) {
        const placeholder = column.querySelector('.placeholder');
        const hasItems = column.querySelector('.drag');

        if (!hasItems && !placeholder) {
            // Add placeholder if no items exist
            const newPlaceholder = document.createElement('div');
            newPlaceholder.classList.add('placeholder');
            newPlaceholder.innerHTML = '<p>Drop items here</p>';
            column.appendChild(newPlaceholder);
        } else if (hasItems && placeholder) {
            // Remove placeholder if items are present
            column.removeChild(placeholder);
        }
    }
};
