document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const eventSelect = document.getElementById('eventSelect');
    const numberOfTicketsInput = document.getElementById('numberOfTickets');
    const eventLocationInput = document.getElementById('eventLocation');
    const totalPriceInput = document.getElementById('totalPrice');
    const searchBox = document.getElementById('searchBox');
    const suggestionsBox = document.getElementById('suggestions');
    const userGreeting = document.getElementById('userGreeting'); 

    // Function to get query parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const userId = getQueryParam('userId');

    if (!userId) {
        alert('User ID is missing. Please log in again.');
        window.location.href = 'login.html';
        return;
    }

    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const numberOfTickets = parseInt(numberOfTicketsInput.value, 10);
        const selectedEvent = JSON.parse(eventSelect.value);
        const eventId = selectedEvent.id;
    
        if (eventId) {
            const requestBody = {
                eventId: eventId,
                userId: userId,
                numberOfTickets: numberOfTickets
            };
    
            fetch('http://localhost:9000/bookingmicroservice/bookings/addBookingWithTicket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Booking failed');
                }
            })
            .then(message => {
                alert(message);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error making booking:', error);
                alert('Booking failed');
            });
        } else {
            alert('Please select an event.');
        }
    })

    
    fetch(`http://localhost:9000/eventmicroservice/users/${userId}`) // Replace with your endpoint to fetch user details
        .then(response => response.json())
        .then(user => {
            userGreeting.textContent = `Hi! ${user.userName}`; // Assuming 'username' is the field in your user object
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
            alert('Failed to fetch user details. Please refresh the page.');
        });

    function populateEventsDropdown(events) {
        eventSelect.innerHTML = '<option value="">Select an event</option>';

        events.forEach(event => {
            const option = document.createElement('option');
            option.value = JSON.stringify(event);
            option.textContent = event.eventName;
            eventSelect.appendChild(option);
        });
    }
 
    function updateEventDetails(selectedEvent) {
        if (selectedEvent && selectedEvent.hall) {
            eventLocationInput.value = selectedEvent.hall.location;

            // Update total price whenever number of tickets changes
            numberOfTicketsInput.addEventListener('input', () => {
                const numberOfTickets = parseInt(numberOfTicketsInput.value, 10);
                if (!isNaN(numberOfTickets)) {
                    const totalPrice = numberOfTickets * selectedEvent.hall.costPerSeat;
                    totalPriceInput.value = totalPrice.toFixed(2);
                } else {
                    totalPriceInput.value = '';
                }
            });

            // Trigger the input event to update total price initially
            numberOfTicketsInput.dispatchEvent(new Event('input'));
        } else {
            eventLocationInput.value = '';
            totalPriceInput.value = '';
        }
    }

    function performSearch(query) {
        fetch(`http://localhost:9000/eventmicroservice/events/search?query=${query}`)
            .then(response => response.json())
            .then(events => {
                showSuggestions(events);
            })
            .catch(error => {
                console.error('Error searching events:', error);
            });
    }

    function showSuggestions(events) {
        suggestionsBox.innerHTML = '';
        events.forEach(event => {
            const div = document.createElement('div');
            div.textContent = `${event.eventName} - ${event.hall.location}`;
            div.dataset.event = JSON.stringify(event);
            div.className = 'suggestion';
            suggestionsBox.appendChild(div);
        });

        // Add click event listener to suggestions
        document.querySelectorAll('.suggestion').forEach(item => {
            item.addEventListener('click', function() {
                const selectedEvent = JSON.parse(this.dataset.event);
                searchBox.value = `${selectedEvent.eventName} - ${selectedEvent.hall.location}`;
                updateEventDetails(selectedEvent);
                populateEventsDropdown([selectedEvent]);
                eventSelect.value = JSON.stringify(selectedEvent); // Select the event in the dropdown
                suggestionsBox.innerHTML = ''; // Clear suggestions
            });
        });
    }

    searchBox.addEventListener('input', function() {
        const query = this.value;
        if (query.length > 0) {
            performSearch(query);
        } else {
            suggestionsBox.innerHTML = '';
        }
    });

    // Fetch all events to populate the dropdown menu
    fetch('http://localhost:9000/eventmicroservice/events/getall')
        .then(response => response.json())
        .then(events => {
            populateEventsDropdown(events);
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            alert('Failed to fetch events. Please refresh the page.');
        });

    eventSelect.addEventListener('change', function() {
        const selectedEvent = JSON.parse(this.value);
        if (selectedEvent) {
            updateEventDetails(selectedEvent);
        } else {
            eventLocationInput.value = '';
            totalPriceInput.value = '';
        }
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     const bookingForm = document.getElementById('bookingForm');
//     const eventSelect = document.getElementById('eventSelect');
//     const numberOfTicketsInput = document.getElementById('numberOfTickets');
//     const eventLocationInput = document.getElementById('eventLocation');
//     const totalPriceInput = document.getElementById('totalPrice');
//     const searchBox = document.getElementById('searchBox');
//     const suggestionsBox = document.getElementById('suggestions');

//     // Function to get query parameters
//     function getQueryParam(param) {
//         const urlParams = new URLSearchParams(window.location.search);
//         return urlParams.get(param);
//     }

//     const userId = getQueryParam('userId');

//     if (!userId) {
//         alert('User ID is missing. Please log in again.');
//         window.location.href = 'login.html';
//         return;
//     }

//     bookingForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const numberOfTickets = parseInt(numberOfTicketsInput.value, 10);
//         const selectedEvent = JSON.parse(eventSelect.value);
//         const eventId = selectedEvent.id;

//         if (eventId) {
//             fetch(`http://localhost:9000/bookings/addBookingWithTicket?eventId=${eventId}&userId=${userId}&numberOfTickets=${numberOfTickets}`, {
//                 method: 'POST'
//             })
//             .then(response => {
//                 if (response.ok) {
//                     return response.text();
//                 } else {
//                     throw new Error('Booking failed');
//                 }
//             })
//             .then(message => {
//                 alert(message);
//                 window.location.reload();
//             })
//             .catch(error => {
//                 console.error('Error making booking:', error);
//                 alert('Booking failed');
//             });
//         } else {
//             alert('Please select an event.');
//         }
//     });

//     function populateEventsDropdown(events) {
//         eventSelect.innerHTML = '<option value="">Select an event</option>';

//         events.forEach(event => {
//             const option = document.createElement('option');
//             option.value = JSON.stringify(event);
//             option.textContent = event.eventName;
//             eventSelect.appendChild(option);
//         });
//     }

//     function updateEventDetails(selectedEvent) {
//         if (selectedEvent && selectedEvent.hall) {
//             eventLocationInput.value = selectedEvent.hall.location;

//             // Update total price whenever number of tickets changes
//             numberOfTicketsInput.addEventListener('input', () => {
//                 const numberOfTickets = parseInt(numberOfTicketsInput.value, 10);
//                 if (!isNaN(numberOfTickets)) {
//                     const totalPrice = numberOfTickets * selectedEvent.hall.costPerSeat;
//                     totalPriceInput.value = totalPrice.toFixed(2);
//                 } else {
//                     totalPriceInput.value = '';
//                 }
//             });

//             // Trigger the input event to update total price initially
//             numberOfTicketsInput.dispatchEvent(new Event('input'));
//         } else {
//             eventLocationInput.value = '';
//             totalPriceInput.value = '';
//         }
//     }

//     function performSearch(query) {
//         fetch(`http://localhost:9000/events/search?query=${query}`)
//             .then(response => response.json())
//             .then(events => {
//                 showSuggestions(events);
//             })
//             .catch(error => {
//                 console.error('Error searching events:', error);
//             });
//     }

//     function showSuggestions(events) {
//         suggestionsBox.innerHTML = '';
//         events.forEach(event => {
//             const div = document.createElement('div');
//             div.textContent = `${event.eventName} - ${event.hall.location}`;
//             div.dataset.event = JSON.stringify(event);
//             div.className = 'suggestion';
//             suggestionsBox.appendChild(div);
//         });

//         // Add click event listener to suggestions
//         document.querySelectorAll('.suggestion').forEach(item => {
//             item.addEventListener('click', function() {
//                 const selectedEvent = JSON.parse(this.dataset.event);
//                 searchBox.value = `${selectedEvent.eventName} - ${selectedEvent.hall.location}`;
//                 updateEventDetails(selectedEvent);
//                 populateEventsDropdown([selectedEvent]);
//                 eventSelect.value = JSON.stringify(selectedEvent); // Select the event in the dropdown
//                 suggestionsBox.innerHTML = ''; // Clear suggestions
//             });
//         });
//     }

//     searchBox.addEventListener('input', function() {
//         const query = this.value;
//         if (query.length > 0) {
//             performSearch(query);
//         } else {
//             suggestionsBox.innerHTML = '';
//         }
//     });
// });





// bookingForm.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     const numberOfTickets = parseInt(numberOfTicketsInput.value, 10);
    //     const selectedEvent = JSON.parse(eventSelect.value);
    //     const eventId = selectedEvent.id;

    //     if (eventId) {
    //         fetch(`http://localhost:9000/bookings/addBookingWithTicket?eventId=${eventId}&userId=${userId}&numberOfTickets=${numberOfTickets}`, {
    //             method: 'POST'
    //         })
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.text();
    //             } else {
    //                 throw new Error('Booking failed');
    //             }
    //         })
    //         .then(message => {
    //             alert(message);
    //             window.location.reload();
    //         })
    //         .catch(error => {
    //             console.error('Error making booking:', error);
    //             alert('Booking failed');
    //         });
    //     } else {
    //         alert('Please select an event.');
    //     }
    // });
    // Fetch user details and display greeting


