// --- DATA LAYER: The Simulated Database ---

// 1. Default Seed Data (This is used ONLY if the database is empty)
// IMPORTANT: The keys and the 'id' field MUST be replaced with the actual Firebase User UIDs.
const defaultUsers = {
  // UID for ArtistOne (e.g., artist@example.com)
  PASTE_ARTISTONE_UID_HERE: {
    id: "PASTE_ARTISTONE_UID_HERE",
    name: "ArtistOne",
    email: "artist@example.com",
    password: "password123", // Simple password for demo
    username: "@artist_one",
    bio: "A beautiful sunset artwork created digitally.",
    cover: "assets/images/sunset.jpg",
    pic: "assets/images/temp-profile.jpg",
    followers: ["PASTE_MOUNTAINFAN_UID_HERE", "PASTE_DIGITALPRO_UID_HERE"],
    following: ["PASTE_DIGITALPRO_UID_HERE"],
  },
  // UID for MountainFan (e.g., mountain@example.com)
  PASTE_MOUNTAINFAN_UID_HERE: {
    id: "PASTE_MOUNTAINFAN_UID_HERE",
    name: "MountainFan",
    email: "mountain@example.com",
    password: "password123",
    username: "@mountainfan",
    bio: "Sketching the world, one peak at a time.",
    cover: "assets/images/mountain.jpg",
    pic: "assets/images/temp-profile.jpg",
    followers: ["PASTE_ARTISTONE_UID_HERE"],
    following: ["PASTE_ARTISTONE_UID_HERE"],
  },
  // UID for DigitalPro (e.g., digital@example.com)
  PASTE_DIGITALPRO_UID_HERE: {
    id: "PASTE_DIGITALPRO_UID_HERE",
    name: "DigitalPro",
    email: "digital@example.com",
    password: "password123",
    username: "@digitalpro",
    bio: "Character illustrator and concept artist.",
    cover: "assets/images/digital.jpg",
    pic: "assets/images/temp-profile.jpg",
    followers: ["PASTE_ARTISTONE_UID_HERE"],
    following: ["PASTE_ARTISTONE_UID_HERE", "PASTE_MOUNTAINFAN_UID_HERE"],
  },
};

const defaultPosts = [
  {
    id: "post1",
    userId: "PASTE_ARTISTONE_UID_HERE", // Must be updated
    userImage: "assets/images/temp-profile.jpg",
    username: "ArtistOne",
    time: "2025-11-21T10:00:00", // ISO Timestamp for sorting
    caption: "A beautiful sunset artwork created digitally.",
    postImage: "assets/images/sunset.jpg",
    likes: ["PASTE_MOUNTAINFAN_UID_HERE", "PASTE_DIGITALPRO_UID_HERE"],
    savedBy: [],
    comments: [],
  },
  {
    id: "post2",
    userId: "PASTE_MOUNTAINFAN_UID_HERE", // Must be updated
    userImage: "assets/images/temp-profile.jpg",
    username: "MountainFan",
    time: "2025-11-21T12:30:00",
    caption: "Sketch of a mountain landscape in pencil.",
    postImage: "assets/images/mountain.jpg",
    likes: ["PASTE_ARTISTONE_UID_HERE"],
    savedBy: [],
    comments: [],
  },
];

// 2. Database Initialization Logic
function initDB() {
  if (!localStorage.getItem("prismnest_users")) {
    localStorage.setItem("prismnest_users", JSON.stringify(defaultUsers));
    console.log("Database: Users initialized.");
  }
  if (!localStorage.getItem("prismnest_posts")) {
    localStorage.setItem("prismnest_posts", JSON.stringify(defaultPosts));
    console.log("Database: Posts initialized.");
  }
}

// 3. Helper Functions to Read/Write Data
function getDBUsers() {
  return JSON.parse(localStorage.getItem("prismnest_users")) || {};
}

function getDBPosts() {
  return JSON.parse(localStorage.getItem("prismnest_posts")) || [];
}

function saveDBUsers(users) {
  localStorage.setItem("prismnest_users", JSON.stringify(users));
}

function saveDBPosts(posts) {
  localStorage.setItem("prismnest_posts", JSON.stringify(posts));
}

// Initialize immediately
initDB();

// Expose Global Variables (for backward compatibility with your other scripts)
// This ensures 'allUsers' and 'allPosts' are always fresh from the DB
var allUsers = getDBUsers();
var allPosts = getDBPosts();
