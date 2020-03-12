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
function get(){
  fetch('http://localhost:8000/users/')
.then(response => response.json())
.then(data => {
  console.log(data) 
})
.catch(error => console.error(error))
}

   