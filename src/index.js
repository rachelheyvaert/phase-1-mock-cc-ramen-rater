const ramenMenu = document.querySelector("#ramen-menu")
const ramenForm = document.querySelector("#ramen-rating")
const ratingInput = document.querySelector("#rating")
const comment = document.querySelector("#comment")
const newRamenForm = document.querySelector("#new-ramen")
// let currentId = null

RamenForm.addEventListener("submit", e => {
  e.preventDefault()
  // POST /ramens
  // { name, restaurant, image, rating, comment }
  const newRamenObj = {
    name: newRamenForm.name.value,
    restaurant: newRamenForm.restaurant.value,
    image: newRamenForm.image.value,
    rating: parseInt(newRamenForm.rating.value),
    comment: newRamenForm["new-comment"].value
  }
  addRamen(newRamenObj)
})

newRamenForm.addEventListener("submit", e => {
  e.preventDefault()
  
  const ramenId = ramenForm.dataset.id
  const updateObj = {
    rating: parseInt(ratingInput.value),
    comment: comment.value
  }
  
  // fetch
  updateRamen(ramenId, updateObj)
  
})

// event delegation
ramenMenu.addEventListener("click", e => {
  if (e.target.matches("img")) {
    // currentId = e.target.dataset.id
    getRamen(e.target.dataset.id)
  }
  if (e.target.matches("button")) {
    // remove the ramen from the page!
    deleteRamen(e.target.dataset.id)
    e.target.parentElement.remove()
  }
})

/*
<div>
  <img />
  <button />
</div>
*/ 
const renderImage = ramen => {
  const div = document.createElement("div")

  const img = document.createElement("img")
  img.src = ramen.image
  img.alt = ramen.name
  img.dataset.id = ramen.id

  const button = document.createElement("button")
  button.textContent = "X"
  button.dataset.id = ramen.id

  // individual event listener
  // img.addEventListener("click", () => {
  //   getRamen(ramen.id)
  // })
  div.append(img, button)

  ramenMenu.append(div)
}

const renderAllRamens = ramenArray => {
  ramenArray.forEach(renderImage)
}

const renderDetail = ramen => {
  ramenForm.dataset.id = ramen.id

  const img = document.querySelector(".detail-image")
  img.src = ramen.image
  img.alt = ramen.name

  const name = document.querySelector(".name")
  name.textContent = ramen.name

  const restaurant = document.querySelector(".restaurant")
  restaurant.textContent = ramen.restaurant

  ratingInput.value = ramen.rating

  comment.value = ramen.comment
}

const addRamen = newRamen => {
  fetch(`http://localhost:3000/ramens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newRamen)
  })
  .then(r => r.json())
  .then(actualNewRamenFromTheServer => {
    renderDetail(actualNewRamenFromTheServer)
    renderImage(actualNewRamenFromTheServer)
  })
}

const deleteRamen = id => {
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: "DELETE"
  })
  .then(r => r.json())
  .then(console.log)
}


const updateRamen = (id, updateObj) => {
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updateObj)
  })
  .then(r => r.json())
  .then(console.log)
}

const getRamen = id => {
  fetch(`http://localhost:3000/ramens/${id}`)
    .then(r => r.json())
    .then(renderDetail)
}

const getRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then(r => r.json())
    .then(renderAllRamens)
}


getRamens()
getRamen(1)
 
 
//  // write your code here
// //fetch and place all Ramen pictutes in the DIV menu
// //fetch upon page loading
// const fetchURL = 'http://localhost:3000/ramens'
// const ramenContainer = document.getElementById('ramen-menu')

// //When page loads
// document.addEventListener('DOMContentLoaded', () => {
//     handleFetch()

// })

// // fetch and display
// function handleFetch(ramen) {
//     fetch(fetchURL, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }, body: JSON.stringify(ramen)

//         })
//     .then(resp => resp.json())
//     .then(data => {
//         data.forEach(ramen => {
//             console.log(ramen)
//             renderData(ramen)})
//     })
// }

// //rendering to the page
// function renderData(ramen){
// let img = document.createElement('img')
// img.src = ramen.image
// img.className= 'ramen-choices'
// ramenContainer.append(img)

// img.addEventListener('click', (ramen)=> {
//     console.log(`fetchURL/:${id}`)
//     fetch(`fetchURL/:${id}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }, body: JSON.stringify(ramen)

//         })
//     .then(resp => resp.json())
//     .then(ramenData => {
//     //grabbing parts
//     const ramenDetailsContainer = getElementById('ramen-details')
// const imgDetails = document.getElementsByClassName('detail-image')
// const h2Name = document.getElementsByClassName('name')
// const h3Restaurant = document.getElementsByClassName('restaurant')
// //appending elements
// h2Name.textContent = ramen.name 
// imgDetails.src = ramen.image
// h3Restaurant.textContent= ramen.restaurant
// ramenDetailsContainer.append(h2Name, imgDetails, h3Restaurant)

// })
// })
// }
