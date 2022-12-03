import "./App.css";
import { AiOutlineStar, AiOutlineFork, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const baseUrl = "http://localhost:8080/api/repository/";
function Items({ data, onChange }) {
  function handleClick(item) {
    onChange(item);
  }
  return (
    <div className="col-span-3 flex flex-col border-t pt-3">
      {data.length !== 0 ? (
        data.map((repo) => {
          return (
            <div
              className="repos grid grid-cols-4 gap-5 py-3 border-b-2 "
              onClick={()=>handleClick(repo.full_name)}
            >
              <span className="col-span-2 flex flex-col">
                <span className="text-xl">
                  {repo.owner.login}/<b>{repo.name}</b>
                </span>
                <p className="font-light truncate">{repo.description}</p>
              </span>
              <IconContext.Provider
                value={{ style: { verticalAlign: "middle" }, size: "1.5em" }}
              >
                <span className="flex flex-row place-self-center gap-5 text-gray-500">
                  <span className="flex flex-row">
                    <AiOutlineStar /> {repo.stargazers_count}
                  </span>
                  <span className="flex flex-row">
                    {" "}
                    <AiOutlineFork /> {repo.forks_count}
                  </span>
                  <span className="flex flex-row">
                    {" "}
                    <AiOutlineEye />
                    {repo.watchers}
                  </span>
                </span>
              </IconContext.Provider>
              <span className="place-self-center text-gray-500">
                {new Date(repo.updated_at).toDateString()}
              </span>
            </div>
          );
        })
      ) : (
        <h1 className="place-self-center text-center mt-10">
          Repos Not Found !!! Please Try Searching Again
        </h1>
      )}
    </div>
  );
}
function Item({data}) {
  return (
    <div className="col-span-3 flex flex-col border-t pt-3">
      {data.full_name}
    </div>
  );
}
function App({ itemsPerPage }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    total_count: 0,
    items: [],
  });

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [items, setitems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [isSearch, setIsSearch] = useState(true);
  function handleChange(e) {
    setSearch(e.target.value);
  }
  const [repoData, setRepoData] = useState({});
  const [repo, setRepo] = useState("");
  function handleSearch() {
    axios.get(baseUrl + search).then((response) => {
      console.log(response.data);
      setData((prevItem) => ({
        ...prevItem,
        total_count: response.data.total_count,
        items: response.data.items,
      }));
    });
    setIsSearch(true);
  }
  function handleIsSearch(data) {
    setIsSearch(false);
    setRepo(data);
  }
  useEffect(()=>{
    axios.get(baseUrl + repo).then((response) => {
      console.log(response.data);
      setRepoData(response.data);
    });
  },[repo])
  useEffect(() => {
    if (typeof data.items != "undefined") setitems(data.items);
  }, [data]);
  let endOffset = itemOffset + itemsPerPage;
  useEffect(() => {
    // Fetch items from another resources.
    endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  console.log(isSearch)
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
        <button
          className="bg-blue-500 text-white rounded-r-lg flex flex-row justify-center py-2 text-2xl"
          onClick={handleSearch}
        >
          Search
        </button>

        {isSearch ? (
          <>
            {" "}
            <h5 className="col-span-2 text-base mt-2 font-light ">
              Showing {itemOffset}-{endOffset} of {data.total_count} Repos
            </h5>
            <Items data={currentItems} onChange={handleIsSearch} />
            <div className="col-span-3 justify-self-center mt-3 text-lg">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< prev"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </>
        ) : (
          <Item data={repoData}></Item>
        )}
      </div>
    </div>
  );
}

export default App;
