const base_URL = "http://localhost:3000";

function getQueryParams() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  return urlParams;
}

document.addEventListener("DOMContentLoaded", () => {
  const queryParams = getQueryParams();
  const token = queryParams.get("token");

  const inputToken = document.getElementById("token");
  inputToken.value = token;
});
