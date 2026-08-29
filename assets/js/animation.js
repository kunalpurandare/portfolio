document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const loader = document.querySelector('.preloader')
    const percent = document.querySelector('.boot-loader__percent')

    const showPageWithoutMotion = () => {
        if (percent) percent.textContent = '100%'
        if (loader) loader.remove()
        document.body.classList.remove('is-loading')
    }

    document.body.classList.add('is-loading')

    if (reducedMotion || typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
        window.setTimeout(showPageWithoutMotion, reducedMotion ? 50 : 900)
        return
    }

    gsap.registerPlugin(ScrollTrigger)
    document.documentElement.classList.add('gsap-enabled')
    setupThemeMotion()
    const loadState = { value: 0 }
    const loaderTimeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
            loader?.remove()
            document.body.classList.remove('is-loading')
            initPageMotion()
        }
    })

    loaderTimeline
        .to(loadState, {
            value: 100,
            duration: 3.6,
            ease: 'power1.inOut',
            onUpdate: () => { if (percent) percent.textContent = `${Math.round(loadState.value)}%` }
        }, 0)
        .to('.boot-loader', { y: -12, scale: .985, opacity: 0, duration: .45 }, 3.6)
        .to('.preloader', { opacity: 0, duration: .5 }, 3.72)

    function initPageMotion() {
        const heroTyping = prepareHeroTitle()
        setupNavigationIndicator()

        gsap.from('.home__data > *', { y: 24, opacity: 0, duration: .65, stagger: .08, ease: 'power3.out' })
        if (heroTyping) {
            const typingState = { characters: 0 }
            gsap.to(typingState, {
                characters: heroTyping.text.length,
                duration: 1.45,
                delay: .28,
                ease: 'none',
                onUpdate: () => {
                    const typed = heroTyping.text.slice(0, Math.round(typingState.characters))
                    const splitAt = typed.indexOf(' ')
                    if (splitAt === -1) {
                        heroTyping.first.textContent = typed
                        heroTyping.second.textContent = ''
                        heroTyping.first.appendChild(heroTyping.cursor)
                    } else {
                        heroTyping.first.textContent = typed.slice(0, splitAt)
                        heroTyping.second.textContent = typed.slice(splitAt + 1)
                        heroTyping.second.appendChild(heroTyping.cursor)
                    }
                },
                onComplete: () => heroTyping.cursor.classList.add('type-cursor--settled')
            })
        }
        gsap.from('.home__image', { x: 40, opacity: 0, rotateY: -7, duration: .85, ease: 'power3.out' })
        gsap.from('.home__social', { width: 0, x: -16, opacity: 0, duration: .62, delay: .35, ease: 'power3.out', clearProps: 'width,x,opacity' })

        gsap.utils.toArray('.section').forEach(section => {
            const headings = section.querySelectorAll('.section__subtitle, .section__title')
            if (!headings.length) return
            gsap.from(headings, {
                scrollTrigger: { trigger: section, start: 'top 82%', once: true },
                y: 22, opacity: 0, duration: .55, stagger: .08, ease: 'power2.out'
            })
        })

        ScrollTrigger.batch('.about__data, .about__image, .certificates__data, .certificates__content', {
            start: 'top 86%',
            once: true,
            onEnter: batch => gsap.from(batch, {
                y: 34, opacity: 0, duration: .62, stagger: .1, ease: 'power3.out', clearProps: 'transform,opacity'
            })
        })

        setupProjectMotion()
        setupSkillsMotion()
        setupAwardsMotion()
        setupContactMotion()

        const journey = document.querySelector('.journey')
        if (journey) {
            gsap.fromTo('.journey__progress', { scaleY: 0 }, {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: { trigger: journey, start: 'top 72%', end: 'bottom 65%', scrub: .45 }
            })

            gsap.utils.toArray('.journey__checkpoint').forEach((checkpoint, index) => {
                const card = checkpoint.querySelector('.journey__card')
                const marker = checkpoint.querySelector('.journey__marker')
                const timeline = gsap.timeline({
                    scrollTrigger: { trigger: checkpoint, start: 'top 78%', end: 'top 52%', scrub: .35 }
                })
                timeline
                    .fromTo(marker, { scale: .55, opacity: .35 }, { scale: 1, opacity: 1, duration: .35 })
                    .fromTo(card, { x: index % 2 ? 24 : -24, opacity: .25 }, { x: 0, opacity: 1, duration: .65 }, 0)
                    .to(marker, { boxShadow: '0 0 0 9px rgba(25,211,174,.08), 0 0 24px var(--first-color)', duration: .3 }, .2)

                ScrollTrigger.create({
                    trigger: checkpoint,
                    start: 'top 58%',
                    onEnter: () => checkpoint.classList.add('is-complete'),
                    onLeaveBack: () => checkpoint.classList.remove('is-complete')
                })
            })
        }

        document.querySelectorAll('.about__info-title').forEach(counter => {
            const target = Number.parseInt(counter.textContent, 10)
            if (!Number.isFinite(target)) return
            const state = { value: 0 }
            gsap.to(state, {
                value: target,
                duration: .9,
                ease: 'power2.out',
                scrollTrigger: { trigger: counter, start: 'top 88%', once: true },
                onUpdate: () => { counter.textContent = `${String(Math.round(state.value)).padStart(2, '0')}+` }
            })
        })

        gsap.to('.ambient-orb--one', {
            yPercent: -12, xPercent: 8, ease: 'none',
            scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5 }
        })
        gsap.to('.ambient-orb--two', {
            yPercent: 16, xPercent: -8, ease: 'none',
            scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5 }
        })
    }

    function prepareHeroTitle() {
        const title = document.querySelector('.home__title')
        if (!title || title.querySelector('.typewriter-line')) return null
        const text = title.textContent.trim()
        title.textContent = ''
        title.setAttribute('aria-label', text)
        const first = document.createElement('span')
        const second = document.createElement('span')
        const cursor = document.createElement('span')
        first.className = 'typewriter-line typewriter-line--first'
        second.className = 'typewriter-line typewriter-line--second'
        cursor.className = 'type-cursor'
        cursor.setAttribute('aria-hidden', 'true')
        first.appendChild(cursor)
        title.append(first, document.createTextNode(' '), second)
        return { text, first, second, cursor }
    }

    function setupNavigationIndicator() {
        const menu = document.querySelector('.nav__menu')
        const links = [...document.querySelectorAll('.nav__link')]
        if (!menu || !links.length) return
        const indicator = document.createElement('span')
        indicator.className = 'nav__indicator'
        indicator.setAttribute('aria-hidden', 'true')
        menu.appendChild(indicator)

        const moveIndicator = link => {
            if (!link || window.innerWidth <= 1023) return
            const menuRect = menu.getBoundingClientRect()
            const linkRect = link.getBoundingClientRect()
            gsap.to(indicator, {
                x: linkRect.left - menuRect.left,
                width: linkRect.width,
                opacity: 1,
                duration: .38,
                ease: 'power3.out'
            })
        }

        const observer = new MutationObserver(() => moveIndicator(document.querySelector('.nav__link.active-link')))
        links.forEach(link => observer.observe(link, { attributes: true, attributeFilter: ['class'] }))
        links.forEach(link => link.addEventListener('mouseenter', () => moveIndicator(link)))
        menu.addEventListener('mouseleave', () => moveIndicator(document.querySelector('.nav__link.active-link')))
        window.addEventListener('resize', () => moveIndicator(document.querySelector('.nav__link.active-link')))
        moveIndicator(document.querySelector('.nav__link.active-link'))
    }

    function setupProjectMotion() {
        const card = document.querySelector('.project-card')
        if (!card) return
        const preview = card.querySelector('.dashboard-preview')
        const widgets = card.querySelectorAll('.dashboard-preview__grid span')
        const tags = card.querySelectorAll('.project-card__stack li')
        const status = card.querySelector('.project-status')
        const timeline = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 82%', once: true } })
        timeline
            .from(card, { y: 38, opacity: 0, duration: .65, ease: 'power3.out' })
            .from(preview, { clipPath: 'inset(0 100% 0 0)', duration: .75, ease: 'power3.inOut' }, '-=.38')
            .from(widgets, { y: 12, opacity: 0, scale: .94, duration: .4, stagger: .06, ease: 'power2.out' }, '-=.35')
            .from(tags, { y: 8, opacity: 0, duration: .32, stagger: .045 }, '-=.25')
            .fromTo(status, { scale: .9 }, { scale: 1, duration: .42, ease: 'back.out(2)' }, '-=.2')
        if (preview) gsap.to(preview, {
            yPercent: -5,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: .8 }
        })
    }

    function setupSkillsMotion() {
        const cards = gsap.utils.toArray('.skills__card')
        if (!cards.length) return
        const timeline = gsap.timeline({
            scrollTrigger: { trigger: '.skills__container', start: 'top 82%', once: true },
            onComplete: () => document.documentElement.classList.add('skills-float-ready')
        })
        timeline.from(cards, { y: 28, opacity: 0, duration: .55, stagger: .12, ease: 'power3.out' })
        cards.forEach((card, index) => {
            timeline.from(card.querySelector('.skills__icon'), { scale: .72, rotate: -6, opacity: 0, duration: .4, ease: 'back.out(1.8)' }, .18 + index * .12)
            timeline.from(card.querySelectorAll('.skills__title, .skills__description'), { y: 10, opacity: 0, duration: .35, stagger: .06 }, .26 + index * .12)
        })
    }

    function setupAwardsMotion() {
        const items = gsap.utils.toArray('.certificates__item')
        if (!items.length) return
        const timeline = gsap.timeline({ scrollTrigger: { trigger: '.certificates__content', start: 'top 84%', once: true } })
        timeline
            .from('.certificates__content', { y: 25, opacity: 0, duration: .55, ease: 'power2.out' })
            .from(items, { y: 14, opacity: 0, duration: .42, stagger: .1 }, '-=.25')
            .from(items, { '--check-scale': 0, duration: .3, stagger: .1, ease: 'back.out(2)' }, '-=.35')
    }

    function setupContactMotion() {
        const form = document.querySelector('.contact__form')
        if (!form) return
        const fields = form.querySelectorAll('.contact__input, .g-recaptcha, .contact__button')
        gsap.set(form, { clearProps: 'clipPath,opacity,visibility,transform' })
        gsap.from(fields, {
            scrollTrigger: { trigger: form, start: 'top 90%', once: true },
            y: 14,
            opacity: 0,
            duration: .4,
            stagger: .08,
            ease: 'power2.out',
            clearProps: 'transform,opacity'
        })
    }

    function setupThemeMotion() {
        window.addEventListener('portfolio:themechange', () => {
            const targets = '.header .nav, .about__data, .project-card, .experience__container, .skills__card, .certificates__container, .contact__form'
            gsap.fromTo(targets,
                { filter: 'brightness(1.12)', scale: .997 },
                { filter: 'brightness(1)', scale: 1, duration: .55, ease: 'power2.out', clearProps: 'filter,scale', stagger: .018 }
            )
            gsap.fromTo('.ambient-orb', { scale: .82, opacity: .05 }, { scale: 1, opacity: .2, duration: .75, ease: 'power3.out', clearProps: 'scale,opacity' })
        })
    }
})
