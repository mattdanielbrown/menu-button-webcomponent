'use strict';



function toggleElementClass(targetElement, className) {
  if(targetElement.classList.contains(className)) {
    targetElement.classList.remove(className);
  } else {
    targetElement.classList.add(className);
  }

}

class MenuButton extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'background'];
  }

  get color() { return this.hasAttribute('color'); }
  set color(val) {
    if (val) {
      this.setAttribute('color', '');
    } else {
      this.removeAttribute('color');
    }
  }
  get background() { return this.hasAttribute('background'); }
  set background(val) {
    if (val) {
      this.setAttribute('background', '');
    } else {
      this.removeAttribute('background');
    }
  }

  constructor() {
    super();
    let menuButtonTemplate = document.createElement('template');
    menuButtonTemplate.innerHTML = `<style>
        button {
          width: 48px;
          height: 48px;
          padding: 0;
          margin: 0;
          background: #ffffff;
          text-align: center;
          position: relative;
          transition: all 120ms;
          outline: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button .text-only-content {
          display: none;
        }
        button:active {
          outline: none;
          background: #cccccc;
          border-color: #cccccc;
        }
        button:focus {
          outline: none;
          box-shadow: 0 0 0 5px rgba(123, 104, 238, 0.3);
        }
        button.background-black {
          background: #000 !important;
          border-color: #000;
        }
        button.background-black #menu-icon-wrapper {
          background: #000;
        }
        button.background-black #menu-icon-wrapper .menu-icon-line {
          background: white;
        }
        #menu-icon-wrapper {
          width: 100%;
          height: 100%;
          /*
            position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          */
          vertical-align: middle;
          z-index: 100;
          display: flex;
          flex-direction: column;
          padding: 0;
          justify-content: center;
        }
        .menu-icon-line {
          width: 32px;
          height: 4px;
          background: #333333;
          display: block;
          line-height: 1;
          margin: 3px auto 3px auto;
          text-align: center;
          transition: all 100ms;
        }
        button.open #menu-icon-wrapper,
        button.open #menu-icon-wrapper2 {
          justify-content: center !important;
        }
        button.open #menu-icon-wrapper .menu-icon-line,
        button.open #menu-icon-wrapper2 .menu-icon-line {
          margin: 0 auto;
          display: block !important;
          z-index: 111;
        }
        button.open #menu-icon-wrapper .middle-line,
        button.open #menu-icon-wrapper .bottom-line,
        button.open #menu-icon-wrapper2 .middle-line,
        button.open #menu-icon-wrapper2 .bottom-line {
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
        button.open #menu-icon-wrapper .middle-line,
        button.open #menu-icon-wrapper2 .middle-line {
          display: none !important;
        }
        button.open #menu-icon-wrapper .bottom-line,
        button.open #menu-icon-wrapper2 .bottom-line {
          margin-top: -4px;
        }
        button.open #menu-icon-wrapper .top-line,
        button.open #menu-icon-wrapper2 .top-line {
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          margin-top: 2px;
        }
        button:active #menu-icon-wrapper,
        button:active #menu-icon-wrapper {
          justify-content: center !important;
        }
        button:active #menu-icon-wrapper .menu-icon-line,
        button:active #menu-icon-wrapper .menu-icon-line {
          margin: 0 auto;
          display: block !important;
          z-index: 111;
        }
        button:active #menu-icon-wrapper .middle-line,
        button:active #menu-icon-wrapper .bottom-line,
        button:active #menu-icon-wrapper .middle-line,
        button:active #menu-icon-wrapper .bottom-line {
          -webkit-transform: rotate(0);
          transform: rotate(0);
        }
        button:active #menu-icon-wrapper .middle-line,
        button:active #menu-icon-wrapper .middle-line {
          display: none !important;
        }
        button:active #menu-icon-wrapper .bottom-line,
        button:active #menu-icon-wrapper .bottom-line {
          margin-top: -4px;
        }
        button:active #menu-icon-wrapper .top-line,
        button:active #menu-icon-wrapper .top-line {
          -webkit-transform: none;
          transform: none;
          margin-top: 2px;
        }
        button.open:active #menu-icon-wrapper,
        button.open:active #menu-icon-wrapper {
          justify-content: center !important;
        }
        button.open:active #menu-icon-wrapper .menu-icon-line,
        button.open:active #menu-icon-wrapper .menu-icon-line {
          margin: 0 auto;
          display: block !important;
          z-index: 111;
        }
        button.open:active #menu-icon-wrapper .middle-line,
        button.open:active #menu-icon-wrapper .bottom-line,
        button.open:active #menu-icon-wrapper .middle-line,
        button.open:active #menu-icon-wrapper .bottom-line {
          -webkit-transform: rotate(0);
          transform: rotate(0);
        }
        button.open:active #menu-icon-wrapper .middle-line,
        button.open:active #menu-icon-wrapper .middle-line {
          display: none !important;
        }
        button.open:active #menu-icon-wrapper .bottom-line,
        button.open:active #menu-icon-wrapper .bottom-line {
          margin-top: -4px;
        }
        button.open:active #menu-icon-wrapper .top-line,
        button.open:active #menu-icon-wrapper .top-line {
          -webkit-transform: rotate(0);
          transform: rotate(0);
          margin-top: 2px;
        }
      </style><button role="button" type="button" id="menu-button">
        <span class="text-only-content">Menu</span>
        <span class="icon-wrapper" id="menu-icon-wrapper">
        <span class="menu-icon-line top-line"></span>
        <span class="menu-icon-line middle-line"></span>
        <span class="menu-icon-line bottom-line"></span>
        </span>
      </button>`;
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(menuButtonTemplate.content.cloneNode(true));
    this.addEventListener('click', e => {
      this.toggleMenuButtonState();

    });
  }
  toggleMenuButtonState() {
    toggleElementClass(this.shadowRoot.querySelector('button'), 'open');
  }
  connectedCallback() {
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-disabled', 'false');
    if (this.hasAttribute('background')) {
      let bgColor = this.getAttribute('background');
      this.shadowRoot.querySelector('button').css('background-color', bgColor);
    }
    if (this.hasAttribute('color')) {
      let mainColor = this.getAttribute('color');
      this.shadowRoot.querySelectorAll('span').css('background', mainColor);
    }
  }
  disconnectedCallback() {

  }
  attributeChangedCallback(attrName, oldVal, newVal) {

  }
}
customElements.define('menu-button', MenuButton);
