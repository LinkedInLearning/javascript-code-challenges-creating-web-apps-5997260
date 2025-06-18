const codeInput = document.getElementById("codeInput");
const preview = document.getElementById("preview");
const highlightedCode = document.getElementById("highlightedCode");
const themeToggle = document.getElementById("themeToggle");

function updatePreview() {
  const content = codeInput.value;
  const doc = preview.contentDocument || preview.contentWindow.document;
  doc.open();
  doc.write(content);
  doc.close();
  updateHighlightedCode(content);
}

function updateHighlightedCode(content) {
  highlightedCode.textContent = content;
  Prism.highlightElement(highlightedCode);
}

function handleThemeToggle() {
  document.body.classList.toggle("dark-mode", themeToggle.checked);
}

codeInput.addEventListener("input", updatePreview);
themeToggle.addEventListener("change", handleThemeToggle);

updatePreview();