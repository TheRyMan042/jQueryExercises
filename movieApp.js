//Ryan Hutchings
//Unit 17.1 Exercise Part 2: Movie App

//unique id for each new movie added
let movieCount = 1;

//Submits the form of movie names and their ratings and adds them to a table
$('.movieRatingForm').on('submit', function (event) {
  event.preventDefault(); //prevents from submitting to a server

  //get movie and rating from form's input
  let $movieName = $('#movieName').val();
  let $movieRating = $('#movieRating').val();

  //Adding movie, rating, and a remove button into the table
  $(`<tr class=movie${movieCount}>`).append(`<td>${$movieName}</td><td>${$movieRating}</td>`).appendTo('.moviesTable');
  //makes the remove button for each movie row
  let $removeButton = $('<button>').addClass([`removeBtn${movieCount}`, `movie${movieCount}`, 'removeBtnDecor']).text('Remove');
  $('<td class="removeBtnCell">').append($removeButton).appendTo(`.movie${movieCount}`);

  //Adds an extra cell for the sort section of the row
  $(`.movie${movieCount}`).append('<td class="extraCell"></td>');
  $('.removeBtnCell td').remove(); //removes extra cell from remove button


  //removes the movie the user picks from the table
  $(`.removeBtn${movieCount}`).on('click', function (event) {
    // console.log($(this).attr('class').split(' '));
    // console.log($('.moviesTable tbody').find('.movie1'));

    //gets unique movie id(a class name) from remove button
    let removeClasses = $(this).attr('class').split(' ');
    //searches each row for the right movie to remove
    for (let oneClass of removeClasses) {
      let $firstFind = $('.moviesTable tbody').find(`.${oneClass}`); //finds right movie row
      if ($firstFind) {
        //checks if row id matches the button id
        if ($firstFind.eq(0).attr('class') === removeClasses[1]) {
          // console.log('Found the row');
          $($firstFind).eq(0).remove(); //removes movie
        }
      }
    }
  });

  movieCount++; //adds on for next movie

  //clear inputs after submitting them
  $('#movieName').val('');
  $('#movieRating').val('');
});

//this sorts the movies in the table by name or rating
$('#sortMovieTable').on('click', function () {
  let $tableRows = $('.moviesTable tbody tr');

  // if ($(this).val() === 'default') {
  //   console.log('at start');
  // }

  //checks what to sort the table by
  if ($(this).val() === 'alphabetical') {
    // console.log('make movies a-z');

    //return a map of all the movie names
    const moviesList = getMovieRows($tableRows, 'name');
    //saves movie names into an array
    const moviesNames = Array.from(moviesList.values());

    //sorts the name from a to z
    const sortedMovieNames = moviesNames.sort()
    //adds sorted movie names to the table
    fillMovieTable(sortedMovieNames, moviesList);

  } else if ($(this).val() === 'highestRating') {
    // console.log('make ratings high to low');

    //return a map of all the movie ratings
    const moviesList = getMovieRows($tableRows, 'rating');
    //saves movie ratings into an array
    const movieRates = Array.from(moviesList.values());

    //sorts the ratings from 10 to 0
    const sortedMovieKeys = movieRates.sort((lowNum, highNum) => parseInt(highNum) - parseInt(lowNum));
    //adds sorted movie ratings to the table
    fillMovieTable(sortedMovieKeys, moviesList);

  } else if ($(this).val() === 'lowestRating') {
    // console.log('make ratings low to high');

    //return a map of all the movie ratings
    const moviesList = getMovieRows($tableRows, 'rating');
    //saves movie ratings into an array
    const movieRates = Array.from(moviesList.values());

    //sorts the ratings from 0 to 10
    const sortedMovieKeys = movieRates.sort((lowNum, highNum) => parseInt(lowNum) - parseInt(highNum));
    //adds sorted movie ratings to the table
    fillMovieTable(sortedMovieKeys, moviesList);
  }
});

//puts all movies from the table into a new Map
function getMovieRows($rows, selectionType) {
  const moviesMap = new Map(); //empty map
  let movieRow = 1;
  let count = $rows.length; //max size of movie table

  //checks if you get the names or rating from the table cells
  let tableCell = selectionType === 'rating' ? 1 : 0;

  //add each name/rating and the selector to the map
  while (count > 0) {
    //only saves movies that exist in the table into the map
    if ($(`.movie${movieRow}`).length !== 0) {
      moviesMap.set($(`.movie${movieRow}`).not('button'), $(`.movie${movieRow} td`).eq(tableCell).text());
      count--;
    }
    movieRow++; //iterator for movie id
  }
  // console.log(moviesMap);
  return moviesMap;
}

//adds the sorted names/ratings 
function fillMovieTable(sortedList, movieRow) {
  let sortedArrCount = 0; //iterator for sorted array
  //console.log(movieRow);

  //goes through each value in the sortedarray
  while (sortedArrCount < sortedList.length) {
    //goes through each row 
    for (let [row, cell] of movieRow) {
      //finds the right sorted value to add to the table
      if (cell === sortedList[sortedArrCount]) {
        row.appendTo('.moviesTable'); //add row to movie table
        sortedArrCount++; //moves to the next value in array
        movieRow.delete(row); //removes item from map (for duplicate ratings and movie names)
        break;
      }
    }
  }
}