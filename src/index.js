/* eslint-disable operator-linebreak */
// eslint-disable-next-line import/extensions
import sources from './sources-en.js';
// eslint-disable-next-line import/extensions
import sourcesRu from './sources-ru.js';

const main = document.createElement('main');
main.setAttribute('id', 'keyboard');
main.classList.add('keyboard');
document.body.prepend(main);

class Keyboard {
  constructor(container) {
    this.container = document.querySelector(container);

    this.fragment = document.createDocumentFragment();

    // Parameters
    this.isActive = false;

    // Textarea selection parameters
    this.start = null;
    this.end = null;
    this.value = null;

    // Change language parameters
    this.language = localStorage.getItem('lang');
  }

  init() {
    this.createItems();
    this.pressKeysEvents();
    this.changeLanguage();
  }

  createItems() {
    this.div = document.createElement('div');
    this.div.classList.add('keyboard__items');

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('keyboard__textarea');
    this.textarea.setAttribute('placeholder', "Remember, you're breathtaking!");

    this.container.append(this.textarea, this.div);

    this.container.children[1].append(this.addKey());

    const title = `
      <p class="keyboard__title">Клавиатура создана в операционной системе Windows. <br> Комбинация для переключения языка: левыe shift + alt</p>
      `;

    this.container.insertAdjacentHTML('beforeend', title);

    [...document.querySelectorAll('.item')]
      .filter((el) => el.innerText === '→')[0]
      .classList.add('arrow-right');
    [...document.querySelectorAll('.item')]
      .filter((el) => el.innerText === '↓')[0]
      .classList.add('arrow-down');
    [...document.querySelectorAll('.item')]
      .filter((el) => el.innerText === '←')[0]
      .classList.add('arrow-left');
    [...document.querySelectorAll('.item')]
      .filter((el) => el.innerText === '↑')[0]
      .classList.add('arrow-up');
  }

  // eslint-disable-next-line class-methods-use-this
  detectCapsLock() {
    document.querySelectorAll('.item').forEach((el) => {
      if (el.textContent.length === 1) {
        el.classList.toggle('lowercase');
      }
    });
  }

  addKey() {
    sources.forEach((key) => {
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = key;

      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('capslock')) {
          this.detectCapsLock();
        }
      });

      this.addButtonsClasses(item);

