export class Dropdown {
    constructor() {
        this.dropdown = document.getElementById('main__comments-dropdown');
        this.selected = this.dropdown.querySelector('.main__selected-option');
        this.arrow = this.selected.querySelector('.arrow');
        this.optionsContainer = this.dropdown.querySelector('.main__options');
        this.options = this.optionsContainer.querySelectorAll('.main__option-wrap');
        this.setDefaultOption();
        this.initArrow();
    }
    initArrow() {
        this.selected.addEventListener('click', () => this.toggleDropdown());
        this.optionsContainer.addEventListener('click', (event) => this.handleOptionClick(event));
        document.addEventListener('click', (event) => this.handleOutsideClick(event));
    }
    setDefaultOption() {
        const defaultOption = this.optionsContainer.querySelector('.selected-option');
        if (defaultOption) {
            this.updateSelectedText(defaultOption.textContent);
        }
    }
    toggleDropdown() {
        const isOpen = this.dropdown.classList.toggle('open');
        this.arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }
    closeDropdown() {
        this.dropdown.classList.remove('open');
        this.arrow.style.transform = 'rotate(0deg)';
    }
    handleOptionClick(event) {
        const target = event.target;
        const optionWrap = target.closest('.main__option-wrap');
        if (optionWrap) {
            const option = optionWrap.querySelector('span');
            this.selectOption(option);
        }
    }
    handleOutsideClick(event) {
        if (!this.dropdown.contains(event.target)) {
            this.closeDropdown();
        }
    }
    selectOption(option) {
        this.options.forEach((opt) => {
            const span = opt.querySelector('span');
            span.classList.remove('selected-option');
        });
        option.classList.add('selected-option');
        const checkmarks = this.optionsContainer.querySelectorAll('.checkmark');
        checkmarks.forEach((checkmark) => checkmark.classList.remove('visible'));
        let index = option.getAttribute('data-index');
        if (index) {
            let currentCheckmark = this.optionsContainer.querySelector(`.checkmark[data-index="${index}"]`);
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
    indexToCriteria(index) {
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
    updateSelectedText(text) {
        const selectedText = this.selected.querySelector('span');
        if (selectedText && text) {
            selectedText.textContent = text;
        }
    }
}
