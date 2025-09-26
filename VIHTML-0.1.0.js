// CONFIG:
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
    'riso': 'img'
  },
  attributes: {
    'kran': 'src',
    'charset': 'charset',
    'name': 'name',
    'content': 'content',
    'alt': 'alt'
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
 
      // Move child nodes
      while (el.firstChild) {
        newEl.appendChild(el.firstChild);
      }
 
      if (newTagName === 'head') {
        document.documentElement.insertBefore(newEl, document.body);
      } else if (newTagName === 'body') {
        document.body.replaceWith(newEl);
      } else {
        el.replaceWith(newEl);
      }
 
      if (newTagName === 'title') {
        document.title = newEl.textContent;
      }
    } else {
      for (let attr of el.attributes) {
        const mappedAttr = config.attributes[attr.name];
        if (typeof mappedAttr === 'string') {
          el.setAttribute(mappedAttr, attr.value);
          el.removeAttribute(attr.name);
        } else if (typeof mappedAttr === 'function') {
          mappedAttr(el, attr.value);
          el.removeAttribute(attr.name);
        }
      }
    }
  });
}
 
convertCustomHTML(htmlConfig);