      this.fragment.appendChild(item);
    });

    return this.fragment;
  }

  // eslint-disable-next-line class-methods-use-this
  addButtonsClasses(element) {
    const tabsWithNewClass = [
      'Shift left',
      'Shift right',
      'BackSpace',
      'Caps Lock',
      'Enter',
      'Space',
      'Tab',
      'Del',
      'Ctrl left',
      'Ctrl right',
      'Alt left',
      'Alt right',
      'Win',
    ];

    tabsWithNewClass.filter((el) => {
      if (element.innerText === el) {
        element.classList.add(`${el.toLowerCase().split` `.join``}`);
      }

      if (
        // eslint-disable-next-line operator-linebreak
        element.classList.contains('shiftleft') ||
        element.classList.contains('shiftright')
      ) {
        // eslint-disable-next-line no-param-reassign
        element.textContent = 'Shift';
      }

      if (
        // eslint-disable-next-line operator-linebreak
        element.classList.contains('altleft') ||
        element.classList.contains('altright')
      ) {
        // eslint-disable-next-line no-param-reassign
        element.textContent = 'Alt';
      }

      if (
        // eslint-disable-next-line operator-linebreak
        element.classList.contains('ctrlleft') ||
        element.classList.contains('ctrlright')
      ) {
        // eslint-disable-next-line no-param-reassign
        element.textContent = 'Ctrl';
      }

      return element;
    });
  }

  addText(e) {
    this.start = this.textarea.selectionStart;
    this.end = this.textarea.selectionEnd;
    this.value = this.textarea.value;

    if (e.target.classList.contains('space')) {
      this.spaceButtonFunctionality();
    } else if (e.target.classList.contains('backspace')) {
      this.backspaceButtonFunctionality();
    } else if (e.target.classList.contains('enter')) {
      this.enterButtonFunctionality();
    } else if (e.target.classList.contains('tab')) {
      this.tabButtonFunctionality();
    } else if (e.target.classList.contains('capslock')) {
      e.target.classList.toggle('capslock--active');
    } else if (
      // eslint-disable-next-line operator-linebreak
      e.target.classList.contains('win') ||
      e.target.classList.contains('shiftleft') ||
      e.target.classList.contains('shiftright') ||
      e.target.classList.contains('altleft') ||
      e.target.classList.contains('altright') ||
      e.target.classList.contains('ctrlleft') ||
      e.target.classList.contains('ctrlright')
    ) {
      this.textarea.value += '';
    } else if (e.target.classList.contains('del')) {
      this.deleteButtonFunctionality();
    } else {
      this.changeCursorPositionOnClick(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addActiveClass(element) {
    element.classList.add('active');
  }

  // eslint-disable-next-line class-methods-use-this
  removeActiveClass(element) {
    element.classList.remove('active');
  }

  backspaceButtonFunctionality() {
    // eslint-disable-next-line operator-linebreak
    const newValue =
      this.value.slice(
        0,
        // eslint-disable-next-line comma-dangle
        this.start === this.end ? this.start - 1 : this.start
      ) + this.value.slice(this.end + 1);

    this.textarea.value = newValue;

    this.textarea.selectionStart =
      this.start === this.end ? this.start - 1 : this.start;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  deleteButtonFunctionality() {
    if (!(this.value.length > this.end)) return;
    // eslint-disable-next-line operator-linebreak
    const newValue =
      this.value.slice(0, this.start) + this.value.slice(this.end + 1);

    this.textarea.value = newValue;

    this.textarea.selectionStart = this.start;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  enterButtonFunctionality() {
    // eslint-disable-next-line operator-linebreak
    const newValue =
      this.value.slice(0, this.start).concat('\n') + this.value.slice(this.end);

    this.textarea.value = newValue;

    this.textarea.selectionStart = this.start + 1;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  tabButtonFunctionality() {
    // eslint-disable-next-line operator-linebreak
    const newValue =
      this.value.slice(0, this.start).concat('\t') + this.value.slice(this.end);

    this.textarea.value = newValue;

    this.textarea.selectionStart = this.start + 1;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  spaceButtonFunctionality() {
    // eslint-disable-next-line operator-linebreak
    const newValue =
      this.value.slice(0, this.start).concat(' ') + this.value.slice(this.end);

    this.textarea.value = newValue;

    this.textarea.selectionStart = this.start + 1;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  enableRuLanguage() {
    document.body.classList.add('change-language');

    document.documentElement.setAttribute('lang', 'ru');

    this.sources = sourcesRu;

    document.querySelectorAll('.item').forEach((item, i) => {
      // eslint-disable-next-line no-param-reassign
      item.innerHTML = this.sources[i];

      this.addButtonsClasses(item);
    });

    localStorage.setItem('lang', 'enabled');
  }

  disableRuLanguage() {
    document.body.classList.remove('change-language');

    document.documentElement.setAttribute('lang', 'en');

    this.sources = sources;

    document.querySelectorAll('.item').forEach((item, i) => {
      // eslint-disable-next-line no-param-reassign
      item.innerHTML = this.sources[i];

      this.addButtonsClasses(item);
    });

    localStorage.setItem('lang', null);
  }

  // eslint-disable-next-line class-methods-use-this
  changeLanguage() {
    if (this.language === 'enabled') {
      this.enableRuLanguage();
    }

    // Click shift + alt event to change language
    document.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key === 'Alt') {
        this.language = localStorage.getItem('lang');

        if (this.language !== 'enabled') {
          this.enableRuLanguage();
        } else {
          this.disableRuLanguage();
        }
      }
    });
  }

  changeCursorPositionOnClick(e) {
    // eslint-disable-next-line operator-linebreak
    const newValue =
      // eslint-disable-next-line operator-linebreak
      this.value.slice(0, this.start) +
      (e.target.classList.contains('lowercase')
        ? e.target.textContent.toLowerCase()
        : // eslint-disable-next-line operator-linebreak, indent
          // eslint-disable-next-line operator-linebreak, indent
          // eslint-disable-next-line operator-linebreak, indent
          // eslint-disable-next-line operator-linebreak, indent
          e.target.textContent.toUpperCase()) +
      this.value.slice(this.end);

    this.textarea.value = newValue;

    this.textarea.selectionStart = this.start + 1;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  changeCursorPositionOnKeydown(e) {
    let newValue;

    if (e.shiftKey && !document.querySelector('.lowercase')) {
      newValue =
        this.value.slice(0, this.start) +
        e.key.toLowerCase() +
        this.value.slice(this.end);
    } else if (e.shiftKey && document.querySelector('.lowercase')) {
      newValue =
        this.value.slice(0, this.start) +
        e.key.toUpperCase() +
        this.value.slice(this.end);
    } else if (document.querySelector('.lowercase')) {
      newValue =
        this.value.slice(0, this.start) +
        e.key.toLowerCase() +
        this.value.slice(this.end);
    } else {
      newValue =
        this.value.slice(0, this.start) +
        e.key.toUpperCase() +
        this.value.slice(this.end);
    }

    this.textarea.value = newValue;

    this.textarea.selectionStart = this.start + 1;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  pressKeysEvents() {
    document.querySelector('.capslock').classList.add('capslock--active');

    document.querySelectorAll('.item').forEach((item) => {
      item.addEventListener('click', (e) => {
        this.addText(e);
      });
    });

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      this.start = this.textarea.selectionStart;
      this.end = this.textarea.selectionEnd;
      this.value = this.textarea.value;

      if (e.key === 'Enter') {
        this.enterButtonFunctionality();
        this.addActiveClass(document.querySelector('.enter'));
      } else if (e.key === 'Backspace') {
        this.backspaceButtonFunctionality();
        this.addActiveClass(document.querySelector('.backspace'));
      } else if (e.key === 'Tab') {
        this.tabButtonFunctionality();
        this.addActiveClass(document.querySelector('.tab'));
      } else if (e.code === 'Space') {
        this.spaceButtonFunctionality(e);
        this.addActiveClass(document.querySelector('.space'));
      } else if (e.code === 'ShiftLeft') {
        this.addActiveClass(document.querySelector('.shiftleft'));
      } else if (e.code === 'ShiftRight') {
        this.addActiveClass(document.querySelector('.shiftright'));
      } else if (e.code === 'MetaLeft') {
        this.addActiveClass(document.querySelector('.win'));
      } else if (e.code === 'AltLeft') {
        this.addActiveClass(document.querySelector('.altleft'));
      } else if (e.code === 'AltRight') {
        this.addActiveClass(document.querySelector('.altright'));
      } else if (e.code === 'ControlLeft') {
        this.addActiveClass(document.querySelector('.ctrlleft'));
      } else if (e.code === 'ControlRight') {
        this.addActiveClass(document.querySelector('.ctrlright'));
      } else if (e.code === 'Delete') {
        this.addActiveClass(document.querySelector('.del'));
        this.deleteButtonFunctionality();
      } else if (e.key === 'ArrowUp') {
        this.addActiveClass(document.querySelector('.arrow-up'));
        this.textarea.value += document.querySelector('.arrow-up').textContent;
      } else if (e.key === 'ArrowDown') {
        this.addActiveClass(document.querySelector('.arrow-down'));
        this.textarea.value +=
          document.querySelector('.arrow-down').textContent;
      } else if (e.key === 'ArrowLeft') {
        this.addActiveClass(document.querySelector('.arrow-left'));
        this.textarea.value +=
          document.querySelector('.arrow-left').textContent;
      } else if (e.key === 'ArrowRight') {
        this.addActiveClass(document.querySelector('.arrow-right'));
        this.textarea.value +=
          document.querySelector('.arrow-right').textContent;
      } else {
        this.changeCursorPositionOnKeydown(e);
      }

      this.div.childNodes.forEach((div) => {
        if (div.textContent === e.key.toUpperCase()) {
          this.addActiveClass(div);
        }
      });
    });

    // Capslock button functionality
    document.addEventListener('keyup', (e) => {
      document.querySelectorAll('.item').forEach((item) => {
        this.removeActiveClass(item);
      });

      if (e.which === 20) {
        this.isActive = !this.isActive;

        this.textarea.value += '';

        this.detectCapsLock();

        if (!this.isActive) {
          document.querySelector('.capslock').classList.add('capslock--active');
        } else {
          document
            .querySelector('.capslock')
            .classList.remove('capslock--active');
        }
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Keyboard('#keyboard').init();
});
