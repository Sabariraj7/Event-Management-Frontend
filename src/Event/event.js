document.addEventListener('DOMContentLoaded', () => {
    const hallSelect = document.getElementById('hallSelect');
    const eventLocationInput = document.getElementById('eventLocation');

    // Fetch halls and populate the dropdown
    fetch('http://localhost:9000/eventmicroservice/halls/getall')
        .then(response => response.json())
        .then(data => {
            data.forEach(hall => {
                const option = document.createElement('option');
                option.value = JSON.stringify(hall);
                option.textContent = hall.hallName;
                hallSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching halls:', error));

    // Fill event location based on selected hall
    hallSelect.addEventListener('change', () => {
        const selectedHall = JSON.parse(hallSelect.value);
        eventLocationInput.value = selectedHall.location;
    });

    // Handle form submission
    document.getElementById('eventForm').addEventListener('submit', event => {
        event.preventDefault();

        const eventName = document.getElementById('eventName').value;
        const eventLocation = document.getElementById('eventLocation').value;
        const eventDate = document.getElementById('eventDate').value;
        const hall = JSON.parse(hallSelect.value);

        const eventData = {
            eventName,
            eventLocation,
            eventDate,
            hall
        };

        fetch('http://localhost:9000/eventmicroservice/events/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Event created:', data);
            alert('Event created successfully!');
            window.location.href = 'displayevent.html'
            window.location.reload();
        })
        .catch(error => {
            console.error('Error creating event:', error);
            alert('Error creating event');
        });
    });
});
