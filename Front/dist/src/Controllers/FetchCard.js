document.addEventListener('DOMContentLoaded', function () {
  getAllTasks();
});

async function getAllTasks() {
  const taskContainer = document.getElementById('taskContainer');
  const token = localStorage.getItem('token'); // Obtén el token de localStorage

  // Verifica que el contenedor de tareas exista
  if (!taskContainer) { 
    console.log("El contenedor de tareas (taskContainer) no está disponible.");
    return;
  }

  const query = `
    query {
      getAllCards {
        _id
        title
        description
        duedate
        type
        color
        user_id
        projects_id
      }
    }
  `;

  try {
    // Realiza el fetch a tu servidor GraphQL para obtener las tarjetas
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query }),
    });

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error en la respuesta del servidor: ${response.status}`);
    }

    const result = await response.json();

    // Manejo de errores específicos de GraphQL
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const cards = result.data.getAllCards;

    // Revisa si hay tarjetas para mostrar
    if (!cards || cards.length === 0) {
      console.log("No se encontraron tarjetas.");
      return;
    }

    // Itera sobre cada tarjeta y crea un elemento en el DOM
    cards.forEach((card) => {
      const { title, description, duedate, type } = card;
      const postItColour = getColor(type); // Asume que 'type' representa el área de trabajo
    console.log(title, description, duedate, type);
    
      // Validar `duedate` antes de usar `toISOString()`
      const dueDateValue = duedate ? new Date(Number(duedate)) : null;
      const dueDateString = dueDateValue && !isNaN(dueDateValue.getTime())
        ? dueDateValue.toISOString().split('T')[0]
        : 'Sin fecha'; // Valor por defecto o mensaje si `duedate` es inválido
    
      // Crea un elemento 'task-sticker-controller' para cada tarjeta
      const taskStickerController = document.createElement('task-sticker-controller');
      taskStickerController.setAttribute('title', title);
      taskStickerController.setAttribute('description', description);
      taskStickerController.setAttribute('postItColour', postItColour);
      taskStickerController.setAttribute('dueDate', dueDateString);
    
      // Envuelve el controlador en un div para funcionalidad de arrastrar y soltar
      const wrapper = document.createElement('div');
      wrapper.classList.add('drag');
      wrapper.appendChild(taskStickerController);
    
      // Añade el contenedor al taskContainer
      taskContainer.appendChild(wrapper);
    });
    
  } catch (error) {
    console.error('Error al obtener las tarjetas:', error);
  }
}

// Función de ayuda para determinar el color basado en el tipo
function getColor(workarea) {
  switch (workarea) {
    case "Front": return "pink";
    case "Back": return "blue";
    case "Server": return "yellow";
    case "Testing": return "green";
    default: return "yellow"; // color por defecto si no coincide
  }
}
