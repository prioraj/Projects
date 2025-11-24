document.addEventListener("DOMContentLoaded", function () {
  // ===================================================================
  // 1. INITIALIZATION & ELEMENT SELECTION
  // ===================================================================
  const postsCountEl = document.getElementById("postsCount");
  const followersCountEl = document.getElementById("followersCount");
  const followingCountEl = document.getElementById("followingCount");

  // Triggers for the Modal
  const followersTrigger = document.getElementById("followersTrigger");
  const followingTrigger = document.getElementById("followingTrigger");

  const postsGrid = document.getElementById("postsGrid");
  const savedGrid = document.getElementById("savedGrid");
  const profileTabsContainer = document.querySelector(".profile-tabs-wrapper");
  const copyProfileLinkBtn = document.getElementById("copyProfileLinkBtn");

  // Edit Profile Elements
  const editProfileModalEl = document.getElementById("editProfileModal");
  const editProfileModal = editProfileModalEl
    ? new bootstrap.Modal(editProfileModalEl)
    : null;
  const coverPhotoUpload = document.getElementById("coverPhotoUpload");
  const profilePhotoUpload = document.getElementById("profilePhotoUpload");
  const coverPhotoPreview = document.getElementById("coverPhotoPreview");
  const profilePhotoPreview = document.getElementById("profilePhotoPreview");
  const editNameInput = document.getElementById("editName");
  const editUsernameInput = document.getElementById("editUsername");
  const editBioInput = document.getElementById("editBio");
  const saveProfileChangesBtn = document.getElementById("saveProfileChanges");

  // Cropper Elements
  const cropperModalEl = document.getElementById("imageCropperModal");
  const cropperModal = cropperModalEl
    ? new bootstrap.Modal(cropperModalEl)
    : null;
  const imageToCrop = document.getElementById("imageToCrop");
  const cropImageBtn = document.getElementById("cropImageBtn");

  // Users List Modal Elements
  const usersListModalEl = document.getElementById("usersListModal");
  const usersListModal = usersListModalEl
    ? new bootstrap.Modal(usersListModalEl)
    : null;
  const usersListTitle = document.getElementById("usersListTitle");
  const usersListContainer = document.getElementById("usersListContainer");

  // Profile UI Elements
  const mainCoverPhoto = document.querySelector(".main-cover-photo");
  const mainProfilePics = document.querySelectorAll(".main-profile-pic");
  const profileName = document.querySelector(".profile-name");
  const profileUsername = document.querySelector(".profile-username");
  const profileBio = document.getElementById("profileBio");
  const profileActions = document.querySelector(".profile-actions");

  // State
  let cropper;
  let currentCropTarget = null;

  // DB Helpers
  function getFreshUsers() {
    return JSON.parse(localStorage.getItem("prismnest_users")) || {};
  }
  function getFreshPosts() {
    return JSON.parse(localStorage.getItem("prismnest_posts")) || [];
  }
  const currentUser = JSON.parse(localStorage.getItem("prismnest_currentUser"));

  // ===================================================================
  // 2. CORE FUNCTIONS
  // ===================================================================

  function renderPostGrid(posts, container) {
    container.innerHTML = "";
    if (posts.length === 0) {
      container.innerHTML = `
            <div class="col-12">
                <div class="empty-state-card card p-5 text-center">
                    <i class="bi bi-camera-reels fs-1"></i>
                    <h5 class="mt-3">No Posts Yet</h5>
                    <p class="text-muted">Capture moments to show them here.</p>
                </div>
            </div>`;
      return;
    }

    let html = '<div class="row g-2">';
    posts.forEach((post) => {
      html += `
            <div class="col-4">
              <img src="${post.postImage}" alt="Post" class="img-fluid rounded" style="aspect-ratio: 1/1; object-fit: cover; cursor: pointer;">
            </div>`;
    });
    html += "</div>";
    container.innerHTML = html;
  }

  function loadProfile(targetUserId) {
    const dbUsers = getFreshUsers();
    const dbPosts = getFreshPosts();
    const user = dbUsers[targetUserId];

    if (!user) {
      console.error("User not found");
      return;
    }

    // UI Updates
    if (profileName) profileName.textContent = user.name;
    if (profileUsername) profileUsername.textContent = user.username;
    if (profileBio) profileBio.textContent = user.bio;
    if (mainCoverPhoto) mainCoverPhoto.src = user.cover;
    if (mainProfilePics) mainProfilePics.forEach((img) => (img.src = user.pic));

    // Stats
    const followers = user.followers || [];
    const following = user.following || [];
    const userPosts = dbPosts.filter((p) => p.userId === targetUserId);

    if (followersCountEl) followersCountEl.textContent = followers.length;
    if (followingCountEl) followingCountEl.textContent = following.length;
    if (postsCountEl) postsCountEl.textContent = userPosts.length;

    // ATTACH LISTENERS FOR FOLLOWERS/FOLLOWING MODAL
    if (followersTrigger) {
      followersTrigger.onclick = () =>
        openUsersListModal("Followers", followers);
    }
    if (followingTrigger) {
      followingTrigger.onclick = () =>
        openUsersListModal("Following", following);
    }

    // Render Grid
    userPosts.sort((a, b) => new Date(b.time) - new Date(a.time));
    if (postsGrid) renderPostGrid(userPosts, postsGrid);

    // Profile Actions (Edit vs Follow)
    if (profileActions) {
      if (currentUser && currentUser.id === targetUserId) {
        profileActions.innerHTML = `
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit Profile</button>
                <div class="dropdown">
                    <button class="btn btn-outline-secondary" type="button" data-bs-toggle="dropdown"><i class="bi bi-box-arrow-up"></i></button>
                    <ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item" href="#" id="copyProfileLinkBtn">Copy Profile Link</a></li></ul>
                </div>`;

        const newCopyBtn = document.getElementById("copyProfileLinkBtn");
        if (newCopyBtn) {
          newCopyBtn.addEventListener("click", (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
          });
        }
      } else {
        const myFreshData = dbUsers[currentUser.id];
        const isFollowing =
          myFreshData &&
          myFreshData.following &&
          myFreshData.following.includes(targetUserId);
        const btnText = isFollowing ? "Following" : "Follow";
        const btnClass = isFollowing ? "btn-secondary" : "btn-primary";

        profileActions.innerHTML = `
                <button class="btn ${btnClass}" id="profileFollowBtn">${btnText}</button>
                <button class="btn btn-outline-secondary">Message</button>
                <div class="dropdown">
                    <button class="btn btn-outline-secondary" type="button" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                    <ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item text-danger" href="#">Report</a></li></ul>
                </div>`;

        document
          .getElementById("profileFollowBtn")
          .addEventListener("click", function () {
            toggleFollow(targetUserId, this);
          });
      }
    }

    document.title = `${user.name} (${user.username}) - PrismNest`;
  }

  // --- OPEN USER LIST MODAL ---
  function openUsersListModal(title, userIds) {
    if (!usersListModal) return;

    usersListTitle.textContent = title;
    usersListContainer.innerHTML = "";

    if (userIds.length === 0) {
      usersListContainer.innerHTML = `<p class="text-center text-muted my-3">No users found.</p>`;
    } else {
      const dbUsers = getFreshUsers();
      // Get fresh data for myself to check following status
      const me = dbUsers[currentUser.id];

      userIds.forEach((id) => {
        const user = dbUsers[id];
        if (user) {
          const isMe = user.id === currentUser.id;
          const isFollowing = me.following && me.following.includes(user.id);

          // Create Button HTML
          let actionBtn = "";
          if (!isMe) {
            const btnText = isFollowing ? "Unfollow" : "Follow";
            const btnClass = isFollowing ? "btn-secondary" : "btn-primary";
            // Added class 'modal-follow-btn' for targeting
            actionBtn = `<button class="btn btn-sm ${btnClass} modal-follow-btn" data-user-id="${user.id}" style="min-width:80px;">${btnText}</button>`;
          }

          const itemHtml = `
                    <div class="d-flex align-items-center justify-content-between">
                        <a href="profile.php?user=${user.id}" class="d-flex align-items-center text-decoration-none text-dark flex-grow-1">
                            <img src="${user.pic}" class="rounded-circle me-2" width="40" height="40" style="object-fit: cover;">
                            <div style="line-height:1.2">
                                <span class="fw-bold d-block" style="font-size:0.9rem">${user.name}</span>
                                <small class="text-muted">${user.username}</small>
                            </div>
                        </a>
                        ${actionBtn}
                    </div>`;
          usersListContainer.insertAdjacentHTML("beforeend", itemHtml);
        }
      });
    }
    usersListModal.show();
  }

  // --- HANDLE MODAL FOLLOW CLICK ---
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal-follow-btn")) {
      e.preventDefault();
      e.stopPropagation(); // Prevent clicking the link behind it

      const targetId = e.target.dataset.userId;
      const btn = e.target;

      // Reuse logic but just for the button
      let dbUsers = getFreshUsers();
      let me = dbUsers[currentUser.id];
      let targetUser = dbUsers[targetId];

      if (!me.following) me.following = [];
      if (!targetUser.followers) targetUser.followers = [];

      const isFollowing = me.following.includes(targetId);

      if (isFollowing) {
        // Unfollow
        me.following = me.following.filter((id) => id !== targetId);
        targetUser.followers = targetUser.followers.filter(
          (id) => id !== currentUser.id
        );

        btn.textContent = "Follow";
        btn.classList.replace("btn-secondary", "btn-primary");
      } else {
        // Follow
        me.following.push(targetId);
        targetUser.followers.push(currentUser.id);

        btn.textContent = "Unfollow";
        btn.classList.replace("btn-primary", "btn-secondary");
      }

      // Save
      dbUsers[currentUser.id] = me;
      dbUsers[targetId] = targetUser;
      localStorage.setItem("prismnest_users", JSON.stringify(dbUsers));
      localStorage.setItem("prismnest_currentUser", JSON.stringify(me));

      // Update Profile Stats Live (If I am viewing my own profile)
      // If I unfollow someone, my 'Following' count should decrease immediately
      const urlParams = new URLSearchParams(window.location.search);
      const currentViewedId = urlParams.get("user") || currentUser.id;

      if (currentViewedId === currentUser.id) {
        // I am on my own profile, update "Following" count
        followingCountEl.textContent = me.following.length;
      } else if (currentViewedId === targetId) {
        // I am on the target user's profile, update "Followers" count
        followersCountEl.textContent = targetUser.followers.length;

        // Also update the main Follow button on the page if it exists
        const mainFollowBtn = document.getElementById("profileFollowBtn");
        if (mainFollowBtn) {
          if (isFollowing) {
            // I just unfollowed
            mainFollowBtn.textContent = "Follow";
            mainFollowBtn.classList.replace("btn-secondary", "btn-primary");
          } else {
            // I just followed
            mainFollowBtn.textContent = "Following";
            mainFollowBtn.classList.replace("btn-primary", "btn-secondary");
          }
        }
      }
    }
  });

  function toggleFollow(targetId, btn) {
    let dbUsers = getFreshUsers();
    let me = dbUsers[currentUser.id];
    let targetUser = dbUsers[targetId];

    if (!me.following) me.following = [];
    if (!targetUser.followers) targetUser.followers = [];

    const isFollowing = me.following.includes(targetId);

    if (isFollowing) {
      me.following = me.following.filter((id) => id !== targetId);
      targetUser.followers = targetUser.followers.filter(
        (id) => id !== currentUser.id
      );
      btn.textContent = "Follow";
      btn.classList.replace("btn-secondary", "btn-primary");
    } else {
      me.following.push(targetId);
      targetUser.followers.push(currentUser.id);
      btn.textContent = "Following";
      btn.classList.replace("btn-primary", "btn-secondary");
    }

    dbUsers[currentUser.id] = me;
    dbUsers[targetId] = targetUser;
    localStorage.setItem("prismnest_users", JSON.stringify(dbUsers));
    localStorage.setItem("prismnest_currentUser", JSON.stringify(me));

    if (followersCountEl)
      followersCountEl.textContent = targetUser.followers.length;
  }

  function loadSavedPosts() {
    if (!savedGrid) return;
    const dbPosts = getFreshPosts();
    const savedPosts = dbPosts.filter(
      (p) => p.savedBy && p.savedBy.includes(currentUser.id)
    );
    renderPostGrid(savedPosts, savedGrid);
  }

  // ===================================================================
  // 3. EDIT PROFILE & CROPPER
  // ===================================================================

  function openCropper(imageFile, target, aspectRatio) {
    if (!imageFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageToCrop.src = e.target.result;
      currentCropTarget = target;
      cropperModal.show();
      cropperModalEl.addEventListener(
        "shown.bs.modal",
        () => {
          if (cropper) cropper.destroy();
          cropper = new Cropper(imageToCrop, {
            aspectRatio: aspectRatio,
            viewMode: 1,
          });
        },
        { once: true }
      );
    };
    reader.readAsDataURL(imageFile);
  }

  if (editProfileModalEl) {
    editProfileModalEl.addEventListener("show.bs.modal", () => {
      const freshUser = getFreshUsers()[currentUser.id];
      editNameInput.value = freshUser.name;
      editUsernameInput.value = freshUser.username;
      editBioInput.value = freshUser.bio;
      coverPhotoPreview.src = freshUser.cover;
      profilePhotoPreview.src = freshUser.pic;
    });

    saveProfileChangesBtn.addEventListener("click", () => {
      let dbUsers = getFreshUsers();
      let me = dbUsers[currentUser.id];
      me.name = editNameInput.value;
      me.username = editUsernameInput.value;
      me.bio = editBioInput.value;
      me.cover = coverPhotoPreview.src;
      me.pic = profilePhotoPreview.src;
      dbUsers[currentUser.id] = me;
      localStorage.setItem("prismnest_users", JSON.stringify(dbUsers));
      localStorage.setItem("prismnest_currentUser", JSON.stringify(me));
      loadProfile(currentUser.id);
      editProfileModal.hide();
      location.reload();
    });

    coverPhotoUpload.addEventListener("change", () =>
      openCropper(coverPhotoUpload.files[0], "cover", 16 / 9)
    );
    profilePhotoUpload.addEventListener("change", () =>
      openCropper(profilePhotoUpload.files[0], "profile", 1 / 1)
    );
  }

  if (cropperModalEl) {
    cropImageBtn.addEventListener("click", () => {
      if (!cropper) return;
      const url = cropper.getCroppedCanvas().toDataURL("image/jpeg");
      if (currentCropTarget === "profile") profilePhotoPreview.src = url;
      else if (currentCropTarget === "cover") coverPhotoPreview.src = url;
      cropper.destroy();
      cropperModal.hide();
    });
  }

  // ===================================================================
  // 4. INITIAL EXECUTION
  // ===================================================================

  if (profileTabsContainer) {
    const tabPanes = document.querySelectorAll(
      ".profile-grid-container .tab-pane"
    );
    profileTabsContainer.addEventListener("click", function (e) {
      const clickedTab = e.target.closest(".feed-tab");
      if (!clickedTab || clickedTab.classList.contains("active")) return;
      profileTabsContainer
        .querySelectorAll(".feed-tab")
        .forEach((tab) => tab.classList.remove("active"));
      clickedTab.classList.add("active");
      const targetId = clickedTab.dataset.target;
      tabPanes.forEach((pane) => {
        if (`#${pane.id}` === targetId) pane.classList.add("active");
        else pane.classList.remove("active");
      });
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get("user");
  const targetUserId = paramId ? paramId : currentUser.id;

  loadProfile(targetUserId);

  if (targetUserId === currentUser.id) {
    loadSavedPosts();
  }
});
