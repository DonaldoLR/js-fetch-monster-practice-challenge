/*Objectives
When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.

At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them. 
*/

document.addEventListener('DOMContentLoaded', (e) => {
    let currentPage = 1;

    let lastMonsterId = currentPage * 50;

    createForm();

    const monstersUrl = `http://localhost:3000/monsters/?_limit=5&_page=${currentPage}`;
    


    document.getElementById('forward').addEventListener('click', (e) => {
        const currentLi = Array.from(document.getElementsByTagName('li'));
        currentLi.forEach(li => {
            li.remove();
        })
        e.preventDefault();
  
        currentPage++;
 
        fetch(`http://localhost:3000/monsters/?_limit=5&_page=${currentPage}`)
        .then(res => res.json())
        .then(data => displayMonsterData(data))
    })
    document.getElementById('back').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage === 1){
            currentPage = 1;

            return alert('Nothing Back here')
        }
        const currentLi = Array.from(document.getElementsByTagName('li'));
        currentLi.forEach(li => {
            li.remove();
        })
        
        currentPage--;
        
        fetch(`http://localhost:3000/monsters/?_limit=5&_page=${currentPage}`)
        .then(res => res.json())
        .then(data => displayMonsterData(data))
    })
    fetch(monstersUrl)
    .then(res => res.json())
    .then(data => displayMonsterData(data))
})

function createForm(){
    const createMonsterDiv = document.getElementById('create-monster');
    createMonsterDiv.innerHTML = `
    <form>
        <input id="monsterName" type="text" placeholder="Name">
        <input id="monsterAge" type="number" placeholder="Age">
        <input id="monsterDes" type="text" placeholder="Description">
        <button id="submit">Create Monster</button>
    </form>`

    document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();

        const newMonsterName = document.getElementById('monsterName').value;
        const newMonsterAge = document.getElementById('monsterAge').value;
        const newMonsterDes = document.getElementById('monsterDes').value;
        
        const formData = {
            name: newMonsterName, 
            age: newMonsterAge, 
            description: newMonsterDes
        }
        
        fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
    })
}
function displayMonsterData(data){
    const monstersDiv = document.getElementById('monster-container');
    const createUl = document.createElement('ul');
    monstersDiv.appendChild(createUl);

    
    for (let i = 0; data.length > i; i++){

        const monsterAge = data[i].age;
        const monsterName = data[i].name;
        const monsterDescription = data[i].description;

        const createLi = document.createElement('li');

        createLi.innerHTML = `
        <h2>${monsterName}</h2>
        <h4>Age: ${monsterAge}</h4>
        <p>Description: ${monsterDescription}</p>`

        createUl.appendChild(createLi)
    }
}