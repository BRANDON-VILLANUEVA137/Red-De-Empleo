// antiCopy.js - Disable copy, cut, paste, right-click, and certain keyboard shortcuts

document.addEventListener('DOMContentLoaded', () => {
  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Disable copy, cut, paste events
  ['copy', 'cut', 'paste'].forEach(eventType => {
    document.addEventListener(eventType, (e) => {
      e.preventDefault();
    });
  });

  // Disable keyboard shortcuts: Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12
  document.addEventListener('keydown', (e) => {
    if (
      (e.ctrlKey && ['c', 'x', 'v', 's', 'u'].includes(e.key.toLowerCase())) ||
      (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
      e.key === 'F12'
    ) {
      e.preventDefault();
    }
  });
});
