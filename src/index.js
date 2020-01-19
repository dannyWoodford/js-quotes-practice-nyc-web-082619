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