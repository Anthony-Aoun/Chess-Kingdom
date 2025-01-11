# Chess Kingdom

## Overview
This project is a web-based offline multiplayer chess game named **Chess Kingdom**. It allows two players to play chess against each other, complete with move sounds, undo functionality, and pawn promotion. The interface includes modals for promotions, game-over notifications, and a settings menu with options to start a new game, resign, or offer a draw.

## Project Structure

```
ChessKingdom/
├── css/
│   ├── menu.css                 # Styling for the menu page
│   └── multiplayer_style.css    # Styling for the multiplayer page
├── js/
│   ├── jquery-3.4.1.min.js      # jQuery library
│   ├── defs.js                  # Definitions and utility functions
│   └── multiplayer.js           # Main game logic for multiplayer mode
├── src/
│   ├── move.mp3                 # Sound for piece movement
│   ├── win.mp3                  # Sound for game win
│   ├── draw.mp3                 # Sound for game draw
│   ├── copyrights.txt           # Sources of media
│   ├── wqueen.png               # White queen image for promotion
│   ├── wknight.png              # White knight image for promotion
│   ├── wrook.png                # White rook image for promotion
│   ├── wbishop.png              # White bishop image for promotion
│   ├── queen.png                # Black queen image for promotion
│   ├── knight.png               # Black knight image for promotion
│   ├── rook.png                 # Black rook image for promotion
│   └── bishop.png               # Black bishop image for promotion
├── multiplayer.html             # multiplayer html page
└── menu.html                    # menu html page
```

## How to Use

1. **Setup:**
   - Open `multiplayer.html` in a web browser to start the game.
   - Ensure all linked files (CSS, JS, audio, and images) are in their correct directories.

2. **Game Controls:**
   - **Turn Indicator:** Displays whose turn it is using a piece icon.
   - **Options Button (⚙️):** Opens a modal with options: New Game, Resign, and Offer Draw.
   - **Undo Button (⤺):** Undoes the last move.
   - **Pawn Promotion:** When a pawn reaches the end, a modal allows promotion to Queen, Knight, Rook, or Bishop.
   - **Game Over Modals:** Display the winner and allow the user to close the popup.

3. **Sound Effects:**
   - **move.mp3:** Plays when a piece is moved.
   - **win.mp3:** Plays when a player wins.
   - **draw.mp3:** Plays when the game is drawn.

## JavaScript Function Documentation

The main game logic is handled in `multiplayer.js`. The following are key functions referenced in the HTML:

### 1. **functions.undo()**
   - Undoes the most recent move.
   - Bound to the Undo button.

### 2. **functions.newGame()**
   - Starts a new game, resetting the board.
   - Accessible from the Options modal.

### 3. **functions.resign()**
   - Allows a player to resign, declaring the other player the winner.
   - Accessible from the Options modal.

### 4. **functions.offerDraw()**
   - Offers a draw to the opponent.
   - Accessible from the Options modal.

### 5. **functions.promote(piece)**
   - Used for black pawn promotion.
   - Parameter `piece`: Accepts `'queen'`, `'knight'`, `'rook'`, or `'bishop'`.
   - Triggered when a black pawn reaches the last rank.

### 6. **functions.wpromote(piece)**
   - Used for white pawn promotion.
   - Parameter `piece`: Accepts `'queen'`, `'knight'`, `'rook'`, or `'bishop'`.
   - Triggered when a white pawn reaches the last rank.

## Customization

- **Styling:** Customize the appearance by editing `css/multiplayer_style.css`.
- **Sounds:** Replace sound effects in the `src/` folder with custom audio files.
- **Piece Images:** Swap out the piece images in `src/` for custom graphics.

## Dependencies

- **jQuery v3.4.1:** Simplifies DOM manipulation and event handling.
- **W3.CSS:** Provides modal and button styling.
- **Font Awesome:** Used for icons (settings and undo).

## Known Limitation

- The game assumes both players are sharing the same device/browser.
- No network-based multiplayer functionality (local play only).


## License
This project is licensed under the MIT License.

## Author
© 2025 [Anthony Aoun](https://github.com/Anthony-Aoun). All rights reserved.

This project is open-source and free to use for educational purpouses only.

**Enjoy playing ChessKingdom!**
