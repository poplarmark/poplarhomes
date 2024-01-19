window.addEventListener("scroll", (e) => {
  const offSetY = document.querySelector("#flyer_jobs_offset").offsetHeight;
  const offsetter = offSetY - 200;
  const flyer_content = document.querySelector(".flyer_content");
  const flyer_link = document.querySelector(".flyer_content-link");
  if (window.pageYOffset > offsetter) {
    flyer_content.classList.add("display-height");
    flyer_link.classList.add("display-fontsize");
  } else {
    flyer_content.classList.remove("display-height");
    flyer_link.classList.remove("display-fontsize");
  }
});