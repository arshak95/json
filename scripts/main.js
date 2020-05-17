function save() {
    const person = {};
    person.name = document.getElementById('name').value;
    person.age = document.getElementById('age').value;
    person.price = document.getElementById('price').value;
    console.log('Save Pressed', person, name)
    if (person.name, person.age, person.price == "") {
        alert("Your inputs are empty");
        return false;
    };
    fetch('http://localhost:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(person)
        })
        .then(res => res.json())
        .then(resp => {
            console.log('Response', resp);
        })
        .catch(error => {
            console.log('Error', error)
        });
}

let editId = null;

const EditRow = (user, onSave) => {
    const { name, age, price, id } = user;

    let rowElement = document.getElementById(id);

    const userName = document.getElementById(`userName-${id}`);
    const userNameEdit = document.createElement('input')
    userNameEdit.value = name;
    rowElement.replaceChild(userNameEdit, userName);

    const userPrice = document.getElementById(`userPrice-${id}`);
    const userPriceEdit = document.createElement('input')
    userPriceEdit.value = price;
    rowElement.replaceChild(userPriceEdit, userPrice);

    const userAge = document.getElementById(`userAge-${id}`);
    const userAgeEdit = document.createElement('input')
    userAgeEdit.value = age;
    rowElement.replaceChild(userAgeEdit, userAge);

    const userSave = document.getElementById(`userSave-${id}`);
    userSave.addEventListener("click", function() {
        const updateData = {
            name: userNameEdit.value,
            price: userPriceEdit.value,
            age: userAgeEdit.value,
        }
        onSave(updateData);
    })
    return rowElement;
}
const Row = (user, onPress) => {
    const { name, age, price, id } = user;
    let rowElement = document.getElementById(id);
    if (rowElement) {
        return rowElement;
    }

    rowElement = document.createElement('tr');
    rowElement.id = id

    const userName = document.createElement('td');
    userName.id = `userName-${id}`;
    const userAge = document.createElement('td');
    userAge.id = `userAge-${id}`;
    const userPrice = document.createElement('td');
    userPrice.id = `userPrice-${id}`;

    const userEdit = document.createElement('button');
    userEdit.id = `userEdit-${id}`;
    userEdit.innerHTML = "EDIT";
    userEdit.addEventListener("click", function() {
        onPress()
    });

    const userSave = document.createElement('button');
    userSave.id = `userSave-${id}`;
    userSave.innerHTML = "SAVE";

    userName.innerText = name;
    userAge.innerText = age;
    userPrice.innerText = price;

    rowElement.appendChild(userName);
    rowElement.appendChild(userAge);
    rowElement.appendChild(userPrice);
    rowElement.appendChild(userEdit);
    rowElement.appendChild(userSave);
    return rowElement;
}
const renderUserRow = (users) => {
    users.map((user) => {
        const { id } = user;
        let rowElement = null;
        if (editId === id) {
            rowElement = EditRow(user, (updateData) => {
                console.log('Values to save', updateData);
                fetch(`http://localhost:8000/users/${id}`, {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify(updateData)
                    })
                    .then(res => res.json())
                    .then(res => {
                        console.log('Updated', res);
                    })
                    .catch(err => {
                        console.log('Update err', err);
                    });
            })
        } else {
            rowElement = Row(user, () => {
                const answer = window.confirm("You want to change data?")
                if (answer) {
                    editId = user.id;
                    renderUserRow(users);
                } else {
                    console.log('2')
                }
            })
        }

        table.appendChild(rowElement);
    })
};

(function() {
    fetch('http://localhost:8000/users/')
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            renderUserRow(data)
            console.log(data);
        })
        .catch(error => console.error(error))
})();

//   fetch('http://localhost:8000/users/')
// .then(response => response.json())
// .then(data => {   
//  console.log(data) 
// })
// .catch(error => console.error(error))
// }


// function of table row delet 
//try 
// var table = document.getElementById(tableID);
//     var rowCount = table.rows.length;

//     for(var i=0; i<rowCount; i++) {
//         var row = table.rows[i];
//         var chkbox = row.cells[0].childNodes[0];
//         if(null != chkbox && true == chkbox.checked) {
//             table.deleteRow(i);
//             rowCount--;
//             i--;
//}
// }catch(e) {
//   alert(e);
// }   sdfdsfsdf dsfdsf