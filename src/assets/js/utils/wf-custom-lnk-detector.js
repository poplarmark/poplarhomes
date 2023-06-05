const for_homeowners_underline = document.getElementsByClassName("navbar-main_link-underline")[0];
const for_homeowners_text = document.querySelector(".navbar-main_link:first-child div:first-child");
const for_residents_underline = document.getElementsByClassName("navbar-main_link-underline")[1];
const for_residents_text = document.querySelector(".navbar-main_link:nth-child(2) div:first-child");
const for_rentestimate_underline = document.getElementsByClassName("navbar-main_link-underline")[3];
const for_rentestimate_text = document.querySelector(".navbar-main_link:nth-child(4) div:first-child");
const for_aboutpoplar_underline = document.getElementsByClassName("navbar-main_link-underline")[4];
const for_aboutpoplar_text = document.querySelector(".navbar-main_link:nth-child(4) div:first-child");

if (document.URL === "https://poplarhomes.com/homeowners/") {
  for_homeowners_underline.style.opacity = 1;
  for_homeowners_text.style.color = "#f80";
} else if (document.URL === "https://poplarhomes.com/residents/") {
  for_residents_underline.style.opacity = 1;
  for_residents_text.style.color = "#f80";
} else if (document.URL === "https://poplarhomes.com/rentestimate/") {
  for_rentestimate_underline.style.opacity = 1;
  for_rentestimate_text.style.color = "#f80";
} else if (document.URL === "https://poplarhomes.com/aboutpoplar/") {
  for_aboutpoplar_underline.style.opacity = 1;
  for_aboutpoplar_text.style.color = "#f80";
}
