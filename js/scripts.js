// - Selecting the container where gallery cards will be added
const gallery = document.getElementById("gallery");

// - Main list of 12 users, filled in after the API response
// - Never emptied, so each search starts from the full list
let users = [];

// - Selecting the container where search will be added
const searchContainer = document.querySelector(".search-container");

// - Designing for search form the searchbar on page
const searchHTML = `
                <form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>
`;

// - Adding the search bar to the actual dom element
// - https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event
searchContainer.insertAdjacentHTML("beforeend", searchHTML);

const searchInput = document.getElementById("search-input");

// - Listening for typed text
searchInput.addEventListener("input", updateValue);

// - Runs every time the text in the search box changes
function updateValue() {
  // - Get the typed text in lowercase so the search is uniform
  const typedText = searchInput.value.toLowerCase();

  // - Filter to match typed text only
  const filteredUsers = users.filter((user) => {
    //  combine first and last name  in lowercase to compare with typed text
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();

    //  if true keep user, if false drop them
    return fullName.includes(typedText);
  });

  // - Clear cards currently on page
  gallery.innerHTML = "";

  // - Display only the filtered users that match
  displayRandomUsers(filteredUsers);
}

// - Selecting 12 random users from the API then passing them into the display function
async function getRandomUsers() {
  try {
    const response = await fetch(
      "https://randomuser.me/api/1.4/?results=12&inc=picture,name,email,location,dob,cell&nat=us,gb"
    );

    //  - Catch any errors and log them to the console.
    if (!response.ok) {
      throw new Error(`Error fetching data - Status: ${response.status}`);
    }
    //  - Convert the response to Javascript Object Notation.
    const data = await response.json();

    //  - pass the data to the displayRandomUsers function.
    displayRandomUsers(data.results);
    users = data.results;
  } catch (error) {
    // - log any fetch or parsing errors to the console.
    console.error(error.message);
  }
}
getRandomUsers();

//---------------------------------------------------------------------
//         MAIN  DISPLAY FUNCTION
//---------------------------------------------------------------------

// - Creating card for each user and adding it to the gallery
function displayRandomUsers(randomUsers) {
  // - Loop over the array of users.
  randomUsers.forEach((randomUser) => {
    // - Details needed for the card
    const image = randomUser.picture.medium;
    const firstName = randomUser.name.first;
    const lastName = randomUser.name.last;
    const email = randomUser.email;
    const city = randomUser.location.city;
    const state = randomUser.location.state;
    const userIndex = randomUsers.indexOf(randomUser);
    console.log("INDEX OFFFFFF", userIndex);
    // - Designing the HTML using details above
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

    // - Adding the card to the gallery and not erasing the existing gallery structure.
    gallery.insertAdjacentHTML("beforeend", cardHTML);

    // - Making each card clickable to display details of modal
    const card = gallery.lastElementChild;
    card.addEventListener("click", () =>
      displayUserModal(randomUser, userIndex, randomUsers)
    );
  });
}

//---------------------------------------------------------------------
//                MODAL DISPLAY FUNCTION
//---------------------------------------------------------------------

// - Display Modal Window when opened
function displayUserModal(user, userIndex, userList) {
  // - Converting dob from the API into a date object for simple reading
  const birthDate = new Date(user.dob.date);

  // - Format the birthday as m/d/y.
  // getMonth() is zero-based and returns 0-11 (0 = January, 11 = December),
  //  so add 1 to get the month number people expect (1-12).
  // - Source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
  const birthday = `${
    birthDate.getMonth() + 1
  }/${birthDate.getDate()}/${birthDate.getFullYear()}`;

  // - Combine to make one address
  const street = `${user.location.street.number} ${user.location.street.name}`;
  const address = `${street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;

  // - Design of modal window to show user details
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
                            <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        `;

  // - Placing the HTML before the end of the body/page
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // - Remove the modal from page when the close button is clicked

  document.getElementById("modal-close-btn").addEventListener("click", () => {
    document.querySelector(".modal-container").remove();
  });

  // - Prev and Next buttons
  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");

  // - Hide the button that has nowhere to go (first / last person)
  if (userIndex === 0) prevBtn.style.visibility = "hidden";
  if (userIndex === userList.length - 1) nextBtn.style.visibility = "hidden";

  // - Close this modal, then open the neighbouring person’s modal
  prevBtn.addEventListener("click", () => {
    document.querySelector(".modal-container").remove();
    displayUserModal(userList[userIndex - 1], userIndex - 1, userList);
  });

  nextBtn.addEventListener("click", () => {
    document.querySelector(".modal-container").remove();
    displayUserModal(userList[userIndex + 1], userIndex + 1, userList);
  });
}
