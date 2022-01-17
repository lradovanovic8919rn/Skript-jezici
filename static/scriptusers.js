function validatePut(name,email,manager,id){

    if(name.trim() === ''){
        alert('Name must not be empty!');
        return 'f';
    }
    if(email.trim() === ''){
        alert('Email must not be empty!');
        return 'f';
    }
    if(manager.trim() === ''){
        alert('Manager must not be empty!');
        return 'f';
    }
    if(id.trim() === ''){
        alert('Id must not be empty!');
        return 'f';
    }
    return 't';
}
function validateDelete(id){

    if(id.trim() === ''){
        alert('Id must not be empty!');
        return 'f';
    }
    return 't';
}
function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/admin/users',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json() )
    .then( data => {
        if (data.msg) {
            alert(data.msg);
        } else {
            const lst = document.getElementById('usrLst');
            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email},Manager:${el.manager}</li>`;
            });
        }
    }); 

    document.getElementById('usrBtn4').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('id2').value,

        };
        if(validateDelete(data.id) === 'f')
            return;
        let adress='http://127.0.0.1:8000/admin/users/';
        console.log(document.getElementById('id2').value);

        let result=adress.concat(document.getElementById('id2').value);
        console.log(result);
        fetch(result, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( data => {
                if (data.msg) {
                    alert(data.msg);
                } else {
                fetch('http://127.0.0.1:8000/admin/users',{headers: {
                    'Authorization': `Bearer ${token}`
                }})
                .then( res => res.json() )
                .then( data => {

                    const lst = document.getElementById('usrLst');
                    lst.innerHTML="";
                    data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email},Manager:${el.manager}</li>`;
                    });
                 }); 
                }
            });
            
        document.getElementById('id2').value = '';
    });

    document.getElementById('usrBtn3').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name1').value,
            email: document.getElementById('email1').value,
            manager: document.getElementById('manager1').value,
            id:document.getElementById('id1').value
        };

        if(validatePut(data.name,data.email,data.manager,data.id) === 'f')
        return;

        let adress='http://127.0.0.1:8000/admin/users/';
        console.log(document.getElementById('id1').value);

        let result=adress.concat(document.getElementById('id1').value);
        console.log(result);
        fetch(result, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( data => {
                if (data.msg) {
                    alert(data.msg);
                } else {
                fetch('http://127.0.0.1:8000/admin/users',{headers: {
                    'Authorization': `Bearer ${token}`
                }})
                .then( res => res.json() )
                .then( data => {

                    const lst = document.getElementById('usrLst');
                    lst.innerHTML="";
                    data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email},Manager:${el.manager}</li>`;
                    });
                 }); 
                }           
                });
        document.getElementById('name1').value = '';
        document.getElementById('email1').value = '';
        document.getElementById('manager1').value = '';
        document.getElementById('id1').value = '';
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
    
}