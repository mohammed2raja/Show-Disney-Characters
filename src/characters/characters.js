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
    setCharacters(characterList.concat(data.data))
    setList(list.concat(data.data));
    setNextPageUrl(data.nextPage)
  }, [setCharacters, setList, setNextPageUrl])

  const infiniteScroll = useCallback(() => {
    // End of the document reached?
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      console.log('Reached to the buttom of thje page!', nextPageUrl)
      readDisneyCharacters(nextPageUrl).then(updateData)
    }
  }, [nextPageUrl])

  useEffect(() => {
    // load first page 
    readDisneyCharacters("https://api.disneyapi.dev/characters")
      .then(updateData);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll)
    return () => {
      window.removeEventListener('scroll', infiniteScroll)
    }
  }, [nextPageUrl])

  const reset = useCallback(() => {
    setList(characterList)
  }, [setList, characterList])

  return (
    <div>
      <Filter list={characterList} setList={setList} reset={reset} />
      <ul className="rounded-list">
        {list.map((ch) => (
          <Character key={ch.name} char={ch} />
        ))}
      </ul>
      {!list?.length && <div>No Resuilt found!</div>}
    </div>
  );
}
