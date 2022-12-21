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
  fs.renameSync(path.join(npmDir, "mommy-patched-cli.js"), path.join(npmDir, "cli.js"))
  try { fs.unlinkSync(path.join(npmDir, "cli.tmp.js")) } catch (e) {}
  fs.unlinkSync(path.join(npmDir, "mommy-patched"))
  console.log("Bye~ ❤️")
}
})()
