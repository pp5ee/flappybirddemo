# Flappy Bird Demo

A Flappy Bird-style browser game built with plain HTML, CSS, and JavaScript. This project demonstrates a complete, playable game with physics, collision detection, scoring, and multiple input methods.

## Features

- **Physics**: Gravity and jump mechanics
- **Pipes**: Continuous generation and movement
- **Collision Detection**: Ends game on pipe or ground hit
- **Scoring**: Increments when passing pipe pairs
- **Game States**: Ready, Playing, and Game Over
- **Multiple Inputs**: Keyboard (Space), Mouse, Touch
- **Visual Effects**: Particle effects, gradient sky, animated bird

## Requirements

- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

1. Clone the repository or download the files
2. No build step or dependencies required

## Usage

### Running the Game

Simply open `index.html` in your web browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a simple HTTP server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Controls

| Input | Action |
|-------|--------|
| Space key | Start game / Jump |
| Mouse click | Start game / Jump |
| Touch / Tap | Start game / Jump |

### Gameplay

1. Click, press Space, or tap to start
2. Navigate the bird through pipe gaps
3. Score increases each time you pass a pipe pair
4. Game ends on collision with pipe or ground
5. Click "Play Again" to restart

## Configuration

Edit the `CONFIG` object in `script.js` to customize:

```javascript
const CONFIG = {
    canvas: { width: 400, height: 600 },
    bird: { width: 30, height: 30, color: '#FFD700', gravity: 0.5, jumpVelocity: -8 },
    pipe: { width: 50, gap: 150, speed: 2, spawnInterval: 100 },
    // ... more options
};
```

### Available Options

- `canvas`: Game dimensions
- `bird`: Bird size, color, gravity, jump strength
- `pipe`: Pipe width, gap size, speed, spawn rate
- `ground`: Ground height and color
- `colors`: Sky gradient and color palette

## Project Structure

```
.
├── index.html    # Main HTML structure with canvas and UI
├── style.css     # Styling for game container and overlays
├── script.js     # Game logic: CONFIG, Game class, rendering
└── README.md     # This file
```

## Architecture

The game follows a clean architecture:

- **CONFIG**: Centralized configuration object
- **Game class**: Complete game lifecycle management
- **requestAnimationFrame**: 60fps game loop
- **Canvas rendering**: Game elements drawn each frame
- **DOM overlays**: UI elements (start/game over screens)

## License

MIT