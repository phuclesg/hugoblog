async function initSearch() {
  const response = await fetch("/index.json");
  const data = await response.json();

  const idx = lunr(function () {
    this.ref("permalink");
    this.field("title");
    this.field("contents");

    data.forEach(doc => this.add(doc));
  });

  const input = document.querySelector("#search-query");
  const results = document.querySelector("#search-results");

  input.addEventListener("input", () => {
    const query = input.value.trim();
    results.innerHTML = "";
    if (!query) return;

    const matches = idx.search(query);
    matches.slice(0, 8).forEach(match => {
      const item = data.find(d => d.permalink === match.ref);
      if (item) {
        results.innerHTML += `<li><a href="${item.permalink}">${item.title}${item.summary}</a></li>`;
      }
    });
  });
}

initSearch();
