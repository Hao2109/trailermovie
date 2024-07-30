import PropTypes from "prop-types";
import { useState, createContext } from "react";
import YouTube from "react-youtube";
import Modal from "react-modal";

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
  },
};

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  const handleTrailer = async (id) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const response = await fetch(url, options);
      const movieData = await response.json();
      const trailer = movieData.results.find(vid => vid.type === "Trailer");
      if (trailer) {
        setVideoId(trailer.key);
        setModalIsOpen(true);
      }
    } catch (error) {
      setModalIsOpen(false);
      console.error(error);
    }
  };

  return (
    <MovieContext.Provider value={{ handleTrailer }}>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Movie Trailer"
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <YouTube videoId={videoId} opts={opts} />
      </Modal>
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MovieProvider, MovieContext };
