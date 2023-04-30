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

    this.isActive = false;
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
        'Ctrl left',
        'Ctrl right',
        'Alt left',
        'Alt right',
        'Win',
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

        if (
          // eslint-disable-next-line operator-linebreak
          item.classList.contains('altleft') ||
          item.classList.contains('altright')
        ) {
          item.textContent = 'Alt';
        }

        if (
          // eslint-disable-next-line operator-linebreak
          item.classList.contains('ctrlleft') ||
          item.classList.contains('ctrlright')
        ) {
          item.textContent = 'Ctrl';
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
      e.target.classList.toggle('capslock--active');
    } else if (
      // eslint-disable-next-line operator-linebreak
      e.target.classList.contains('win') ||
      // eslint-disable-next-line operator-linebreak
      e.target.classList.contains('alt') ||
      e.target.classList.contains('ctrl')
    ) {
      this.textarea.value += '';
    } else if (
      // eslint-disable-next-line operator-linebreak
      e.target.classList.contains('shiftleft') ||
      e.target.classList.contains('shiftright')
    ) {
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
    // setTimeout(() => {
    //   element.classList.remove('active');
    // }, 300);
  }

  // eslint-disable-next-line class-methods-use-this
  removeActiveClass(element) {
    element.classList.remove('active');
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

      console.log(e.key);

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
      } else if (e.code === 'Space') {
        this.textarea.value += ' ';
        this.addActiveClass(document.querySelector('.space'));
      } else if (e.code === 'ShiftLeft') {
        this.textarea.value += '';
        this.addActiveClass(document.querySelector('.shiftleft'));
      } else if (e.shiftKey && !document.querySelector('.lowercase')) {
        this.textarea.value += e.key.toLowerCase();
      } else if (e.shiftKey && document.querySelector('.lowercase')) {
        this.textarea.value += e.key.toUpperCase();
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
      } else {
        this.textarea.value += document.querySelector('.lowercase')
          ? e.key.toLowerCase()
          : e.key.toUpperCase();
      }

      this.div.childNodes.forEach((div) => {
        if (div.textContent === e.key.toUpperCase()) {
          this.addActiveClass(div);
        }
      });
    });

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
