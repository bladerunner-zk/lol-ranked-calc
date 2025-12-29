function calculateDelta(lpPerWin, desiredLpGain) {
    return desiredLpGain / lpPerWin;
}

const ERROR_MESSAGE_HTML = `
    <div class="error-message">
        <h3>you're cooked!!!</h3>
        <h4>lmao</h4>
        <img src="gifs/dancing_gragas.gif" alt="lol" />
        <img src="gifs/shaco-dance.gif" alt="rip" />
    </div>
`;

const SUCCESS_MESSAGE_HTML = `
    <div class="success-message">
        <h3>winnable</h3>
        <img src="gifs/gragas-falling.gif" alt="ggwp" />
    </div>
`;

const RESULTS_TEMPLATE_HTML = `
    <h3>Results:</h3>
    <p><strong>Required Wins:</strong> <span id="wins"></span></p>
    <p><strong>Expected Losses:</strong> <span id="losses"></span></p>
    <p><strong>Total Games:</strong> <span id="games"></span></p>
`;

function updateDelta() {
    const lpGain = parseFloat(document.getElementById('lpGain').value);
    const lpPerWin = parseFloat(document.getElementById('lpPerWin').value);
    
    if (lpGain && lpPerWin && lpPerWin !== 0) {
        const delta = Math.ceil(lpGain / lpPerWin);
        document.getElementById('delta').value = delta;
    }
}

function calculateRequiredWins(winrate, delta) {
    const wins = winrate * delta / (2 * winrate - 1);
    if (wins < 0 || !isFinite(wins)) {
        throw new Error("Invalid calculation: impossible to achieve desired LP gain with given winrate.");
    }
    
    const losses = wins * (1 - winrate) / winrate;
    return {
        wins: Math.floor(wins),
        losses: Math.floor(losses),
        games: Math.floor(wins + losses),
    };
}

function calculate() {
    const resultDiv = document.getElementById('result');
    
    try {
        const winrate = parseFloat(document.getElementById('winrate').value);
        const delta = parseFloat(document.getElementById('delta').value);
        
        const result = calculateRequiredWins(winrate, delta);
        
        // Restore original structure if it was replaced
        resultDiv.innerHTML = RESULTS_TEMPLATE_HTML;
        
        document.getElementById('wins').textContent = result.wins;
        document.getElementById('losses').textContent = result.losses;
        document.getElementById('games').textContent = result.games;
        
        // Add warning or success message based on games count
        if (result.games >= 60) {
            resultDiv.innerHTML += ERROR_MESSAGE_HTML;
        } else {
            resultDiv.innerHTML += SUCCESS_MESSAGE_HTML;
        }
        
        resultDiv.classList.add('show');
    } catch (error) {
        resultDiv.innerHTML = ERROR_MESSAGE_HTML;
        resultDiv.classList.add('show');
    }
}

// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('lpGain').addEventListener('input', updateDelta);
    document.getElementById('lpPerWin').addEventListener('input', updateDelta);
    
    // Calculate initial delta
    updateDelta();
});
