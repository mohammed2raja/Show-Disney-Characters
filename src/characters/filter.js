import { useCallback, useState } from "react"
import './characters.css'

export default function Filter({ list, setList, reset }) {
  const [str, setStr] = useState('')
  const search = () => {
    if (!str) return
    setList(list.filter(l => l.name?.toLocaleLowerCase().includes(str.toLocaleLowerCase())))
  }

  return (
    <div className="filter">
      <input type="text" value={str} onChange={e => setStr(e?.target?.value)} />
      <button onClick={search}>Search</button>
      <button onClick={() => { setStr(''); reset() }}>Reset</button>
    </div>
  )

}