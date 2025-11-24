document.addEventListener("DOMContentLoaded", function () {
  // --- Element Selection ---
  const searchQueryTitle = document.getElementById("searchQueryTitle");
  const searchQuerySubtitle = document.getElementById("searchQuerySubtitle");
  const allResultsContainer = document.getElementById("allResultsContainer");
  const peopleResultsContainer = document.getElementById(
    "peopleResultsContainer"
  );
  const postResultsContainer = document.getElementById("postResultsContainer");
  const noResultsMessage = document.getElementById("noResultsMessage");
  const searchTabsContainer = document.querySelector(".profile-tabs-wrapper");

  // --- 1. Tab Switching Logic ---
  if (searchTabsContainer) {
    searchTabsContainer.addEventListener("click", function (e) {
      const clickedTab = e.target.closest(".feed-tab");
      if (!clickedTab || clickedTab.classList.contains("active")) return;

      // Update Visuals
      searchTabsContainer
        .querySelectorAll(".feed-tab")
        .forEach((t) => t.classList.remove("active"));
      clickedTab.classList.add("active");

      // Hide all panes
      document
        .querySelectorAll(".tab-pane")
        .forEach((pane) => pane.classList.remove("active"));

      // Show target pane
      const targetId = clickedTab.dataset.target;
      const targetPane = document.querySelector(targetId);
      if (targetPane) targetPane.classList.add("active");
    });
  }

  // --- 2. The Search Logic ---
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query")
    ? urlParams.get("query").toLowerCase().trim()
    : "";

  if (searchQueryTitle) {
    if (query) {
      searchQueryTitle.textContent = `Search Results for "${query}"`;
      performSearch(query);
    } else {
      searchQueryTitle.textContent = "Explore";
      if (searchQuerySubtitle)
        searchQuerySubtitle.textContent = "Showing all content";
      performSearch("");
    }
  }

  function performSearch(searchTerm) {
    // *** CRITICAL FIX: Get Fresh Data directly from LocalStorage ***
    const dbUsers = JSON.parse(localStorage.getItem("prismnest_users")) || {};
    const dbPosts = JSON.parse(localStorage.getItem("prismnest_posts")) || [];

    // 1. Filter Users (Search by Name or Username)
    const usersArray = Object.values(dbUsers);
    const matchingUsers = usersArray.filter(
      (user) =>
        (user.name && user.name.toLowerCase().includes(searchTerm)) ||
        (user.username && user.username.toLowerCase().includes(searchTerm))
    );

    // 2. Filter Posts (Search by Caption or Username)
    const matchingPosts = dbPosts.filter(
      (post) =>
        (post.caption && post.caption.toLowerCase().includes(searchTerm)) ||
        (post.username && post.username.toLowerCase().includes(searchTerm))
    );

    // 3. Update UI
    renderResults(matchingUsers, matchingPosts);
  }

  function renderResults(users, posts) {
    // Clear previous results
    if (allResultsContainer) allResultsContainer.innerHTML = "";
    if (peopleResultsContainer) peopleResultsContainer.innerHTML = "";
    if (postResultsContainer) postResultsContainer.innerHTML = "";

    const hasResults = users.length > 0 || posts.length > 0;

    if (!hasResults) {
      if (noResultsMessage) noResultsMessage.classList.remove("d-none");
      if (searchQuerySubtitle)
        searchQuerySubtitle.textContent = "No matches found.";
      return;
    }

    if (noResultsMessage) noResultsMessage.classList.add("d-none");
    if (searchQuerySubtitle)
      searchQuerySubtitle.textContent = `Found ${users.length} people and ${posts.length} posts.`;

    // Inject Users
    users.forEach((user) => {
      const userHTML = `
        <div class="search-result-item">
          <img src="${user.pic}" alt="${user.name}" style="object-fit:cover;">
          <div class="search-result-item-info">
            <a href="profile.php?user=${user.id}" class="text-decoration-none text-dark fw-bold">${user.name}</a>
            <p class="text-muted small">${user.username}</p>
          </div>
          <a href="profile.php?user=${user.id}" class="btn btn-sm btn-outline-primary ms-auto">View</a>
        </div>`;

      if (allResultsContainer)
        allResultsContainer.insertAdjacentHTML("beforeend", userHTML);
      if (peopleResultsContainer)
        peopleResultsContainer.insertAdjacentHTML("beforeend", userHTML);
    });

    // Inject Posts
    posts.forEach((post) => {
      const postHTML = `
        <div class="search-result-item">
          <img src="${post.postImage}" alt="Post" class="post-thumbnail" style="object-fit:cover;"/>
          <div class="search-result-item-info">
            <p class="mb-0 text-truncate" style="max-width: 200px;">${post.caption}</p>
            <small class="text-muted">by ${post.username}</small>
          </div>
          <a href="index.php" class="btn btn-sm btn-outline-secondary ms-auto">View in Feed</a>
        </div>`;

      if (allResultsContainer)
        allResultsContainer.insertAdjacentHTML("beforeend", postHTML);
      if (postResultsContainer)
        postResultsContainer.insertAdjacentHTML("beforeend", postHTML);
    });
  }
});
