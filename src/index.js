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

  addKey() {
    // const keyItems = [
    //   '`',
    //   '1',
    //   '2',
    //   '3',
    //   '4',
    //   '5',
    //   '6',
    //   '7',
    //   '8',
    //   '9',
    //   '0',
    //   '-',
    //   '=',
    //   'BackSpace',
    //   'Tab',
    //   'Q',
    //   'W',
    //   'E',
    //   'R',
    //   'T',
    //   'Y',
    //   'U',
    //   'I',
    //   'O',
    //   'P',
    //   '[',
    //   ']',
    //   'Del',
    //   'Caps Lock',
    //   'A',
    //   'S',
    //   'D',
    //   'F',
    //   'G',
    //   'H',
    //   'J',
    //   'K',
    //   'L',
    //   ';',
    //   '"',
    //   'Enter',
    //   'Shift left',
    //   'Z',
    //   'X',
    //   'C',
    //   'V',
    //   'B',
    //   'N',
    //   'M',
    //   ',',
    //   '.',
    //   '/',
    //   'Shift right',
    //   '&#8593',
    //   'Ctrl',
    //   'Win',
    //   'Alt',
    //   'Space',
    //   'Alt',
    //   'Ctrl',
    //   '&#8592',
    //   '&#x2193',
    //   '&#8594',
    // ];

    // const fragment = document.createDocumentFragment();

    sources.forEach((key) => {
      const item = document.createElement('div');
      item.classList.add('item');

      console.log(key);
      item.innerHTML = key;

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

      tabsWithNewClass.map((el) => {
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

  // eslint-disable-next-line class-methods-use-this
  addListeners() {
    document.addEventListener('keydown', (e) => {
      console.log(e.key);
      console.log(e);
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Keyboard('#keyboard').init();
});
