// ? Load README.md
fetch("./../README.md")
  .then((res) => res.text())
  .then((text) => {
    const converter = new showdown.Converter(),
      html = converter.makeHtml(text);
    document.getElementById("readme").innerHTML = html;
  })
  .catch((e) => {
    alert("Error loading README.md");
    console.error(e);
  });

// ? Configure console.log
const output = document.getElementById("output");
console.stdlog = console.log.bind(console);
console.log = function () {
  if (!output.innerText) {
    output.innerText = Array.from(arguments).join(" ");
  } else {
    output.innerText =
      output.innerText + "\n" + Array.from(arguments).join(" ");
  }
  console.stdlog.apply(console, arguments);
};

const btn = document.getElementById("btn");
btn.onclick = () => {
  output.innerText = "";

  const oldScript = document.getElementById("script");
  if (oldScript) document.body.removeChild(oldScript);

  const script = document.createElement("script");
  script.setAttribute("id", "script");
  script.setAttribute("type", "module");
  script.innerText = document.getElementById("code").innerText;
  document.body.appendChild(script);
};
