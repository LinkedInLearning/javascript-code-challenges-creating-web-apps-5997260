const codeInput = document.getElementById("codeInput");
const cssInput = document.getElementById("cssInput");
const jsInput = document.getElementById("jsInput");
const preview = document.getElementById("preview");
const themeToggle = document.getElementById("themeToggle");
const languageSelect = document.getElementById("languageSelect");

// Update the iframe preview based on selected language mode
function updatePreview() {
  const lang = languageSelect.value;
  const doc = preview.contentDocument || preview.contentWindow.document;
  doc.open();

  if (lang === "html") {
    doc.write(codeInput.value);
  } else if (lang === "html-css-js") {
    const html = codeInput.value || "";
    const css = `<style>${cssInput.value || ""}</style>`;
    const js = `<script>${jsInput.value || ""}<\/script>`;
    doc.write(
      `<!DOCTYPE html><html><head>${css}</head><body>${html}${js}</body></html>`
    );
  }

  doc.close();
}

// Toggle dark mode
function handleThemeToggle() {
  document.body.classList.toggle("dark-mode", themeToggle.checked);
}

// Adjust visible inputs based on selected language
function handleLanguageChange() {
  const isCombo = languageSelect.value === "html-css-js";
  cssInput.style.display = jsInput.style.display = isCombo ? "block" : "none";
  codeInput.placeholder = isCombo
    ? "Write your HTML here..."
    : "Write your HTML page here...";

  updatePreview();
}

// Attach event listeners
[codeInput, cssInput, jsInput].forEach((input) => {
  input.addEventListener("input", updatePreview);
});

themeToggle.addEventListener("change", handleThemeToggle);
languageSelect.addEventListener("change", handleLanguageChange);

handleLanguageChange(); 
handleThemeToggle();