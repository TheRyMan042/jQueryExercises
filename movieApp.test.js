//Ryan Hutchings
//Unit 17.1 Exercise Part 2: Movie App

//event listeners i can't run (yet)
//$('.movieRatingForm').on('submit', function(event){})
//$(`.removeBtn${movieCount}`).on('click', function(event){})
//$('#sortMovieTable').on('click', function(){}) - mostly tested from these two tests


describe("The Movie App", () => {
  // adds some movies into the movie table
  beforeAll(() => {
    const movieNames = ['Lord of the Rings', 'Harry Potter', 'Spirited Away', 'Princess Mononoke', 'IT'];
    const movieRatings = [8, 9, 9, 10, 0];
    let iterCount = 0
    //Adding movie, rating, and a remove button into the table
    while (iterCount < movieNames.length) {
      $(`<tr class=movie${iterCount + 1}>`).append(`<td>${movieNames[iterCount]}</td><td>${movieRatings[iterCount]}</td>`).appendTo('.moviesTable');
      //makes the remove button for each movie row
      let $removeButton = $('<button>').addClass([`removeBtn${iterCount}`, `movie${iterCount}`, 'removeBtnDecor']).text('Remove');
      $('<td class="removeBtnCell">').append($removeButton).appendTo(`.movie${iterCount + 1}`);

      //Adds an extra cell for the sort section of the row
      $(`.movie${iterCount + 1}`).append('<td class="extraCell"></td>');
      $('.removeBtnCell td').remove(); //removes extra cell from remove button
      iterCount++;
    }
  });


  it("should add movies from the table into a new map", () => {
    let $tableRows = $('.moviesTable tbody tr');

    //add by name
    expect(Array.from(getMovieRows($tableRows, 'name').values())).toEqual(['Lord of the Rings', 'Harry Potter', 'Spirited Away', 'Princess Mononoke', 'IT']);
    //add by rating
    expect(Array.from(getMovieRows($tableRows, 'rating').values())).toEqual(['8', '9', '9', '10', '0']);
  });

  it("should fill the movie table with sorted names/ratings", () => {
    let $tableRows = $('.moviesTable tbody tr');
    let $tableRowsCopy = $('.moviesTable tbody tr');
    let $tableCells = $('.moviesTable tbody tr td');

    let movieNames = getMovieRows($tableRows, 'name');
    let movieNameMap = Array.from(movieNames.values());
    let movieRatings = getMovieRows($tableRows, 'rating');
    let movieRatingMap = Array.from(movieRatings.values());

    let sortedNames = movieNameMap.sort();
    let sortedRatingsHigh = movieRatingMap.sort((lowNum, highNum) => parseInt(highNum) - parseInt(lowNum));

    //part 1 - sort by name(a-z)
    fillMovieTable(sortedNames, movieNames);
    $tableCells = $('.moviesTable tbody tr td');

    let testArr = [];
    let index = 0;
    for (let name of $tableCells) {
      if (name.innerText === sortedNames[index]) {
        testArr.push(name.innerText);
        index++;
      }
    }
    expect(testArr).toEqual(['Harry Potter', 'IT', 'Lord of the Rings', 'Princess Mononoke', 'Spirited Away']);

    //part 2 - sort by high to low rating
    fillMovieTable(sortedRatingsHigh, movieRatings);
    // console.log(sortedRatingsHigh);
    $tableCells = $('.moviesTable tbody tr td');

    testArr = [];
    index = 0;
    for (let rate of $tableCells) {
      if (rate.innerText === sortedRatingsHigh[index]) {
        testArr.push(rate.innerText);
        index++;
      }
    }
    expect(testArr).toEqual(['10', '9', '9', '8', '0']);

    //part 3 - sort by low to high rating
    movieRatings = getMovieRows($tableRowsCopy, 'rating');
    let sortedRatingsLow = movieRatingMap.sort((lowNum, highNum) => parseInt(lowNum) - parseInt(highNum));
    fillMovieTable(sortedRatingsLow, movieRatings);
    // console.log(sortedRatingsLow);
    $tableCells = $('.moviesTable tbody tr td');

    testArr = [];
    index = 0;
    for (let rate of $tableCells) {
      if (rate.innerText === sortedRatingsLow[index]) {
        testArr.push(rate.innerText);
        index++;
      }
    }
    expect(testArr).toEqual(['0', '8', '9', '9', '10']);
  });

  afterAll(() => {
    $('tbody').empty();
  })
});