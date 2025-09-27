// CONFIG:
const voidElements = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
];

const htmlConfig = {
  tags: {
    'atama': 'head',
    'presmi': 'button',
    'namae': 'title',
    'vikti': 'meta',
    'glavna': 'body',
    'oba1': 'h1',
    'oba2': 'h2',
    'oba3': 'h3',
    'baksu': 'div',
    'riso': 'img',
    'pr': 'br'
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
  document.querySelectorAll('*').forEach(el => {
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
      
        let insertPoint = newEl.nextSibling;
        
        while (el.firstChild) {
          parent.insertBefore(el.firstChild, insertPoint);
        }
      
        el.remove();
      }
        
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

convertCustomHTML(htmlConfig);
