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

// https://randomuser.me/api/?results=12&nat=us
fetchData('https://fsjs-public-api-backup.herokuapp.com/api')
  .then((data) => {
    const results = data.results;
    userArray = [...results];

    generateHTML(userArray);
    displayModalWindow(userArray);
    addEventListenre();
    searchBar();
    SearchBarEventListenerClick();
    SearchBarEventListenerKeyUp();
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
        if (e.target.className === 'modal-close-btn' || e.target.tagName === 'STRONG') {
          let indexofClose = Array.prototype.indexOf.call(modal, e.currentTarget);
          modal[indexofClose].style.display = 'none';
        }  
      })
    }

  }

  /*---------------------------------------
                GenerateHTML
  ---------------------------------------*/
function generateHTML (data) {

  const employee = data.map(
    data => {
      const card = document.createElement('div');
      card.innerHTML = 
      `
      <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
          <p class="card-text">${data.email}</p>
          <p class="card-text cap">${data.location.city} ${data.location.state}</p>
        </div>
      </div>
      `;
      gallery.appendChild(card);
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
    modal.innerHTML = `
      <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${data.picture.medium}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${data.name.first}</h3>
          <p class="modal-text">${data.email}</p>
          <p class="modal-text cap">${data.location.city}</p>
          <hr>
          <p class="modal-text">${data.cell}</p>
          <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.country}, OR ${data.location.postcode}</p>
          <p class="modal-text">Birthday: ${data.dob.date.slice(0,8)}</p>
      </div>
    `;
    modalContainer.appendChild(modal);

    // Modal Prev, Modal Next
    const modalBtnContainer = document.createElement('div');
    modalContainer.appendChild(modalBtnContainer);

    const modalPrevNext = document.createElement('div');
    modalPrevNext.innerHTML = `
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
      `;
    modalBtnContainer.appendChild(modalPrevNext);
  })
}

  /*---------------------------------------
                Search bar
  ---------------------------------------*/

  function searchBar() {
    const searchHTML = document.createElement('div');

    searchHTML.innerHTML = `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    searchContainer.appendChild(searchHTML);
  }


   /*---------------------------------------
           Search filter
  ---------------------------------------*/

  function searchFilter (e) {
    const searchInput = document.querySelector('#search-input');
    const cards = document.querySelectorAll('div.card');   
  
    // No results FOund
    const noResultsHTML = document.createElement('div');
    noResultsHTML.classList.add('no-results');
    noResultsHTML.innerHTML = 
    `
    <div class="res">
      <h1> No Reults found of </h1>
    </div>
    `;
    body.insertBefore(noResultsHTML, gallery);
    noResultsHTML.style.display = 'none';

    // Add Event Listener For search
      e.preventDefault();
      const searchInputText = searchInput.value.toUpperCase();
      let noFoundMessage = false;

      // SeachFilter from ---> https://www.w3schools.com/howto/howto_js_filter_lists.asp
      for(let i =0; i < cards.length; i++){ 
        let h3 = cards[i].getElementsByTagName('h3')[0];
        let  txtValue = h3.textContent;
        if (txtValue.toUpperCase().indexOf(searchInputText) > -1){
          cards[i].style.display = '';
          lnoFoundMessage = false;
        } else {
          cards[i].style.display = 'none'; 
          noFoundMessage = true;
        }
      }

      if (noFoundMessage) {
        noResultsHTML.style.display = '';
      } else {
        noResultsHTML.style.display = 'none';
      }
  }


  

 /*---------------------------------------
           Search function On Click
  ---------------------------------------*/

  function SearchBarEventListenerClick () {
    const button = document.getElementById('search-submit');
    button.addEventListener('click', (e) => {
      searchFilter(e);
    });
  }


 /*---------------------------------------
        Search function On KeyUp
  ---------------------------------------*/

  function SearchBarEventListenerKeyUp () {
    const searchInput = document.querySelector('#search-input');
    searchInput.addEventListener('keyup', (e) => {
      searchFilter(e);
    });
  }
