document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:9000/bookingmicroservice/bookings/details')
        .then(response => response.json())
        .then(data => {
            const bookingTableBody = document.getElementById('bookingTableBody');
            data.sort((a, b) => a.bookingId - b.bookingId);
            data.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.bookingId}</td>
                    <td>${booking.userName}</td>
                    <td>${booking.phone}</td>
                    <td>${booking.eventName}</td>
                    <td>${booking.hallName}</td>
                    <td>${booking.location}</td>
                    <td>${new Date(booking.eventDate).toLocaleDateString()}</td>
                    <td>${booking.numberOfTickets}</td>
                    <td>${booking.totalPrice}</td>
                    <td>${booking.offeredPrice}</td>
                `;
                bookingTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching booking details:', error);
            alert('Failed to fetch booking details. Please try again later.');
        });
});
