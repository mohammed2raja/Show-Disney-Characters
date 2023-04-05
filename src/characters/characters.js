import { useState, useEffect, useCallback } from "react";
import Character from "./character";
import Filter from "./filter";
import "./characters.css";

export default function Characters() {
  const [list, setList] = useState([]);
  const [characterList, setCharacters] = useState([])

  useEffect(() => {
    fetch("https://api.disneyapi.dev/characters")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCharacters(data.data)
        setList(data.data);
      });
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
