/* Tiny cross-section event bus (e.g. "open this project" from the timeline or skills). */
const OPEN_PROJECT = 'portfolio:open-project';

export function openProject(id: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PROJECT, { detail: id }));
}

export function onOpenProject(handler: (id: string) => void): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail);
  window.addEventListener(OPEN_PROJECT, listener);
  return () => window.removeEventListener(OPEN_PROJECT, listener);
}
