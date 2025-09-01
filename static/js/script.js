document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tokenForm');
    const textInput = document.getElementById('textInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultSection = document.getElementById('result');
    const errorMessage = document.getElementById('error');
    const charCount = document.getElementById('charCount');
    const tokenCount = document.getElementById('tokenCount');
    const characterCount = document.getElementById('characterCount');
    const errorText = document.getElementById('errorText');

    // Update character count in real-time
    textInput.addEventListener('input', function() {
        charCount.textContent = this.value.length;
        
        // Clear previous results when user types
        hideResults();
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const text = textInput.value.trim();
        
        // Client-side validation
        if (!text) {
            showError('Please enter some text to analyze.');
            return;
        }
        
        // Check for non-English characters (basic check)
        if (!isEnglishText(text)) {
            showError('Please enter text in English only.');
            return;
        }
        
        // Submit to server
        calculateTokens(text);
    });

    // Clear button handler
    clearBtn.addEventListener('click', function() {
        clearForm();
    });

    // Function to check if text is in English (basic validation)
    function isEnglishText(text) {
        // Allow English letters, numbers, spaces, and common punctuation
        const englishPattern = /^[a-zA-Z0-9\s.,!?;:'"()\-_@#$%&*+=<>[\]{}|\\\/~`]+$/;
        return englishPattern.test(text);
    }

    // Function to calculate tokens via API
    async function calculateTokens(text) {
        // Show loading state
        setLoadingState(true);
        hideResults();
        
        try {
            const response = await fetch('/count_tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showResults(data.token_count, data.text_length);
            } else {
                showError(data.error || 'An error occurred while processing your request.');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Network error. Please check your connection and try again.');
        } finally {
            setLoadingState(false);
        }
    }

    // Function to show loading state
    function setLoadingState(loading) {
        if (loading) {
            calculateBtn.classList.add('loading');
            calculateBtn.disabled = true;
        } else {
            calculateBtn.classList.remove('loading');
            calculateBtn.disabled = false;
        }
    }

    // Function to show results
    function showResults(tokens, characters) {
        tokenCount.textContent = tokens;
        characterCount.textContent = characters;
        resultSection.style.display = 'block';
        errorMessage.style.display = 'none';
        
        // Scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Function to show error message
    function showError(message) {
        errorText.textContent = message;
        errorMessage.style.display = 'flex';
        resultSection.style.display = 'none';
        
        // Scroll to error
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Function to hide results
    function hideResults() {
        resultSection.style.display = 'none';
        errorMessage.style.display = 'none';
    }

    // Function to clear the form
    function clearForm() {
        textInput.value = '';
        charCount.textContent = '0';
        hideResults();
        textInput.focus();
        
        // Reset textarea height
        textInput.style.height = 'auto';
    }

    // Add some helpful features
    
    // Auto-resize textarea
    textInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    // Add keyboard shortcut (Ctrl+Enter to submit)
    textInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Clear form with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            clearForm();
        }
    });

    // Focus on textarea when page loads
    textInput.focus();
});
