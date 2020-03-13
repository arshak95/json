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
        console.log(users);
        users.map((user) => {
          const { name, age, price} = user;
          const rowElement = document.createElement('tr');
          const userName = document.createElement('td');
          const userAge = document.createElement('td');
          const userPrice = document.createElement('td');
          userName.innerText = name;
          userAge.innerText = age;
          userPrice.innerText = price;
          rowElement.appendChild(userName);
          rowElement.appendChild(userAge);
          rowElement.appendChild(userPrice);
          table.appendChild(rowElement);
        })
      };
      (function (){
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

   