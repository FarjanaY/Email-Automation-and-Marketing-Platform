function slugifyName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "".trim()); //remove saces and symbol form name
}

function generateUsername(base) {
  const year = new Date().getFullYear();

  return [
    `${base}`,
    `${base}${Math.floor(Math.random()) * 1000}`,
    `${base}${year}`,
    `${base}${Math.floor(Math.random() * 90 + 10)}`,
    `${base}_official`,
  ];
}
module.exports = { slugifyName, generateUsername };
