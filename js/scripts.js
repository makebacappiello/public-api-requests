// Use the response data to display 12 users, along with some basic information for each Image, First and Last Name, Email, City or location

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

const gallery = document.getElementById("gallery");

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
  });
}

// Create a Modal Window
// When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
// Image
// Name
// Email
// City or location
// Cell Number
// Detailed Address, including street name and number, state or country, and postcode.
// Birthday
// Make sure there’s a way to close the modal window
// Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.
