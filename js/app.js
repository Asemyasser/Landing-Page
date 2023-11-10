// selecting all section elements in HTML file
const selectSec = document.getElementsByTagName('section');

// creating fragment to avoid alot of reflow
const frag = document.createDocumentFragment();

// calling the ul id from html to be able to set the fragment in ul
const ul = document.getElementById('navbar__list');

// creating new list contains a link for each section
for (const sect of selectSec) {
	const sectData = sect.dataset.nav;
	const newLiElem = document.createElement('li');
	const newA = document.createElement('a');
	const linkText = document.createTextNode(sectData);
	newA.appendChild(linkText);
	newA.classList.add('menu__link');
	newLiElem.appendChild(newA);

	// go to the section smoothly when it be clicked
	newA.addEventListener('click', function(eve) {
		eve.preventDefault();
		sect.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});

	frag.appendChild(newLiElem);
}
ul.appendChild(frag);

// create an event Listener and active the class when the section is located between its dimension
document.addEventListener('scroll', whileScrlling);

function whileScrlling() {
	for (const elem of selectSec) {
		const dimension = elem.getBoundingClientRect();
		const elemData = elem.dataset.nav;

		if (dimension.top >= 0 && dimension.top < 300) {
			// remove Active class when it's not in the dimension
			for (const notAct of selectSec) {
				notAct.classList.remove('your-active-class');
			}
			// create Active class when it's in the dimension
			elem.classList.add('your-active-class');

			// sellect all anchor tags
			const selectLi = document.querySelectorAll('a');

			// it's in active area or not
			for (const link of selectLi) {
				if (link.innerText === elemData) {
					for (const perLink of selectLi) {
						// if not, then remove the class
						perLink.classList.remove('your_active_link');
					}
					// if yes, then add the class
					link.classList.add('your_active_link');
				}
			}
		}
	}
}
