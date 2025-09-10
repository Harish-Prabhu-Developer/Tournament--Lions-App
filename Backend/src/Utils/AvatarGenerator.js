// AvatarGenerator.js
export const generateAvatar = (name, role = "player", gender = "neutral") => {
  let style = "avataaars"; // default style

  // Role-based styles
  if (role === "organizer") style = "bottts";
  if (role === "admin") style = "notionists";

  const seed = encodeURIComponent(name || role || gender);

  // Gender-based options
  let genderQuery = "";
  if (gender === "male") {
    genderQuery = "&flip=false&radius=50&backgroundColor=blue";
  } else if (gender === "female") {
    genderQuery = "&flip=false&radius=50&backgroundColor=pink";
  } else {
    genderQuery = "&radius=50&backgroundColor=gray";
  }

  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}${genderQuery}`;
};
