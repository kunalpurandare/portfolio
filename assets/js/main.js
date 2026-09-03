/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
        navToggle.setAttribute('aria-expanded', 'true')
        document.body.classList.add('menu-open')
        navClose?.focus()
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
        navToggle?.setAttribute('aria-expanded', 'false')
        document.body.classList.remove('menu-open')
        navToggle?.focus()
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
    navToggle?.setAttribute('aria-expanded', 'false')
    document.body.classList.remove('menu-open')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu?.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu')
        navToggle?.setAttribute('aria-expanded', 'false')
        document.body.classList.remove('menu-open')
        navToggle?.focus()
    }
})

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && navMenu?.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu')
        navToggle?.setAttribute('aria-expanded', 'false')
        document.body.classList.remove('menu-open')
    }
})


/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
    e.preventDefault()
    const captchaResponse = document.getElementById('g-recaptcha-response')
    if(captchaResponse != undefined && captchaResponse != null && captchaResponse.value != ''){
        emailjs.sendForm('service_nlk6fo1', 'template_i3qij3p', '#contact-form')
            .then((response) => {
                contactMessage.textContent = 'Your message has been sent successfully ✅'

                setTimeout(() => {
                    contactMessage.textContent = ''
                }, 5000)

                contactForm.reset()
            }, (error) => {
                contactMessage.textContent = 'An error occurred, please try again later ❌'
            });
        }
    else{
        contactMessage.textContent = 'Please fill out the captcha.'
    }
}

if (contactForm) contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
let lastActiveSection = ''
    
const scrollActive = () =>{
    const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(!sectionsClass) return

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
			if (lastActiveSection !== sectionId) {
				lastActiveSection = sectionId
				const sectionName = sectionsClass.textContent.trim()
				history.replaceState(null, '', `#${sectionId}`)
				document.title = `${sectionName} | Kunal Purandare`
			}
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== IMMERSIVE UI ===============*/
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const progressBar = document.querySelector('.scroll-progress')
const cursorGlow = document.querySelector('.cursor-glow')

const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    if (progressBar) progressBar.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`
}
window.addEventListener('scroll', updateProgress, { passive: true })
updateProgress()

if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
        if (cursorGlow) {
            cursorGlow.style.setProperty('--mouse-x', `${event.clientX}px`)
            cursorGlow.style.setProperty('--mouse-y', `${event.clientY}px`)
        }
    }, { passive: true })

    document.querySelectorAll('.tilt-card, .about__image, .certificates__content').forEach(card => {
        card.addEventListener('pointermove', event => {
            const rect = card.getBoundingClientRect()
            const rotateX = ((event.clientY - rect.top) / rect.height - .5) * -10
            const rotateY = ((event.clientX - rect.left) / rect.width - .5) * 10
            card.style.setProperty('--rx', `${rotateX}deg`)
            card.style.setProperty('--ry', `${rotateY}deg`)
            card.style.setProperty('--shine-x', `${event.clientX - rect.left}px`)
            card.style.setProperty('--shine-y', `${event.clientY - rect.top}px`)
        })
        card.addEventListener('pointerleave', () => {
            card.style.setProperty('--rx', '0deg')
            card.style.setProperty('--ry', '0deg')
        })
    })

    document.querySelectorAll('.magnetic').forEach(button => {
        button.addEventListener('pointermove', event => {
            const rect = button.getBoundingClientRect()
            button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .12}px, ${(event.clientY - rect.top - rect.height / 2) * .12}px)`
        })
        button.addEventListener('pointerleave', () => button.style.transform = '')
    })
}

/*==================== DARK / LIGHT THEME ====================*/
const bulb = document.getElementsByName('switch')
const lightThemeClass = 'light-theme'
const selectedTheme = localStorage.getItem('portfolio-theme-v2')
const getCurrentTheme = () => document.body.classList.contains(lightThemeClass) ? 'light' : 'dark'

if (selectedTheme === 'light') document.body.classList.add(lightThemeClass)

bulb.forEach(control => {
    control.addEventListener('click', () => {
        document.body.classList.toggle(lightThemeClass)
        localStorage.setItem('portfolio-theme-v2', getCurrentTheme())
        window.dispatchEvent(new CustomEvent('portfolio:themechange', {
            detail: { theme: getCurrentTheme() }
        }))
    })
});
