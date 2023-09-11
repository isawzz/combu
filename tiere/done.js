function showNavbar(titles, funcNames) {
	if (nundef(funcNames)) {
		//standard is that funcs are named: onclick${title}
		funcNames = titles.map(x => `onclick${capitalize(x)}`);
	}
	let html = `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">`;
	for (let i = 0; i < titles.length; i++) {
		html += `
					<li class="nav-item active">
					<a class="nav-link hoverHue" href="#" onclick="${funcNames[i]}()">${titles[i]}</a>
				</li>
			`;
	}
	html += `
			</ul>
			</div>
		</nav>
		`;
	document.body.innerHTML += html;
}

