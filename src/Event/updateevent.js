document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('eventId');

    const hallSelect = document.getElementById('hallSelect');
    const eventLocationInput = document.getElementById('eventLocation');

    // Function to format date to the required format
    const formatDate = (date) => {
        const d = new Date(date);
        const pad = (n) => n.toString().padStart(2, '0');
        const year = d.getUTCFullYear();
        const month = pad(d.getUTCMonth() + 1);
        const day = pad(d.getUTCDate());
        const hours = pad(d.getUTCHours());
        const minutes = pad(d.getUTCMinutes());
        const seconds = pad(d.getUTCSeconds());
        const milliseconds = d.getUTCMilliseconds().toString().padStart(3, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
    };

    // Fetch event details
    fetch(`http://localhost:9000/eventmicroservice/events/${eventId}`)
        .then(response => response.json())
        .then(event => {
            document.getElementById('eventName').value = event.eventName;
            eventLocationInput.value = event.eventLocation;
            document.getElementById('eventDate').value = event.eventDate.slice(0, 16);

            // Fetch halls and populate the dropdown
            fetch('http://localhost:9000/eventmicroservice/halls/getall')
                .then(response => response.json())
                .then(halls => {
                    halls.forEach(hall => {
                        const option = document.createElement('option');
                        option.value = JSON.stringify(hall);
                        option.textContent = hall.hallName;
                        if (hall.id === event.hall.id) {
                            option.selected = true;
                        }
                        hallSelect.appendChild(option);
                    });
                });
        })
        .catch(error => console.error('Error fetching event:', error));

    // Fill event location based on selected hall
    hallSelect.addEventListener('change', () => {
        const selectedHall = JSON.parse(hallSelect.value);
        eventLocationInput.value = selectedHall.location;
    });

    // Handle form submission
    document.getElementById('updateEventForm').addEventListener('submit', event => {
        event.preventDefault();

        const updatedEventData = {
            eventName: document.getElementById('eventName').value,
            eventLocation: eventLocationInput.value,
            eventDate: formatDate(document.getElementById('eventDate').value),
            hall: JSON.parse(hallSelect.value)
        };

        fetch(`http://localhost:9000/eventmicroservice/events/update/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEventData)
        })
        .then(response => {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json();
            } else {
                return response.text();
            }
        })
        .then(data => {
            if (typeof data === 'string') {
                alert(data);
            } else {
                console.log('Event updated:', data);
                alert('Event updated successfully!');
            }
            window.location.href = 'displayevents.html';
        })
        .catch(error => {
            console.error('Error updating event:', error);
            alert('Error updating event: ' + error.message);
        });
    });
});
