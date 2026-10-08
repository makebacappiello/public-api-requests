// Use the response data to display 12 users, along with some basic information for each Image, First and Last Name, Email, City or location
console.log("script loaded");
async function getRandomUsers() {
  try {
    const response = await fetch(
      "https://randomuser.me/api/1.4/?results=12&inc=picture,name,email,location,dob,phone,nat"
    );

    //  - Catch any errors and log them to the console.
    if (!response.ok) {
      throw new Error(`Error fetching data - Status: ${response.status}`);
    }
    //  - Convert the response to JSON.

    const data = await response.json();
    console.log("DATA:", data);

    //  - pass the data to the displayRandomUsers function.
    // displayRandomUsers(data.results);
  } catch (error) {
    console.error(error.message);
  }
}
getRandomUsers();

function displayRandomUsers(randomUsers) {
  //  - Loop over the array of users.
  randomUsers.forEach((randomUser) => {
    console.log(randomUser);
    //  - retrieve the name, img, email, location,dob,phone,and nat  for all users.

    const picture = results.picture.medium;
  });
}

// NOTE: When adding or concatenating to the DOM, avoid doing this: element.innerHTML += 'HTML string'. That technique rewrites the entire DOM. This is problematic because any rewritten elements won't retain any event listeners that were attached to the DOM before the rewrite occurs. Use this method instead: element.insertAdjacentHTML('beforeend', 'HTML string'). That technique will allow you to add strings of HTML to the DOM without disrupting what already exists in the DOM.
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
