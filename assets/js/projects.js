(() => {
    const grid = document.getElementById('projects-grid')
    const projects = window.portfolioData?.projects
    if (!grid || !Array.isArray(projects)) return

    const visualMarkup = type => {
        if (type === 'infrastructure') return `<div class="infra-map" aria-label="Infrastructure diagram">
            <div class="infra-node infra-node--source">LAN / Internet</div><span class="infra-path"></span><div class="infra-node infra-node--gateway">Nginx</div>
            <div class="infra-branches" aria-hidden="true"><span></span><span></span><span></span></div>
            <div class="infra-services"><div class="infra-node">Nexus</div><div class="infra-node">Vaultwarden</div><div class="infra-node">Homepage</div></div>
        </div>`
        if (type === 'pipeline') return `<div class="pipeline-map" aria-label="Data pipeline diagram">
            <span>Vendor feeds</span><i class="ri-arrow-right-line"></i><span>Python processing</span><i class="ri-arrow-right-line"></i><span>Oracle</span>
        </div>`
        return `<div class="dashboard-preview" aria-label="NEXUS dashboard placeholder">
            <div class="dashboard-preview__bar"><i></i><i></i><i></i><span>NEXUS / HOME</span></div>
            <div class="dashboard-preview__grid"><span></span><span></span><span></span><span></span><span></span><span></span></div><p>Screenshot ready</p>
        </div>`
    }

    grid.innerHTML = projects.map(project => `<article class="project-card${project.featured ? ' project-card--featured' : ''}" data-project="${project.id}">
        <div class="project-card__visual">${visualMarkup(project.visual)}</div>
        <div class="project-card__body">
            <div class="project-card__meta"><span>${project.number}</span><span class="project-status"><i></i>${project.status}</span></div>
            <p class="project-card__eyebrow">${project.eyebrow}</p><h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            <ul class="project-card__stack" aria-label="Technology stack">${project.stack.map(technology => `<li>${technology}</li>`).join('')}</ul>
            <div class="project-card__actions"><span class="project-link project-link--muted">Case study coming soon</span></div>
        </div>
    </article>`).join('')
})()
