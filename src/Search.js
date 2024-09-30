import {useRef } from "react"
import { useKey } from "./usekey";

function Search({query,setQuery}){
  const inputElement=useRef(null)

  useKey("Enter",function(){
    if(document.activeElement === inputElement.current)
      return;

    inputElement.current.focus()
    setQuery("")
  })

  // useEffect(function(){
  //   function callback(e){
  //     if(e.code==="Enter"){
  //       if(document.activeElement===inputElement.current)
  //         return;

  //       inputElement.current.focus()
  //       setQuery("")
  //     }
  //   }
  //   document.addEventListener("keydown",callback)
  //   return ()=>document.addEventListener("keydown",callback)
  // },[setQuery])

    return(
        <input
          className="search-card"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputElement}
        />
    )
}
export default Search