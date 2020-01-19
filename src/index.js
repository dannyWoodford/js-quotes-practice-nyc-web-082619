// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener("DOMContentLoaded", (event) => {

        
        const quoteList = document.querySelector("#quote-list")
        
        fetch('http://localhost:3000/quotes?_embed=likes')
            .then(resp => resp.json())
            .then(quotes => {
                quotes.forEach((quote) => {
                    quoteList.insertAdjacentHTML("beforeend", `
                    <li class='quote-card'>
                    <blockquote class="blockquote">
                      <p class="mb-0">${quote.quote}</p>
                      <footer class="blockquote-footer">${quote.author}</footer>
                      <br>
                      <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
                      <button class='btn-danger'>Delete</button>
                    </blockquote>
                  </li>
                    `)
                })
            })
        
        let quoteSubmit = document.querySelector("#new-quote-form")
    
    quoteSubmit.addEventListener("submit", (event) => {
        let quoteInput = document.querySelector("#new-quote")
        let quoteAuthor = document.querySelector("#author")

        // event.preventDefault()
        // console.log("jfkdajf")
        // console.log("quote", quoteInput.value)
        // console.log("author", quoteAuthor.value)

        fetch("http://localhost:3000/quotes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              quote: quoteInput.value,
              author: quoteAuthor.value
            })
        });

    })

})














const monsterDiv = document.querySelector("#monster-container")
const controls = document.querySelector(".controls")
let pageNumber = 1
const createMonster = document.querySelector("#create-monster")


fetch(`http://localhost:3000/monsters/?_limit=5&_page=${pageNumber}`)
    .then(res => res.json())
    .then(monsters => displayMonsters(monsters))


// initial display monsters--------------------------------------------------------------------------------
function displayMonsters(monsters){
    monsters.forEach(monster => {
        monsterDiv.insertAdjacentHTML("beforeend", 
        `
        <div class="card">
            <h2>${monster.name}</h2>
            <h4>age: ${monster.age}</h4>
            <p>bio: ${monster.bio}</p>
        </div>
        `
        )
    });
}
// initial display monsters--------------------------------------------------------------------------------



controls.addEventListener("click", function(event){
    const back = document.querySelector("#back")
    const forward = document.querySelector("#forward")

    if (event.target === forward){
        monsterDiv.innerHTML = ""
        pageNumber += 1

        fetch(`http://localhost:3000/monsters/?_limit=5&_page=${pageNumber}`)
            .then(res => res.json())
            .then(monsters => displayMonsters(monsters))

    } else if (event.target === back && pageNumber >= 1){
        monsterDiv.innerHTML = ""
         
        pageNumber -= 1 

        fetch(`http://localhost:3000/monsters/?_limit=5&_page=${pageNumber}`)
            .then(res => res.json())
            .then(monsters => displayMonsters(monsters))
    } 
})


// createMonster form -----------------------------------------------------------------------------------------
    let form = document.createElement('form')
    createMonster.appendChild(form)

    form.insertAdjacentHTML('beforeend', 
    `
  
        name: <input id="formName" type="text" name="name">
        age: <input id="formAge" type="number" name="age">
        description: <input id="formDescription" type="text" name="description">
        <input type="submit" value="create monster">

    `
  )
  form.className = "monster-form"
/* // createMonster form ----------------------------------------------------------------------------------------- */

/* // submit form ----------------------------------------------------------------------------------------- */
let monsterForm = document.querySelector(".monster-form")

monsterForm.addEventListener('submit', function (event){

event.preventDefault()

let formName = document.querySelector("#formName")
let formAge = document.querySelector("#formAge")
let formDescription = document.querySelector("#formDescription")
    fetch(`http://localhost:3000/monsters`, {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          {
            
            name: formName.value,
             age: formAge.value, 
             description: formDescription.value
             
          }
        )
})
})
/* // submit form ----------------------------------------------------------------------------------------- */



