// 1 - Populate page with quotes with a GET request to http://localhost:3000/quotes?_embed=likes. The query string in this URL tells json-server to include the likes for a quote in the JSON of the response. You should not use this query string when creating or deleting a quote.

// 2 - Each quote should have the following structure:

//   <li class='quote-card'>
//   <blockquote class="blockquote">
//     <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
//     <footer class="blockquote-footer">Someone famous</footer>
//     <br>
//     <button class='btn-success'>Likes: <span>0</span></button>
//     <button class='btn-danger'>Delete</button>
//   </blockquote>
// </li>

const URLQuotesLikes = 'http://localhost:3000/quotes?_embed=likes'
const URLQuotes = 'http://localhost:3000/quotes'
const URLLikes = 'http://localhost:3000/likes'
const quoteUl = document.querySelector('#quote-list');
const newQuoteForm = document.querySelector('#new-quote-form');
const submit = document.querySelector('#submit')
submit.textContent = 'Submit'

fetchQuote()

function fetchQuote(){
    fetch(URLQuotesLikes)
    .then(res => res.json())
    .then(quotes => {
       quotes.forEach(quote => renderQuotes(quote))
    })
    .then(quote => console.log(quote))
}

function renderQuotes(quote){
        const quoteLi = document.createElement('li');
        quoteUl.append(quoteLi)
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'blockquote';
        quoteLi.append(blockquote)
        blockquote.innerHTML +=  `
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
        `
       const likesBtn = document.createElement('button');
       likesBtn.className = 'btn-success';
       likesBtn.style.padding = '2px 10px';
       likesBtn.style.marginRight = '5px';
       likesBtn.innerHTML = `Likes: <span>${quote.likes.length}</span>`
       blockquote.append(likesBtn)
       const deleteBtn = document.createElement('button');
       deleteBtn.className = 'btn-danger';
       deleteBtn.innerHTML = 'Delete'
       deleteBtn.style.padding = '2px 10px';
       deleteBtn.style.marginRight = '5px';

       blockquote.append(deleteBtn);
       const editBtn = document.createElement('button');
       editBtn.className = 'btn-warning';
       editBtn.innerHTML = 'Edit'
       editBtn.style.padding = '2px 10px';
       blockquote.append(editBtn);

// 4 - Clicking the delete button should delete the respective quote from the API and remove it from the page without having to refresh.

       deleteBtn.addEventListener('click', ()=>{
        fetch(`${URLQuotes}/${quote.id}`, {
            method: 'DELETE'
            
        })
        // li.remove()
    })
// 5 - Clicking the like button will create a like for this particular quote in the API and update the number of likes displayed on the page without having to refresh.

    likesBtn.addEventListener('click', ()=>{
        const newDate = new Date();
        const getDate = newDate.getTime();
        fetch(URLLikes, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                  'quoteId': quote.id,
                  'createdAt': getDate
                })
            }
            )
        .then(res => res.json())
        .then(data => data)
    })

    editBtn.addEventListener('click', ()=>{
        const newQuoteForm = document.querySelector('#new-quote-form')
        newQuoteForm[0].value = quote.quote
        newQuoteForm[1].value = quote.author
        submit.textContent = 'Edit'
        console.log(quote.id)
        newQuoteForm.addEventListener('submit', (e)=>{
            if (submit.textContent === 'Edit'){
                e.preventDefault()
                let editQuote = e.target[0].value
                let editAuthor = e.target[1].value
                console.log(editQuote)
                console.log(editAuthor)
        
                fetch(`${URLQuotes}/${quote.id}`, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            'quote': editQuote,
                            'author': editAuthor
                        })
                    }
                    )
                        .then(res => res.json())
                        .then(data=> data)
            }
        })
    })  

}



// 3 - Submitting the form creates a new quote and adds it to the list of quotes without having to refresh the page. Pessimistic rendering is reccommended.

newQuoteForm.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    if(submit.innerHTML === 'Submit'){
        e.preventDefault()
        let newQuote = e.target[0].value
        let newAuthor = e.target[1].value
    
    fetch(URLQuotes, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'quote': newQuote,
            'author': newAuthor
        })
    })
    .then(res=> res.json())
    .then(data => {
        data.likes = []
    })
    } 
    
}




