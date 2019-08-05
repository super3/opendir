function clearItems() {
	document.querySelector('#dir-list').innerHTML = '';
}

function addItem(dir, path = '') {
	const li = document.createElement('li');
	const span = document.createElement('span');
	const i = document.createElement('i');
	const a = document.createElement('a');

	if (path !== '/' && path !== '') {
	  a.href = `${path}/${dir}`;
	} else {
	  a.href = `${path}${dir}`;
	}

	if (dir.startsWith('/')) {
	  a.addEventListener('click', () => {
			getDirectories(`${path}${dir}`);
	  });

	  a.href = '#';
	}

	if (dir === '..') {
		a.addEventListener('click', () => {
		  getDirectories(`${path.split('/').slice(0, -1).join('/')}`);
		});

		a.href = '#';
	}

	a.textContent = dir;

	i.className = dir.startsWith('/') || dir === '..' ? 'far fa-folder icon-pad' : 'far fa-file-alt icon-pad';
	span.append(i);
	span.append(a);
	li.className = 'list-group-item d-flex justify-content-between align-items-center';
	li.append(span);
	document.querySelector('#dir-list').append(li);
}

function getDirectories(path = '/') {
	fetch(`/directories?path=${path}`).then(res => res.json()).then(res => {
		clearItems();

		addItem('..');

		res.sort();

		res.forEach(dir => {
			addItem(dir, path);
		});
	});
}

getDirectories();
