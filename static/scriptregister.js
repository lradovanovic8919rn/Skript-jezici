function validatePost(name,email,password){

    if(name.trim() === ''){
        alert('Name must not be empty!');
        return 'f';
    }
    if((name.trim()).length<6){
        alert('Name must not be at least 6 characters long!');
        return 'f';
    }
    if((password.trim()).length<6){
        alert('Password must not be at least 6 characters long!');
        return 'f';
    }
    if(email.trim() === ''){
        alert('Email must not be empty!');
        return 'f';
    }
    if(!(email.includes("@")&&email.includes(".com"))){
        alert('Invalid email format!');
        return 'f';
    }
    if(password.trim() === ''){
        alert('Password must not be empty!');
        return 'f';
    }
    return 't';
}
function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            manager: document.getElementById('admin').checked
        };

        if(validatePost(data.name,data.email,data.password) === 'f')
             return;

        fetch('http://127.0.0.1:10000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'home.html';
            });
    });
}