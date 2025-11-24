<?php 
    // Check if this is an 'auth' page (like login/signup).
    // If it's NOT, we show all the common modals and the settings FAB.
    if (!isset($pageType) || $pageType !== 'auth'): 
    ?>

    <!-- Common Modals (used on most pages) -->
    
    <!-- Image View Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content bg-transparent border-0">
          <img src="" id="modalImage" class="img-fluid" alt="Large View" />
        </div>
      </div>
    </div>

    <!-- Create Post Modal -->
    <div
      class="modal fade"
      id="createPostModal"
      tabindex="-1"
      aria-labelledby="createPostModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createPostModalLabel">
              Create a New Post
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="createPostForm">
              <div class="mb-3">
                <label for="postImageUpload" class="form-label"
                  >Upload Image</label
                >
                <input
                  class="form-control"
                  type="file"
                  id="postImageUpload"
                  accept="image/*"
                  required
                />
                <img
                  id="imagePreview"
                  src=""
                  alt="Image Preview"
                  class="img-fluid mt-3 rounded"
                  style="display: none"
                />
              </div>
              <div class="mb-3">
                <label for="postCaption" class="form-label">Caption</label>
                <textarea
                  class="form-control"
                  id="postCaption"
                  rows="3"
                  placeholder="Write a caption..."
                ></textarea>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments Modal -->
    <div
      class="modal fade"
      id="commentsModal"
      tabindex="-1"
      aria-labelledby="commentsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content frosted-panel">
          <div class="modal-header">
            <h5 class="modal-title" id="commentsModalLabel">Comments</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <form class="d-flex w-100">
              <input
                type="text"
                class="form-control"
                placeholder="Add a comment..."
              />
              <button type="submit" class="btn btn-primary ms-2">Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Appearance Offcanvas -->
    <div
      class="offcanvas offcanvas-end frosted-panel"
      tabindex="-1"
      id="appearanceSettings"
      aria-labelledby="appearanceSettingsLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="appearanceSettingsLabel">
          Customize Feed
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="mb-3">
          <label for="bgInput" class="form-label">Upload Background</label>
          <input
            class="form-control"
            type="file"
            id="bgInput"
            accept="image/*"
          />
        </div>
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" id="darkModeSwitch" />
          <label class="form-check-label" for="darkModeSwitch">Dark Mode</label>
        </div>
        <div class="d-flex justify-content-end">
          <button id="cancelSettings" class="btn btn-secondary me-2">
            Cancel
          </button>
          <button id="saveSettings" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>

    <!-- Settings FAB -->
    <a
      href="#"
      class="settings-fab btn"
      data-bs-toggle="offcanvas"
      data-bs-target="#appearanceSettings"
      aria-controls="appearanceSettings"
    >
      <i class="bi bi-gear-fill fs-4"></i>
    </a>

    <?php 
    // This ends the 'if' condition.
    endif; 
    ?>

    <!-- Common Scripts -->
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
    <script src="assets/js/firebase-init.js"></script>
    <script src="assets/js/data.js"></script>

    <!-- !! IMPORTANT: Paths updated to new /assets/js/ folder !! -->
    <script src="assets/js/data.js"></script>

    <?php 
    // Only load the main script.js if it's NOT an auth page
    if (!isset($pageType) || $pageType !== 'auth'): 
    ?>
    <!-- !! BUG FIX: Corrected path from 'assetsjs/' to 'assets/js/' !! -->
    <script src="assets/js/script.js"></script>
    <?php 
    // End the if
    endif; 
    ?>

    <?php 
    // This will load any page-specific scripts (like profile.js or auth.js)
    if (isset($pageScripts) && is_array($pageScripts)) {
        foreach ($pageScripts as $script) {
            echo "<script src=\"$script\"></script>\n";
        }
    }
    ?>
  </body>
</html>