document.addEventListener("DOMContentLoaded", function () {
  // ===================================================================
  // 1. INITIAL SETUP & VARIABLES
  // ===================================================================
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("prismnest_currentUser"));
  } catch (e) {
    console.error("User data corrupt, please logout.");
  }

  // Load DB Data
  let dbPosts = getDBPosts();
  let dbUsers = getDBUsers();

  // Element References
  const exploreFeed = document.getElementById("exploreFeed");
  const followingFeed = document.getElementById("followingFeed");
  const createPostForm = document.getElementById("createPostForm");
  const postImageUpload = document.getElementById("postImageUpload");
  const imagePreview = document.getElementById("imagePreview");

  // Navbar Profile Highlight
  if (window.location.href.includes("profile.php")) {
    const navProfilePic = document.querySelector(".navbar .main-profile-pic");
    if (navProfilePic) navProfilePic.style.border = "2px solid #0d6efd";
  }

  // Update Navbar Avatar
  const navAvatars = document.querySelectorAll(".main-profile-pic");
  if (currentUser && navAvatars.length > 0) {
    navAvatars.forEach((img) => (img.src = currentUser.pic));
  }

  // ===================================================================
  // 2. FEED RENDERING ENGINE
  // ===================================================================

  function renderPost(post) {
    // Time calculation
    const date = new Date(post.time);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    let timeString = "Just now";
    if (diffDays > 0) timeString = `${diffDays} days ago`;
    else if (diffHrs > 0) timeString = `${diffHrs} hours ago`;
    else if (diffMins > 0) timeString = `${diffMins} mins ago`;

    // Check interactions
    const isLiked =
      post.likes && post.likes.includes(currentUser?.id)
        ? "bi-heart-fill text-danger"
        : "bi-heart";
    const isSaved =
      post.savedBy && post.savedBy.includes(currentUser?.id)
        ? "bi-bookmark-fill text-primary"
        : "bi-bookmark";

    // Follow Logic
    const amIFollowing = currentUser?.following?.includes(post.userId);
    const followBtnClass = amIFollowing
      ? "btn-secondary following"
      : "btn-outline-primary";
    const followBtnText = amIFollowing ? "Following" : "Follow";

    const isMyPost = currentUser && post.userId === currentUser.id;
    const showFollowBtn = isMyPost ? "d-none" : "";

    // Menu Options
    const menuOption = isMyPost
      ? `<li><a class="dropdown-item text-danger delete-post-btn" href="#">Delete Post</a></li>`
      : `<li><a class="dropdown-item" href="#">Not Interested</a></li>
         <li><a class="dropdown-item text-danger" href="#">Report</a></li>`;

    return `
        <div class="col-12 mb-4 d-flex justify-content-center fade-in-animation">
            <div class="card" data-post-id="${post.id}" data-user-id="${post.userId}" style="width: 100%">
                <div class="d-flex align-items-center p-2">
                    <a href="profile.php?user=${post.userId}">
                        <img src="${post.userImage}" class="rounded-circle me-2" width="40" height="40" style="object-fit:cover"/>
                    </a>
                    <div class="me-auto">
                        <a href="profile.php?user=${post.userId}" class="text-decoration-none text-dark">
                            <h6 class="mb-0">${post.username}</h6>
                        </a>
                        <small class="text-muted">${timeString}</small>
                    </div>
                    <button class="btn btn-sm ${followBtnClass} follow-btn ${showFollowBtn}">${followBtnText}</button>
                    <div class="dropdown ms-2">
                      <a href="#" class="post-options" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical"></i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end">
                        ${menuOption}
                      </ul>
                    </div>
                </div>
                <div class="caption-overlay px-2 pb-2">
                    <p class="mb-0">${post.caption}</p>
                </div>
                <img src="${post.postImage}" class="card-img-top" alt="Post Image" style="cursor:pointer;" />
                <div class="card-body d-flex align-items-center justify-content-between p-2">
                    <div class="card-body-actions">
                        <button type="button" class="action-btn btn like-btn-wrapper"><i class="bi ${isLiked} fs-4"></i></button>
                        <button type="button" class="action-btn btn comment-btn"><i class="bi bi-chat-dots fs-4"></i></button>
                        <button type="button" class="action-btn btn"><i class="bi bi-send fs-4"></i></button>
                    </div>
                    <div class="card-body-save">
                        <button type="button" class="action-btn btn save-btn-wrapper"><i class="bi ${isSaved} fs-4"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
  }

  // Helper to render a single comment HTML
  function renderCommentHTML(c) {
    const isMyComment = c.userId === currentUser.id;
    const deleteBtn = isMyComment
      ? `<small class="text-danger ms-auto delete-comment-btn" style="cursor:pointer; font-weight:600;" data-comment-id="${c.id}">Delete</small>`
      : "";

    return `
        <div class="d-flex align-items-start mb-3">
            <img src="${
              c.userImage
            }" class="rounded-circle me-2" width="35" height="35" style="object-fit: cover;">
            <div class="flex-grow-1">
                <div class="d-flex align-items-center">
                    <p class="mb-0 small"><strong>${
                      c.username
                    }</strong> ${c.text}</p>
                    ${deleteBtn}
                </div>
                <small class="text-muted" style="font-size: 0.7rem;">${new Date(
                  c.time
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}</small>
            </div>
        </div>`;
  }

  function loadExploreFeed() {
    if (!exploreFeed) return;
    exploreFeed.innerHTML = "";
    const sortedPosts = dbPosts.sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );

    if (sortedPosts.length === 0) {
      exploreFeed.innerHTML = `<div class="text-center p-5"><h4>No posts yet!</h4><p>Be the first to create one.</p></div>`;
    } else {
      sortedPosts.forEach((post) => {
        exploreFeed.insertAdjacentHTML("beforeend", renderPost(post));
      });
    }
  }

  function loadFollowingFeed() {
    if (!followingFeed) return;
    followingFeed.innerHTML = "";
    if (
      !currentUser ||
      !currentUser.following ||
      currentUser.following.length === 0
    ) {
      followingFeed.innerHTML = `<div class="empty-state-card card p-5 text-center"><i class="bi bi-person-x fs-1"></i><h5 class="mt-3">Not following anyone</h5><p class="text-muted">Follow people to see their posts here.</p></div>`;
      return;
    }

    const myFeed = dbPosts.filter((p) =>
      currentUser.following.includes(p.userId)
    );

    if (myFeed.length === 0) {
      followingFeed.innerHTML = `<div class="empty-state-card card p-5 text-center"><h5 class="mt-3">No recent activity</h5><p class="text-muted"> The people you follow haven't posted recently.</p></div>`;
    } else {
      myFeed.forEach((post) => {
        followingFeed.insertAdjacentHTML("beforeend", renderPost(post));
      });
    }
  }

  // ===================================================================
  // 3. POST CREATION LOGIC
  // ===================================================================

  if (createPostForm) {
    postImageUpload.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });

    createPostForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const caption = document.getElementById("postCaption").value;
      const file = postImageUpload.files[0];

      if (!file) {
        alert("Please select an image");
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        const base64Image = evt.target.result;

        const newPost = {
          id: "post_" + Date.now(),
          userId: currentUser.id,
          username: currentUser.name,
          userImage: currentUser.pic,
          time: new Date().toISOString(),
          caption: caption,
          postImage: base64Image,
          likes: [],
          savedBy: [],
          comments: [],
        };

        dbPosts.unshift(newPost);
        saveDBPosts(dbPosts);

        if (!dbUsers[currentUser.id].posts) dbUsers[currentUser.id].posts = [];
        dbUsers[currentUser.id].posts.push(newPost.id);
        saveDBUsers(dbUsers);

        loadExploreFeed();

        const modalEl = document.getElementById("createPostModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();

        createPostForm.reset();
        imagePreview.style.display = "none";
        alert("Post Published!");
      };
      reader.readAsDataURL(file);
    });
  }

  // ===================================================================
  // 4. INTERACTION LOGIC (LIKES, SAVES, FOLLOW, DELETE, COMMENT)
  // ===================================================================

  document.body.addEventListener("click", function (e) {
    const target = e.target;

    // --- A. MODAL POST BUTTON ---
    const modalEl = document.getElementById("commentsModal");
    if (
      modalEl &&
      modalEl.contains(target) &&
      target.tagName === "BUTTON" &&
      target.innerText.trim() === "Post"
    ) {
      e.preventDefault();
      handleCommentSubmit(modalEl);
      return;
    }

    // --- B. DELETE COMMENT ---
    if (target.classList.contains("delete-comment-btn")) {
      e.preventDefault();
      const commentId = target.dataset.commentId;
      const modal = document.getElementById("commentsModal");
      const currentPostId = modal.dataset.currentPostId;

      if (confirm("Delete this comment?")) {
        const postIndex = dbPosts.findIndex((p) => p.id === currentPostId);
        if (postIndex !== -1) {
          dbPosts[postIndex].comments = dbPosts[postIndex].comments.filter(
            (c) => c.id != commentId
          );
          saveDBPosts(dbPosts);
          target.closest(".d-flex").remove();

          const modalBody = modal.querySelector(".modal-body");
          if (dbPosts[postIndex].comments.length === 0) {
            modalBody.innerHTML = `<div class="text-center text-muted p-4">No comments yet. Be the first!</div>`;
          }
        }
      }
      return;
    }

    // --- C. DELETE POST ---
    if (target.classList.contains("delete-post-btn")) {
      e.preventDefault();
      const card = target.closest(".card");
      if (!card) return;
      const postId = card.dataset.postId;

      if (confirm("Are you sure you want to delete this post?")) {
        dbPosts = dbPosts.filter((p) => p.id !== postId);
        saveDBPosts(dbPosts);

        if (dbUsers[currentUser.id].posts) {
          dbUsers[currentUser.id].posts = dbUsers[currentUser.id].posts.filter(
            (id) => id !== postId
          );
          saveDBUsers(dbUsers);
        }

        card.parentElement.remove();
        if (typeof loadProfile === "function") loadProfile(currentUser.id);
      }
      return;
    }

    // --- G. IMAGE ZOOM (NEW) ---
    // Detect clicks on images in Feed, Search, or Profile grids
    if (
      target.tagName === "IMG" &&
      (target.classList.contains("card-img-top") ||
        target.closest(".profile-grid-container") ||
        target.closest(".search-result-item"))
    ) {
      const imageModalEl = document.getElementById("imageModal");
      const modalImage = document.getElementById("modalImage");
      if (imageModalEl && modalImage) {
        modalImage.src = target.src;
        const modalInstance =
          bootstrap.Modal.getInstance(imageModalEl) ||
          new bootstrap.Modal(imageModalEl);
        modalInstance.show();
      }
      return;
    }

    // --- General Card Interactions ---
    const card = target.closest(".card");
    if (!card) return;

    const postId = card.dataset.postId;
    const postOwnerId = card.dataset.userId;
    const postIndex = dbPosts.findIndex((p) => p.id === postId);
    if (postIndex === -1) return;

    // --- D. OPEN COMMENTS ---
    if (target.closest(".comment-btn")) {
      const modal = document.getElementById("commentsModal");
      modal.dataset.currentPostId = postId;

      const modalBody = modal.querySelector(".modal-body");
      const modalInstance =
        bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);

      const comments = dbPosts[postIndex].comments || [];
      modalBody.innerHTML = "";

      if (comments.length === 0) {
        modalBody.innerHTML = `<div class="text-center text-muted p-4">No comments yet. Be the first!</div>`;
      } else {
        comments.forEach((c) => {
          modalBody.innerHTML += renderCommentHTML(c);
        });
      }

      setTimeout(() => {
        modalBody.scrollTop = modalBody.scrollHeight;
      }, 200);
      modalInstance.show();
      return;
    }

    // --- E. LIKE ACTION ---
    const likeBtn = target.closest(".like-btn-wrapper");
    if (likeBtn) {
      const icon = likeBtn.querySelector("i");
      const isLiked = icon.classList.contains("bi-heart-fill");

      icon.classList.toggle("bi-heart-fill");
      icon.classList.toggle("bi-heart");
      icon.classList.toggle("text-danger");

      if (!isLiked) {
        if (!dbPosts[postIndex].likes) dbPosts[postIndex].likes = [];
        dbPosts[postIndex].likes.push(currentUser.id);
      } else {
        dbPosts[postIndex].likes = dbPosts[postIndex].likes.filter(
          (id) => id !== currentUser.id
        );
      }
      saveDBPosts(dbPosts);
    }

    // --- F. SAVE ACTION ---
    const saveBtn = target.closest(".save-btn-wrapper");
    if (saveBtn) {
      const icon = saveBtn.querySelector("i");
      const isSaved = icon.classList.contains("bi-bookmark-fill");

      icon.classList.toggle("bi-bookmark-fill");
      icon.classList.toggle("bi-bookmark");
      icon.classList.toggle("text-primary");

      if (!isSaved) {
        if (!dbPosts[postIndex].savedBy) dbPosts[postIndex].savedBy = [];
        dbPosts[postIndex].savedBy.push(currentUser.id);
      } else {
        dbPosts[postIndex].savedBy = dbPosts[postIndex].savedBy.filter(
          (id) => id !== currentUser.id
        );
      }
      saveDBPosts(dbPosts);
    }

    // --- H. FOLLOW ACTION ---
    if (target.classList.contains("follow-btn")) {
      const isFollowing = target.classList.contains("following");

      if (!isFollowing) {
        target.textContent = "Following";
        target.classList.add("following", "btn-secondary");
        target.classList.remove("btn-outline-primary");
        if (!currentUser.following) currentUser.following = [];
        currentUser.following.push(postOwnerId);

        if (dbUsers[postOwnerId]) {
          if (!dbUsers[postOwnerId].followers)
            dbUsers[postOwnerId].followers = [];
          dbUsers[postOwnerId].followers.push(currentUser.id);
        }
      } else {
        target.textContent = "Follow";
        target.classList.remove("following", "btn-secondary");
        target.classList.add("btn-outline-primary");
        currentUser.following = currentUser.following.filter(
          (id) => id !== postOwnerId
        );

        if (dbUsers[postOwnerId] && dbUsers[postOwnerId].followers) {
          dbUsers[postOwnerId].followers = dbUsers[
            postOwnerId
          ].followers.filter((id) => id !== currentUser.id);
        }
      }

      dbUsers[currentUser.id] = currentUser;
      saveDBUsers(dbUsers);
      localStorage.setItem(
        "prismnest_currentUser",
        JSON.stringify(currentUser)
      );
    }
  });

  // Helper for Enter Key in Comments
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const activeElement = document.activeElement;
      const modalEl = document.getElementById("commentsModal");
      if (
        modalEl &&
        modalEl.contains(activeElement) &&
        activeElement.tagName === "INPUT"
      ) {
        e.preventDefault();
        handleCommentSubmit(modalEl);
      }
    }
  });

  function handleCommentSubmit(modalEl) {
    const input = modalEl.querySelector("input");
    const text = input.value.trim();
    const targetPostId = modalEl.dataset.currentPostId;

    if (!text || !targetPostId) return;

    const postIndex = dbPosts.findIndex((p) => p.id === targetPostId);
    if (postIndex === -1) return;

    const newComment = {
      id: Date.now(),
      userId: currentUser.id,
      username: currentUser.name,
      userImage: currentUser.pic,
      text: text,
      time: new Date().toISOString(),
    };

    if (!dbPosts[postIndex].comments) dbPosts[postIndex].comments = [];
    dbPosts[postIndex].comments.push(newComment);
    saveDBPosts(dbPosts);

    const modalBody = modalEl.querySelector(".modal-body");
    if (modalBody.textContent.includes("No comments")) modalBody.innerHTML = "";

    modalBody.innerHTML += renderCommentHTML(newComment);

    input.value = "";
    modalBody.scrollTop = modalBody.scrollHeight;
  }

  // ===================================================================
  // 5. APPEARANCE & SETTINGS
  // ===================================================================
  const appearancePanel = document.getElementById("appearanceSettings");
  const bgInput = document.getElementById("bgInput");
  const darkModeSwitch = document.getElementById("darkModeSwitch");
  const saveSettingsBtn = document.getElementById("saveSettings");
  const cancelSettingsBtn = document.getElementById("cancelSettings");

  let initialBg = "";
  let initialDarkMode = false;
  let changesSaved = false;
  let newBgToSave = null;

  function loadPreferences() {
    const savedBg = localStorage.getItem("prismnest_bg");
    const darkModeEnabled =
      localStorage.getItem("prismnest_darkMode") === "enabled";

    if (savedBg) {
      document.body.style.backgroundImage = savedBg;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundAttachment = "fixed";
    }

    if (darkModeEnabled) {
      document.body.classList.add("dark-mode");
      if (darkModeSwitch) darkModeSwitch.checked = true;
    } else {
      document.body.classList.remove("dark-mode");
      if (darkModeSwitch) darkModeSwitch.checked = false;
    }
  }

  if (appearancePanel) {
    appearancePanel.addEventListener("show.bs.offcanvas", function () {
      initialBg = document.body.style.backgroundImage;
      initialDarkMode = document.body.classList.contains("dark-mode");
      if (darkModeSwitch) darkModeSwitch.checked = initialDarkMode;
      changesSaved = false;
      newBgToSave = null;
    });

    if (bgInput) {
      bgInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = `url(${event.target.result})`;
          document.body.style.backgroundImage = imageUrl;
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundPosition = "center";
          document.body.style.backgroundAttachment = "fixed";
          newBgToSave = imageUrl;
        };
        reader.readAsDataURL(file);
      });
    }

    if (darkModeSwitch) {
      darkModeSwitch.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode", this.checked);
      });
    }

    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener("click", function () {
        changesSaved = true;
        if (newBgToSave) {
          localStorage.setItem("prismnest_bg", newBgToSave);
        }
        localStorage.setItem(
          "prismnest_darkMode",
          document.body.classList.contains("dark-mode") ? "enabled" : "disabled"
        );

        const offcanvasInstance =
          bootstrap.Offcanvas.getInstance(appearancePanel);
        if (offcanvasInstance) offcanvasInstance.hide();
      });
    }

    if (cancelSettingsBtn) {
      cancelSettingsBtn.addEventListener("click", function () {
        const offcanvasInstance =
          bootstrap.Offcanvas.getInstance(appearancePanel);
        if (offcanvasInstance) offcanvasInstance.hide();
      });
    }

    appearancePanel.addEventListener("hide.bs.offcanvas", function () {
      if (!changesSaved) {
        document.body.style.backgroundImage = initialBg;
        document.body.classList.toggle("dark-mode", initialDarkMode);
        if (darkModeSwitch) darkModeSwitch.checked = initialDarkMode;
      }
      newBgToSave = null;
    });
  }

  // ===================================================================
  // 6. INITIAL EXECUTION
  // ===================================================================
  loadExploreFeed();
  loadFollowingFeed();
  loadPreferences();

  // Feed Tabs
  const feedTabsContainer = document.getElementById("feedTabsContainer");
  if (feedTabsContainer) {
    feedTabsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("feed-tab")) {
        document
          .querySelectorAll(".feed-tab")
          .forEach((t) => t.classList.remove("active"));
        e.target.classList.add("active");
        const targetId = e.target.dataset.target;
        document
          .querySelectorAll(".feed-tab-content .tab-pane")
          .forEach((p) => p.classList.remove("active"));
        document.querySelector(targetId).classList.add("active");
      }
    });
  }

  // Logout
  document.querySelectorAll(".dropdown-item").forEach((item) => {
    if (item.textContent.includes("Logout")) {
      item.addEventListener("click", (e) => {
        e.preventDefault();

        // --- START FIREBASE LOGOUT ---
        firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("User signed out from Firebase.");

            // Clear all local storage session data
            localStorage.removeItem("prismnest_loggedIn");
            localStorage.removeItem("prismnest_currentUser");
            localStorage.removeItem("profile_name");
            localStorage.removeItem("profile_username");
            localStorage.removeItem("profile_pic");
            localStorage.removeItem("profile_cover");
            localStorage.removeItem("profile_bio");

            window.location.href = "login.php";
          })
          .catch((error) => {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
          });
        // --- END FIREBASE LOGOUT ---
      });
    }
  });
});
