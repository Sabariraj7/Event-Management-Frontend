document.addEventListener('DOMContentLoaded', function() {
    const bookingId = getQueryParam('bookingId');

    if (!bookingId) {
        alert('Booking ID is missing.');
        window.location.href = 'booking.html';
        return;
    }

    fetch(`http://localhost:9000/bookingmicroservice/bookings/details?bookingId=${bookingId}`)
        .then(response => response.json())
        .then(booking => {
            populateBookingDetails(booking);
        })
        .catch(error => {
            console.error('Error fetching booking details:', error);
            alert('Failed to fetch booking details. Please refresh the page.');
        });

    function populateBookingDetails(booking) {
        const bookingDetailsTable = document.getElementById('bookingDetails').getElementsByTagName('tbody')[0];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.bookingId}</td>
            <td>${booking.userName}</td>
            <td>${booking.phone}</td>
            <td>${booking.eventName}</td>
            <td>${booking.hallName}</td>
            <td>${booking.location}</td>
            <td>${formatDate(booking.eventDate)}</td>
            <td>${booking.numberOfTickets}</td>
            <td>${booking.totalPrice}</td>
            <td>${booking.offeredPrice}</td>
        `;
        bookingDetailsTable.appendChild(row);
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
    }

    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', function() {
        window.location.href = 'booking.html';
    });
});
