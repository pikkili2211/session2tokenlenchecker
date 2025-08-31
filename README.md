# Token Length Checker

A simple Flask web application that counts tokens in text input. This tool provides a clean, modern interface for analyzing text and displaying token counts along with character counts.

## Features

- 🔢 **Token Counting**: Counts tokens using word boundary detection
- 📝 **Text Input**: Large textarea for easy text entry
- ✅ **Validation**: 
  - Empty text validation
  - English language validation
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices
- ⚡ **Real-time**: Character count updates as you type
- 🎯 **User-friendly**: Clear error messages and loading states

## Installation

1. Clone or download this repository
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Run the Flask application:
   ```bash
   python app.py
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:5000
   ```

3. Enter your text in the textarea and click "Calculate Tokens"

## How It Works

- **Token Counting**: The application uses regex to find word boundaries (`\b\w+\b`) and counts the resulting tokens
- **Validation**: 
  - Checks for empty input
  - Validates that text contains only English characters, numbers, and common punctuation
- **Frontend**: Built with vanilla HTML, CSS, and JavaScript for simplicity and performance

## API Endpoints

### POST `/count_tokens`

Counts tokens in the provided text.

**Request Body:**
```json
{
  "text": "Your text here"
}
```

**Response:**
```json
{
  "success": true,
  "token_count": 4,
  "text_length": 16
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## File Structure

```
session2tokenlenchecker/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # CSS styling
    └── js/
        └── script.js     # JavaScript functionality
```

## Keyboard Shortcuts

- **Ctrl+Enter**: Submit the form
- **Escape**: Clear the textarea and reset

## Browser Compatibility

This application works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Development

To run in development mode with auto-reload:
```bash
export FLASK_ENV=development
python app.py
```

## License

This project is open source and available under the MIT License.
