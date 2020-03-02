/*---------------------------------------
                DOM
---------------------------------------*/

const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

/*---------------------------------------
                Fetch data
---------------------------------------*/



fetch('https://randomuser.me/api/?results=12')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const results = data.results;
    userArray = [...results];

    generateHTML(userArray);
    displayModalWindow(userArray);
  })


/*---------------------------------------
    Add EVENT Listener for Modal
---------------------------------------*/

  gallery.addEventListener('click', (e) => {
    const cards = document.querySelectorAll('div.card');
    const newCards = [];
    newCards.push(cards);
    // console.log(newCards);

    const modalContainer = document.querySelectorAll('div.modal-container');
    const newmodalContainer = [];
    newmodalContainer.push(modalContainer);



    const indexOfCards = Array.prototype.indexOf.call(cards, e.target);
    console.log(indexOfCards);

    const indexOfModals = Array.prototype.indexOf.call(modalContainer, e.target);
    console.log(indexOfCards);

    console.log(modalContainer.length);

// find matching index
    for (var i = 0; i < modalContainer.length; i++) {

      if (indexOfCards[i] === indexOfModals[i]) {
        modalContainer[i].style.display = '';
      }

    }


  })


  /*---------------------------------------
                GenerateHTML
  ---------------------------------------*/

function generateHTML (data) {

  const employee = data.map(
    data => {
      const card = document.createElement('div');
      card.classList.add('card')
      gallery.appendChild(card);

      const cardImgContainer = document.createElement('div');
      cardImgContainer.classList.add('card-img-container');
      card.appendChild(cardImgContainer);

      const imageDiv = document.createElement('img');
      imageDiv.classList.add('card-img');
      imageDiv.src = data.picture.medium;
      cardImgContainer.appendChild(imageDiv);

      const cardINfoContainer = document.createElement('div');
      cardINfoContainer.classList.add('card-info-container');
      card.appendChild(cardINfoContainer);

      const nameDiv = document.createElement('h3');
      nameDiv.classList.add('card-name');
      nameDiv.textContent = data.name.first + data.name.last;
      cardINfoContainer.appendChild(nameDiv);

      const emailDiv = document.createElement('p');
      emailDiv.classList.add('card-text');
      emailDiv.textContent = data.email;
      cardINfoContainer.appendChild(emailDiv);

      const cityStage = document.createElement('p');
      cityStage.classList.add('card-text');
      cityStage.textContent = data.location.city + data.location.state;
      cardINfoContainer.appendChild(cityStage);
    }
  )
}


/*---------------------------------------
      Display  Modal Information
---------------------------------------*/
function displayModalWindow(data) {

  const employee = data.map(data => {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    modalContainer.style.display = 'none';
    body.appendChild(modalContainer)

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);

    const button = document.createElement('button');
    button.classList.add('modal-close-btn');
    button.textContent = 'X';
    modal.appendChild(button);

    const modalInfoCotainer = document.createElement('div');
    modalInfoCotainer.classList.add('modal-info-container');
    modal.appendChild(modalInfoCotainer)

    const modalImage = document.createElement('img');
    modalImage.src = data.picture.medium;;
    modalInfoCotainer.appendChild(modalImage);

    const modalName = document.createElement('h3');
    modalName.textContent = data.name.first;
    modalName.classList.add('modal-name');
    modalInfoCotainer.appendChild(modalName);

    const modalEmail = document.createElement('p');
    modalEmail.classList.add('modal-text');
    modalEmail.textContent = data.email;
    modalInfoCotainer.appendChild(modalEmail);

    const modalCity = document.createElement('p');
    modalCity.classList.add('modal-text');
    modalCity.textContent = data.location.city;
    modalInfoCotainer.appendChild(modalCity);

    const hr = document.createElement('hr');
    modalInfoCotainer.appendChild(hr);

    const modalNumber = document.createElement('p');
    modalNumber.classList.add('modal-text');
    modalNumber.textContent = data.cell;
    modalInfoCotainer.appendChild(modalNumber);

    const modalAddress = document.createElement('p');
    modalAddress.classList.add('modal-text');
    modalAddress.textContent = data.location.state + ' ' + data.location.country + ' ' + data.location.postcode;
    modalInfoCotainer.appendChild(modalAddress);

    const modalBirthday = document.createElement('p');
    modalBirthday.classList.add('modal-text');
    modalBirthday.textContent = 'Birthday ' + data.dob.date;
    modalInfoCotainer.appendChild(modalBirthday);
  })

}
