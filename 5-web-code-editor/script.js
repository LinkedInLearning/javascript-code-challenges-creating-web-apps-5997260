const codeInput = document.getElementById("codeInput");
const preview = document.getElementById("preview");

function updatePreview() {
  const content = codeInput.value;
  const doc = preview.contentDocument || preview.contentWindow.document;
  doc.open();
  doc.write(content);
  doc.close();
}

codeInput.addEventListener("input", updatePreview);

updatePreview();