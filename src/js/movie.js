export default class {
    constructor() {
        console.log('MOvie constructor');
    }

    initialize() {
        let self = this;
        var loc = new URL(location.href);
        this.movieName = '';
        this.movieResult = {};
        this.movieContainer = document.querySelector('#result-section');
        this.movieId = loc.searchParams.get('id');

        document.getElementById('loader').style.display = 'none';
        document.getElementById('search').addEventListener('click', function() {
            self.listMovies();
        });

        document.getElementById('mname').addEventListener('keyup', function(e) {
            e.preventDefault();
            if (e.keyCode === 13) {
                document.getElementById('search').click();
            }
        });

        if (this.movieId) {
            self.showMovieData();
        }
    }
    
    listMovies() {
       let self = this;
       let list = '';
       this.movieName = document.getElementById('mname').value;
       self.movieContainer.innerHTML = '';
       this.movieContainer.style.display = 'block';
        this.movieContainer.style.backgroundColor  = 'white';
        var url = "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=a7209430ba5e9bda5a765014d9144bce&query=" + this.movieName;
        document.getElementById('loader').style.display = 'block';
        fetch(url).then(response => 
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            document.getElementById('loader').style.display = 'none';
            res.data.results.forEach(function (item) {
                console.log(item);
                list = `
                    <div class="col-md-4 movie-list">
                        <a href="?id=${item.id}" class="d-block mb-4 h-100">
                            <img class="img-thumbnail" src="http://image.tmdb.org/t/p/w185/${item.poster_path}" alt="">
                        </a>
                    </div>
                `;
                self.movieContainer.innerHTML += list;
            });
        }));
    }

    showMovieData() {
        var url = "https://api.themoviedb.org/3/movie/"+ this.movieId +"?api_key=a7209430ba5e9bda5a765014d9144bce";
        var temp = '';
        this.movieContainer.innerHTML = '';
        this.movieContainer.style.display = 'flex';
        this.movieContainer.style.backgroundColor  = '#fefbd8';

        document.getElementById('loader').style.display = 'block';
        fetch(url).then(response => 
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            document.getElementById('loader').style.display = 'none';
            var item = res.data;
            temp = `
            <div class="banner">
                <img src="http://image.tmdb.org/t/p/w185/${item.poster_path}" style="width:100%">
            </div>
            <div class="details">
                <h2>${item.original_title}</h2>
                <p>${item.overview}</p>
                <p><b>Release Date:</b> ${item.release_date}</p>
                <br/>
                <p><b>Popularity:</b>${item.popularity}</p>
            </div>
            `;
            this.movieContainer.innerHTML += temp;
        }));
    }
    
}