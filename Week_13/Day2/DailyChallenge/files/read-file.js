const fs = require("fs");
const path = require("path");
const read = () => {
  console.log(
    fs.readFileSync(path.join(__dirname, "file-data.txt"), "utf-8"),
    (err) => {
      if (err) throw err;
    },
  );
  console.log("The file has been read successfully!");
};

module.exports = read;
