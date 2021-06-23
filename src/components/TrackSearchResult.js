import React from 'react'

export default function TrackSearchResult({ track }) {
  const handlePlay = () => {
    // chooseTrack(track)
    console.log(track.title)
  }
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} alt={`${track.name} album`}/>
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  )
}
