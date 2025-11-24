<?php 
  // Start a PHP session, which will be needed for login logic later.
  session_start(); 
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- The page title is now dynamic. We can set it on each page. -->
    <title><?php echo $pageTitle ?? 'PrismNest'; ?></title>

    <!-- Bootstrap & Icons CDN -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
    />

    <?php 
    // This will load any page-specific stylesheets (like cropper.css for the profile page)
    if (isset($pageStylesheets) && is_array($pageStylesheets)) {
        foreach ($pageStylesheets as $stylesheet) {
            echo "<link rel=\"stylesheet\" href=\"$stylesheet\">\n";
        }
    }
    ?>

    <!-- !! IMPORTANT: Path updated to new /assets/css/ folder !! -->
    <link rel="stylesheet" href="assets/css/style.css" />
  </head>
  <body>

    <?php 
    // NEW: Check if this is an 'auth' page (like login/signup).
    // If it's NOT, we show the main navbar and search overlay.
    if (!isset($pageType) || $pageType !== 'auth'): 
    ?>
    
    <!-- This navbar is now common for all pages -->
    <nav class="navbar navbar-expand-lg frosted-navbar fixed-top">
      <div class="container px-3">
        <div class="navbar-left">
          <!-- !! IMPORTANT: Link updated to .php !! -->
          <a class="navbar-brand fw-bold" href="index.php">PrismNest</a>
        </div>
        <div class="navbar-center d-none d-lg-block">
          <!-- !! IMPORTANT: Link updated to .php !! -->
          <form class="search-center" action="search-results.php" method="GET">
            <div class="search-bar-wrapper">
              <i class="bi bi-search search-icon"></i>
              <input
                class="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="query"
              />
            </div>
          </form>
        </div>
        <div class="navbar-right">
          <div class="d-flex align-items-center">
            <a
              href="#"
              id="mobileSearchIcon"
              class="btn nav-icon-btn rounded-circle d-lg-none"
            >
              <i class="bi bi-search fs-5"></i>
            </a>
            <a
              href="#"
              class="btn nav-icon-btn rounded-circle"
              data-bs-toggle="modal"
              data-bs-target="#createPostModal"
            >
              <i class="bi bi-plus-lg fs-5"></i>
            </a>
            <div class="dropdown">
              <a
                href="#"
                class="btn nav-icon-btn rounded-circle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-bell fs-5"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end notification-dropdown">
                <li
                  class="p-2 d-flex justify-content-between align-items-center"
                  id="notificationHeader"
                >
                  <h6 class="mb-0">Notifications</h6>
                  <!-- !! IMPORTANT: Link updated to .php !! -->
                  <a
                    href="notifications.php"
                    class="small text-decoration-none"
                    >View All</a
                  >
                </li>
                <li>
                  <div class="notification-list">
                    <div
                      class="notification-empty text-center text-muted p-3 d-none"
                    >
                      No new notifications
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- !! IMPORTANT: Link updated to .php !! -->
            <a href="profile.php">
              <img
                src="assets/images/temp-profile.jpg"
                alt="Your profile picture"
                class="rounded-circle main-profile-pic"
                width="40"
                height="40"
              />
            </a>
            <div class="dropdown">
              <a
                href="#"
                class="btn nav-icon-btn rounded-circle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-caret-down-fill"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><h6 class="dropdown-header">Logged in as</h6></li>
                <li>
                  <a class="dropdown-item" href="#">PrismNest Account</a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Add Account</a></li>
                <li class="appearance-dropdown-item">
                  <a
                    class="dropdown-item"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#appearanceSettings"
                    >Appearance</a
                  >
                </li>
                <li>
                  <!-- !! IMPORTANT: Link updated to .php !! -->
                  <a class="dropdown-item" href="settings.php">Settings</a>
                </li>
                <li>
                  <a class="dropdown-item text-danger" href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- The mobile search overlay will also be on every page -->
    <div class="search-overlay" id="searchOverlay">
      <div class="search-overlay-content">
        <!-- !! IMPORTANT: Link updated to .php !! -->
        <form class="d-flex w-100" action="search-results.php" method="GET">
          <input
            class="form-control form-control-lg"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            name="query"
          />
        </form>
      </div>
      <button class="btn btn-close-overlay" id="closeSearchOverlay">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <?php 
    // NEW: This ends the 'if' condition.
    endif; 
    ?>
    
    <!-- The <main> tag is removed from here; it will be in each individual page -->