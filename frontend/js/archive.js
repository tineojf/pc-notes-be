import { API_URL } from './url.js';
import { dateConverter } from './utils.js';

const API_NOTES = API_URL + 'notes/archive';
const listaNotes = document.getElementById('list-notes');

async function getNotes() {
  try {
    const response = await fetch(API_NOTES);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const notes = await response.json();
    return notes;
  } catch (error) {
    console.error('Error al obtener notas:', error);
    throw error;
  }
}

async function main() {
  try {
    const notes = await getNotes();

    listaNotes.innerHTML = '';

    notes.notes.forEach(nota => {
      const notaHTML = `
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <p class="card-text">
              ${nota.description}
            </p>
            <p class="card-subtitle mb-2 text-muted txt-time">${dateConverter(nota.createdAt)}</p>
            <div>
              <a href="/frontend/routes/note.html" class="card-link btn-more" id="btnMore-${nota.id}">More</a>
              <a href="" class="card-link btn-delete" id="btnDelete-${nota.id}">Delete</a>
            </div>
          </div>
        </div>
      `;

      listaNotes.innerHTML += notaHTML;
    });
  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
}

main();