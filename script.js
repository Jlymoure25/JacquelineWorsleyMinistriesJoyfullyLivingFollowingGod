// Minimal script - Audio is handled automatically in HTML

class BiblicalJourney {
    constructor() {
        this.currentSection = 0;
        this.sections = document.querySelectorAll('.section');
        this.totalSections = this.sections.length;
        this.init();
    }

    init() {
        console.log('📖 Biblical Journey initialized - Audio auto-starting in HTML');
        this.showSection(0);
        this.setupNavigation();
        this.setupAutoAdvance();
    }

    setupNavigation() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const beginBtn = document.getElementById('beginJourney');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSection();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousSection();
            });
        }
        
        if (beginBtn) {
            beginBtn.addEventListener('click', () => {
                this.nextSection();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                e.preventDefault();
                this.nextSection();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSection();
            }
        });
    }

    setupAutoAdvance() {
        // Auto-advance every 15 seconds
        setInterval(() => {
            if (this.currentSection < this.totalSections - 1) {
                this.nextSection();
            }
        }, 15000);
    }

    showSection(index) {
        this.sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
                section.style.display = 'block';
                section.style.opacity = '1';
            } else {
                section.classList.remove('active');
                section.style.opacity = '0';
                setTimeout(() => {
                    if (!section.classList.contains('active')) {
                        section.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        this.currentSection = index;
        this.updateNavigation();
        console.log('📑 Showing section:', index + 1);
    }

    nextSection() {
        if (this.currentSection < this.totalSections - 1) {
            this.showSection(this.currentSection + 1);
        } else {
            this.endPresentation();
        }
    }

    previousSection() {
        if (this.currentSection > 0) {
            this.showSection(this.currentSection - 1);
        }
    }

    updateNavigation() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        if (prevBtn) {
            prevBtn.style.display = this.currentSection > 0 ? 'block' : 'none';
        }
        
        if (nextBtn) {
            nextBtn.textContent = this.currentSection === this.totalSections - 1 ? 'Complete Journey' : 'Continue';
        }
    }

    endPresentation() {
        console.log('🙏 Biblical journey complete');
        
        // Create end screen
        const endScreen = document.createElement('div');
        endScreen.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #d4af37 0%, #dc143c 50%, #8b0000 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                color: white;
                text-align: center;
                font-family: 'Playfair Display', serif;
            ">
                <div>
                    <h1 style="font-size: 3rem; margin-bottom: 2rem;">Thank You for Joining Us</h1>
                    <p style="font-size: 1.5rem; margin-bottom: 2rem;">May the wisdom of the Parable of the Talents inspire you to use your God-given gifts.</p>
                    <p style="font-style: italic; font-size: 1.2rem;">Blessings from Jacqueline Worsley Ministries</p>
                    <button onclick="location.reload()" style="
                        margin-top: 2rem;
                        padding: 15px 30px;
                        font-size: 1.2rem;
                        background: rgba(255,255,255,0.2);
                        color: white;
                        border: 2px solid white;
                        border-radius: 25px;
                        cursor: pointer;
                    ">Experience Again</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(endScreen);
    }
}

// Initialize when page loads - Audio handled automatically in HTML
document.addEventListener('DOMContentLoaded', () => {
    console.log('📖 Initializing Biblical Journey sections...');
    new BiblicalJourney();
});