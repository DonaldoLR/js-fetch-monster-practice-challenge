/*Objectives
When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.

At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them. 
*/

document.addEventListener('DOMContentLoaded', (e) => {
    let currentPage = 1;

    const monstersUrl = `http://localhost:3000/monsters/?_limit=50&_page=1`;

    fetch(monstersUrl)
    .then(res => res.json())
    .then(data => displayMonsterData(data))
})

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