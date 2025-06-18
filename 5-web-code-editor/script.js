const codeInput = document.getElementById("codeInput");
const preview = document.getElementById("preview");
const highlightedCode = document.getElementById("highlightedCode");

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

codeInput.addEventListener("input", updatePreview);

updatePreview();