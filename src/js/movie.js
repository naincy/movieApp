import Helper  from './helper.js';

export default class {
    
    constructor() {
       
        console.log('MOvie constructor');
    }

    initialize() {
        this.movieName = '';
        document.getElementById('search').addEventListener('click', function() {
            console.log('u');
            searchMovie();
        });
    }
    
    listMovies() {
       Helper.prototype.test();
       console.log('MOvie List');
    }

    // search movie
    searchMovie() {
        this.movieName = document.getElementById('mname').value;
        console.log('MOvie search===' + this.movieName);
     }
}