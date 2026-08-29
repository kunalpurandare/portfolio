document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const loader = document.querySelector('.preloader')
    const percent = document.querySelector('.boot-loader__percent')
    const duration = reducedMotion ? 150 : 3600
    const start = performance.now()

    document.body.classList.add('is-loading')

    const finishLoading = () => {
        if (!loader) return
        if (percent) percent.textContent = '100%'
        loader.classList.add('preloader--complete')
        document.body.classList.remove('is-loading')
        document.body.classList.add('page-ready')
        setTimeout(() => loader.remove(), reducedMotion ? 20 : 650)
    }

    const updateLoader = now => {
        const progress = Math.min((now - start) / duration, 1)
        if (percent) percent.textContent = `${Math.round(progress * 100)}%`
        if (progress < 1) requestAnimationFrame(updateLoader)
        else finishLoading()
    }
    requestAnimationFrame(updateLoader)

    const animatedElements = document.querySelectorAll(
        '.section__subtitle, .section__title, .about__data, .about__image, .project-card, .experience__container, .skills__card, .certificates__data, .certificates__content, .contact__form'
    )

    animatedElements.forEach((element, index) => {
        element.classList.add('reveal-on-scroll')
        element.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`)
    })

    if ('IntersectionObserver' in window && !reducedMotion) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return
                entry.target.classList.add('is-revealed')
                observer.unobserve(entry.target)
            })
        }, { threshold: .14, rootMargin: '0px 0px -7% 0px' })
        animatedElements.forEach(element => observer.observe(element))
    } else {
        animatedElements.forEach(element => element.classList.add('is-revealed'))
    }

    document.querySelectorAll('.about__info-title').forEach(counter => {
        const target = Number.parseInt(counter.textContent, 10)
        if (!Number.isFinite(target) || reducedMotion) return
        counter.textContent = '00+'
        const counterObserver = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) return
            const counterStart = performance.now()
            const tick = now => {
                const progress = Math.min((now - counterStart) / 900, 1)
                const value = Math.round(target * (1 - Math.pow(1 - progress, 3)))
                counter.textContent = `${String(value).padStart(2, '0')}+`
                if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            counterObserver.disconnect()
        }, { threshold: .6 })
        counterObserver.observe(counter)
    })
})
