import React, { useEffect, useState } from "react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../utils/searchSlice";
import { YOUTUBE_SUGGESTION_API } from "../utils/constants";
import pandaImage from "./panda_image.jpg";

const Head = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const searchCache = useSelector((store) => store.Search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache && searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchCache, suggestions]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SUGGESTION_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    if (searchQuery.length > 0) {
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestion(false);
  };

  console.log(searchQuery);
  

  return (
    <div className="flex flex-col mt-5 justify-center items-center ">
      <div className="w-[20rem]">
        <div>
          <input
            className="border border-red-500 outline-none p-2 w-[80%] rounded-l-full"
            type="text"
            placeholder="Type to Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onScroll={() => setShowSuggestion(false)}
            onBlur={() => setShowSuggestion(false)}
            onScrollCapture={() => setShowSuggestion(false)}
          />
          <button className="w-[20%]  border border-gray-400 rounded-r-full px-5 py-2 bg-gray-100">
            🔍
          </button>
        </div>
        {showSuggestion ? (
          <div className=" bg-white py-2 px-5 w-full shadow-lg rounded-lg border-gray-100 ">
            <ul>
              {suggestions.map((s) => (
                <li
                  key={s}
                  onClick={()=> handleSuggestionClick(s)}
                  className="py-2 shadow-sm hover:bg-gray-100"
                >
                  🔍{s}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <img
            className="mt-5 w-[20rem] h-[10rem] rounded-md object-cover"
            src={pandaImage}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default Head;
