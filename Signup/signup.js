function signUp(event) {
    event.preventDefault();

    const apiKey = 'AIzaSyAA85gOmq9pGrCkNBBIB3EtFdD49l80x-c';
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;

    const row = JSON.stringify({
        email,
        password,
        returnSecureToken: true 
    });

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: row
    })
    .then(response => response.json())
    .then(out => {
        if (out.error) {
            alert('Sign Up Failed: ' + out.error.message);
        } else {
            alert('Sign Up Successful');
            window.location.href = '../Login/login.html';
        }
    })
    .catch((err) => {
        console.error('Error:', err);
    });
}
