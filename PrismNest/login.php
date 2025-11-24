<?php 
  // Set variables for this specific page
  $pageTitle = 'Login - PrismNest'; 
  $pageType = 'auth'; // This tells the header/footer to hide the navbar and modals

  // This page needs the auth.js script
  $pageScripts = [
    'assets/js/auth.js' // Use the new path
  ];

  // Include the common header
  include 'includes/header.php'; 
?>

<!-- This is the unique content for the login page -->
<main class="container-fluid auth-container d-flex align-items-center justify-content-center">
  <div class="row w-100">
    <div class="col-11 col-md-8 col-lg-4 mx-auto">
      <div class="card auth-card p-4 p-md-5">
        <h2 class="text-center fw-bold mb-4">Log In</h2>
        <form id="loginForm">
          <div class="mb-3">
            <label for="loginEmail" class="form-label">Email Address</label>
            <input type="email" class="form-control" id="loginEmail" required />
          </div>
          <div class="mb-3">
            <label for="loginPassword" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="loginPassword"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 mt-3">
            Log In
          </button>
        </form>
        <small class="text-center mt-4">
          Don't have an account?
          <!-- !! IMPORTANT: Link updated to .php !! -->
          <a href="signup.php">Sign Up</a>
        </small>
      </div>
    </div>
  </div>
</main>

<?php 
  // Finally, include the footer
  include 'includes/footer.php'; 
?>