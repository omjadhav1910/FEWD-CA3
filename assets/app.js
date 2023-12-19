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

  // document.addEventListener("DOMContentLoaded", function () {
  //   // Function to fetch data from the API and create cards
  //   function fetchDataAndCreateCards() {
  //     // Get the input value
  //     var inputValue = document.getElementById("searchInput").value;

  //     // Construct the API URL with the input value
  //     var apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

  //     // Fetch data from the API
  //     fetch(apiUrl)
  //       .then(function (response) {
  //         return response.json();
  //       })
  //       .then(function (data) {
  //         // Get the meal details
  //         var meal = data.meals[0];

  //         // Create a new card element
  //         var card = document.createElement("div");
  //         card.className = "box";

  //         // Create HTML content for the card
  //         var cardContent =
  //           '<img src="' +
  //           meal.strMealThumb +
  //           '" alt="' +
  //           meal.strMeal +
  //           '">' +
  //           '<h3>' +
  //           meal.strMeal +
  //           '</h3>' +
  //           '<div class="stars">' +
  //           '<i class="fas fa-star"></i>' +
  //           '<i class="fas fa-star"></i>' +
  //           '<i class="fas fa-star"></i>' +
  //           '<i class="fas fa-star"></i>' +
  //           '<i class="fas fa-star-half-alt"></i>' +
  //           '</div>' +
  //           '<span>$15.99</span>' +
  //           '<a href="#" class="btn">add to cart</a>';

  //         // Set the HTML content to the card
  //         card.innerHTML = cardContent;

  //         // Append the card to the container
  //         document.getElementById("boxContainer").appendChild(card);
  //       })
  //       .catch(function (error) {
  //         console.error("Error fetching data:", error);
  //       });
  //   }

  //   // Attach an event listener to the search button
  //   document.getElementById("searchButton").addEventListener("click", function () {
  //     // Clear existing cards
  //     document.getElementById("boxContainer").innerHTML = "";

  //     // Fetch data and create cards
  //     fetchDataAndCreateCards();
  //   });
  // });

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
  
