<?php 
  // Set variables for this specific page
  $pageTitle = 'Profile - PrismNest'; 
  
  // This page needs the cropper.css file
  $pageStylesheets = [
    'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css'
  ];
  
  // This page needs the cropper.js and profile.js files
  $pageScripts = [
    'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js',
    'assets/js/profile.js' 
  ];

  // Now, include the header
  include 'includes/header.php'; 
?>

<main class="container py-4">
  <div class="profile-container mx-auto" style="max-width: 900px">
    <header class="profile-header card p-0">
      <div class="cover-photo">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"
          alt="Cover Photo"
          class="img-fluid main-cover-photo"
        />
      </div>
      <div class="profile-details p-3 p-md-4">
        <div class="d-flex flex-column flex-md-row align-items-center">
          <img
            src="assets/images/temp-profile.jpg"
            alt="Your Profile Picture"
            class="profile-picture main-profile-pic"
          />
          <div class="profile-info text-center text-md-start ms-md-4">
            <h2 class="mb-0 profile-name">Your Name</h2>
            <p class="text-muted profile-username">@yourusername</p>
          </div>
          <div class="profile-actions ms-md-auto mt-3 mt-md-0 d-flex gap-2">
            </div>
        </div>
        <div class="profile-bio mt-3">
          <p id="profileBio">
            Digital artist & illustrator. Welcome to my creative corner
            where colors speak louder than words. Commissions are open!
          </p>
        </div>
        
        <div class="profile-stats d-flex justify-content-center justify-content-md-start gap-4 mt-3">
          <div><strong id="postsCount">0</strong> Posts</div>
          <div id="followersTrigger" style="cursor: pointer;" class="text-decoration-underline-hover">
            <strong id="followersCount">0</strong> Followers
          </div>
          <div id="followingTrigger" style="cursor: pointer;" class="text-decoration-underline-hover">
            <strong id="followingCount">0</strong> Following
          </div>
        </div>

      </div>
    </header>

    <div class="profile-tabs-wrapper mt-4">
      <div class="feed-tabs d-flex justify-content-center">
        <button class="feed-tab active" data-target="#postsGrid">
          Posts
        </button>
        <button class="feed-tab" data-target="#savedGrid">Saved</button>
        <button class="feed-tab" data-target="#taggedGrid">Tagged</button>
      </div>
    </div>

    <div class="profile-grid-container mt-4">
      <div id="postsGrid" class="tab-pane active">
         </div>
      <div id="savedGrid" class="tab-pane">
        </div>
      <div id="taggedGrid" class="tab-pane">
        <div class="empty-state-card card p-5 text-center">
          <i class="bi bi-tag-slash fs-1"></i>
          <h5 class="mt-3">No Tagged Posts</h5>
          <p class="text-muted">
            You haven't been tagged in any posts yet.
          </p>
        </div>
      </div>
    </div>
  </div>
</main>

<div
  class="modal fade"
  id="editProfileModal"
  tabindex="-1"
  aria-labelledby="editProfileModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content frosted-panel">
      <div class="modal-header">
        <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <form id="editProfileForm">
          <div class="mb-3">
            <label class="form-label">Cover Photo</label>
            <div class="edit-cover-photo">
              <img
                src=""
                id="coverPhotoPreview"
                class="img-fluid"
                alt="Cover photo preview"
              />
              <input
                type="file"
                id="coverPhotoUpload"
                class="d-none"
                accept="image/*"
              />
              <label for="coverPhotoUpload" class="edit-photo-overlay">
                <i class="bi bi-camera-fill"></i>
              </label>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Profile Picture</label>
            <div class="edit-profile-photo mx-auto">
              <img
                src=""
                id="profilePhotoPreview"
                alt="Profile photo preview"
              />
              <input
                type="file"
                id="profilePhotoUpload"
                class="d-none"
                accept="image/*"
              />
              <label for="profilePhotoUpload" class="edit-photo-overlay">
                <i class="bi bi-camera-fill"></i>
              </label>
            </div>
          </div>

          <div class="mb-3">
            <label for="editName" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="editName"
              placeholder="Your Name"
            />
          </div>
          <div class="mb-3">
            <label for="editUsername" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="editUsername"
              placeholder="@yourusername"
            />
          </div>
          <div class="mb-3">
            <label for="editBio" class="form-label">About</label>
            <textarea
              class="form-control"
              id="editBio"
              rows="3"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          id="saveProfileChanges"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</div>

<div
  class="modal fade"
  id="imageCropperModal"
  tabindex="-1"
  aria-labelledby="imageCropperModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content frosted-panel">
      <div class="modal-header">
        <h5 class="modal-title" id="imageCropperModalLabel">
          Crop Your Image
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="cropper-container">
          <img id="imageToCrop" src="" alt="Image to crop" />
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-primary" id="cropImageBtn">
          Crop & Apply
        </button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="usersListModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content frosted-panel">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title fw-bold" id="usersListTitle">Users</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body pt-2">
        <div id="usersListContainer" class="d-flex flex-column gap-3">
            </div>
      </div>
    </div>
  </div>
</div>

<?php 
  // Finally, include the footer.
  include 'includes/footer.php'; 
?>