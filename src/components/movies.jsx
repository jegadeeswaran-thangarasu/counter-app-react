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

    handleDelete = (deletedMovie) => {
        const undeletedMovies = this.state.movies.filter(movie => movie._id !== deletedMovie._id);
        this.setState({movies: undeletedMovies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]}
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page})
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1, pageSize: 4 });
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    getPageData = () => {
        const { pageSize, currentPage, movies: allMovies , selectedGenre, sortColumn } = this.state;
        const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(movie => movie.genre._id === selectedGenre._id) : allMovies;

        const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sortedMovies, currentPage, pageSize);

        return {totalCount: filteredMovies.length , data: movies}
    }
    render() { 
        const { length: moviesCount } = this.state.movies;
        const { pageSize, currentPage, sortColumn } = this.state;

        if(moviesCount === 0) return <h3>There are no movies in database</h3>

        const { totalCount, data: movies } = this.getPageData();
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
                    <h3>There are {totalCount} movies in database</h3>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike} 
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
                    <Pagination 
                        itemsCount={totalCount} 
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