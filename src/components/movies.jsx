import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'
import Like from './common/like';

class Movies extends Component {
    state = {
        movies : getMovies(),
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

    render() { 
        const { length: moviesCount } = this.state.movies;
        if(moviesCount === 0) return <h3>There are no movies in database</h3>
        return (
            <div>
                {/* {moviesCount === 0 && <h3 className='m-5'>No Movies in database</h3> } */}
                <h3>There are {moviesCount} movies in database</h3>
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
                        {this.state.movies.map( movie => 
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
            </div>
        )
    }
}
 
export default Movies;