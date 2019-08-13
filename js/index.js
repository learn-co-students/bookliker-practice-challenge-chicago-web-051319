const myUl = document.getElementById('list')
const listDiv = document.getElementById('list-panel')
const showPanel = document.getElementById('show-panel')

const title = document.createElement('h2')
const myImg = document.createElement('img')
const description = document.createElement('p')
const userPanel = document.createElement('div')


const tempUser = {"id":1, "username":"pouros"}

//const likeButton = document.createElement('button')

document.addEventListener("DOMContentLoaded", function() {
    listDiv.appendChild(myUl) 
    getBooks(); // get books appended to the UL

    // setup the show-panel

});


function getBooks(){
    fetch('http://localhost:3000/books')
    .then(resp =>{
        return resp.json();
    })
    .then(json => {
        console.log(json)
        json.forEach(element =>{
            let myLi = document.createElement('li')
            myLi.innerHTML = element['title']
            myUl.appendChild(myLi)
            myLi.addEventListener('click', (e)=>{
                renderBook(element)
            })
        })
    })
}



function renderBook(book){

    while(userPanel.firstChild){
        userPanel.removeChild(userPanel.firstChild)
    }
    while(showPanel.firstChild){
        showPanel.removeChild(showPanel.firstChild)
    }

    showPanel.appendChild(title)
    showPanel.appendChild(myImg)
    showPanel.appendChild(description)
    showPanel.appendChild(userPanel)

    book['users'].forEach((user)=>{
        let userHeader = document.createElement('h2')
        userHeader.innerHTML = user['username']
        userPanel.appendChild(userHeader)
        console.log(user['username'])
    })

    title.innerHTML = book['title']
    myImg.src = book['img_url']
    description.innerHTML = book['description']
    
    let likeButton = document.createElement('button')
    likeButton.innerHTML = book['title']
    likeButton.addEventListener('click' , (e)=>{
        e.stopPropagation();
        console.log(book['title'])
        // like the book
        likeBook(book , tempUser)
    })



    showPanel.appendChild(likeButton)
    //likeButton.innerHTML = `${book['users'].length} Likes`
}

function likeBook(book , newUser){
    let newUsersArr  = book['users']
    newUsersArr.push(newUser)
    fetch(`http://localhost:3000/books/${book['id']}`, {
        method: 'PATCH',
        headers:{
            'Content-Type' : 'application/json' ,
            'Accept' : 'application/json'
        } ,
        body: JSON.stringify({
            'users' : newUsersArr
        })
    }).then(resp =>{
        return resp.json();
    }).then(json =>{
        let newUserHeader = document.createElement('h2')
        newUserHeader.innerHTML = newUser['username']
        userPanel.appendChild(newUserHeader)
    })
}
