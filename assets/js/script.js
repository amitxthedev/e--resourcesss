function toggleTheme() {
    document.body.classList.toggle("light");
    const themeIcon = document.getElementById("theme-icon");

    if (document.body.classList.contains("light")) {
        themeIcon?.classList.remove("fa-moon");
        themeIcon?.classList.add("fa-sun");
    } else {
        themeIcon?.classList.remove("fa-sun");
        themeIcon?.classList.add("fa-moon");
    }
}

function toggleSidebar() {
    const aside = document.getElementById("sidebar");
    aside.classList.toggle("active");
}

// Fetch and show projects
fetch("/assets/json/projects.json")
    .then((res) => res.json())
    .then((data) => {
        const path = window.location.pathname;

        // Show only latest 4 on index.html
        if (path.includes("index.html") || path === "/") {
            const container = document.getElementById("latest-projects");
            if (container) {
                const latestProjects = data.projects.slice(0, 4);
                latestProjects.forEach((project) => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                        <h3>${project.name}</h3>
                        <p class="tech">Technologies: ${project.technologies.join(', ')}</p>
                        <p class="price">${project.price}</p>
                        <a href="${project.details_url}" class="buy-btn">View Details</a>
                    `;
                    container.appendChild(card);
                });
            }
        }

        // Show all on projects.html
        if (path.includes("projects.html")) {
            const container = document.getElementById("projects-container");
            if (container) {
                data.projects.forEach((project) => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                        <h3>${project.name}</h3>
                        <p class="tech">Technologies: ${project.technologies.join(', ')}</p>
                        <p class="price">${project.price}</p>
                        <a href="${project.details_url}" class="buy-btn">View Details</a>
                    `;
                    container.appendChild(card);
                });
            }
        }
    })
    .catch((err) => console.error("Error loading projects:", err));

// Fetch and show notes
fetch("/assets/json/notes.json")
    .then((res) => res.json())
    .then((data) => {
        // Detect the current page
        const path = window.location.pathname;

        // If on index.html, show only latest 4
        if (path.includes("index.html") || path === "/") {
            const container = document.getElementById("latest-notes");
            if (container) {
                const latestNotes = data.notes.slice(0, 4);
                latestNotes.forEach((note) => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                        <h3>${note.title}</h3>
                        <p class="tech">${note.description}</p>
                        <p class="price">${note.price}</p>
                        <a href="${note.link}" class="buy-btn">Download</a>
                    `;
                    container.appendChild(card);
                });
            }
        }

        // If on notes.html, show all notes
        if (path.includes("notes.html")) {
            const container = document.getElementById("notes-container");
            if (container) {
                data.notes.forEach((note) => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                        <h3>${note.title}</h3>
                        <p class="tech">${note.description}</p>
                        <p class="price">${note.price}</p>
                        <a href="${note.link}" class="buy-btn">Download</a>
                    `;
                    container.appendChild(card);
                });
            }
        }
    })
    .catch((err) => console.error("Error loading notes:", err));

// Pagination Configuration for Projects
const projectsPerPage = 6;
let currentPage = 1;

// Fetch and show projects with pagination
fetch("/assets/json/projects.json")
    .then((res) => res.json())
    .then((data) => {
        const path = window.location.pathname;

        if (path.includes("projects.html")) {
            const container = document.getElementById("projects-container");
            const paginationContainer = document.getElementById("pagination");

            function renderProjects() {
                container.innerHTML = "";

                const startIndex = (currentPage - 1) * projectsPerPage;
                const endIndex = startIndex + projectsPerPage;
                const currentProjects = data.projects.slice(startIndex, endIndex);

                currentProjects.forEach((project) => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                        <h3>${project.name}</h3>
                        <p class="tech">Technologies: ${project.technologies.join(', ')}</p>
                        <p class="price">${project.price}</p>
                        <a href="${project.details_url}" class="buy-btn">View Details</a>
                    `;
                    container.appendChild(card);
                });

                renderPagination(data.projects.length);
            }

            function renderPagination(totalItems) {
                paginationContainer.innerHTML = "";

                const totalPages = Math.ceil(totalItems / projectsPerPage);

                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement("button");
                    btn.textContent = i;
                    btn.className = i === currentPage ? "active" : "";
                    btn.addEventListener("click", () => {
                        currentPage = i;
                        renderProjects();
                    });
                    paginationContainer.appendChild(btn);
                }
            }

            renderProjects();
        }
    })
    .catch((err) => console.error("Error loading projects:", err));

// Pagination Configuration for Notes
const notesPerPage = 6;
let currentNotesPage = 1;

// Fetch and show notes with pagination
fetch("/assets/json/notes.json")
    .then((res) => res.json())
    .then((data) => {
        const path = window.location.pathname;

        if (path.includes("notes.html")) {
            const container = document.getElementById("notes-container");
            const paginationContainer = document.getElementById("notes-pagination");

            function renderNotes() {
                container.innerHTML = "";

                const startIndex = (currentNotesPage - 1) * notesPerPage;
                const endIndex = startIndex + notesPerPage;
                const currentNotes = data.notes.slice(startIndex, endIndex);

                currentNotes.forEach((note) => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                        <h3>${note.title}</h3>
                        <p class="tech">${note.description}</p>
                        <p class="price">${note.price}</p>
                        <a href="${note.link}" class="buy-btn">Download</a>
                    `;
                    container.appendChild(card);
                });

                renderNotesPagination(data.notes.length);
            }

            function renderNotesPagination(totalItems) {
                paginationContainer.innerHTML = "";

                const totalPages = Math.ceil(totalItems / notesPerPage);

                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement("button");
                    btn.textContent = i;
                    btn.className = i === currentNotesPage ? "active" : "";
                    btn.addEventListener("click", () => {
                        currentNotesPage = i;
                        renderNotes();
                    });
                    paginationContainer.appendChild(btn);
                }
            }

            renderNotes();
        }
    })
    .catch((err) => console.error("Error loading notes:", err));
// Hide loader when page is fully loaded
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 5.0s ease";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  });
  