let lauf = (function lauf() {
  var tasks = {};

  function task(taskName, cb) {
    if (typeof cb != "function") return;
    if (typeof taskName != "string") return;

    if (!tasks[taskName]) {
      tasks[taskName] = function callback(args) {
        this.name = taskName;
        cb.apply(this, args);
      };
    }
  }

  function run(...args) {
    let callbacks,
      taskNames = null;
    callbacks = args.filter((arg) => typeof arg == "function");
    taskNames = args.filter((arg) => typeof arg == "string");

    if (taskNames) {
      for (let taskName of taskNames) {
        // retreive passed arguments
        let args = taskName.split(":").splice(1);
        // retreive task name
        taskName = taskName.split(":")[0];

        let callback = tasks[taskName];
        if (callback) {
          setTimeout(callback.bind(this, args), 0);
        }
      }
    }

    if (callbacks) {
      // callbacks for run
      for (const callback of callbacks) {
        setTimeout(callback, 0);
      }
    }
  }

  return {
    task: task,
    run: run,
  };
})();

module.exports = lauf;
