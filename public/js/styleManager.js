const styleElement = document.querySelector("#page-styles");
const toggleAppearceModeBtn = document.querySelector("#appearance-mode-button");
const darkModeHref = "/css/base_styles_dark.css";
const lightModeHref = "/css/base_styles.css";

let overrideSytem = false;
// check if user has saved prefs
let preferedMode = "";

const setDarkMode = (setPref) => {
	styleElement.setAttribute("href", darkModeHref);
	if(setPref) localStorage.setItem('preferedMode', 'dark');
}

const setLightmode = (setPref) => {
	styleElement.setAttribute("href", lightModeHref);
	if(setPref) localStorage.setItem('preferedMode', 'light');
}

const toggleAppearance = () => {
	overrideSytem = true;
	const modeHref = styleElement.getAttribute("href");
	(modeHref === darkModeHref) ? setLightmode(true) : setDarkMode(true);
}


if(localStorage.getItem('preferedMode') !== null){
	preferedMode = localStorage.getItem('preferedMode');
	overrideSytem = true;
	console.log(preferedMode);
	(preferedMode === 'dark') ? setDarkMode() : setLightmode();
}


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    if(!overrideSytem) setDarkMode();
}

// watch for changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    //const newColorScheme = e.matches ? "dark" : "light";
    if(!overrideSytem){
    	e.matches ? setDarkMode() : setLightmode();
    }
});

toggleAppearceModeBtn.addEventListener('click', toggleAppearance);