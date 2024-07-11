document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('offerForm').addEventListener('submit', event => {
        event.preventDefault();

        const offerData = {
            name: document.getElementById('name').value,
            ticketCount: document.getElementById('ticketCount').value,
            percentageToReduce: document.getElementById('percentageToReduce').value
        };

        fetch('http://localhost:9000/eventmicroservice/offers/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offerData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Offer created:', data);
            alert('Offer created successfully!');
            window.location.reload(); // Refresh the page
        })
        .catch(error => {
            console.error('Error creating offer:', error);
            alert('Error creating offer');
        });
    });
});
