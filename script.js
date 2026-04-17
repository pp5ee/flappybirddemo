// ============================================
// FLAPPY BIRD - Game Configuration
// ============================================
const FPS = 60;
const FRAME_TIME = 1000 / FPS;

const CONFIG = {
    // Canvas dimensions
    canvasWidth: 400,
    canvasHeight: 600,

    // Bird properties
    bird: {
        x: 60,
        y: 250,
        width: 34,
        height: 24,
        color: '#f1c40f',
        wingColor: '#f39c12',
        // Physics
        gravity: 0.45,
        jumpVelocity: -8.5,
        maxVelocity: 12
    },

    // Pipe properties
    pipe: {
        width: 52,
        gap: 150,           // Vertical gap between pipes
        spawnInterval: 95,  // Frames between pipe spawns
        speed: 2.5,         // Horizontal movement speed
        color: '#27ae60',
        capColor: '#229954',
        borderColor: '#1e8449'
    },

    // Ground properties
    ground: {
        height: 80,
        color: '#8B4513',
        grassColor: '#27ae60'
    },

    // Scoring
    scoreFont: 'bold 48px Arial',
    scoreColor: '#fff'
};

// ============================================
// GAME STATE MANAGEMENT
// ============================================
const GameState = {
    READY: 'ready',
    PLAYING: 'playing',
    GAME_OVER: 'gameOver'
};

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // UI Elements
        this.startOverlay = document.getElementById('startOverlay');
        this.gameOverOverlay = document.getElementById('gameOverOverlay');
        this.finalScoreElement = document.getElementById('finalScore');
        this.restartBtn = document.getElementById('restartBtn');
        this.scoreDisplay = document.getElementById('scoreDisplay');

        // Initialize game state
        this.state = GameState.READY;
        this.score = 0;
        this.frameCount = 0;
        this.lastTime = 0;
        this.pipeSpawnTimer = 0;

        // Game entities
        this.bird = { ...CONFIG.bird, velocity: 0 };
        this.pipes = [];
        this.particles = [];

        // Bind input handlers
        this.bindInputHandlers();

        // Start the render loop
        this.gameLoop = this.gameLoop.bind(this);
        requestAnimationFrame(this.gameLoop);
    }

    // ============================================
    // INPUT HANDLING
    // ============================================
    bindInputHandlers() {
        // Keyboard input (Space key)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleInput();
            }
        });

        // Mouse/touch on canvas
        this.canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.handleInput();
        });

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleInput();
        }, { passive: false });

        // Restart button
        this.restartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.restart();
        });
    }

    handleInput() {
        switch (this.state) {
            case GameState.READY:
                this.startGame();
                break;
            case GameState.PLAYING:
                this.birdJump();
                break;
            case GameState.GAME_OVER:
                this.restart();
                break;
        }
    }

    // ============================================
    // GAME STATE TRANSITIONS
    // ============================================
    startGame() {
        this.state = GameState.PLAYING;
        this.startOverlay.classList.add('hidden');
        this.birdJump();
    }

    restart() {
        // Reset all game state
        this.state = GameState.READY;
        this.score = 0;
        this.frameCount = 0;
        this.pipeSpawnTimer = 0;

        // Reset bird
        this.bird = {
            ...CONFIG.bird,
            velocity: 0
        };

        // Clear pipes and particles
        this.pipes = [];
        this.particles = [];

        // Update UI
        this.scoreDisplay.textContent = '0';
        this.gameOverOverlay.classList.add('hidden');
        this.startOverlay.classList.remove('hidden');
    }

    gameOver() {
        this.state = GameState.GAME_OVER;
        this.finalScoreElement.textContent = this.score;
        this.gameOverOverlay.classList.remove('hidden');

        // Create death particles
        this.createParticles(this.bird.x, this.bird.y, 12);
    }

    updateScoreDisplay() {
        this.scoreDisplay.textContent = this.score;
    }

    // ============================================
    // PHYSICS & GAME LOGIC
    // ============================================
    birdJump() {
        this.bird.velocity = CONFIG.bird.jumpVelocity;

        // Add jump particles
        this.createParticles(this.bird.x - 10, this.bird.y + 10, 4);
    }

    updatePhysics(deltaTime = 1) {
        // Always update particles for death effects
        this.updateParticles();

        if (this.state !== GameState.PLAYING) return;

        // Apply gravity (scaled by delta time)
        this.bird.velocity += CONFIG.bird.gravity * deltaTime;

        // Clamp velocity
        if (this.bird.velocity > CONFIG.bird.maxVelocity) {
            this.bird.velocity = CONFIG.bird.maxVelocity;
        }

        // Update bird position (scaled by delta time)
        this.bird.y += this.bird.velocity * deltaTime;

        // Check boundaries
        this.checkBoundaries();

        // Early return if game ended
        if (this.state !== GameState.PLAYING) {
            return;
        }

        // Update pipes with time-based spawning
        this.updatePipes(deltaTime);

        // Check collisions
        this.checkCollisions();

        // Update frame counter
        this.frameCount++;
    }

    checkBoundaries() {
        // Ceiling collision
        if (this.bird.y < 0) {
            this.bird.y = 0;
            this.bird.velocity = 0;
        }

        // Ground collision
        if (this.bird.y + CONFIG.bird.height > CONFIG.canvasHeight - CONFIG.ground.height) {
            this.gameOver();
        }
    }

    updatePipes(deltaTime = 1) {
        const spawnIntervalMs = (CONFIG.pipe.spawnInterval / FPS) * 1000;
        this.pipeSpawnTimer += deltaTime * FRAME_TIME;

        // Catch up on missed spawns (handle frame stalls)
        while (this.pipeSpawnTimer >= spawnIntervalMs) {
            this.spawnPipe();
            this.pipeSpawnTimer -= spawnIntervalMs;
        }

        // Move pipes (scaled by delta time)
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            pipe.x -= CONFIG.pipe.speed * deltaTime;

            // Remove pipes that are off screen
            if (pipe.x + CONFIG.pipe.width < 0) {
                this.pipes.splice(i, 1);
            }
        }
    }

    spawnPipe() {
        // Random gap position
        const minY = CONFIG.pipe.gap / 2 + 20;
        const maxY = CONFIG.canvasHeight - CONFIG.ground.height - CONFIG.pipe.gap / 2 - 20;
        const gapY = Math.random() * (maxY - minY) + minY;

        this.pipes.push({
            x: CONFIG.canvasWidth,
            gapY: gapY,
            passed: false
        });
    }

    checkCollisions() {
        const bird = this.bird;

        for (const pipe of this.pipes) {
            const inPipeX = bird.x + bird.width > pipe.x && bird.x < pipe.x + CONFIG.pipe.width;
            if (!inPipeX) continue;

            const inUpper = bird.y < pipe.gapY - CONFIG.pipe.gap / 2;
            const inLower = bird.y + bird.height > pipe.gapY + CONFIG.pipe.gap / 2;

            if (inUpper || inLower) {
                this.gameOver();
                return;
            }

            if (!pipe.passed && bird.x > pipe.x + CONFIG.pipe.width) {
                pipe.passed = true;
                this.score++;
                this.updateScoreDisplay();
            }
        }
    }

    // ============================================
    // PARTICLE SYSTEM
    // ============================================
    createParticles(x, y, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                size: Math.random() * 4 + 2,
                color: CONFIG.bird.color,
                life: 1
            });
        }
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    // ============================================
    // RENDERING
    // ============================================
    render() {
        const ctx = this.ctx;

        // Clear canvas
        ctx.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);

        // Draw background
        this.drawBackground(ctx);

        // Draw pipes
        this.drawPipes(ctx);

        // Draw ground
        this.drawGround(ctx);

        // Draw bird
        if (this.state !== GameState.GAME_OVER || this.frameCount % 10 < 5) {
            this.drawBird(ctx);
        }

        // Draw particles
        this.drawParticles(ctx);

        // Draw score (during gameplay)
        if (this.state === GameState.PLAYING) {
            this.drawScore(ctx);
        }
    }

    drawBackground(ctx) {
        // Sky gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, CONFIG.canvasHeight - CONFIG.ground.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F6FF');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight - CONFIG.ground.height);

        // Draw some clouds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.drawCloud(ctx, 50, 80, 0.8);
        this.drawCloud(ctx, 250, 120, 0.6);
        this.drawCloud(ctx, 350, 60, 0.5);
    }

    drawCloud(ctx, x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.beginPath();
        ctx.arc(0, 0, 25, 0, Math.PI * 2);
        ctx.arc(30, -5, 30, 0, Math.PI * 2);
        ctx.arc(60, 0, 25, 0, Math.PI * 2);
        ctx.arc(20, -20, 20, 0, Math.PI * 2);
        ctx.arc(40, -20, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawPipes(ctx) {
        for (const pipe of this.pipes) {
            const gapHalf = CONFIG.pipe.gap / 2;
            const pipeX = pipe.x;
            const upperPipeBottom = pipe.gapY - gapHalf;
            const lowerPipeTop = pipe.gapY + gapHalf;

            // Upper pipe
            this.drawPipeSection(ctx, pipeX, 0, upperPipeBottom, true);

            // Lower pipe
            this.drawPipeSection(ctx, pipeX, lowerPipeTop,
                CONFIG.canvasHeight - CONFIG.ground.height - lowerPipeTop, false);
        }
    }

    drawPipeSection(ctx, x, y, height, isUpper) {
        const w = CONFIG.pipe.width;

        // Main pipe body
        ctx.fillStyle = CONFIG.pipe.color;
        ctx.fillRect(x, y, w, height);

        // Pipe border
        ctx.strokeStyle = CONFIG.pipe.borderColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(x + 1.5, y + 1.5, w - 3, height - 3);

        // Pipe cap
        const capHeight = 26;
        const capY = isUpper ? height - capHeight : 0;
        ctx.fillStyle = CONFIG.pipe.capColor;
        ctx.fillRect(x - 4, capY, w + 8, capHeight);

        // Cap border
        ctx.strokeStyle = CONFIG.pipe.borderColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(x - 4, capY, w + 8, capHeight);
    }

    drawGround(ctx) {
        const groundY = CONFIG.canvasHeight - CONFIG.ground.height;

        // Ground base
        ctx.fillStyle = CONFIG.ground.color;
        ctx.fillRect(0, groundY, CONFIG.canvasWidth, CONFIG.ground.height);

        // Grass top
        ctx.fillStyle = CONFIG.ground.grassColor;
        ctx.fillRect(0, groundY, CONFIG.canvasWidth, 12);

        // Ground pattern
        ctx.fillStyle = '#6d3710';
        for (let i = 0; i < CONFIG.canvasWidth; i += 30) {
            ctx.fillRect(i, groundY + 20, 15, 8);
            ctx.fillRect(i + 15, groundY + 40, 12, 8);
            ctx.fillRect(i + 5, groundY + 55, 18, 8);
        }
    }

    drawBird(ctx) {
        const bird = this.bird;
        const x = bird.x;
        const y = bird.y;
        const w = bird.width;
        const h = bird.height;

        ctx.save();
        ctx.translate(x + w / 2, y + h / 2);

        // Rotate based on velocity
        const rotation = Math.max(-0.5, Math.min(0.5, bird.velocity * 0.05));
        ctx.rotate(rotation);

        // Body
        ctx.fillStyle = bird.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wing (animated)
        const wingOffset = Math.sin(this.frameCount * 0.3) * 3;
        ctx.fillStyle = bird.wingColor;
        ctx.beginPath();
        ctx.ellipse(-5, wingOffset, 8, 5, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Eye
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(8, -4, 7, 0, Math.PI * 2);
        ctx.fill();

        // Pupil
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(10, -4, 3, 0, Math.PI * 2);
        ctx.fill();

        // Beak
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.moveTo(14, 2);
        ctx.lineTo(22, 5);
        ctx.lineTo(14, 8);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    drawParticles(ctx) {
        for (const p of this.particles) {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    drawScore(ctx) {
        ctx.fillStyle = CONFIG.scoreColor;
        ctx.font = CONFIG.scoreFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Score shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillText(this.score, CONFIG.canvasWidth / 2 + 3, 23);

        // Score text
        ctx.fillStyle = CONFIG.scoreColor;
        ctx.fillText(this.score, CONFIG.canvasWidth / 2, 20);
    }

    // ============================================
    // GAME LOOP
    // ============================================
    gameLoop(timestamp) {
        let deltaTime = this.lastTime ? (timestamp - this.lastTime) / FRAME_TIME : 1;
        this.lastTime = timestamp;

        // Clamp delta time to prevent tunneling after tab resume
        deltaTime = Math.min(deltaTime, 3);

        // Update game physics with delta time
        this.updatePhysics(deltaTime);

        // Render everything
        this.render();

        // Continue loop
        requestAnimationFrame(this.gameLoop);
    }
}

// ============================================
// INITIALIZE GAME ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});