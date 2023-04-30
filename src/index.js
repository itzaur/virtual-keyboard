// eslint-disable-next-line import/extensions
import sources from './sources.js';

const main = document.createElement('main');
main.setAttribute('id', 'keyboard');
main.classList.add('keyboard');
document.body.prepend(main);
class Keyboard {
  constructor(container) {
    this.keys = [];
    this.container = document.querySelector(container);

    this.fragment = document.createDocumentFragment();
  }

  init() {
    this.addListeners();
    this.createItems();
    this.pressKeysEvents();
  }

  createItems() {
    this.div = document.createElement('div');
    this.div.classList.add('keyboard__items');

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('keyboard__textarea');
    this.textarea.setAttribute('placeholder', "Remember, you're breathtaking!");

    this.container.append(this.textarea, this.div);

    this.container.children[1].append(this.addKey());
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

      const tabsWithNewClass = [
        'Shift left',
        'Shift right',
        'BackSpace',
        'Caps Lock',
        'Enter',
        'Space',
        'Tab',
        'Del',
        'Ctrl',
      ];

      tabsWithNewClass.filter((el) => {
        if (item.innerText === el) {
          item.classList.add(`${el.toLowerCase().split` `.join``}`);
        }

        if (
          // eslint-disable-next-line operator-linebreak
          item.classList.contains('shiftleft') ||
          item.classList.contains('shiftright')
        ) {
          item.textContent = 'Shift';
        }

        return item;
      });

      this.fragment.appendChild(item);
    });

    return this.fragment;
  }

  addText(e) {
    if (e.target.classList.contains('space')) {
      this.textarea.value += ' ';
    } else if (e.target.classList.contains('backspace')) {
      this.textarea.value = this.textarea.value.slice(
        0,
        // eslint-disable-next-line comma-dangle
        this.textarea.value.length - 1
      );
    } else if (e.target.classList.contains('enter')) {
      this.textarea.value += '\n';
    } else if (e.target.classList.contains('tab')) {
      this.textarea.value += '    ';
    } else if (e.target.classList.contains('capslock')) {
      this.textarea.value += '';
    } else {
      this.textarea.value += e.target.classList.contains('lowercase')
        ? e.target.textContent.toLowerCase()
        : e.target.textContent.toUpperCase();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addActiveClass(element) {
    element.classList.add('active');
    setTimeout(() => {
      element.classList.remove('active');
    }, 300);
  }

  pressKeysEvents() {
    document.querySelectorAll('.item').forEach((item) => {
      item.addEventListener('click', (e) => {
        this.addText(e);
      });
    });

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      if (e.key === 'Enter') {
        this.textarea.value += '\n';
        this.addActiveClass(document.querySelector('.enter'));
      } else if (e.key === 'Backspace') {
        this.textarea.value = this.textarea.value.slice(
          0,
          // eslint-disable-next-line comma-dangle
          this.textarea.value.length - 1
        );
        this.addActiveClass(document.querySelector('.backspace'));
      } else if (e.key === 'Tab') {
        this.textarea.value += '    ';
        this.addActiveClass(document.querySelector('.tab'));
      } else {
        this.textarea.value += document.querySelector('.lowercase')
          ? e.key
          : e.key.toUpperCase();
      }

      this.div.childNodes.forEach((div) => {
        if (div.textContent === e.key.toUpperCase()) {
          this.addActiveClass(div);
        }
      });
    });

    document.addEventListener('keyup', (e) => {
      if (e.which === 20) {
        this.textarea.value += '';
        this.addActiveClass(document.querySelector('.capslock'));

        this.detectCapsLock();
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addListeners() {
    // document.addEventListener('keydown', (e) => {
    //   console.log(e.key);
    //   console.log(e);
    //   this.textarea.textContent += e.key;
    // });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Keyboard('#keyboard').init();
});
