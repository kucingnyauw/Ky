import React from 'react';

import'../loading/style/loading.css';

const TypingIndicator = () => {
    return (
        <div class="typing-indicator">
        <div class="typing-circle"></div>
        <div class="typing-circle"></div>
        <div class="typing-circle"></div>
        <div class="typing-shadow"></div>
        <div class="typing-shadow"></div>
        <div class="typing-shadow"></div>
    </div>
    );
};

export default TypingIndicator;
