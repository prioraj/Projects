<?php 
  // Set the title variable for this specific page
  $pageTitle = 'PrismNest - Feed'; 
  
  // This page has no extra CSS or JS, so we don't need $pageStylesheets or $pageScripts
  
  // Include the common header
  include 'includes/header.php'; 
?>

<!-- This is the unique content for the index page -->
<main class="container py-4">
  <div class="row justify-content-center">
    <div class="col-12" style="max-width: 600px">
      <!-- Feed Tabs Wrapper -->
      <div class="feed-tabs-wrapper mb-3" id="feedTabsContainer">
        <div class="feed-tabs d-flex justify-content-center">
          <button class="feed-tab active" data-target="#exploreFeed">
            Explore
          </button>
          <button class="feed-tab" data-target="#followingFeed">
            Following
          </button>
        </div>
      </div>

      <!-- Feed Tab Content -->
      <div class="feed-tab-content">
        <!-- Explore Feed -->
        <div
          class="tab-pane active"
          id="exploreFeed"
          style="max-width: 600px; width: 100%; margin: auto"
        >
          <!-- Post 1 -->
          <div class="col-12 mb-4 d-flex justify-content-center">
            <div
              class="card"
              data-post-id="post1"
              data-user-id="ArtistOne"
              style="width: 100%"
            >
              <div class="d-flex align-items-center p-2">
                <!-- Link updated to .php -->
                <a href="profile.php?user=ArtistOne">
                  <img
                    src="assets/images/temp-profile.jpg"
                    alt="Profile picture of ArtistOne"
                    class="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                </a>
                <div class="me-auto">
                  <!-- Link updated to .php -->
                  <a
                    href="profile.php?user=ArtistOne"
                    class="text-decoration-none text-dark"
                  >
                    <h6 class="mb-0">ArtistOne</h6>
                  </a>
                  <small class="text-muted">2 hours ago</small>
                </div>
                <button class="btn btn-sm btn-outline-primary follow-btn">
                  Follow
                </button>
                <div class="dropdown ms-2">
                  <a
                    href="#"
                    class="post-options"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-three-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#">Not Interested</a>
                    </li>
                    <li>
                      <a class="dropdown-item text-danger" href="#">Report</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="caption-overlay px-2 pb-2">
                <p class="mb-0">
                  A beautiful sunset artwork created digitally.
                </p>
              </div>
              <img
                src="assets/images/sunset.jpg"
                class="card-img-top"
                alt="Sunset artwork"
              />
              <div
                class="card-body d-flex align-items-center justify-content-between p-2"
              >
                <div class="card-body-actions">
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-heart fs-4"></i>
                  </button>
                  <button
                    type="button"
                    class="action-btn btn"
                    data-bs-toggle="modal"
                    data-bs-target="#commentsModal"
                  >
                    <i class="bi bi-chat-dots fs-4"></i>
                  </button>
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-send fs-4"></i>
                  </button>
                </div>
                <div class="card-body-save">
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-bookmark fs-4"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Post 2 -->
          <div class="col-12 mb-4 d-flex justify-content-center">
            <div
              class="card"
              data-post-id="post2"
              data-user-id="MountainFan"
              style="width: 100%"
            >
              <div class="d-flex align-items-center p-2">
                <!-- Link updated to .php -->
                <a href="profile.php?user=MountainFan">
                  <img
                    src="assets/images/temp-profile.jpg"
                    alt="Profile picture of MountainFan"
                    class="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                </a>
                <div class="me-auto">
                  <!-- Link updated to .php -->
                  <a
                    href="profile.php?user=MountainFan"
                    class="text-decoration-none text-dark"
                  >
                    <h6 class="mb-0">MountainFan</h6>
                  </a>
                  <small class="text-muted">5 hours ago</small>
                </div>
                <button class="btn btn-sm btn-outline-primary follow-btn">
                  Follow
                </button>
                <div class="dropdown ms-2">
                  <a
                    href="#"
                    class="post-options"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-three-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#">Not Interested</a>
                    </li>
                    <li>
                      <a class="dropdown-item text-danger" href="#">Report</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="caption-overlay px-2 pb-2">
                <p class="mb-0">Sketch of a mountain landscape in pencil.</p>
              </div>
              <img
                src="assets/images/mountain.jpg"
                class="card-img-top"
                alt="Mountain sketch"
              />
              <div
                class="card-body d-flex align-items-center justify-content-between p-2"
              >
                <div class="card-body-actions">
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-heart fs-4"></i>
                  </button>
                  <button
                    type="button"
                    class="action-btn btn"
                    data-bs-toggle="modal"
                    data-bs-target="#commentsModal"
                  >
                    <i class="bi bi-chat-dots fs-4"></i>
                  </button>
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-send fs-4"></i>
                  </button>
                </div>
                <div class="card-body-save">
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-bookmark fs-4"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Post 3 -->
          <div class="col-12 mb-4 d-flex justify-content-center">
            <div
              class="card"
              data-post-id="post3"
              data-user-id="DigitalPro"
              style="width: 100%"
            >
              <div class="d-flex align-items-center p-2">
                <!-- Link updated to .php -->
                <a href="profile.php?user=DigitalPro">
                  <img
                    src="assets/images/temp-profile.jpg"
                    alt="Profile picture of DigitalPro"
                    class="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                </a>
                <div class="me-auto">
                  <!-- Link updated to .php -->
                  <a
                    href="profile.php?user=DigitalPro"
                    class="text-decoration-none text-dark"
                  >
                    <h6 class="mb-0">DigitalPro</h6>
                  </a>
                  <small class="text-muted">1 day ago</small>
                </div>
                <button class="btn btn-sm btn-outline-primary follow-btn">
                  Follow
                </button>
                <div class="dropdown ms-2">
                  <a
                    href="#"
                    class="post-options"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-three-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#">Not Interested</a>
                    </li>
                    <li>
                      <a class="dropdown-item text-danger" href="#">Report</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="caption-overlay px-2 pb-2">
                <p class="mb-0">
                  Character illustration done in Procreate.
                </p>
              </div>
              <img
                src="assets/images/digital.jpg"
                class="card-img-top"
                alt="Character illustration"
              />
              <div
                class="card-body d-flex align-items-center justify-content-between p-2"
              >
                <div class="card-body-actions">
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-heart fs-4"></i>
                  </button>
                  <button
                    type="button"
                    class="action-btn btn"
                    data-bs-toggle="modal"
                    data-bs-target="#commentsModal"
                  >
                    <i class="bi bi-chat-dots fs-4"></i>
                  </button>
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-send fs-4"></i>
                  </button>
                </div>
                <div class="card-body-save">
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-bookmark fs-4"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Post 4 -->
          <div class="col-12 mb-4 d-flex justify-content-center">
            <div
              class="card"
              data-post-id="post4"
              data-user-id="AbstractQueen"
              style="width: 100%"
            >
              <div class="d-flex align-items-center p-2">
                <!-- Link updated to .php -->
                <a href="profile.php?user=AbstractQueen">
                  <img
                    src="assets/images/temp-profile.jpg"
                    alt="Profile picture of AbstractQueen"
                    class="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                </a>
                <div class="me-auto">
                  <!-- Link updated to .php -->
                  <a
                    href="profile.php?user=AbstractQueen"
                    class="text-decoration-none text-dark"
                  >
                    <h6 class="mb-0">AbstractQueen</h6>
                  </a>
                  <small class="text-muted">3 days ago</small>
                </div>
                <button class="btn btn-sm btn-outline-primary follow-btn">
                  Follow
                </button>
                <div class="dropdown ms-2">
                  <a
                    href="#"
                    class="post-options"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-three-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#">Not Interested</a>
                    </li>
                    <li>
                      <a class="dropdown-item text-danger" href="#">Report</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="caption-overlay px-2 pb-2">
                <p class="mb-0">
                  A colorful abstract piece full of shapes and patterns.
                </p>
              </div>
              <img
                src="assets/images/abstract.jpg"
                class="card-img-top"
                alt="Abstract art"
              />
              <div
                class="card-body d-flex align-items-center justify-content-between p-2"
              >
                <div class="card-body-actions">
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-heart fs-4"></i>
                  </button>
                  <button
                    type="button"
                    class="action-btn btn"
                    data-bs-toggle="modal"
                    data-bs-target="#commentsModal"
                  >
                    <i class="bi bi-chat-dots fs-4"></i>
                  </button>
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-send fs-4"></i>
                  </button>
                </div>
                <div class="card-body-save">
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-bookmark fs-4"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Post 5 -->
          <div class="col-12 mb-4 d-flex justify-content-center">
            <div
              class="card"
              data-post-id="post5"
              data-user-id="UrbanSketcher"
              style="width: 100%"
            >
              <div class="d-flex align-items-center p-2">
                <!-- Link updated to .php -->
                <a href="profile.php?user=UrbanSketcher">
                  <img
                    src="assets/images/temp-profile.jpg"
                    alt="Profile picture of UrbanSketcher"
                    class="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                </a>
                <div class="me-auto">
                  <!-- Link updated to .php -->
                  <a
                    href="profile.php?user=UrbanSketcher"
                    class="text-decoration-none text-dark"
                  >
                    <h6 class="mb-0">UrbanSketcher</h6>
                  </a>
                  <small class="text-muted">6 hours ago</small>
                </div>
                <button class="btn btn-sm btn-outline-primary follow-btn">
                  Follow
                </button>
                <div class="dropdown ms-2">
                  <a
                    href="#"
                    class="post-options"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-three-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#">Not Interested</a>
                    </li>
                    <li>
                      <a class="dropdown-item text-danger" href="#">Report</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="caption-overlay px-2 pb-2">
                <p class="mb-0">Quick urban sketch capturing city life.</p>
              </div>
              <img
                src="assets/images/urban.jpg"
                class="card-img-top"
                alt="Urban sketch"
              />
              <div
                class="card-body d-flex align-items-center justify-content-between p-2"
              >
                <div class="card-body-actions">
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-heart fs-4"></i>
                  </button>
                  <button
                    type="button"
                    class="action-btn btn"
                    data-bs-toggle="modal"
                    data-bs-target="#commentsModal"
                  >
                    <i class="bi bi-chat-dots fs-4"></i>
                  </button>
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-send fs-4"></i>
                  </button>
                </div>
                <div class="card-body-save">
                  <button type="button" class="action-btn btn">
                    <i class="bi bi-bookmark fs-4"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Following Feed -->
        <div
          class="tab-pane"
          id="followingFeed"
          style="max-width: 600px; width: 100%; margin: auto"
        >
          <div class="empty-state-card card p-5 text-center">
            <i class="bi bi-person-x fs-1"></i>
            <h5 class="mt-3">Nothing to see here... yet</h5>
            <p class="text-muted">
              Posts from accounts you follow will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<?php 
  // This page doesn't need any extra scripts, so we just include the footer.
  // The main script.js and data.js are already in the footer.
  include 'includes/footer.php'; 
?>