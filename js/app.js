const container = document.querySelector(".theater-container"); // container contain all of seat and screen.
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); // select all available seat or which is not occupied.
const count = document.getElementById("count"); // select the no of selected seat.
const total = document.getElementById("total"); // select the total price of movie.
const movieSelect = document.getElementById("movie"); // select the name of movie.

populateUI();

let ticketPrice = +movieSelect.value;
// + is used to convert string to number

// update total and seatcount
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat)=> [...seats].indexOf(seat) );
    localStorage.setItem('selectedSeat', JSON.stringify(seatsIndex));

    // console.log(localStorage.getItem('selectedSeat'));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// set movie data to local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// get data from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeat'));
    console.log(selectedSeats);
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index)=>{
           if(selectedSeats.indexOf(index) > -1){
               seat.classList.add('selected');
           }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// select movie
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value;

    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
})
container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})

// Initial count and update seat

updateSelectedCount();