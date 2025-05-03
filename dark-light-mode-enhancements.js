// Dark/Light Mode Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const header = document.querySelector('.nav');
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <input type="checkbox" id="theme-switch" class="theme-switch__input" />
        <label for="theme-switch" class="theme-switch__label">
            <i class='bx bx-sun'></i>
            <i class='bx bx-moon'></i>
            <span class="theme-switch__slider"></span>
        </label>
    `;
    header.appendChild(themeToggle);

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Set the toggle position based on saved preference
    const themeSwitch = document.getElementById('theme-switch');
    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
    }
    
    // Handle theme switch
    themeSwitch.addEventListener('change', function() {
        const theme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Add back-to-top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Back to top functionality
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Add project filter buttons
    const workSection = document.querySelector('.work__container');
    if (workSection) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'work__filter';
        filterContainer.innerHTML = `
            <button class="work__filter-btn active" data-filter="all">All</button>
            <button class="work__filter-btn" data-filter="web">Web</button>
            <button class="work__filter-btn" data-filter="app">App</button>
            <button class="work__filter-btn" data-filter="design">Design</button>
        `;
        workSection.parentNode.insertBefore(filterContainer, workSection);
        
        // Add filter data attributes to work items
        const workItems = document.querySelectorAll('.work__img');
        const categories = ['web', 'app', 'design'];
        
        workItems.forEach((item, index) => {
            // Assign random categories for demo
            const category = categories[index % categories.length];
            item.setAttribute('data-category', category);
        });
        
        // Filter functionality
        const filterBtns = document.querySelectorAll('.work__filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                workItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Add typing effect to title
    const homeTitle = document.querySelector('.home__title');
    if (homeTitle) {
        const titleText = homeTitle.innerHTML;
        const titleParts = titleText.split('<br>');
        
        // Create wrapper for first line
        const firstLine = document.createElement('div');
        firstLine.innerHTML = titleParts[0];
        
        // Create wrapper for second line with typing effect
        const secondLine = document.createElement('div');
        secondLine.innerHTML = titleParts[1];
        
        // Create wrapper for third line
        const thirdLine = document.createElement('div');
        thirdLine.className = 'profession-container';
        thirdLine.innerHTML = `
            <span class="profession-text">${titleParts[2] || ' '}</span>
            <div class="profession-options">
                <span>Software Developer</span>
                <span>UI/UX Designer</span>
                <span>Web Developer</span>
                <span>Java Developer</span>
            </div>
        `;
        
        // Replace original content
        homeTitle.innerHTML = '';
        homeTitle.appendChild(firstLine);
        homeTitle.appendChild(secondLine);
        homeTitle.appendChild(thirdLine);
    }

    // Add animated skill bars
    const skillBars = document.querySelectorAll('.skills__bar');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = bar.parentElement.querySelector('.skills__percentage').textContent;
            }, 200);
        });
    };

    // Use Intersection Observer for skill bars animation
    const skillsSection = document.querySelector('.skills__container');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
});
