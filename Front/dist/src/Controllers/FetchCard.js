document.addEventListener('DOMContentLoaded', function () {
  getAllTasks();
});
function convertToISODate(dateString) {
  const parts = dateString.split('/'); // Suponemos que el formato es "DD/MM/YYYY"
  if (parts.length === 3) {
    // Convertir de "DD/MM/YYYY" a "YYYY-MM-DD"
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateString; 
}
async function getAllTasks() {
  const taskContainer = document.getElementById('taskContainer');
  const token = localStorage.getItem('token'); // Obtén el token de localStorage

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
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta del servidor: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const cards = result.data.getAllCards;

    if (!cards || cards.length === 0) {
      console.log("No se encontraron tarjetas.");
      return;
    }

    // Itera sobre cada tarjeta y crea un elemento en el DOM
    cards.forEach((card) => {
      const { _id, title, description, duedate, type } = card;

      if (!_id) {
        console.error("Card ID is null or undefined:", card);
        return;
      }

      const color = getColor(type);
     // console.log(`Card ID: ${_id}, Title: ${title}, Description: ${description}, Due Date: ${duedate}, Type: ${type}`);
      console.log(new Date(duedate));

      let dueDateString = 'Sin fecha'; // Valor por defecto

      // Si duedate es un número (milisegundos)
      if (typeof duedate === 'number') {
        const dueDateValue = new Date(duedate); // Convertir milisegundos a fecha
        dueDateString = dueDateValue.toISOString().split('T')[0]; // Obtener solo la parte de la fecha
      }
      // Si duedate es una cadena (esperamos que sea "DD/MM/YYYY")
      else if (typeof duedate === 'string') {
        const formattedDate = convertToISODate(duedate); // Convertir "DD/MM/YYYY" a "YYYY-MM-DD"
        if (formattedDate) {
          const dueDateValue = new Date(formattedDate); // Crear un objeto Date con la fecha reformateada
          if (!isNaN(dueDateValue.getTime())) {
            dueDateString = dueDateValue.toISOString().split('T')[0]; // Obtener solo la parte de la fecha
          }
        }
      }

      // Crea un elemento 'task-sticker' para cada tarjeta
      const taskSticker = document.createElement('task-sticker');
      taskSticker.setAttribute('title', title);
      taskSticker.setAttribute('description', description);
      taskSticker.setAttribute('color', color);
      taskSticker.setAttribute('dueDate', dueDateString);
      taskSticker.setAttribute('card-id', _id); // Asigna el 'card-id' correctamente

      // Añade el contenedor al taskContainer
      taskContainer.appendChild(taskSticker);
    });
  } catch (error) {
    console.error('Error al obtener las tarjetas:', error);
  }
}

function getColor(workarea) {
  switch (workarea) {
    case "Front": return "pink";
    case "Back": return "blue";
    case "Server": return "yellow";
    case "Testing": return "green";
    default: return "yellow"; 
  }

}
