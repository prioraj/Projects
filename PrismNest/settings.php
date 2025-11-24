<?php 
  // Set variables for this specific page
  $pageTitle = 'Settings - PrismNest'; 
  
  // This page needs the settings.js script
  $pageScripts = [
    'assets/js/settings.js' // Use the new path
  ];

  // Include the common header
  include 'includes/header.php'; 
?>

<!-- This is the unique content for the settings page -->
<main class="container py-4">
  <div class="row">
    <div class="col-lg-3">
      <div class="card p-3">
        <div
          class="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            class="nav-link active text-start"
            id="v-pills-account-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-account"
            type="button"
            role="tab"
          >
            <i class="bi bi-person-circle me-2"></i>Account
          </button>
          <button
            class="nav-link text-start"
            id="v-pills-privacy-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-privacy"
            type="button"
            role="tab"
          >
            <i class="bi bi-shield-lock me-2"></i>Privacy & Security
          </button>
          <button
            class="nav-link text-start"
            id="v-pills-notifications-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-notifications"
            type="button"
            role="tab"
          >
            <i class="bi bi-bell me-2"></i>Notifications
          </button>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card p-4">
        <div class="tab-content" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="v-pills-account"
            role="tabpanel"
          >
            <h3 class="mb-4">Account Management</h3>
            <form>
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  value="your-email@example.com"
                />
              </div>
              <hr />
              <h5 class="my-4">Change Password</h5>
              <div class="mb-3">
                <label for="currentPassword" class="form-label"
                  >Current Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="currentPassword"
                />
              </div>
              <div class="mb-3">
                <label for="newPassword" class="form-label"
                  >New Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>

          <div class="tab-pane fade" id="v-pills-privacy" role="tabpanel">
            <h3 class="mb-4">Privacy & Security</h3>
            <div class="form-check form-switch mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="privateAccountSwitch"
              />
              <label class="form-check-label" for="privateAccountSwitch"
                >Private Account</label
              >
              <div class="form-text">
                When your account is private, only people you approve can
                see your posts.
              </div>
            </div>
            <hr />
            <a href="#" class="btn btn-outline-secondary mt-3"
              >Manage Blocked Accounts</a
            >
          </div>

          <div
            class="tab-pane fade"
            id="v-pills-notifications"
            role="tabpanel"
          >
            <h3 class="mb-4">Notifications</h3>
            <p>Select the notifications you want to receive.</p>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="newFollowerCheck"
                checked
              />
              <label class="form-check-label" for="newFollowerCheck"
                >New Followers</label
              >
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="postLikesCheck"
                checked
              />
              <label class="form-check-label" for="postLikesCheck"
                >Likes on your posts</label
              >
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="postCommentsCheck"
              />
              <label class="form-check-label" for="postCommentsCheck"
                >Comments on your posts</label
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<?php 
  // Finally, include the footer
  include 'includes/footer.php'; 
?>