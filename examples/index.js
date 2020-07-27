const taskRunner = require("../index");

taskRunner.task("copy", function(){ 
// time consuming copy task
console.log(this.name, "task is done!"); // copy task is done
})

taskRunner.task("build", function(){ 
// time consuming build task
console.log(this.name, "task is done!"); // build task is done!
})

taskRunner.task("sum", function(a, b){ 
let sum = Number(a) + Number(b);
console.log("sum is", sum); // sum is 90
console.log(this.name, " task is done!"); // sum task is done!
})

taskRunner.run("sum:50:40", function() {
console.log("All long running task completed");
})

taskRunner.run("copy", "build", function() {
console.log("All long running task completed");
})