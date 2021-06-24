import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import LightModeIcon from "@material-ui/icons/Brightness5";
import DarkModeIcon from "@material-ui/icons/Brightness4";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";
import { ThemeToggler, SearchResults, Lyrics } from "./Dashboard.styled";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
});

export default function Dashboard({ code, theme, toggleTheme }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return setSearchResults;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;

      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => setLyrics(res.data.lyrics));
  }, [playingTrack]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  };

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <ThemeToggler className="btn" theme={theme} onClick={toggleTheme}>
        {theme.name === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </ThemeToggler>
      <Form.Control
        id="searchBar"
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchResults id="searchResults" className="flex-grow-1 my-2">
        {searchResults.map((track) => (
          <TrackSearchResult
            key={track.uri}
            track={track}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <Lyrics id="lyrics" className="text-center">
            {lyrics}
          </Lyrics>
        )}
      </SearchResults>
      <div>
        <Player
          accessToken={accessToken}
          trackUri={playingTrack?.uri}
          theme={theme}
        />
      </div>
    </Container>
  );
}
