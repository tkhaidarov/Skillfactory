export class CharacterCounter {
   private textArea: HTMLTextAreaElement;
   private counterDisplay: HTMLSpanElement;
   private warningText: HTMLSpanElement;
   private submitButton: HTMLButtonElement;
   private maxLength: number;

   constructor(
      textArea: string,
      counterDisplay: string,
      warningText: string,
      submitButtonId: string,
      maxLength = 1000
   ) {
      this.textArea = document.getElementById(textArea) as HTMLTextAreaElement;
      this.counterDisplay = document.getElementById(counterDisplay) as HTMLSpanElement;
      this.warningText = document.getElementById(warningText) as HTMLSpanElement;
      this.submitButton = document.getElementById(submitButtonId) as HTMLButtonElement;
      this.maxLength = maxLength;
      this.init();
   }

   private init() {
      this.textArea.addEventListener('input', this.adjustHeight.bind(this));
      this.textArea.addEventListener('input', () => this.updateCounter());

      this.updateCounter();
   }

   private adjustHeight() {
      this.textArea.style.height = 'auto';
      this.textArea.style.height = this.textArea.scrollHeight + 'px';
   }

   private updateCounter() {
      let currentTextLength = this.textArea.value.trim().length;
      this.counterDisplay.textContent = `${currentTextLength}/${this.maxLength}`;
      if (currentTextLength > this.maxLength) {
         this.warningText.textContent = 'Слишком длинное сообщение';
         this.warningText.style.color = 'red';
         this.counterDisplay.style.color = 'red';
         this.submitButton.disabled = true;
      } else if (currentTextLength === 0) {
         this.warningText.textContent = '';
         this.counterDisplay.style.color = '';
         this.submitButton.disabled = true;
      } else {
         this.warningText.textContent = '';
         this.counterDisplay.style.color = '';
         this.submitButton.disabled = false;
      }
   }

   public resetCounter() {
      this.textArea.value = '';
      this.textArea.style.height = 'auto';
      this.updateCounter();
   }
}
