export class CharacterCounter {
    constructor(textArea, counterDisplay, warningText, submitButtonId, maxLength = 1000) {
        this.textArea = document.getElementById(textArea);
        this.counterDisplay = document.getElementById(counterDisplay);
        this.warningText = document.getElementById(warningText);
        this.submitButton = document.getElementById(submitButtonId);
        this.maxLength = maxLength;
        this.init();
    }
    init() {
        this.textArea.addEventListener('input', this.adjustHeight.bind(this));
        this.textArea.addEventListener('input', () => this.updateCounter());
        this.updateCounter();
    }
    adjustHeight() {
        this.textArea.style.height = 'auto';
        this.textArea.style.height = this.textArea.scrollHeight + 'px';
    }
    updateCounter() {
        let currentTextLength = this.textArea.value.trim().length;
        this.counterDisplay.textContent = `${currentTextLength}/${this.maxLength}`;
        if (currentTextLength > this.maxLength) {
            this.warningText.textContent = 'Слишком длинное сообщение';
            this.warningText.style.color = 'red';
            this.counterDisplay.style.color = 'red';
            this.submitButton.disabled = true;
        }
        else if (currentTextLength === 0) {
            this.warningText.textContent = '';
            this.counterDisplay.style.color = '';
            this.submitButton.disabled = true;
        }
        else {
            this.warningText.textContent = '';
            this.counterDisplay.style.color = '';
            this.submitButton.disabled = false;
        }
    }
    resetCounter() {
        this.textArea.value = '';
        this.textArea.style.height = 'auto';
        this.updateCounter();
    }
}
