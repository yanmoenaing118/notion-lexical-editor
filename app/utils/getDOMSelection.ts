export function getDOMSelection(targetWindow: null | Window): Selection | null {
  return (targetWindow || window).getSelection();
}
