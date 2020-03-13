function User(name,age,price){
    this.name=name,
    this.age=age,
    this.price=price
}

function save() {
    const person = new User();
    person.name = document.getElementById('name').value;
    person.age = document.getElementById('age').value;
    person.price = document.getElementById('price').value;
    console.log('Save Pressed', person, name)
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
const table = document.getElementById('table');
  const renderUserRow = (users) => {
    users.results.map((user) => {
      const { name :{ first, last }, email, phone} = user;
      const rowElement = document.createElement('tr');
      const firstName = document.createElement('td');
      const lastName = document.createElement('td');
      const userEmail = document.createElement('td');
      const userPhone = document.createElement('td');
      firstName.innerText = first;
      lastName.innerText = last;
      userEmail.innerText = email;
      userPhone.innerText = phone;
      rowElement.appendChild(firstName);
      rowElement.appendChild(lastName);
      rowElement.appendChild(userEmail);
      rowElement.appendChild(userPhone);
      table.appendChild(rowElement);
    })
  };
(function(){
  fetch('http://localhost:8000/users/')
  .then(resp => {
    return resp.json()
  })
  .then(data => {
    renderUserRow(data.users)
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

   