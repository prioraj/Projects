<?php 
  // Set the title variable for this specific page
  $pageTitle = 'Notifications - PrismNest'; 
  
  // This page has no extra CSS or JS
  
  // Include the common header
  include 'includes/header.php'; 
?>

<!-- This is the unique content for the notifications page -->
<main class="container py-4">
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card p-3">
        <h2 class="mb-4 text-center">All Notifications</h2>
        <div class="full-notification-list">
          <div class="notification-page-item">
            <img
              src="assets/images/temp-profile.jpg"
              alt="User"
              class="rounded-circle me-3"
              width="50"
              height="50"
            />
            <div class="flex-grow-1">
              <p class="mb-1">
                <strong>ArtistOne</strong> started following you.
              </p>
              <small class="text-muted">15 minutes ago</small>
            </div>
          </div>
          <div class="notification-page-item">
            <img
              src="assets/images/temp-profile.jpg"
              alt="User"
              class="rounded-circle me-3"
              width="50"
              height="50"
            />
            <div class="flex-grow-1">
              <p class="mb-1">
                <strong>MountainFan</strong> liked your post.
              </p>
              <small class="text-muted">1 hour ago</small>
            </div>
          </div>
          <div class="notification-page-item">
            <img
              src="assets/images/temp-profile.jpg"
              alt="User"
              class="rounded-circle me-3"
              width="50"
              height="50"
            />
            <div class="flex-grow-1">
              <p class="mb-1">
                <strong>DigitalPro</strong> commented: "Amazing work! 🔥"
              </p>
              <small class="text-muted">3 hours ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<?php 
  // Finally, include the footer
  // The main script.js is already included in footer.php
  include 'includes/footer.php'; 
?>