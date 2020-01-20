// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener("DOMContentLoaded", (event) => {

        
        const quoteList = document.querySelector("#quote-list")
        
        fetch('http://localhost:3000/quotes?_embed=likes')
            .then(resp => resp.json())
            .then(quotes => {
                quotes.forEach((quote) => {
                    quoteList.insertAdjacentHTML("beforeend", `
                    <li class='quote-card' id=${quote.id} >
                    <blockquote class="blockquote">
                      <p class="mb-0">${quote.quote}</p>
                      <footer class="blockquote-footer">${quote.author}</footer>
                      <br>
                      <button data-like="like" class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
                      <button data-delete="delete" class='btn-danger'>Delete</button>
                    </blockquote>
                  </li>
                    `)
                })
            })
        
    let quoteSubmit = document.querySelector("#new-quote-form")
    
    quoteSubmit.addEventListener("submit", (event) => {
        let quoteInput = document.querySelector("#new-quote")
        let quoteAuthor = document.querySelector("#author")

        event.preventDefault()
        // console.log("jfkdajf")
        // console.log("quote", quoteInput.value)
        // console.log("author", quoteAuthor.value)

        // const quoteList = document.querySelector("#quote-list")
        console.log(quoteList)
        quoteList.insertAdjacentHTML("beforeend", `
                    <li class='quote-card' >
                    <blockquote class="blockquote">
                      <p class="mb-0">${quoteInput.value}</p>
                      <footer class="blockquote-footer">${quoteAuthor.value}</footer>
                      <br>
                      <button data-like="like" class='btn-success'>Likes: <span>0</span></button>
                      <button data-delete="delete" class='btn-danger'>Delete</button>
                    </blockquote>
                  </li>
                    `)

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

        quoteInput.remove()
        quoteAuthor.remove()
    })


   

    quoteList.addEventListener("click", (event) => {
        // console.log(event.target.closest('.quote-card'))
        // console.log(event.target.dataset)
        
        if(event.target.dataset.like === "like"){
            // console.log(event.target.querySelector("span"))
            // console.log(typeof(event.target.closest('.quote-card').id))

            let count = event.target.closest('.quote-card').querySelector("span")
            let newCount = parseInt(count.innerText) + 1
            count.innerText = newCount

            event.preventDefault()

            let likeCreatedAt = new Date()
            fetch('http://localhost:3000/likes', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                  quoteId: parseInt(event.target.closest('.quote-card').id),
                  createdAt: likeCreatedAt.getTime()
                })
            });
        } else if(event.target.dataset.delete === "delete"){

            event.preventDefault()
            
            fetch(`http://localhost:3000/quotes/${event.target.closest('.quote-card').id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
            )
            
            let quoteCard = event.target.closest('.quote-card')
            console.log(quoteCard)
            quoteCard.outerHTML = ''

        }

      
    })

})
