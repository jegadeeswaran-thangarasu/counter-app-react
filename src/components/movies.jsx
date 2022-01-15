import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService'
import { paginate } from '../utils/paginate';
import Like from './common/like';
import ListGroup from './common/list-group';
import Pagination from './common/pagination';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
    }

    componentDidMount() {
        const genres = [ {name: 'All Genres'}, ...getGenres()]
        this.setState({
            movies: getMovies(),
            genres,
        })
    }

    handleDelete(deletedMovie) {
        console.log('deleted movie', deletedMovie);
        const undeletedMovies = this.state.movies.filter(movie => movie._id !== deletedMovie._id);
        this.setState({movies: undeletedMovies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]}
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
        console.log('Clicked like', movie);
    }

    handlePageChange = (page) => {
        console.log('page change... ', page);
        this.setState({ currentPage: page})
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
        console.log('genre', genre);
    }

    render() { 
        const { length: moviesCount } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies , selectedGenre } = this.state;

        if(moviesCount === 0) return <h3>There are no movies in database</h3>

        const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(movie => movie.genre._id === selectedGenre._id) : allMovies;

        const movies = paginate(filteredMovies, currentPage, pageSize);

        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup 
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                    />
                </div>
                <div className="col">
                    <h3>There are {filteredMovies.length} movies in database</h3>
                    <table className="table m-2">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map( movie => 
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like liked={movie.liked} onClick={() => this.handleLike(movie)}/>
                                    </td>
                                    <td><button className="btn btn-danger btn-sm" onClick={ () => this.handleDelete(movie)}>Delete</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination 
                        itemsCount={filteredMovies.length} 
                        onPageChange={this.handlePageChange}
                        pageSize={pageSize}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        )
    }
}
 
export default Movies;