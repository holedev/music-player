# Music Player

A modern, responsive web-based music player built with HTML, CSS, and vanilla JavaScript.

## Features

- 🎵 Play/pause functionality with animated CD display
- ⏭️ Next/previous track navigation
- 🔄 Repeat and random playback modes
- 📊 Progress bar with seeking capability
- 📱 Responsive design that works on desktop and mobile
- 💾 Persistent settings using localStorage
- 📃 Dynamic playlist with scrolling to current song
- 🎨 Smooth animations and transitions

## Technologies Used

- HTML5 
- CSS3 (Flexbox, Animations)
- Vanilla JavaScript
- Font Awesome 5 for icons
- Google Fonts (Poppins)

## Project Structure

```
music-player/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── mp3/
│       ├── cafe0duong.mp3
│       ├── haconvuongnang.mp3
│       ├── loiemnoi.mp3
│       ├── phanduyenlolang.mp3
│       ├── theluong.mp3
│       └── thucgiac.mp3
```

## How to Use

1. Clone the repository:
```bash
git clone https://github.com/holedev/music-player.git
```

2. Open `index.html` in your web browser.

3. Start playing music and enjoy the features:
   - Click the play/pause button to control playback
   - Use next/previous buttons to change tracks
   - Toggle repeat mode to replay the current track
   - Enable random mode for shuffle playback
   - Click anywhere on the progress bar to seek
   - Select songs directly from the playlist

## Features in Detail

### Player Controls
- Play/Pause: Toggle playback of the current track
- Next/Previous: Navigate between tracks
- Random: Enable shuffle mode for random playback
- Repeat: Toggle repeat mode for the current track

### Playlist
- Displays all available tracks with title and artist
- Highlights the currently playing track
- Smooth scrolling to the current track when changed
- Click any track to play it immediately

### Progress Bar
- Shows current playback progress
- Click or drag to seek to any position
- Updates in real-time during playback

### Visual Features
- Rotating CD animation during playback
- Smooth transitions for all interactions
- Responsive design adapts to screen size
- Album art display for each track

### Local Storage
- Remembers random and repeat mode settings
- Persists between browser sessions
