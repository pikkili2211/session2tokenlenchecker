from flask import Flask, render_template, request, jsonify
import re
import string

app = Flask(__name__)

def count_tokens(text):
    """
    Simple token counting function that splits text by whitespace and punctuation.
    This is a basic implementation - for production use, consider using libraries like tiktoken.
    """
    # Remove extra whitespace and split by common delimiters
    tokens = re.findall(r'\b\w+\b', text.lower())
    return len(tokens)

def is_english(text):
    """
    Check if text contains only English characters and common punctuation.
    """
    # Allow English letters, numbers, spaces, and common punctuation
    allowed_chars = string.ascii_letters + string.digits + string.whitespace + string.punctuation
    return all(char in allowed_chars for char in text)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/count_tokens', methods=['POST'])
def count_tokens_endpoint():
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        
        # Validation: Empty text check
        if not text:
            return jsonify({
                'success': False,
                'error': 'Please enter some text to analyze.'
            }), 400
        
        # Validation: English language check
        if not is_english(text):
            return jsonify({
                'success': False,
                'error': 'Please enter text in English only.'
            }), 400
        
        # Count tokens
        token_count = count_tokens(text)
        
        return jsonify({
            'success': True,
            'token_count': token_count,
            'text_length': len(text)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'An error occurred while processing your request.'
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
