<?php 
  // Set variables for this specific page
  $pageTitle = 'Search Results - PrismNest'; 
  
  // This page needs the search.js script
  $pageScripts = [
    'assets/js/search.js' // Use the new path
  ];

  // Include the common header
  include 'includes/header.php'; 
?>

<main class="container py-4">
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card p-3 p-md-4">
        <div class="search-header pb-3 mb-3">
          <h1 id="searchQueryTitle">Search Results</h1>
          <p class="text-muted mb-0" id="searchQuerySubtitle">
            Showing results for your search...
          </p>
        </div>

        <div class="profile-tabs-wrapper">
          <div class="feed-tabs d-flex justify-content-start">
            <button class="feed-tab active" data-target="#results-all">
              All
            </button>
            <button class="feed-tab" data-target="#results-people">
              People
            </button>
            <button class="feed-tab" data-target="#results-posts">
              Posts
            </button>
          </div>
        </div>

        <div class="profile-grid-container mt-4">
          <div id="results-all" class="tab-pane active">
            <div id="allResultsContainer">
              </div>
            
            <div
              id="noResultsMessage"
              class="empty-state-card card p-5 text-center d-none"
            >
              <i class="bi bi-search fs-1"></i>
              <h5 class="mt-3">No Results Found</h5>
              <p class="text-muted">
                We couldn't find any results for your search.
              </p>
            </div>
          </div>

          <div id="results-people" class="tab-pane">
            <div id="peopleResultsContainer">
              </div>
          </div>

          <div id="results-posts" class="tab-pane">
            <div id="postResultsContainer">
               </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<?php 
  // Finally, include the footer to load scripts, modals, and the FAB
  include 'includes/footer.php'; 
?>