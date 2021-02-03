export default function createElem(tag: string, selector: string, inner?: string): HTMLElement {
  const elem = document.createElement(tag);
  if (selector) elem.classList.add(selector);
  if (inner) elem.innerHTML = inner;
  return elem;
}
