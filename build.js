const fs = require("fs");
const path = require("path");
const output = name => path.resolve(__dirname, "./js", name);

(async () => {
  const minify = async file => fs.writeFileSync(
    output(file.replace(/\.js$/, ".min.js")),
    (await require("terser").minify(fs.readFileSync(output(file), "utf8"), {
      ie8: true, format: {comments: false}
    })).code,
    'utf8'
  );

  const files = ["core", "excheck", "exedit", "exhide"];

  // concat
  fs.writeFileSync(
    output('jquery.ztree.all.js'),
    files.map(name => fs.readFileSync(output(`jquery.ztree.${name}.js`), 'utf8')
      .replace(/\${version}/, require('./package.json').version)
      .replace(/\${publish_date}/, new Date().toISOString().replace(/T.*/, ''))
    ).join('\n'),
    'utf8'
  );

  // minify
  ['all', ...files].forEach(name => minify(`jquery.ztree.${name}.js`));
})();
