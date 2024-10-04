async function logIn(){
    event.preventDefault()
    let apikey = 'AIzaSyAA85gOmq9pGrCkNBBIB3EtFdD49l80x-c'
    let password = document.querySelector('#password').value;
    let email = document.querySelector('#email').value
    let row = JSON.stringify({
        email,
        password
    })
    try{
        let call = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`,{
            method:'POST',
            body:row
        })
        let data = await call.json()
        if (data.error){
            alert('Log In Failed '+data.error.message)
        }else{
            localStorage.setItem('idToken',data.idToken)
            alert('Log In successfull')
            window.location.href = '../landingPage/landingpage.html'
        }
    }catch(err){
        console.log(err)
    }
}