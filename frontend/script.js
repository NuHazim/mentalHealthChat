// ===== BACKEND CONFIGURATION =====
// Your Node.js backend URL (change this when deployed)
const BACKEND_URL = 'http://localhost:3000';

// ===== SAFETY GUARDRAILS =====
const CRISIS_KEYWORDS = [
    'kill myself', 'suicide', 'end my life', 'die', 'self harm', 
    'hurt myself', 'worthless', 'no reason to live', 'want to die',
    'overdose', 'cut myself', 'don\'t want to live'
];

function checkForCrisis(message) {
    const lowerMsg = message.toLowerCase();
    return CRISIS_KEYWORDS.some(keyword => lowerMsg.includes(keyword));
}

function showEmergencyResources() {
    const messagesDiv = document.getElementById('messages');
    const emergencyMsg = document.createElement('div');
    emergencyMsg.className = 'message bot-message emergency-message';
    emergencyMsg.innerHTML = `
        🚨 <strong>I notice you're going through a very difficult time.</strong><br><br>
        Please reach out to professional support right now:<br>
        📞 <strong>988 Suicide & Crisis Lifeline</strong> (24/7, free & confidential)<br>
        📞 <strong>Crisis Text Line:</strong> Text HOME to 741741<br><br>
        You matter, and there are people who want to help you through this. 💚
    `;
    messagesDiv.appendChild(emergencyMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function getBotResponse(userMessage) {
    try {
        // Call your own backend instead of Groq directly
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();
        return data.reply;
        
    } catch (error) {
        console.error('Error:', error);
        return "I'm having trouble connecting right now. Please try again in a moment. If you need immediate support, please call 988.";
    }
}

// ===== CHAT FUNCTIONALITY =====
async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const message = inputField.value.trim();
    
    if (!message) return;
    
    // Clear input
    inputField.value = '';
    
    // Display user message
    addMessage(message, 'user');
    
    // Check for crisis keywords FIRST
    if (checkForCrisis(message)) {
        showEmergencyResources();
        return;
    }
    
    // Show typing indicator
    const typingIndicator = document.getElementById('typing');
    typingIndicator.style.display = 'block';
    
    // Get bot response from your backend
    const botReply = await getBotResponse(message);
    
    // Hide typing indicator
    typingIndicator.style.display = 'none';
    
    // Display bot response
    addMessage(botReply, 'bot');
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ===== EVENT LISTENERS =====
document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Check if backend is reachable
async function checkBackend() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'test' })
        });
        if (response.ok) {
            console.log('✅ Backend connected');
        }
    } catch (error) {
        console.warn('⚠️ Backend not running. Start with: node backend/server.js');
        addMessage('⚠️ Backend server not running. Please start the server with "node backend/server.js"', 'bot');
    }
}

checkBackend();