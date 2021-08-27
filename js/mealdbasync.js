const searchFood = async () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);

  // clear data
  searchField.value = '';
  if (searchText == '') {
    // please write something to display
  }
  else {
    // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    // console.log(url)

    try {
      const res = await fetch(url);
      const data = await res.json();
      displaySearchResult(data.meals)
    }
    catch (error) {
      console.log(error)
    }


    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => displaySearchResult(data.meals));

  }


}

const displaySearchResult = meals => {
  // console.log(meals);
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';
  if (meals.length == 0) {
    // show no result found;
  }
  meals.forEach(meal => {
    // console.log(meal);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div onClick = "loadMealDetail(${meal.idMeal})" class="card h-100">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
      </div>
    </div>
  </div>
    `;
    searchResult.appendChild(div);
  })
}

const loadMealDetail = async mealId => {
  console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  const res = await fetch(url);
  const data = await res.json();
  displayMealDetail(data.meals[0]);

  // write below lines by using prior code lune use await

  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
  console.log(meal);

  const mealDetails = document.getElementById('meal-details');
  mealDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="${meal.strMeal}" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
  `;
  mealDetails.appendChild(div);
}