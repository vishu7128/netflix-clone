const API_KEY = '4fe04e9e1a145040926ece175a830f8d'

const tmdbRequest = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`, //trending movies
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`, //netflix original movies
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`, //top rated movies
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`, //action movies
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`, //comedy movies
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`, //horror movies
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`, //romance movies
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`, //documentaries movies
}

export default tmdbRequest

// https://api.themoviedb.org/3//trending/all/week?api_key=4fe04e9e1a145040926ece175a830f8d&language=en-US