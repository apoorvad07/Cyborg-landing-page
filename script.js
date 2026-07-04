const events = [
    {
        tag: "ROBOTICS",
        title: "Robowars",
        description: "Build a combat robot and battle it out in the arena. Last bot standing wins.",
        date: "Day 1",
        prize: "₹2,00,000"
    },
    {
        tag: "AI / ML",
        title: "Neural Nexus",
        description: "A 24-hour hackathon to build the most creative applied-AI solution.",
        date: "Day 1-2",
        prize: "₹1,50,000"
    },
    {
        tag: "SPACE",
        title: "Mission Mars",
        description: "Design a rover navigation system to solve a simulated Martian terrain challenge.",
        date: "Day 2",
        prize: "₹1,00,000"
    },
    {
        tag: "CYBERSECURITY",
        title: "Capture The Flag",
        description: "Break in, patch up, and outscore rival teams in a live CTF competition.",
        date: "Day 2",
        prize: "₹1,20,000"
    },
    {
        tag: "DESIGN",
        title: "CircuitCraft",
        description: "Rapid-prototype an IoT device from a surprise brief, judged live by industry mentors.",
        date: "Day 3",
        prize: "₹80,000"
    },
    {
        tag: "GAMING",
        title: "Arena Clash",
        description: "Esports showdown across top titles. Squad up and fight for the top slot.",
        date: "Day 1-3",
        prize: "₹1,00,000"
    }
];

const galleryItems = [
    { label: "Opening Ceremony", hue: "0,247,255" },
    { label: "Robowars Arena", hue: "168,85,247" },
    { label: "Hackathon Night", hue: "0,247,255" },
    { label: "Guest Keynote", hue: "168,85,247" },
    { label: "Exhibition Floor", hue: "0,247,255" },
    { label: "Drone Show", hue: "168,85,247" },
    { label: "Award Night", hue: "0,247,255" },
    { label: "Crowd & Lights", hue: "168,85,247" }
];

const sponsors = ["NEXORA", "QUANTUM.AI", "VERTEX LABS", "HELIX DYNAMICS", "ORBITAL TECH", "SYNAPSE", "ZENITH CORE", "ASTRA SYSTEMS"];

const team = [
    { name: "Apoorva Dwivedi", role: "Overall Coordinator" },
    { name: "Ayush Awasthi", role: "Technical Head" },
    { name: "Shantanu Dwivedi", role: "Design Lead" },
    { name: "Naina Gangwar", role: "Sponsorship Head" }
];


function renderEvents(){
    const grid = document.getElementById("eventsGrid");
    if(!grid) return;
    grid.innerHTML = events.map(ev => `
        <div class="event-card">
            <span class="event-tag">${ev.tag}</span>
            <h3>${ev.title}</h3>
            <p>${ev.description}</p>
            <div class="event-meta">
                <span>${ev.date}</span>
                <span>${ev.prize}</span>
            </div>
        </div>
    `).join("");
}


function renderGallery(){
    const grid = document.getElementById("galleryGrid");
    if(!grid) return;
    grid.innerHTML = galleryItems.map(item => `
        <div class="gallery-item" style="background: radial-gradient(circle at 30% 30%, rgba(${item.hue},0.25), #0b1120);">
            ${item.label}
        </div>
    `).join("");
}

function renderSponsors(){
    const grid = document.getElementById("sponsorsGrid");
    if(!grid) return;
    grid.innerHTML = sponsors.map(name => `
        <div class="sponsor-card">${name}</div>
    `).join("");
}

function renderTeam(){
    const grid = document.getElementById("teamGrid");
    if(!grid) return;
    grid.innerHTML = team.map(person => {
        const initials = person.name.split(" ").map(w => w[0]).join("");
        return `
            <div class="team-card">
                <div class="team-avatar">${initials}</div>
                <h3>${person.name}</h3>
                <p>${person.role}</p>
            </div>
        `;
    }).join("");
}


function startCountdown(){
    
    const targetDate = new Date("2026-12-26T09:00:00").getTime();

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if(!daysEl) return;

    function update(){
        const now = new Date().getTime();
        const distance = targetDate - now;

        if(distance <= 0){
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            clearInterval(timer);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    update();
    const timer = setInterval(update, 1000);
}


function animateStats(){
    const statEls = document.querySelectorAll(".stat-number");
    if(!statEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                const duration = 1500;
                const start = performance.now();

                function step(now){
                    const progress = Math.min((now - start) / duration, 1);
                    el.textContent = Math.floor(progress * target).toLocaleString();
                    if(progress < 1){
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target.toLocaleString();
                    }
                }
                requestAnimationFrame(step);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.4 });

    statEls.forEach(el => observer.observe(el));
}


function setupHamburger(){
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    if(!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        hamburger.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });
}


function setupBackToTop(){
    const btn = document.getElementById("backToTop");
    if(!btn) return;

    window.addEventListener("scroll", () => {
        if(window.scrollY > 500){
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderEvents();
    renderGallery();
    renderSponsors();
    renderTeam();
    startCountdown();
    animateStats();
    setupHamburger();
    setupBackToTop();
});
