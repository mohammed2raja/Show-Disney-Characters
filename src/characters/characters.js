import { useState, useEffect, useCallback } from "react";
import Character from "./character";
import Filter from "./filter";
import "./characters.css";

function readDisneyCharacters(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
}

export default function Characters() {
  const [list, setList] = useState([]);
  const [characterList, setCharacters] = useState([])
  const [nextPageUrl, setNextPageUrl] = useState('')

  const updateData = useCallback(data => {
    setCharacters(data.data)
    setList(data.data);
    setNextPageUrl(data.nextPage)
  }, [setCharacters, setList, setNextPageUrl])

  useEffect(() => {
    // load first page 
    readDisneyCharacters("https://api.disneyapi.dev/characters")
      .then(updateData);
    window.addEventListener('scroll', () => {
      // End of the document reached?
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        console.log('Reached to the buttom of thje page!')
        readDisneyCharacters(nextPageUrl).then(updateData)
      }
    })
  }, []);

  const reset = useCallback(() => {
    setList(characterList)
  }, [setList, characterList])

  return (
    <div>
      <Filter list={characterList} setList={setList} reset={reset} />
      {list.map((ch) => (
        <Character key={ch._id} char={ch} />
      ))}
      {!list?.length && <div>No Resuilt found!</div>}
    </div>
  );
}
