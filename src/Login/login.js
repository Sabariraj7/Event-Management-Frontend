document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const userName = document.getElementById('userName').value.trim();
        const password = document.getElementById('password').value.trim();

        // Perform login validation using API
        fetch(`http://localhost:9000/eventmicroservice/users/username/${userName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(user => {
                // Dummy check for password (replace with actual authentication)
                if (user && user.password === password) {
                    // Determine role and redirect accordingly
                    if (user.role === 'customer' || user.role === 'Customer') {
                        // Redirect to booking page with userId in query params
                        window.location.href = `../Booking/booking.html?userId=${user.id}`;
                    } else if (user.role === 'admin' || user.role === 'Admin') {
                        window.location.href = '../User/admin.html'; // Redirect to admin page
                    } else if (user.role === 'manager' || user.role === 'Manager') {
                        window.location.href = '../User/usermanager.html'; // Redirect to manager page
                    } else {
                        alert('Unknown user role. Contact support.'); // Handle unexpected roles
                    }
                } else {
                    alert('Invalid username or password. Please try again.'); // Incorrect password
                }
            })
            .catch(error => {
                console.error('Error fetching user:', error);
                alert('User not found. Please check the username.'); // User not found
            });
    });
});



// document.addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.getElementById('loginForm');

//     loginForm.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent form submission
        
//         const username = document.getElementById('username').value.trim();
//         const password = document.getElementById('password').value.trim();

//         // Perform login validation using API
//         fetch(`http://localhost:9000/users/username/${username}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('User not found');
//                 }
//                 return response.json();
//             })
//             .then(user => {
//                 // Dummy check for password (replace with actual authentication)
//                 if (user && user.password === password) {
//                     // Determine role and redirect accordingly
//                     if (user.role === 'customer'|| user.role === 'Customer') {
//                         //window.location.href = 'booking.html'; // Redirect to customer page
//                         window.location.href = `booking.html?username=${username}`
//                     } else if (user.role === 'admin' || user.role === 'Admin') {
//                         window.location.href = 'admin.html'; // Redirect to admin page
//                     }else if (user.role === 'manager' || user.role === 'Manager') {
//                         window.location.href = 'usermanager.html'; // Redirect to admin page
//                     } else {
//                         alert('Unknown user role. Contact support.'); // Handle unexpected roles
//                     }
//                 } else {
//                     alert('Invalid username or password. Please try again.'); // Incorrect password
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching user:', error);
//                 alert('User not found. Please check the username.'); // User not found
//             });
//     });
// });
