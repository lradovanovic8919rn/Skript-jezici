function validatePost(name,password){

    if(name.trim() === ''){
        alert('Name must not be empty!');
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
            password: document.getElementById('password').value
        };

        if(validatePost(data.name,data.password) === 'f')
            return;

        fetch('http://127.0.0.1:10000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    console.log(alert(el.msg));
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = 'home.html';
                }
            });
    });
}