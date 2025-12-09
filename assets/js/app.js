class Bubble {
        constructor(container, isQual = false) {
            this.container = container;
            this.isQual = isQual;
            this.element = document.createElement('div');
            this.element.className = isQual ? 'qual-bubble' : 'bubble';

            if (isQual) {
                const icons = ['☁️', '🔒', '🌐', '📄'];
                const labels = ['Cloud', 'Security', 'Network', 'Compliance'];
                const ids = ['cloud', 'security', 'network', 'compliance'];
                const index = container.children.length;

                this.element.textContent = icons[index];
                const labelSpan = document.createElement('span');
                labelSpan.textContent = labels[index];
                this.element.appendChild(labelSpan);

                this.element.addEventListener("click", (e) => showQual(ids[index], e));
            }

            const containerRect = container.getBoundingClientRect();
            this.size = isQual ? 180 + Math.random() * 30 : 60 + Math.random() * 60;
            this.element.style.width = this.size + 'px';
            this.element.style.height = this.size + 'px';

            this.x = Math.random() * (containerRect.width - this.size);
            this.y = Math.random() * (containerRect.height - this.size);
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;

            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';

            container.appendChild(this.element);
        }

        update(bubbles, containerRect) {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x <= 0 || this.x >= containerRect.width - this.size) {
                this.vx *= -0.8;
                this.x = Math.max(0, Math.min(this.x, containerRect.width - this.size));
            }
            if (this.y <= 0 || this.y >= containerRect.height - this.size) {
                this.vy *= -0.8;
                this.y = Math.max(0, Math.min(this.y, containerRect.height - this.size));
            }

            bubbles.forEach(other => {
                if (other === this) return;

                const dx = other.x - this.x;
                const dy = other.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDist = (this.size + other.size) / 2;

                if (distance < minDist) {
                    const angle = Math.atan2(dy, dx);
                    const overlap = minDist - distance;

                    const adjustX = Math.cos(angle) * overlap * 0.5;
                    const adjustY = Math.sin(angle) * overlap * 0.5;

                    this.x -= adjustX; this.y -= adjustY;
                    other.x += adjustX; other.y += adjustY;

                    this.vx *= -0.8;
                    this.vy *= -0.8;
                }
            });

            this.vx *= 0.99;
            this.vy *= 0.99;
            this.vx += (Math.random() - 0.5) * 0.05;
            this.vy += (Math.random() - 0.5) * 0.05;

            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
        }
    }

    const introContainer = document.querySelector('.intro-section');
    const introBubbles = [];
    for (let i = 0; i < 8; i++) {
        introBubbles.push(new Bubble(document.getElementById('bubbleContainer')));
    }

    function animateIntroBubbles() {
        const rect = introContainer.getBoundingClientRect();
        introBubbles.forEach(b => b.update(introBubbles, rect));
        requestAnimationFrame(animateIntroBubbles);
    }
    animateIntroBubbles();

    const qualContainer = document.getElementById('qualBubbleContainer');
    const qualBubbles = [];
    for (let i = 0; i < 4; i++) {
        qualBubbles.push(new Bubble(qualContainer, true));
    }

    function animateQualBubbles() {
        const rect = qualContainer.getBoundingClientRect();
        qualBubbles.forEach(b => b.update(qualBubbles, rect));
        requestAnimationFrame(animateQualBubbles);
    }
    animateQualBubbles();

    function showQual(id, event) {
        const contents = document.querySelectorAll('.qual-content');
        contents.forEach(c => c.classList.remove('active'));

        const targetContent = document.getElementById(id);
        if (targetContent) targetContent.classList.add('active');

        const bubbles = document.querySelectorAll('.qual-bubble');
        bubbles.forEach(b => b.classList.remove('active'));

        const target = event.target.closest('.qual-bubble');
        if (target) target.classList.add('active');
    }

    const projectData = {
        blockchain: {
            title: 'Blockchain Voting System',
            mediaType: 'video',
            mediaSrc: 'demo/blockchain.mp4',
            description: 'Developed a secure blockchain-based voting system...'
        },
        mtls: {
            title: 'Mutual Authentication using mbedTLS',
            mediaType: 'image',
            mediaSrc: 'demo/tls.jpg',
            description: 'Implemented client-server mutual TLS authentication...'
        },
        firewall: {
            title: 'Custom Firewall Solutions',
            mediaType: 'icon',
            icon: '🌐',
            description: 'Developed custom WAF protecting against OWASP Top 10...'
        },
        botnet: {
            title: 'IoT Botnet Detection Playbook',
            mediaType: 'video',
            mediaSrc: 'demo/siem.mp4',
            description: 'Created comprehensive security monitoring dashboard...'
        },
        anomaly: {
            title: 'Network Anomaly Detection',
            mediaType: 'video',
            mediaSrc: 'demo/netAnomally.mp4',
            description: 'Real-time network anomaly detection system...'
        },
        cloud: {
            title: 'Cloud Security Infrastructure',
            mediaType: 'icon',
            icon: '☁️',
            description: 'Architected multi-cloud security infrastructure...'
        },
        bcp: {
            title: 'Business Continuity Plan',
            mediaType: 'icon',
            icon: '📋',
            description: 'Developed comprehensive Business Continuity Plan...'
        }
    };

    function openModal(projectId) {
    if (!Object.hasOwn(projectData, projectId)) return; 

        const modal = document.getElementById('mediaModal');
        const titleEl = document.getElementById('modalTitle');
        const mediaEl = document.getElementById('modalMedia');
        const descEl = document.getElementById('modalDescription');

        const data = projectData[projectId];

        titleEl.textContent = data.title;
        descEl.textContent = data.description;

        mediaEl.replaceChildren(); // Clear previous content safely

        if (data.mediaType === 'video') {
            const v = document.createElement('video');
            v.controls = true;
            v.src = data.mediaSrc;
            v.setAttribute('preload', 'metadata');
            v.setAttribute('playsinline', '');
            v.style.width = '100%';
            v.style.borderRadius = '15px';
            mediaEl.appendChild(v);
        }

        if (data.mediaType === 'image') {
            const img = document.createElement('img');
            img.src = data.mediaSrc;
            img.style.width = '100%';
            img.style.borderRadius = '15px';
            mediaEl.appendChild(img);
        }

        if (data.mediaType === 'icon') {
            const div = document.createElement("div");
            div.style.cssText = `
                height: 400px;
                display: flex;
                font-size: 5rem;
                justify-content: center;
                align-items: center;
                background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(138, 43, 226, 0.2));
                border-radius: 15px;
            `;
            div.textContent = data.icon;
            mediaEl.appendChild(div);
        }

        modal.classList.add('active');
    }

    function closeModal() {
        const modal = document.getElementById('mediaModal');
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        modal.classList.remove('active');
    }

    window.addEventListener('click', function (e) {
        const modal = document.getElementById('mediaModal');
        if (e.target === modal) closeModal();
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.addEventListener("click", function (e) {
        const dropdown = document.querySelector('.dropdown');
        if (!dropdown) return;

        if (dropdown.contains(e.target) && e.target.classList.contains('dropdown-btn')) {
            dropdown.classList.toggle('show');
        } else {
            dropdown.classList.remove('show');
        }
    });