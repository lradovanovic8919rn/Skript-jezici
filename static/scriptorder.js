function validatePost(date){

    if(date.trim() === ''){
        alert('Date must not be empty!');
        return 'f';
    }
    return 't';
}
function validatePut(date,id){

    if(date.trim() === ''){
        alert('Date must not be empty!');
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

    fetch('http://127.0.0.1:8000/admin/order',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json() )
    .then( data => {
        const lst = document.getElementById('ordLst');
        data.forEach( el => {
            lst.innerHTML += `<li>ID: ${el.id}, Date: ${el.date}, UserID: ${el.userID}</li>`;
        });
    }); 
    document.getElementById('usrBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            date: document.getElementById('date1').value,
            
        };

        if(validatePost(data.date) === 'f')
            return;

        document.getElementById('date1').value = '';

        fetch('http://127.0.0.1:8000/admin/order', {
            method: 'POST',
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
                    document.getElementById('ordLst').innerHTML += `<li>ID: ${data.id}, Date: ${data.date}, UserID: ${data.userID}</li>`;
                }
            });
    });
    document.getElementById('usrBtn4').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            id: document.getElementById('id2').value,

        };
        
        if(validateDelete(data.id) === 'f')
            return;

        let adress='http://127.0.0.1:8000/admin/order/';
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
                    fetch('http://127.0.0.1:8000/admin/order',{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then( res => res.json() )
                    .then( data => {
                        const lst = document.getElementById('ordLst');
                        lst.innerHTML="";
                        data.forEach( el => {

                            lst.innerHTML += `<li>ID: ${el.id}, Date: ${el.date}, UserID: ${el.userID}</li>`;
                        });
                    }); 
                }
            });
            
        document.getElementById('id2').value = '';
    });
    document.getElementById('usrBtn3').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            date: document.getElementById('date2').value,
            id:document.getElementById('id1').value
        };

        
        if(validatePut(data.date,data.id) === 'f')
            return;

        let adress='http://127.0.0.1:8000/admin/order/';
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
                    fetch('http://127.0.0.1:8000/admin/order',{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then( res => res.json() )
                    .then( data => {
                        const lst = document.getElementById('ordLst');
                        lst.innerHTML="";
                        data.forEach( el => {

                            lst.innerHTML += `<li>ID: ${el.id}, Date: ${el.date}, UserID: ${el.userID}</li>`;
                        });
                    }); 
                }
            });
        document.getElementById('date2').value = '';
        document.getElementById('id1').value = '';
    });

}