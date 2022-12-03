import "./App.css";
import { AiOutlineSearch } from "react-icons/ai";

function App() {
  return (
    <div className="grid grid-cols-7 p-7">
      <div></div>
      <div></div>
      <div className="col-span-3 grid grid-cols-3">
        <input
          type="text"
          className="text-2xl h-12 justify-self-center col-span-2 w-full rounded-l-lg border-2"
        />
        <button className="bg-blue-500 text-white rounded-r-lg flex flex-row justify-center py-2 text-2xl">
          Search
          <AiOutlineSearch />
        </button>
        <h1 className="col-span-2 text-3xl mt-5">32 Repos Found</h1>
        <button
          classNAme="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
          data-dropdown-toggle="dropdown"
        >
          Dropdown button{" "}
          <svg
            classNAme="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          classNAme="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4"
          id="dropdown"
        >
          <div classNAme="px-4 py-3">
            <span classNAme="block text-sm">Bonnie Green</span>
            <span classNAme="block text-sm font-medium text-gray-900 truncate">
              name@flowbite.com
            </span>
          </div>
          <ul classNAme="py-1" aria-labelledby="dropdown">
            <li>
              <a
                href="#"
                classNAme="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                classNAme="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                classNAme="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                classNAme="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
