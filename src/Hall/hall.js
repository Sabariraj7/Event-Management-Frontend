document.addEventListener('DOMContentLoaded', function() {
    const hallForm = document.getElementById('hallForm');
    const hallTableBody = document.querySelector('#hallTable tbody');

    hallForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let hallName = document.getElementById('hallName').value;
        let totalSeats = parseInt(document.getElementById('totalSeats').value);
        let location = document.getElementById('location').value;
        let costPerSeat = parseFloat(document.getElementById('costPerSeat').value);
        let availableSeats = parseInt(document.getElementById('availableSeats').value);

        let hallData = {
            hallName: hallName,
            totalSeats: totalSeats,
            location: location,
            costPerSeat: costPerSeat,
            availableSeats: availableSeats
        };

        fetch('http://localhost:9000/eventmicroservice/halls/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hallData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Hall added successfully!');
            hallForm.reset();
            fetchHalls(); // Refresh the hall list
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding hall');
        });
    });

    function fetchHalls() {
        fetch('http://localhost:9000/eventmicroservice/halls/getall')
            .then(response => response.json())
            .then(halls => {
                hallTableBody.innerHTML = ''; // Clear existing rows
                halls.forEach(hall => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${hall.hallName}</td>
                        <td>${hall.totalSeats}</td>
                        <td>${hall.location}</td>
                        <td>${hall.costPerSeat.toFixed(2)}</td>
                        <td>${hall.availableSeats}</td>
                        <td class="action-buttons">
                            <button class="update" onclick="updateHall(${hall.id})">Update</button>
                            <button class="delete" onclick="deleteHall(${hall.id})">Delete</button>
                        </td>
                    `;
                    hallTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching halls:', error));
    }

    window.updateHall = function(hallId) {
        window.location.href = `updatehall.html?hallId=${hallId}`;
    };

    window.deleteHall = function(hallId) {
        if (confirm('Are you sure you want to delete this hall?')) {
            fetch(`http://localhost:9000/eventmicroservice/halls/delete/${hallId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete hall');
                }
                alert('Hall deleted successfully!');
                fetchHalls();
            })
            .catch(error => {
                console.error('Error deleting hall:', error);
                alert('Error deleting hall');
            });
        }
    };

    // Fetch halls on page load
    fetchHalls();
});


// document.addEventListener('DOMContentLoaded', function() {
//     const hallForm = document.getElementById('hallForm');
//     const hallTableBody = document.querySelector('#hallTable tbody');

//     hallForm.addEventListener('submit', function(event) {
//         event.preventDefault();

//         let hallName = document.getElementById('hallName').value;
//         let totalSeats = parseInt(document.getElementById('totalSeats').value);
//         let location = document.getElementById('location').value;
//         let costPerSeat = parseFloat(document.getElementById('costPerSeat').value);
//         let availableSeats = parseInt(document.getElementById('availableSeats').value);

//         let hallData = {
//             hallName: hallName,
//             totalSeats: totalSeats,
//             location: location,
//             costPerSeat: costPerSeat,
//             availableSeats: availableSeats
//         };

//         fetch('http://localhost:9000/halls/add', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(hallData)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Success:', data);
//             alert('Hall added successfully!');
//             hallForm.reset();
//             fetchHalls(); // Refresh the hall list
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Error adding hall');
//         });
//     });

//     function fetchHalls() {
//         fetch('http://localhost:9000/halls/getall')
//             .then(response => response.json())
//             .then(halls => {
//                 hallTableBody.innerHTML = ''; // Clear existing rows
//                 halls.forEach(hall => {
//                     const row = document.createElement('tr');
//                     row.innerHTML = `
//                         <td>${hall.hallName}</td>
//                         <td>${hall.totalSeats}</td>
//                         <td>${hall.location}</td>
//                         <td>${hall.costPerSeat.toFixed(2)}</td>
//                         <td>${hall.availableSeats}</td>
//                         <td class="action-buttons">
//                             <button class="update" onclick="updateHall(${hall.id})">Update</button>
//                             <button class="delete" onclick="deleteHall(${hall.id})">Delete</button>
//                         </td>
//                     `;
//                     hallTableBody.appendChild(row);
//                 });
//             })
//             .catch(error => console.error('Error fetching halls:', error));
//     }

//     window.updateHall = function(hallId) {
//         window.location.href = `updatehall.html?hallId=${hallId}`;
//     };

//     window.deleteHall = function(hallId) {
//         if (confirm('Are you sure you want to delete this hall?')) {
//             fetch(`http://localhost:9000/halls/delete/${hallId}`, {
//                 method: 'DELETE'
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to delete hall');
//                 }
//                 alert('Hall deleted successfully!');
//                 fetchHalls();
//             })
//             .catch(error => {
//                 console.error('Error deleting hall:', error);
//                 alert('Error deleting hall');
//             });
//         }
//     };

//     // Fetch halls on page load
//     fetchHalls();
// });



// document.getElementById('hallForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     let hallName = document.getElementById('hallName').value;
//     let totalSeats = parseInt(document.getElementById('totalSeats').value);
//     let location = document.getElementById('location').value;
//     let costPerSeat = parseFloat(document.getElementById('costPerSeat').value);
//     let availableSeats = parseInt(document.getElementById('availableSeats').value);

//     // Create a data object to send to the server
//     let hallData = {
//         hallName: hallName,
//         totalSeats: totalSeats,
//         location: location,
//         costPerSeat: costPerSeat,
//         availableSeats: availableSeats
//     };

//     // Send data to backend API
//     fetch('http://localhost:9000/halls/add', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(hallData)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Success:', data);
//         // Optionally show a success message or redirect to another page
//         alert('Hall added successfully!');
//         // Clear form fields
//         document.getElementById('hallForm').reset();
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Error adding hall');
//     });
// });
