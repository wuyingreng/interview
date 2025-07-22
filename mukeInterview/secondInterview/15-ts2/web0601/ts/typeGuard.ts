const onclick = (e: unknown) => {
  if (e instanceof HTMLButtonElement) {
    e.classList.add('primary');
  }
}
