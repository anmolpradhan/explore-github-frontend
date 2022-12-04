import "./App.css";
import {
  AiOutlineStar,
  AiOutlineFork,
  AiOutlineEye,
  AiOutlineBranches,
} from "react-icons/ai";
import { VscIssues } from "react-icons/vsc";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ReactMarkdown from "react-markdown";

const baseUrl = "http://localhost:8080/api/repository/";
function Items({ data, onChange }) {
  function handleClick(item) {
    onChange(item);
  }
  return (
    <div className="col-span-3 flex flex-col border-t pt-3 ">
      {data.length !== 0 ? (
        data.map((repo) => {
          return (
            <div
              className="repos grid grid-cols-4 gap-5 my-3 border-b-2 cursor-pointer  bg-white"
              onClick={() => handleClick(repo.full_name)}
            >
              <span className="col-span-2 flex flex-col">
                <span className="text-lg hover:underline">
                  {repo.owner.login}/<b>{repo.name}</b>
                </span>
                <p className="font-light text-base truncate">
                  {repo.description}
                </p>
              </span>
              <IconContext.Provider
                value={{ style: { verticalAlign: "middle" }, size: "1.5em" }}
              >
                <span className="flex flex-row place-self-center gap-4 text-gray-500">
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
function Item({ data }) {
  const [user, setuser] = useState("");
  const [readme, setreadme] = useState("");
  useEffect(() => {
    const url =
      "http://localhost:8080/api/readme/" +
      data.full_name +
      "/" +
      data.default_branch;
    console.log(url);
    axios
      .get("http://localhost:8080/api/user/" + data.owner.login)
      .then((response) => {
        console.log(response.data.name);
        setuser(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(url, { headers: {} }).then((response) => {
      setreadme(response.data);
    });
  }, [data]);

  return (
    <div className="col-span-3 flex flex-col border-t pt-5 font-medium">
      <a
        href={data.html_url}
        className="text-slate-900 no-underline hover:underline hover:text-black my-2"
      >
        <h3>{data.full_name}</h3>
      </a>
      <span className="grid grid-cols-2">
        <a
          href={data.owner.html_url}
          className="text-slate-900 no-underline hover:underline hover:text-black my-2"
        >
          <span className="align-middle flex flex-row items-center ">
            <img
              src={data.owner.avatar_url}
              alt={user}
              className="rounded-md w-10 pr-3"
            />
            {user}
          </span>
        </a>
        <span className="align-middle flex flex-row items-center justify-self-end">
          <IconContext.Provider
            value={{ style: { verticalAlign: "middle" }, size: "2em" }}
          >
            <AiOutlineBranches /> {data.default_branch}&nbsp;&nbsp;
            <VscIssues />
            &nbsp;
            {data.open_issues_count} Issues
          </IconContext.Provider>
        </span>
      </span>
      <span className="rounded-md border-2 mt-5">
        <h5 className="border-b-2 py-2 px-3 bg-gray-200">README.md</h5>
        <div className="m-3 overflow-hidden">
          <ReactMarkdown children={readme} />
        </div>
      </span>
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
      console.log("Fectching Data");
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
  useEffect(() => {
    axios.get(baseUrl + repo).then((response) => {
      console.log("Fectching Data");
      setRepoData(response.data);
    });
  }, [repo]);
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
  return (
    <div className="grid grid-cols-7 p-7 text-neutral-800">
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
        ) : repoData.owner ? (
          <Item data={repoData} />
        ) : (
          <div>Searching...</div>
        )}
      </div>
    </div>
  );
}

export default App;
