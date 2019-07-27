fetch("/directories").then((res) => res.json()).then((res) => {
  res.forEach((dir) => {
    console.log(dir)
    const li = document.createElement("li");
    const span = document.createElement("span");
    const i = document.createElement("i");
    const a = document.createElement("a");
    a.textContent = dir;
    a.href = `${dir}`;
    a.target = "_blank";
    i.className = dir.startsWith('/') ? "far fa-folder icon-pad" : "far fa-file-alt icon-pad";
    span.appendChild(i);
    span.appendChild(a);
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.appendChild(span);
    document.querySelector("#dir-list").appendChild(li);
  });
});
