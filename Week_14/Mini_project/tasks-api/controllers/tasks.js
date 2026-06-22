const fs = require("fs");
const depo = require("../data/depository.json");

const tasks = {
  getAllTasks: async("/tasks", (req, res) => {
    // GET /tasks
    try {
      fs.readFile.depo.then((data) => {
        if (!data.length)
          return res.status(404).send("Currently there are no tasks!");
        res.status(200).send(data);
      });
    } catch (err) {
      console.log(err(TypeError));
    }
  }),
};
