import tmdbRequest from "../https";
import Banner from "../components/Banner";
import "./HomeScreen.css";
import Nav from "../components/Nav";
import Row from "../components/Row";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../store/slices/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function HomeScreen() {
  const navigate = useNavigate();

  const user = useSelector(selectUser)
  useEffect(() => {
  if (!user) navigate("/login");
  
  }, [user,navigate])
  
  return (
    <div className="homescreen">
      {user && <>
        <Nav />
      {/* Banner */}
      <Banner />

      {/* Rows */}
      <Row
        title="Netflix Originals"
        fetchUrl={tmdbRequest.fetchNetflixOriginals}
        // isLargeRow
      />
      <Row title="Trending Now" fetchUrl={tmdbRequest.fetchTrending} />
      <Row title="Top Rated" fetchUrl={tmdbRequest.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={tmdbRequest.fetchActionMovies} />
      <Row
        title="Netflix Originals"
        fetchUrl={tmdbRequest.fetchNetflixOriginals}
      />
      <Row title="Comedy Movies" fetchUrl={tmdbRequest.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={tmdbRequest.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={tmdbRequest.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={tmdbRequest.fetchDocumentaries} />
      {/* Footer */}
      </>}
      
    </div>
  );
}

export default HomeScreen;
