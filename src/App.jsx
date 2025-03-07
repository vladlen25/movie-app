import './App.css'
import Search from './components/Search.jsx'
import { useEffect, useState } from 'react'
import Loader from './components/Loader.jsx'

function App() {
  const API_BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_API_KEY
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer ' + API_KEY,
    },
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [movieList, setMovieList] = useState([])

  const fetchMovies = async () => {
    try {
      setIsLoading(true)
      setErrorMessage('')
      const endpoint = API_BASE_URL + '/discover/movie?sort_by=popularity.desc'
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('Fetched data:', data)
      setMovieList(data.results)
    } catch (e) {
      console.error('Error fetching movies:', e)
      setErrorMessage('Error fetching movies. Please try again later')
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 5000);

    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="../public/movie.png" alt="Movie Banner"/>
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {isLoading ? <Loader/> : (
            <ul>
              {movieList.length > 0 ? (
                movieList.map((movie) => (
                  <li key={movie.id} className="text-white">{movie.title}</li>
                ))
              ) : (
                <p className="text-white">No movies found</p>
              )}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App