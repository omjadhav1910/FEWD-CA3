let menu =document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick =()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
     loop:true,
  });
 

  const randomMealImg = document.querySelectorAll('.random-img');
  const randomMealName = document.querySelectorAll('.random-heading');
  const resultsGrid = document.querySelector('#boxContainer');
  
  // Function to hide the results container initially
  function hideResultsContainer() {
      resultsGrid.classList.add('hide');
  }
  
  // Call the function to hide the results container initially
  hideResultsContainer();
  
  async function getRandomMeal() {
      try {
          const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
          const data = await res.json();
  
          console.log(data);
  
          randomMealImg.forEach(el => {
              el.querySelector('img').setAttribute('src', data.meals[0].strMealThumb);
          });
  
          randomMealName.forEach(el => {
              el.innerHTML = data.meals[0].strMeal;
          });

          displayIngredients(data.meals[0].idMeal)
  
      } catch (error) {
          console.error("An error has occurred while fetching the data for random meal - ", error);
      }

      
  }
  
  getRandomMeal();
  
  const inputBox = document.querySelector('#searchInput');
  const searchButton = document.querySelector('#searchButton');
  
  inputBox.addEventListener('keypress', function (e) {
      if (e.key === "Enter") {
          e.preventDefault();
          getInputFromUserAndDisplay();
      }
  });
  
  searchButton.onclick = () => {
      getInputFromUserAndDisplay();
  };
  
  function getInputFromUserAndDisplay() {
      const typeName = inputBox.value;
  
      inputBox.value = "";
      resultsGrid.innerHTML = "";
  
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${typeName}`)
          .then((data) => data.json())
          .then((data) => {
              const diffMeals = data.meals;
  
              console.log(data);
  
              diffMeals.forEach((el) => {
                  let result = document.createElement('div');
                  result.setAttribute('class', 'box');
  
                  let searchImg = document.createElement('img');
                  searchImg.setAttribute('class', 'searchedMealImg');
                  searchImg.setAttribute('src', el.strMealThumb);
                  searchImg.setAttribute('alt', 'Searched Meal Image"');
  
                  let searchHeading = document.createElement('h3');
                  searchHeading.setAttribute('class', 'heading');
                  searchHeading.innerHTML = el.strMeal;
  
                  result.append(searchImg, searchHeading);
  
                  resultsGrid.append(result);
              });
  
              // Show the results container
              resultsGrid.classList.remove('hide');
          })
          .catch(error => {
              console.error("An error has occurred while fetching the data for searched meals - ", error);
          });
  }
 
  document.getElementById('img-ran').addEventListener('click',(e)=>{
    const random = document.getElementById('modal')
    random.classList.remove("hide")
  })
  
 // Function to display ingredients in the modal

// Function to display ingredients in the modal
async function displayIngredients(mealId) {
    try {
        // Fetch data from the API
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await res.json();
        console.log(data)

        // Get the meal details
        const meal = data.meals[0];

        // Get modal elements
        const modalContent = document.getElementById('cont');
        const modalWrapper = document.querySelector('.modal-wrapper');

        // Set modal content
        modalContent.innerHTML = '';

        // Create an unordered list for ingredients
        const ingredientsList = document.createElement('ul');

        // Iterate through ingredients and measures (up to 20, adjust as needed)
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && measure) {
                const li = document.createElement('li');
                li.textContent = `${measure} ${ingredient}`;
                ingredientsList.appendChild(li);
            }
        }

        // Append the ingredients list to the modal content
        modalContent.appendChild(ingredientsList);

        // Show the modal
        modalWrapper.classList.remove('hide');

    } catch (error) {
        console.error('Error while fetching ingredients:', error);
    }
}

const modalWrapper = document.querySelector('.modal ');
// Event listener for the modal close button
document.querySelector('.btn-close').addEventListener('click', () => {
    const modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.classList.add('hide');
});


// Event listener for the modal close button
document.querySelector('.btn-close').addEventListener('click', () => {
    const modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.classList.add('hide');
});
function handleRecipeButtonClick() {
    
    // Remove the 'hide' class from the modal
    modalWrapper.classList.remove('hide');
}

// Event listener for the Recipe button click
document.querySelector('.btn-recipe').addEventListener('click', ()=>{
    modalWrapper.classList.remove('hide')
});

// Event listener for the modal close button
document.querySelector('.btn-close').addEventListener('click', () => {
    const modalWrapper = document.querySelector('.modal-wrapper');
    
    // Add the 'hide' class to the modal
    modalWrapper.classList.add('hide');
});

document.getElementById("back-button").addEventListener('click',()=>{
    modalWrapper.classList.add('hide');
})