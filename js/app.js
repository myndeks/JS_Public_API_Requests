/*---------------------------------------
                DOM
---------------------------------------*/
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
const searchContainer = document.querySelector('.search-container');


/*---------------------------------------
                Fetch data
---------------------------------------*/

function fetchData(ulr) {
  return fetch(ulr)
  .then(checkStatus)
  .then((response) => {
    return response.json();
  })
  .catch(error => console.log('Ups something went wrong ' + error));
}

fetchData('https://randomuser.me/api/?results=12&nat=us')
  .then((data) => {
    const results = data.results;
    userArray = [...results];

    generateHTML(userArray);
    displayModalWindow(userArray);
    addEventListenre();
    searchBar();
    SearchBarEventListener ();
  })

  /*---------------------------------------
      Check if response status is OK
  ---------------------------------------*/
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

  /*---------------------------------------
      Add EVENT Listener for Modal
  ---------------------------------------*/
  function addEventListenre() {
    // DOM
    const cards = document.querySelectorAll('div.card');
    const modal = document.querySelectorAll('div.modal-container');
    const btnPrev = document.querySelectorAll('.modal-prev');
    const btnNext = document.querySelectorAll('.modal-next');

    // Open modal when card is clicked
    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', (e) => {
        let index = Array.prototype.indexOf.call(cards, e.currentTarget);
        modal[index].style.display = '';
      })
    }


    // Prev button to show previous modal
    for (let i = 0; i < modal.length; i++) {
      btnPrev[i].addEventListener('click', (e) => {
        const modalIndexPrev = Array.prototype.indexOf.call(btnPrev, e.currentTarget);

        if (modalIndexPrev >= 1) {
          modal[modalIndexPrev].style.display = 'none';
          modal[modalIndexPrev - 1].style.display = ''; 
        } else {
          modal[modalIndexPrev].style.display = 'none';
        }
      })

      // Next button, to show next modal 
      btnNext[i].addEventListener('click', (e) => {
        const modalIndexNext = Array.prototype.indexOf.call(btnNext, e.currentTarget);

        if (modalIndexNext <= 10) {
          modal[modalIndexNext].style.display = 'none';
          modal[modalIndexNext + 1].style.display = ''; 
        } else {
          modal[modalIndexNext].style.display = 'none';
        }
      })
    }

    // Close modal when close button is clicked
    for (var j = 0; j < modal.length; j++) {
      modal[j].addEventListener('click', (e) => {
        if (e.target.className === 'modal-close-btn') {
          let indexofClose = Array.prototype.indexOf.call(modal, e.currentTarget);
          console.log(indexofClose);

          modal[indexofClose].style.display = 'none';
        }  
      })
    }

  }


  /*---------------------------------------
                Birthday Date
  ---------------------------------------*/
  function regEx(date) {
    let expression = /(\d+)(-)(\d+)(-)(\d+)/;
    let newString = date.replace(expression, "$3" + "/" + "$5" + "/" + "$1");
    return newString.substr(0, 10);
}

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
    modalImage.setAttribute("class", "modal-img");
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
    modalBirthday.textContent = 'Birthday ' + regEx(data.dob.date);
    modalInfoCotainer.appendChild(modalBirthday);

    // Modal Prev, Modal Next

    const modalBtnContainer = document.createElement('div');
    modalContainer.appendChild(modalBtnContainer);
    
    const modalPrev = document.createElement('button');
    modalPrev.textContent = 'Prev';
    modalPrev.classList.add('modal-prev');
    modalPrev.classList.add('btn');
    modalBtnContainer.appendChild(modalPrev);

    const modalNext = document.createElement('button');
    modalNext.textContent = 'Next';
    modalNext.classList.add('modal-next');
    modalNext.classList.add('btn');
    modalBtnContainer.appendChild(modalNext);

  })

}

    /*---------------------------------------
                Search bar
  ---------------------------------------*/

  function searchBar() {

    // const form = document.createElement('form');
    // searchContainer.appendChild(form);
    // const input = document.createElement('input');
    // input.type = 'search';
    // input.classList.add('search-input');
    // input.setAttribute("id", "search-submit");
    // input.placeholder = 'Search...';
    // form.appendChild(input);
    // const button = document.createElement('input');
    // button.type = 'submit';
    // button.innerHTML = '&#x1F50D;';
    // button.classList.add('search-submit');
    // button.setAttribute("id", "search-button");
    // form.appendChild(button);

    const searchHTML = document.createElement('div');

    searchHTML.innerHTML = `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    searchContainer.appendChild(searchHTML);
  
  }
  
     /*---------------------------------------
                Search function
  ---------------------------------------*/

  function SearchBarEventListener () {
    const button = document.getElementById('search-submit');
    const searchInput = document.querySelector('#search-input');
    const searchInputText = searchInput.value;
    const cards = document.querySelectorAll('div.card');

    const h3 = document.querySelectorAll('h3');
  
    button.addEventListener('click', (e) => {
      e.preventDefault();
  
      console.log(searchInputText);

      for (let i = 0; i < cards.length; i++) {
                
      }
      
    });
  }