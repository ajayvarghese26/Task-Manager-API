class validator {
    static taskInfoValidator(task) {
      if (
        task.hasOwnProperty("Title") &&
        task.hasOwnProperty("Description") &&
        task.hasOwnProperty("Flag") &&
        typeof task.Flag === "boolean" &&
        task.Title.length > 0 &&
        task.Description.length > 0
      ) {
        console.log(task.Title);
        console.log("des", task.Description);
        return {
          status: true,
          message: "Task details has been validated",
        };
      } else {
        return {
          status: false,
          message: "Task validation failed",
        };
      }
    }
  }
  
  module.exports = validator;
  