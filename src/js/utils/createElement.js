export default function createElem(tag, selector, inner) {
  const elem = document.createElement(tag);
  if (selector) elem.classList.add(selector);
  if (inner) elem.innerHTML = inner;
  return elem;
}
