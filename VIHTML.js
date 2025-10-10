//CONFIG:
const voidElements = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
];

const htmlConfig = {
  tags: {
    'atama': 'tsui',
    'presmi': 'button',
    'namae': 'title',
    'vikti': 'meta',
    'glavna': 'body',
    'oba1': 'h1',
    'oba2': 'h2',
    'oba3': 'h3',
    'baksu': 'div',
    'riso': 'img',
    'pr': 'br',
    'pol':'footer',
    'ele':'header'
  },
  attributes: {
    'kran': 'src',
    'alfakaban': 'charset',
    'namae': 'name',
    'shiruzma': 'content',
    'impla': 'alt'
  }
};

function convertCustomHTML(config) {
  const allElements = Array.from(document.querySelectorAll('*')).reverse();

  allElements.forEach(el => {
    const tagName = el.tagName.toLowerCase();

    if (config.tags[tagName]) {
      const newTagName = config.tags[tagName];
      const newEl = document.createElement(newTagName);

      for (let attr of el.attributes) {
        const mappedAttr = config.attributes[attr.name];
        if (typeof mappedAttr === 'string') {
          newEl.setAttribute(mappedAttr, attr.value);
        } else if (typeof mappedAttr === 'function') {
          mappedAttr(newEl, attr.value);
        } else {
          newEl.setAttribute(attr.name, attr.value);
        }
      }

      const parent = el.parentNode;

      if (voidElements.includes(newTagName)) {
        parent.insertBefore(newEl, el);
        let reference = newEl;
        while (el.firstChild) {
          const child = el.firstChild;
          el.removeChild(child);
          parent.insertBefore(child, reference.nextSibling);
          reference = child;
        }
        el.remove();
      } else {
        while (el.firstChild) {
          newEl.appendChild(el.firstChild);
        }
        el.replaceWith(newEl);
      }

      if (newTagName === 'title') {
        document.title = newEl.textContent;
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  convertCustomHTML(htmlConfig);
});
