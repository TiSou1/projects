import React, {useState,useEffect, useReducer} from 'react';
import "./App.css"
import Header from "./header";
import Search from "./search";
import Movie from "./movies";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state,action) =>{
  switch(action.type){
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading:false,
        movies:action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
}
const App = () => {
  const [state,dispatch] = useReducer(reducer, initialState);
  // const [loading, setLoading] = useState(true);
  // const [moviesm, setMovies] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);

  useEffect(()=>{
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(data => {
        // setMovies(data.Search);
        // setLoading(false);
        dispatch({
          type:"SEARCH_MOVIES_SUCCESS",
          payload: data.Search
        })
      });
  },[]);

  const search = searchValue => {
    // setLoading(true);
    // setErrorMessage(null);
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
     .then(response => response.json())
     .then(data => {
       if(data.Response === "True"){
        //  setMovies(data.Search);
        //  setLoading(false);
        dispatch({
          type:"SEARCH_MOVIES_SUCCESS",
          payload:data.Search
        })
       }else{
        //  setErrorMessage(data.Error);
        //  setLoading(false);
        dispatch({
          type:"SEARCH_MOVIES_FAILURE",
          error:data.error
        })
       }
     });
  }
const {movies, errorMessage, loading} = state;

  return (
    <div className="App">
    <Header text="HOOKED" />
    <Search search={search} />
    <p className="App-intro">Sharing a few of our favourite movies</p>
    <div className="movies">
      {loading && !errorMessage ? (
       <span>loading...</span>
       ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        movies.map((movie, index) => (
          <Movie key={`${index}-${movie.Title}`} movie={movie} />
        ))
      )}
    </div>
  </div>
  )

}

export default App;
