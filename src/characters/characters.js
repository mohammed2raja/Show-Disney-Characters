import { useState, useEffect } from "react";
import Character from "./character";
import "./characters.css";

export default function Characters() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://api.disneyapi.dev/characters")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setList(data.data);
      });
  }, []);

  return (
    <div>
      {list.map((ch) => (
        <Character key={ch._id} char={ch} />
      ))}
    </div>
  );
}
