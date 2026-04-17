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
    canvasWidth: 400,
    canvasHeight: 600,
    bird: {
        x: 60, y: 250,
        width: 34, height: 24,
        color: '#f1c40f', wingColor: '#f39c12',
        gravity: 0.45, jumpVelocity: -8.5, maxVelocity: 12
    },
    pipe: {
        width: 52, gap: 150, minGap: 120,
        spawnInterval: 95, speed: 2.5,
        color: '#27ae60', capColor: '#229954', borderColor: '#1e8449'
    },
    ground: { height: 80, color: '#8B4513', grassColor: '#27ae60' },
    scoreFont: 'bold 48px Arial', scoreColor: '#fff'
};
```

### Available Options

- `canvasWidth` / `canvasHeight`: Game dimensions
- `bird`: Position (x, y), size (width, height), colors, physics (gravity, jumpVelocity, maxVelocity)
- `pipe`: width, gap size, minGap, spawnInterval, speed, colors
- `ground`: height and colors
- `scoreFont` / `scoreColor`: Score display styling

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