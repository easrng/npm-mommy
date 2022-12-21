(async() => {
const fs = require("fs")
const path = require("path")
const npmPath = await fs.promises.realpath(await require("which")("npm"))
let attempt = path.resolve(npmPath, "../../lib/cli.js");
if(!fs.existsSync(attempt)) {
  attempt = path.resolve(npmPath, "../node_modules/npm/lib/cli.js")
  if(!fs.existsSync(attempt)) {
    console.error("Couldn't find npm.")
    process.exit(1)
  }
}
const npmDir = path.dirname(attempt)
if(fs.existsSync(path.join(npmDir, "mommy-patched"))) {
  console.log("Mommy already patched npm for you~ ❤️")
} else {
  fs.copyFileSync(path.join(__dirname, "npm-cli-wrapper.js"), path.join(npmDir, "cli.tmp.js"))
  fs.renameSync(path.join(npmDir, "cli.js"), path.join(npmDir, "mommy-patched-cli.js"))
  fs.renameSync(path.join(npmDir, "cli.tmp.js"), path.join(npmDir, "cli.js"))
  fs.writeFileSync(path.join(npmDir, "mommy-patched"), "Patched by mommy <3")
  console.log("Mommy is ready for you~ ❤️")
}
})()
