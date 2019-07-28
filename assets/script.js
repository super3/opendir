function getDirectories(path = "/") {
  fetch(`/directories?path=${path}`).then((res) => res.json()).then((res) => {
    document.querySelector("#dir-list").innerHTML = "";

    if(path !== "/") {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const i = document.createElement("i");
      const a = document.createElement("a");

        a.onclick = () => {
          getDirectories(`${path.split("/").slice(0, -1).join("/")}`);
        };

        a.href = `#`;

      a.textContent = "..";

      i.className = "far fa-folder icon-pad";
      span.appendChild(i);
      span.appendChild(a);
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.appendChild(span);
      document.querySelector("#dir-list").appendChild(li);
    }

    res.forEach((dir) => {
      console.log(dir)
      const li = document.createElement("li");
      const span = document.createElement("span");
      const i = document.createElement("i");
      const a = document.createElement("a");

      a.href = `.${path}/${dir}`;

      if(dir.startsWith('/')) {
        a.onclick = () => {
          getDirectories(`${path.slice(1, -1)}${dir}`);
        };

        a.href = `#`;
      }

      a.textContent = dir;

      i.className = dir.startsWith('/') ? "far fa-folder icon-pad" : "far fa-file-alt icon-pad";
      span.appendChild(i);
      span.appendChild(a);
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.appendChild(span);
      document.querySelector("#dir-list").appendChild(li);
    });
  });
}

getDirectories();
