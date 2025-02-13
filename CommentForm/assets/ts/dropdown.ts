export class Dropdown {
   private dropdown: HTMLDivElement;
   private selected: HTMLDivElement;
   private arrow: SVGSVGElement;
   private optionsContainer: HTMLDivElement;
   private options: NodeListOf<HTMLSpanElement>;

   constructor() {
      this.dropdown = document.getElementById('main__comments-dropdown') as HTMLDivElement;
      this.selected = this.dropdown.querySelector('.main__selected-option') as HTMLDivElement;
      this.arrow = this.selected.querySelector('.arrow') as SVGSVGElement;
      this.optionsContainer = this.dropdown.querySelector('.main__options') as HTMLDivElement;
      this.options = this.optionsContainer.querySelectorAll('.main__option-wrap');
      this.setDefaultOption();
      this.initArrow();
   }

   private initArrow(): void {
      this.selected.addEventListener('click', () => this.toggleDropdown());
      this.optionsContainer.addEventListener('click', (event) => this.handleOptionClick(event));
      document.addEventListener('click', (event) => this.handleOutsideClick(event));
   }

   private setDefaultOption(): void {
      const defaultOption = this.optionsContainer.querySelector('.selected-option');
      if (defaultOption) {
         this.updateSelectedText(defaultOption.textContent);
      }
   }

   private toggleDropdown() {
      const isOpen = this.dropdown.classList.toggle('open');
      this.arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
   }

   private closeDropdown() {
      this.dropdown.classList.remove('open');
      this.arrow.style.transform = 'rotate(0deg)';
   }

   private handleOptionClick(event: Event) {
      const target = event.target as HTMLElement;
      const optionWrap = target.closest('.main__option-wrap');
      if (optionWrap) {
         const option = optionWrap.querySelector('span') as HTMLSpanElement;
         this.selectOption(option);
      }
   }

   private handleOutsideClick(event: Event) {
      if (!this.dropdown.contains(event.target as Node)) {
         this.closeDropdown();
      }
   }

   private selectOption(option: HTMLSpanElement) {
      this.options.forEach((opt) => {
         const span = opt.querySelector('span') as HTMLSpanElement;
         span.classList.remove('selected-option');
      });
      option.classList.add('selected-option');
      const checkmarks = this.optionsContainer.querySelectorAll('.checkmark') as NodeListOf<HTMLDivElement>;
      checkmarks.forEach((checkmark) => checkmark.classList.remove('visible'));
      let index = option.getAttribute('data-index');
      if (index) {
         let currentCheckmark = this.optionsContainer.querySelector(
            `.checkmark[data-index="${index}"]`
         ) as HTMLDivElement;
         if (currentCheckmark) {
            currentCheckmark.classList.add('visible');
         }
      }
      this.updateSelectedText(option.textContent);
      this.closeDropdown();
      const criteria = this.indexToCriteria(index);
      const sortEvent = new CustomEvent('sortOptionSelected', { detail: { criteria } });
      this.dropdown.dispatchEvent(sortEvent);
   }

   private indexToCriteria(index: string | null): string {
      switch (index) {
         case '0':
            return 'ratings';
         case '1':
            return 'date';
         case '2':
            return 'relevance';
         case '3':
            return 'replies';
         default:
            return 'date';
      }
   }

   private updateSelectedText(text: string | null): void {
      const selectedText = this.selected.querySelector('span');
      if (selectedText && text) {
         selectedText.textContent = text;
      }
   }
}
