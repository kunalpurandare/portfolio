(() => {
    const data = window.portfolioData
    if (!data) return

    const escapeHtml = value => String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')

    const journey = document.getElementById('career-journey')
    if (journey && Array.isArray(data.careerJourney)) {
        journey.innerHTML = `
            <div class="journey__rail" aria-hidden="true"><span class="journey__progress"></span></div>
            ${data.careerJourney.map(item => `
                <article class="journey__checkpoint${item.current ? ' journey__checkpoint--current' : ''}">
                    <time class="journey__date" datetime="${escapeHtml(item.dates.split('–')[0])}">
                        <strong>${escapeHtml(item.year)}</strong>
                        <span>${escapeHtml(item.dates)}</span>
                    </time>
                    <div class="journey__marker" aria-hidden="true"><i class="${item.type === 'education' ? 'ri-graduation-cap-line' : 'ri-briefcase-line'}"></i></div>
                    <div class="journey__card">
                        <div class="journey__meta"><span>${item.type === 'education' ? 'Education' : item.current ? 'Current role' : 'Career milestone'}</span></div>
                        <h3>${escapeHtml(item.role)}</h3>
                        ${item.company ? `<p>${escapeHtml(item.company)}</p>` : ''}
                        ${item.location ? `<p><i class="ri-map-pin-line" aria-hidden="true"></i>${escapeHtml(item.location)}</p>` : ''}
                    </div>
                </article>
            `).join('')}`
    }

    const lifeGrid = document.getElementById('life-grid')
    const lifeDialog = document.getElementById('life-dialog')
    if (lifeGrid && Array.isArray(data.lifeOutsideCode)) {
        lifeGrid.innerHTML = data.lifeOutsideCode.map((item, index) => `
            <button class="life-card${item.featured ? ' life-card--featured' : ''}" type="button" data-life-index="${index}" aria-label="View details about ${escapeHtml(item.title)}">
                <div class="life-card__icon" aria-hidden="true"><i class="${escapeHtml(item.icon)}"></i></div>
                <div class="life-card__content">
                    <p class="life-card__meta">${escapeHtml(item.meta)}</p>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.description)}</p>
                </div>
            </button>
        `).join('')

        lifeGrid.addEventListener('click', event => {
            const card = event.target.closest('[data-life-index]')
            if (!card || !lifeDialog) return
            const item = data.lifeOutsideCode[Number(card.dataset.lifeIndex)]
            lifeDialog.querySelector('.life-dialog__icon i').className = item.icon
            lifeDialog.querySelector('.life-dialog__meta').textContent = item.meta
            lifeDialog.querySelector('#life-dialog-title').textContent = item.title
            lifeDialog.querySelector('.life-dialog__project').textContent = item.project || ''
            lifeDialog.querySelector('.life-dialog__summary').textContent = item.details || item.description
            const games = lifeDialog.querySelector('.life-dialog__games')
            games.hidden = !Array.isArray(item.games) || !item.games.length
            games.querySelector('.life-dialog__game-track').innerHTML = Array.isArray(item.games)
                ? item.games.map(game => `
                    <article class="life-game">
                        <img src="${escapeHtml(game.image)}" alt="" loading="lazy">
                        <h5>${escapeHtml(game.title)}</h5>
                    </article>
                `).join('')
                : ''
            lifeDialog.querySelector('.life-dialog__stack').innerHTML = Array.isArray(item.stack)
                ? item.stack.map(technology => `<li>${escapeHtml(technology)}</li>`).join('')
                : ''
            const media = lifeDialog.querySelector('.life-dialog__media')
            media.replaceChildren()
            media.hidden = !item.reelUrl
            if (item.reelUrl) {
                const reel = document.createElement('iframe')
                reel.src = item.reelUrl
                reel.title = `${item.title} Instagram Reel`
                reel.loading = 'lazy'
                reel.allowFullscreen = true
                reel.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture')
                media.append(reel)
            }
            const cta = lifeDialog.querySelector('.life-dialog__cta')
            cta.hidden = !item.ctaUrl
            cta.textContent = item.cta || ''
            cta.href = item.ctaUrl || '#'
            lifeDialog.showModal()
        })
    }

    if (lifeDialog) {
        const closeLifeDialog = () => {
            lifeDialog.close()
            lifeDialog.querySelector('.life-dialog__media').replaceChildren()
        }
        lifeDialog.querySelector('.life-dialog__close').addEventListener('click', closeLifeDialog)
        lifeDialog.addEventListener('click', event => {
            if (event.target === lifeDialog) closeLifeDialog()
        })
        lifeDialog.addEventListener('close', () => lifeDialog.querySelector('.life-dialog__media').replaceChildren())
    }
})()
