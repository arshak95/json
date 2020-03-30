function User(name, age, price) {
    this.name = name,
        this.age = age,
        this.price = price
}

function save() {
    const person = new User();
    person.name = document.getElementById('name').value;
    person.age = document.getElementById('age').value;
    person.price = document.getElementById('price').value;
    console.log('Save Pressed', person, name)
    if (person.name, person.age, person.price == "") {
        alert("Enter a Valid Roll Number");
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
const renderUserRow = (users) => {
    users.map((user, index) => {
        const { name, age, price } = user;

        let rowElement = document.getElementById(`user-${index}`);
        if (!rowElement) {
            rowElement = document.createElement('tr');
            rowElement.id = `user-${index}`;
        }

        let userName = document.getElementById(`userName-${index}`);
        if (!userName) {
            userName = document.createElement('td');
            userName.id = `userName-${index}`;
        }

        let userAge = document.getElementById(`userAge-${index}`);
        if (!userAge) {
            userAge = document.createElement('td');
            userAge.id = `userAge-${index}`;
        }

        let userPrice = document.getElementById(`userPrice-${index}`);
        if (!userPrice) {
            userPrice = document.createElement('td');
            userPrice.id = `userPrice-${index}`;
        }

        let userEdit = document.getElementById(`userEdit-${index}`);
        if (!userEdit) {
            userEdit = document.createElement('button');
            userEdit.innerHTML = "EDIT";
            userEdit.id = `userEdit-${index}`;
            userEdit.addEventListener("click", function() {
                const answer = window.confirm("You want to change data?")
                if (answer) {
                    editId = index;
                    renderUserRow(users);
                } else {
                    console.log('2')
                }
            });
        }
        let userSave = document.getElementById(`userSave-${index}`);
        if (!userSave) {
            userSave = document.createElement('button');
            userSave.innerHTML = "SAVE";
            userSave.id = `userSave-${index}`;
            userSave.addEventListener("click", function() {
                console.log(rowElement);
                fetch('http://localhost:8000/users/', {
                    method: 'post',
                    body: JSON.stringify(index)
                })
            })
        }

        if (index === editId) {
            userName.parentNode.removeChild(userName);
            userName = document.createElement('input')
            userName.value = name;

            userAge.parentNode.removeChild(userAge);
            userAge = document.createElement('input')
            userAge.value = age;

            userPrice.parentNode.removeChild(userPrice)
            userPrice = document.createElement('input')
            userPrice.value = price;
        }

        userName.innerText = name;
        userAge.innerText = age;
        userPrice.innerText = price;

        rowElement.appendChild(userName);
        rowElement.appendChild(userAge);
        rowElement.appendChild(userPrice);
        rowElement.appendChild(userEdit);
        table.appendChild(rowElement);
        rowElement.appendChild(userSave);
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