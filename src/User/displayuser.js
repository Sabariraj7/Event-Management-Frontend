document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:9000/eventmicroservice/users/getall')
        .then(response => response.json())
        .then(users => {
            const tableBody = document.querySelector('#usersTable tbody');
            tableBody.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.userName}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.role}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
});
