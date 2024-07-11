document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display events
    fetchEvents();

    // Redirect to event creation page
    document.getElementById('addEventButton').addEventListener('click', () => {
        window.location.href = 'event.html';
    });
});

function fetchEvents() {
    fetch('http://localhost:9000/eventmicroservice/events/getall')
        .then(response => response.json())
        .then(data => {
            const eventsTableBody = document.getElementById('eventsTable').querySelector('tbody');
            eventsTableBody.innerHTML = '';

            data.forEach(event => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${event.eventName}</td>
                    <td>${event.eventLocation}</td>
                    <td>${new Date(event.eventDate).toLocaleString()}</td>
                    <td>${event.hall.hallName}</td>
                    <td>
                        <button class="update" onclick="updateEvent(${event.id})">Update</button>
                        <button class="delete" onclick="deleteEvent(${event.id})">Delete</button>
                    </td>
                `;

                eventsTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching events:', error));
}

function deleteEvent(eventId) {
    fetch(`http://localhost:9000/eventmicroservice/events/delete/${eventId}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert('Event deleted successfully');
        window.location.reload();
        fetchEvents();
    })
    .catch(error => {
        console.error('Error deleting event:', error);
        alert('Error deleting event');
    });
}

function updateEvent(eventId) {
    window.location.href = `updateevent.html?eventId=${eventId}`;
    window.location.reload();
}




// document.addEventListener('DOMContentLoaded', () => {
//     const eventsTable = document.getElementById('eventsTable').getElementsByTagName('tbody')[0];

//     // Fetch events and populate the table
//     fetch('http://localhost:9000/events/getall')
//         .then(response => response.json())
//         .then(data => {
//             data.forEach(event => {
//                 const row = eventsTable.insertRow();
//                 row.insertCell(0).textContent = event.eventName;
//                 row.insertCell(1).textContent = event.eventLocation;
//                 row.insertCell(2).textContent = new Date(event.eventDate).toLocaleString();
//                 row.insertCell(3).textContent = event.hall.hallName;
                
//                 const actionsCell = row.insertCell(4);
                
//                 const updateButton = document.createElement('button');
//                 updateButton.textContent = 'Update';
//                 updateButton.classList.add('update');
//                 updateButton.addEventListener('click', () => updateEvent(event));
//                 actionsCell.appendChild(updateButton);

//                 const deleteButton = document.createElement('button');
//                 deleteButton.textContent = 'Delete';
//                 deleteButton.classList.add('delete');
//                 deleteButton.addEventListener('click', () => deleteEvent(event.id, row));
//                 actionsCell.appendChild(deleteButton);
//             });
//         })
//         .catch(error => console.error('Error fetching events:', error));

//     // Delete event
//     function deleteEvent(eventId, row) {
//         if (confirm('Are you sure you want to delete this event?')) {
//             fetch(`http://localhost:9000/events/delete/${eventId}`, {
//                 method: 'DELETE'
//             })
//             .then(() => {
//                 row.remove();
//                 alert('Event deleted successfully');
//             })
//             .catch(error => {
//                 console.error('Error deleting event:', error);
//                 alert('Error deleting event');
//             });
//         }
//     }

//     // Update event
//     function updateEvent(event) {
//         window.location.href = `updateevent.html?eventId=${event.id}`;
//     }
// });
