// Use the response data to display 12 users, along with some basic information for each Image, First and Last Name, Email, City or location

const gallery = document.getElementById("gallery");

async function getRandomUsers() {
  try {
    const response = await fetch(
      "https://randomuser.me/api/1.4/?results=12&inc=picture,name,email,location,dob,cell,nat"
    );

    //  - Catch any errors and log them to the console.
    if (!response.ok) {
      throw new Error(`Error fetching data - Status: ${response.status}`);
    }
    //  - Convert the response to JSON.

    const data = await response.json();
    console.log("DATA:", data);

    //  - pass the data to the displayRandomUsers function.
    displayRandomUsers(data.results);
  } catch (error) {
    console.error(error.message);
  }
}
getRandomUsers();

//-----------------------------------------------------------------------
//          DISPLAY FUNCTION
//---------------------------------------------------------------------

function displayRandomUsers(randomUsers) {
  //  - Loop over the array of users.
  randomUsers.forEach((randomUser) => {
    console.log(randomUser);

    //  - retrieve the img, first and LastName email, city or location for each user
    const image = randomUser.picture.medium;
    const firstName = randomUser.name.first;
    const lastName = randomUser.name.last;
    const email = randomUser.email;
    const city = randomUser.location.city;
    const state = randomUser.location.state;
    //Add the randomUser and image to the div with the provided HTML structure.
    const cardHTML = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${image}" alt="profile picture">
        </div>
        <div class="card-info-container"> 
            <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${city}, ${state}</p>
        </div>
    </div>
    `;
    // Adding strings of HTML to the DOMelement.insertAdjacentHTML('beforeend', 'HTML string').
    gallery.insertAdjacentHTML("beforeend", cardHTML);
    //making each card clickable
    const card = gallery.lastElementChild;
    card.addEventListener("click", () => displayUserModal(randomUser));
  });
}

// Create a Modal Window
function displayUserModal(user) {
  const birthDate = new Date(user.dob.date);
  const birthday = `${
    birthDate.getMonth() + 1
  }/${birthDate.getDate()}/${birthDate.getFullYear()}`;
  const street = `${user.location.street.number} ${user.location.street.name}`;
  const address = `${street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;

  //  variable for modal window to show:Image, Name, Email,City or location,Cell Number,Detailed Address, including street name and number, state or country, and postcode then Birthday
  const modalHTML = `
<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}</p>
                        <hr>
                        <p class="modal-text">${user.cell}</p>
                        <p class="modal-text">${address}</p>
                        <p class="modal-text">Birthday: ${birthday}</p>
                    </div>
                </div>
`;
  //placing the HTML before the end of the body/page
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  document.getElementById("modal-close-btn").addEventListener("click", () => {
    document.querySelector(".modal-container").remove();
  });
}

// Make sure there’s a way to close the modal window
// Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.
