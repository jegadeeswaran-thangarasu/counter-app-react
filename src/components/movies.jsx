import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'

class Movies extends Component {
    state = {
        movies : getMovies(),
    }

    handleDelete(deletedMovie) {
        console.log('deleted movie', deletedMovie);
       const undeletedMovies = this.state.movies.filter(movie => movie._id !== deletedMovie._id);
       this.setState({movies: undeletedMovies});
    }
    render() { 
        const { length: moviesCount } = this.state.movies;
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map( movie => 
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
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