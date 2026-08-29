/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


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

/*==================== Experience TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('experience__active');
        });

        target.classList.add('experience__active');

        tabs.forEach(tab => {
            tab.classList.remove('experience__active');
        })
        tab.classList.add('experience__active');
    })
});

// BULB
let bulb = document.getElementsByName('switch');
// console.log(bulb[0].getAttribute('value'))
// console.log(bulb[1].getAttribute('checked'))
// console.log(bulb[0].getAttribute('value'))
// console.log(bulb[1].getAttribute('checked'))
// bulb[0].addEventListener('click', () => {
//     alert('Button was clicked! : '+bulb[0].getAttribute('value'));
// });
// bulb[1].addEventListener('click', () => {
//     alert('Button was clicked! : '+bulb[1].getAttribute('value'));
// });

/*==================== DARK LIGHT THEME ====================*/ 
// const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
}

// Activate / deactivate the theme manually with the button
bulb.forEach(b=>{

    b.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme)
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
    })
});
