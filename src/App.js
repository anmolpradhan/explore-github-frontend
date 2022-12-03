import "./App.css";
import { AiOutlineStar, AiOutlineFork, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
import axios from "axios";

const baseUrl="http://localhost:8080/repository/"
function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState()
  function handleChange(e){
    setSearch(e.target.value);
  }
  function handleSearch(){
    console.log(search)
    axios.get(baseUrl+search).then((response)=>{
      console.log(response)
    })
  }
  return (
    <div className="grid grid-cols-7 p-7">
      <div></div>
      <div></div>
      <div className="col-span-3 grid grid-cols-3">
        <input
          type="text"
          className="text-2xl h-12 justify-self-center col-span-2 w-full rounded-l-lg border-2"
          value={search}
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white rounded-r-lg flex flex-row justify-center py-2 text-2xl" onClick={handleSearch}>
          Search
        </button>
        <h1 className="col-span-2 text-3xl my-5">32 Repos Found</h1>
        <div className="col-span-3 flex flex-col">

          <div className="repos grid grid-cols-4 gap-5">
            <span className="col-span-2 flex flex-col">
              <span className="text-xl">
                Owner/<b>Repos</b>
              </span>
              <span className="font-light">Shorty Description</span>
            </span>
            <IconContext.Provider
              value={{ style: { verticalAlign: "middle" }, size: "1.5em" }}
            >
              <span className="flex flex-row place-self-center gap-5 text-gray-500">
                <span className="flex flex-row">
                  <AiOutlineStar /> 1
                </span>
                <span className="flex flex-row">
                  {" "}
                  <AiOutlineFork /> 2{" "}
                </span>
                <span className="flex flex-row">
                  {" "}
                  <AiOutlineEye />3
                </span>
              </span>
            </IconContext.Provider>
            <span className="place-self-center text-gray-500">
              Updated 2yrs ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
