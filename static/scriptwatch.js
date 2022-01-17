function validatePost(brand,rn,model,storageid,orderid){

    if(brand.trim() === ''){
        alert('Brand must not be empty!');
        return 'f';
    }
    if(rn.trim() === ''){
        alert('Reference Number must not be empty!');
        return 'f';
    }
    if(model.trim() === ''){
        alert('Model must not be empty!');
        return 'f';
    }
    if(storageid.trim() === ''){
        alert('StorageID must not be empty!');
        return 'f';
    }
    if(orderid.trim() === ''){
        alert('OrderID must not be empty!');
        return 'f';
    }
    return 't';
}
function validatePut(brand,rn,model,storageid,orderid,id){

    if(brand.trim() === ''){
        alert('Brand must not be empty!');
        return 'f';
    }
    if(rn.trim() === ''){
        alert('ReferenceNumber must not be empty!');
        return 'f';
    }
    if(model.trim() === ''){
        alert('Model must not be empty!');
        return 'f';
    }
    if(storageid.trim() === ''){
        alert('StorageID must not be empty!');
        return 'f';
    }
    if(orderid.trim() === ''){
        alert('OrderID must not be empty!');
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

    fetch('http://127.0.0.1:8000/admin/watch',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json() )
    .then( data => {
        const lst = document.getElementById('wtcLst');
        data.forEach( el => {
            lst.innerHTML += `<li>ID: ${el.id}, Brand: ${el.brand}, refNumber: ${el.refNumber}, Model: ${el.model}, OrderID: ${el.orderID},StorageID:${el.orderID}</li>`;
        });
    }); 
    document.getElementById('usrBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            brand: document.getElementById('brand').value,
            refNumber: document.getElementById('refNumber').value,
            model: document.getElementById('model').value,
            orderID: document.getElementById('orderID').value,
            storageID: document.getElementById('storageID').value,
        };

        if(validatePost(data.brand,data.refNumber,data.model,data.storageID,data.orderID) === 'f')
            return;

        document.getElementById('brand').value = '';
        document.getElementById('refNumber').value = '';
        document.getElementById('model').value = '';
        document.getElementById('orderID').value = '';
        document.getElementById('storageID').value = '';

        fetch('http://127.0.0.1:8000/admin/watch', {
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
                    document.getElementById('wtcLst').innerHTML += `<li>ID: ${data.id}, Brand: ${data.brand}, refNumber: ${data.refNumber}, Model: ${data.model}, OrderID: ${data.orderID},StorageID:${data.orderID}</li>`;
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

        let adress='http://127.0.0.1:8000/admin/watch/';
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
                    fetch('http://127.0.0.1:8000/admin/watch',{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then( res => res.json() )
                    .then( data => {
                        const lst = document.getElementById('wtcLst');
                        lst.innerHTML="";
                        data.forEach( el => {
                            lst.innerHTML += `<li>ID: ${el.id}, Brand: ${el.brand}, refNumber: ${el.refNumber}, Model: ${el.model}, OrderID: ${el.orderID},StorageID:${el.orderID}</li>`;
                        });
                    });   
                }         
            });
            
        document.getElementById('id2').value = '';
    });
    document.getElementById('usrBtn3').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            brand: document.getElementById('brand1').value,
            refNumber: document.getElementById('refNumber1').value,
            model: document.getElementById('model1').value,
            orderID: document.getElementById('orderID1').value,
            storageID: document.getElementById('storageID1').value,
            id:document.getElementById('id1').value
        };
        if(validatePut(data.brand,data.refNumber,data.model,data.storageID,data.orderID,data.id) === 'f')
            return;
        

        let adress='http://127.0.0.1:8000/admin/watch/';
        console.log(document.getElementById('id1').value);

        let result=adress.concat(document.getElementById('id1').value);
        console.log(result);
        fetch(result, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( data => {
                if (data.msg) {
                    alert(data.msg);
                } else {
                    fetch('http://127.0.0.1:8000/admin/watch',{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then( res => res.json() )
                    .then( data => {
                        const lst = document.getElementById('wtcLst');
                        lst.innerHTML="";
                        data.forEach( el => {
                            lst.innerHTML += `<li>ID: ${el.id}, Brand: ${el.brand}, refNumber: ${el.refNumber}, Model: ${el.model}, OrderID: ${el.orderID},StorageID:${el.orderID}</li>`;
                        });
                    });    
                }         
            });
        document.getElementById('brand1').value = '';
        document.getElementById('refNumber1').value = '';
        document.getElementById('model1').value = '';
        document.getElementById('orderID1').value = '';
        document.getElementById('storageID1').value = '';
        document.getElementById('id1').value = '';
    });
}