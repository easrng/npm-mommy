const real = require("./mommy-patched-cli.js")
module.exports = async process => {
  if(process.argv[2] === "mommy-uninstall") {
    const fs = require("fs")
    const path = require("path")
    fs.renameSync(path.join(__dirname, "mommy-patched-cli.js"), path.join(__dirname, "cli.js"))
    try { fs.unlinkSync(path.join(__dirname, "cli.tmp.js")) } catch (e) {}
    fs.unlinkSync(path.join(__dirname, "mommy-patched"))
    console.log("Bye~ ❤️")
    process.exit(0)
  }
  const mommyMode = process.argv[2] === "mommy"
  const mommysLittle = process.env.NPM_MOMMYS_LITTLE || process.env.CARGO_MOMMYS_LITTLE || "girl"
  if(mommyMode) {
    const prefix = "\x1b[1m"
    const suffix = "\x1b[0m"
    process.argv.splice(2, 1)
    process.on('exit', code => {
      console.log("")
      if(code === 0) {
        console.log(`${prefix}Good ${mommysLittle}~\nMommy's so proud of you~ ❤️${suffix}`)
      } else {
        console.log(`${prefix}Mommy knows her little ${mommysLittle} can do better~ ❤️${suffix}`)
      }
    })
  }
  await real(process)
}
