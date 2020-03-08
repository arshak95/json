function User(name,age,price){
    this.name=name,
    this.age=age,
    this.price=price
}

function save() {
  var inputs =[];
  inputs[0]=document.getElementById('name').value;
     inputs[1]=document.getElementById('age').value;
     inputs[2]=document.getElementById('price').value;
    
    var theader = '<table border="1">\n';
    var tbody = '';
    for(var i = 0; i< inputs.length;i++){
        tbody += '<tr>';
        tbody += '<td>';
            tbody += inputs[i]  
        tbody += '</tr>\n';
    }
    var tfooter = '</table>';
    document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;


    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var price = document.getElementById('price').value;

    const person = new User(name, age, price);
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
