
const toysIndexUrl = "http://localhost:3000/toys";
const specificToyUrl = (id) => {
  return `http://localhost:3000/toys/${id}`
}
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getAllToys();
  newToyListener();
});


const getAllToys = () => {
  fetch(toysIndexUrl)
  .then(resp => resp.json())
  .then(data => {
    data.forEach((toy) => {
      createToyCard(toy)
    })
  })
}

const createToyCard = (toy) => {
  //set variables I'll need
  let toyCollection = document.querySelector("div#toy-collection");
  let toyName = document.createElement("h2");
  let toyImg = document.createElement("img");
  let toyLikes = document.createElement("p");
  let likeButton = document.createElement("button");
  let toyCard = document.createElement("div");

  //set the attributes on those variables
  toyName.innerHTML = toy.name;
  toyImg.src = toy.image;
  toyImg.className = "toy-avatar";
  toyLikes.innerHTML = toy.likes;
  likeButton.className = "like-btn";
  likeButton.innerHTML = "Like";
  likeListener(likeButton, toy);
  toyCard.className = "card";

  //add the variables to a div with class of card
  toyCard.append(toyName, toyImg, toyLikes, likeButton)

  //add that div to the dom 
  toyCollection.appendChild(toyCard)
}

const createNewToy = (toy) => {
  fetch(toysIndexUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
  .then(data => data)
}

const newToyListener = () => {
  let toyForm = document.querySelector("form.add-toy-form");
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newToyObj = {
      name: event.target.elements.name.value,
      image: event.target.elements.image.value,
      likes: "0"
    }
    createNewToy(newToyObj)
  })
}

const addLike = (toy) => {
  fetch(specificToyUrl(toy.id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({likes: toy.likes + 1})
  })
  .then(resp => resp.json())
  .then(data => data)
}

const likeListener = (button, toy) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    addLike(toy)
  })
}
