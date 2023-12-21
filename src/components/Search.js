// -- SEARCH COMPONENT --

import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  getData,
  state,
} from "../common.js";

import renderError from "./Error.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";
import renderSpinner from "./Spinner.js";

const submitHandler = async (event) => {
  // prevent default behavior
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validation (regular expression example)
  const forbiddenPattern = /[0-9]/;
  const patterMatch = forbiddenPattern.test(searchText);
  if (patterMatch) {
    renderError("Your search may not contain numbers");
    return;
  }

  // blur input
  searchInputEl.blur();

  // remove previous job items
  jobListSearchEl.innerHTML = "";

  // reset sorting buttons
  sortingBtnRecentEl.classList.remove("sorting__button--active");
  sortingBtnRelevantEl.classList.add("sorting__button--active");

  // render spinner
  renderSpinner("search");

  // fetch search results
  try {
    // get data
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    // extract job items
    const { jobItems } = data;

    // update state
    state.searchJobItems = jobItems;
    state.currentPage = 1;

    // remove spinner
    renderSpinner("search");

    // render number of result
    numberEl.textContent = jobItems.length;

    // reset pagination buttons;
    renderPaginationButtons();

    // render job items in search job list
    renderJobList();
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
