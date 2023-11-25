const list = document.querySelector(".names-list");
const loadMoreButton = document.querySelector(".js-load-more");
let page = 1;

serviceHeroes()
  .then((data) => {
    list.innerHTML = createMarkup(data.docs);
    if (data.page < data.pages) {
      loadMoreButton.classList.remove("hidden");
    }
  })
  .catch((err) => console.log(err));
const options = {
  headers: {
    Authorization: "Bearer lA2QqwwxGAmJj3Ag4-Oa",
  },
};

loadMoreButton.addEventListener("click", loadMoreHandler);

function loadMoreHandler() {
  page += 1;
  serviceHeroes(page).then((data) => {
    list.insertAdjacentHTML("beforeend", createMarkup(data.docs));
    if (data.page >= data.pages) {
      loadMoreButton.classList.add("hidden");
    }
  });
}

function serviceHeroes(page = 1) {
  const options = {
    headers: {
      Authorization: "Bearer lA2QqwwxGAmJj3Ag4-Oa",
    },
  };
  return fetch(
    `https://the-one-api.dev/v2/character?sort=name:asc&limit=20&page=${page}`,
    options
  ).then((resp) => {
    if (!resp.ok) {
      throw new Error();
    }
    return resp.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      (elem) =>
        `<li class = "hero-item"><h1>${elem.name}</h1><h2>${elem.race}</h2></li>`
    )
    .join("");
}
