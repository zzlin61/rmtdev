// ROUTER

import {
  BASE_API_URL,
  state,
  getData,
  jobDetailsContentEl,
} from "../common.js";
import renderError from "./Error.js";
import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

const loadHashChangeHandler = async () => {
  // get id from URL
  const id = window.location.hash.substring(1);
  if (id) {
    // remove the active class from previous active items
    document
      .querySelectorAll(".job-item--active")
      .forEach((jobItemWithActiveClass) =>
        jobItemWithActiveClass.classList.remove("job-item--active")
      );

    // remove previous job details content
    jobDetailsContentEl.innerHTML = "";
    // add spinner
    renderSpinner("job-details");

    try {
      // fetch the item data
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      // extract the data
      const { jobItem } = data;

      // update state
      state.activeJobItem = jobItem;

      // render search job list
      renderJobList();

      // remove spinner
      renderSpinner("job-details");

      // render job details
      renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner("job-details");
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashChangeHandler);

window.addEventListener("hashchange", loadHashChangeHandler);
