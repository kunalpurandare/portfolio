(() => {
    const grid = document.getElementById('projects-grid')
    const projects = window.portfolioData?.projects
    if (!grid || !Array.isArray(projects)) return

    const visualMarkup = () => `<div class="dashboard-preview" aria-label="Stylized preview of the NEXUS dashboard">
            <div class="dashboard-preview__bar"><i></i><i></i><i></i><span>NEXUS / OVERVIEW</span></div>
            <div class="dashboard-preview__shell">
                <aside class="dashboard-preview__nav"><b>NX</b><i></i><i></i><i></i><i></i></aside>
                <div class="dashboard-preview__content">
                    <div class="dashboard-preview__welcome"><span>GOOD MORNING</span><strong>Your day, at a glance.</strong></div>
                    <div class="dashboard-preview__metrics"><span><small>Tasks</small><b>08</b></span><span><small>Events</small><b>03</b></span><span><small>Focus</small><b>74%</b></span></div>
                    <div class="dashboard-preview__chart"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                </div>
            </div>
            <p><span></span> Live system preview</p>
        </div>`

    grid.innerHTML = projects.map(project => `<article class="project-card${project.featured ? ' project-card--featured' : ''}" data-project="${project.id}" tabindex="0" role="button" aria-label="View ${project.title} case study">
        <div class="project-card__visual">${visualMarkup()}</div>
        <div class="project-card__body">
            <div class="project-card__meta"><span>${project.number}</span><span class="project-status"><i></i>${project.status}</span></div>
            <p class="project-card__eyebrow">${project.eyebrow}</p><h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            <ul class="project-card__stack" aria-label="Technology stack">${project.stack.map(technology => `<li>${technology}</li>`).join('')}</ul>
            <div class="project-card__actions"><span class="project-link">View case study <i class="ri-arrow-right-up-line"></i></span></div>
        </div>
    </article>`).join('')

    const dialog = document.getElementById('project-dialog')
    if (!dialog) return
    const closeButton = dialog.querySelector('.project-dialog__close')

    const openCaseStudy = project => {
        dialog.querySelector('#project-dialog-title').textContent = project.title
        dialog.querySelector('.project-dialog__summary').textContent = project.description
        dialog.querySelector('.project-dialog__responsibilities').textContent = project.responsibilities
        dialog.querySelector('.project-dialog__architecture').textContent = project.architecture
        dialog.querySelector('.project-dialog__challenge').textContent = project.challenge
        dialog.querySelector('.project-dialog__outcome').textContent = project.outcome
        dialog.querySelector('.project-dialog__stack').innerHTML = project.stack.map(item => `<li>${item}</li>`).join('')
        dialog.showModal()
        closeButton.focus()
    }

    grid.querySelectorAll('.project-card').forEach(card => {
        const project = projects.find(item => item.id === card.dataset.project)
        card.addEventListener('click', () => openCaseStudy(project))
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openCaseStudy(project)
            }
        })
    })
    closeButton.addEventListener('click', () => dialog.close())
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close()
    })
})()
