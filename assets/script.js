function clearItems() {
	document.querySelector("#dir-list").innerHTML = "";
}

function addItem(dir, path = "") {
	const li = document.createElement("li");
	const span = document.createElement("span");
	const i = document.createElement("i");
	const a = document.createElement("a");

	if(path !== "/" && path !== "") {
	  a.href = `${path}/${dir}`;
	} else {
	  a.href = `${path}${dir}`;
	}

	if(dir.startsWith('/')) {
	  a.onclick = () => {
		getDirectories(`${path}${dir}`);
	  };

	  a.href = `#`;
	}

	if(dir === "..") {
		a.onclick = () => {
		  getDirectories(`${path.split("/").slice(0, -1).join("/")}`);
		};

		a.href = `#`;
	}

	a.textContent = dir;

	i.className = dir.startsWith('/') || dir === '..' ? "far fa-folder icon-pad" : "far fa-file-alt icon-pad";
	span.appendChild(i);
	span.appendChild(a);
	li.className = "list-group-item d-flex justify-content-between align-items-center";
	li.appendChild(span);
	document.querySelector("#dir-list").appendChild(li);
}

function getDirectories(path = "/") {
  fetch(`/directories?path=${path}`).then((res) => res.json()).then((res) => {
    clearItems();

	addItem('..');

	res.sort();

    res.forEach(dir => {
		addItem(dir, path);
    });
  });
}

getDirectories();
