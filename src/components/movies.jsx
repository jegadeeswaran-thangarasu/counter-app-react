import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService'
import { paginate } from '../utils/paginate';
import ListGroup from './common/list-group';
import Pagination from './common/pagination';
import MoviesTable from './movies-table';
import _ from 'lodash';
class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' },
    }

    componentDidMount() {
        const genres = [ {_id: "", name: 'All Genres'}, ...getGenres()]
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
        this.setState({ selectedGenre: genre, currentPage: 1, pageSize: 4 });
        console.log('genre', genre);
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    render() { 
        const { length: moviesCount } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies , selectedGenre, sortColumn } = this.state;

        if(moviesCount === 0) return <h3>There are no movies in database</h3>

        const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(movie => movie.genre._id === selectedGenre._id) : allMovies;

        const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sortedMovies, currentPage, pageSize);

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
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike} 
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
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