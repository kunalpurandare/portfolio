window.portfolioData = Object.freeze({
    projects: [
        {
            id: 'nexus', number: '01 / Featured', status: 'Active build', featured: true,
            eyebrow: 'Personal product · Full stack', title: 'NEXUS — Personal Life OS',
            description: 'A self-hosted workspace that brings finances, tasks, calendar events, travel, media, useful links, and personal information into one focused interface.',
            stack: ['FastAPI', 'SQLite', 'Docker', 'Jinja2', 'PWA'],
            responsibilities: 'Product design, frontend and backend development, infrastructure, data modelling, and ongoing operations.',
            architecture: 'A modular FastAPI application with SQLite persistence, server-rendered Jinja2 views, PWA capabilities, and containerised deployment.',
            challenge: 'Combining many distinct personal workflows without turning the interface or underlying data model into a collection of disconnected tools.',
            outcome: 'One private, dependable dashboard with a consistent workflow and an architecture that can grow one module at a time.'
        }
    ],
    careerJourney: [
        {
            dates: '2014–2018', year: '2014', role: 'B.E — Bachelor Degree',
            company: 'Electronics & Telecommunication', location: 'Smt. Kashibai Navale College of Engineering, Sinhgad Campus, Pune', type: 'education', current: false
        },
        {
            dates: '2018–2019', year: '2018', role: 'CDAC — PGDAC',
            company: 'Post Graduate Diploma in Advanced Computing', location: 'D. Y. Patil, Akurdi, Pune', type: 'education', current: false
        },
        {
            dates: '2019–2021', year: '2019', role: 'Associate Software Engineer',
            company: 'Morningstar India Pvt. Ltd.', location: 'Navi Mumbai', type: 'work', current: false
        },
        {
            dates: '2021–2023', year: '2021', role: 'Software Engineer',
            company: 'Morningstar India Pvt. Ltd.', location: 'Navi Mumbai', type: 'work', current: false
        },
        {
            dates: '2023–2025', year: '2023', role: 'Senior Software Engineer',
            company: 'Morningstar India Pvt. Ltd.', location: 'Navi Mumbai', type: 'work', current: false
        },
        {
            dates: '2025–Present', year: 'Current', role: 'Assistant Vice President',
            company: '', location: 'Pune', type: 'work', current: true
        }
    ],
    lifeOutsideCode: [
        { title: 'Self Hosting', icon: 'ri-server-line', description: 'Building a dependable home for personal tools, information, and experiments.', project: 'NEXUS — Personal Life OS · Active', details: 'A self-hosted personal operating system for managing finances, tasks, calendar events, travel, media, links, and personal information from a single interface.', stack: ['FastAPI', 'SQLite', 'Docker', 'Jinja2', 'PWA'], meta: 'Always evolving', featured: true },
        { title: 'Gaming', icon: 'ri-gamepad-line', description: 'Story-driven games and worlds where choices carry weight.', details: 'A collection of story-rich adventures and open worlds I have completed.', meta: 'Completed adventures', games: [
            { title: 'Red Dead Redemption 2', image: 'assets/img/games/red-dead-redemption-2.jpg' },
            { title: "Marvel’s Spider-Man", image: 'assets/img/games/spider-man.jpg' },
            { title: 'Batman: Arkham Knight', image: 'assets/img/games/batman-arkham-knight.jpg' },
            { title: 'Uncharted 4: A Thief’s End', image: 'assets/img/games/uncharted-4.jpg' },
            { title: 'Uncharted: The Lost Legacy', image: 'assets/img/games/uncharted-lost-legacy.webp' },
            { title: 'Far Cry 3', image: 'assets/img/games/far-cry-3.jpg' },
            { title: 'Detroit: Become Human', image: 'assets/img/games/detroit-become-human.jpg' }
        ] },
        { title: 'Travel', icon: 'ri-road-map-line', description: 'Road trips, new places, and discovering a city beyond the usual route.', details: 'Outside engineering, I’m also a part-time photographer who enjoys capturing travel, landscapes, and memorable everyday moments.', reelUrl: 'https://www.instagram.com/reel/DaITho9zxOa/embed/', cta: 'Follow @galaxy__moments on Instagram', ctaUrl: 'https://www.instagram.com/galaxy__moments/', meta: 'Travel & photography' },
        { title: 'DIY & Electronics', icon: 'ri-cpu-line', description: 'Exploring small hardware ideas, useful mechanisms, and hands-on builds.', details: 'Add a short summary about projects you have built or ideas you want to explore.', meta: 'Editable interest' }
    ]
})
