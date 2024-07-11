document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const hallId = urlParams.get('hallId');

    const updateHallForm = document.getElementById('updateHallForm');

    // Fetch the current hall details
    fetch(`http://localhost:9000/eventmicroservice/halls/${hallId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch hall details');
            }
            return response.json();
        })
        .then(responseData => {
            if (responseData.status === 'success') {
                const hall = responseData.data;
                document.getElementById('hallId').value = hall.id;
                document.getElementById('updateHallName').value = hall.hallName;
                document.getElementById('updateTotalSeats').value = hall.totalSeats;
                document.getElementById('updateLocation').value = hall.location;
                document.getElementById('updateCostPerSeat').value = hall.costPerSeat;
                document.getElementById('updateAvailableSeats').value = hall.availableSeats;
            } else {
                alert('Error: ' + responseData.message);
            }
        })
        .catch(error => console.error('Error fetching hall details:', error));

    updateHallForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let hallData = {
            id: parseInt(document.getElementById('hallId').value),
            hallName: document.getElementById('updateHallName').value,
            totalSeats: parseInt(document.getElementById('updateTotalSeats').value),
            location: document.getElementById('updateLocation').value,
            costPerSeat: parseFloat(document.getElementById('updateCostPerSeat').value),
            availableSeats: parseInt(document.getElementById('updateAvailableSeats').value)
        };

        fetch(`http://localhost:9000/halls/update/${hallId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hallData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update hall');
            }
            return response.json();
        })
        .then(responseData => {
            if (responseData.status === 'success') {
                alert('Hall updated successfully!');
                window.location.href = 'hall.html';
            } else {
                alert('Error: ' + responseData.message);
            }
        })
        .catch(error => {
            console.error('Error updating hall:', error);
            alert('Error updating hall');
        });
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const hallId = urlParams.get('hallId');

//     const updateHallForm = document.getElementById('updateHallForm');

//     // Fetch the current hall details
//     fetch(`http://localhost:9000/halls/${hallId}`)
//         .then(response => response.json())
//         .then(hall => {
//             document.getElementById('hallId').value = hall.id;
//             document.getElementById('updateHallName').value = hall.hallName;
//             document.getElementById('updateTotalSeats').value = hall.totalSeats;
//             document.getElementById('updateLocation').value = hall.location;
//             document.getElementById('updateCostPerSeat').value = hall.costPerSeat;
//             document.getElementById('updateAvailableSeats').value = hall.availableSeats;
//         })
//         .catch(error => console.error('Error fetching hall details:', error));

//     updateHallForm.addEventListener('submit', function(event) {
//         event.preventDefault();

//         let hallData = {
//             id: parseInt(document.getElementById('hallId').value),
//             hallName: document.getElementById('updateHallName').value,
//             totalSeats: parseInt(document.getElementById('updateTotalSeats').value),
//             location: document.getElementById('updateLocation').value,
//             costPerSeat: parseFloat(document.getElementById('updateCostPerSeat').value),
//             availableSeats: parseInt(document.getElementById('updateAvailableSeats').value)
//         };

//         fetch(`http://localhost:9000/halls/update/${hallId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(hallData)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to update hall');
//             }
//             alert('Hall updated successfully!');
//             window.location.href = 'hall.html';
//         })
//         .catch(error => {
//             console.error('Error updating hall:', error);
//             alert('Error updating hall');
//         });
//     });
// });



// document.addEventListener('DOMContentLoaded', function() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const hallId = urlParams.get('hallId');

//     const updateHallForm = document.getElementById('updateHallForm');

//     // Fetch the current hall details
//     fetch(`http://localhost:9000/halls/${hallId}`)
//         .then(response => response.json())
//         .then(hall => {
//             document.getElementById('hallId').value = hall.id;
//             document.getElementById('updateHallName').value = hall.hallName;
//             document.getElementById('updateTotalSeats').value = hall.totalSeats;
//             document.getElementById('updateLocation').value = hall.location;
//             document.getElementById('updateCostPerSeat').value = hall.costPerSeat;
//             document.getElementById('updateAvailableSeats').value = hall.availableSeats;
//         })
//         .catch(error => console.error('Error fetching hall details:', error));

//     updateHallForm.addEventListener('submit', function(event) {
//         event.preventDefault();

//         let hallData = {
//             id: parseInt(document.getElementById('hallId').value),
//             hallName: document.getElementById('updateHallName').value,
//             totalSeats: parseInt(document.getElementById('updateTotalSeats').value),
//             location: document.getElementById('updateLocation').value,
//             costPerSeat: parseFloat(document.getElementById('updateCostPerSeat').value),
//             availableSeats: parseInt(document.getElementById('updateAvailableSeats').value)
//         };

//         fetch(`http://localhost:9000/halls/update/${hallId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(hallData)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to update hall');
//             }
//             alert('Hall updated successfully!');
//             window.location.href = 'hall.html';
//         })
//         .catch(error => {
//             console.error('Error updating hall:', error);
//             alert('Error updating hall');
//         });
//     });
// });
