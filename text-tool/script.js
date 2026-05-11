const textInput = document.getElementById("textInput");
const countButton = document.getElementById("countButton");
const removeSpacesButton = document.getElementById("removeSpacesButton");
const removeLineBreaksButton = document.getElementById("removeLineBreaksButton");
const normalizeBlankLinesButton = document.getElementById("normalizeBlankLinesButton");
const trimButton = document.getElementById("trimButton");
const copyButton = document.getElementById("copyButton");
const resetButton = document.getElementById("resetButton");

const charCount = document.getElementById("charCount");
const noSpaceCount = document.getElementById("noSpaceCount");
const noLineBreakCount = document.getElementById("noLineBreakCount");
const wordCount = document.getElementById("wordCount");

function updateCounts() {
    const text = textInput.value;
    charCount.textContent = text.length;
    noSpaceCount.textContent = text.replace(/\s/g, "").length;
    noLineBreakCount.textContent = text.replace(/\n/g, "").length;
    
    const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
    wordCount.textContent = words.length;
}

countButton.addEventListener("click", updateCounts);

removeSpacesButton.addEventListener("click", () => {
    textInput.value = textInput.value.replace(/[ \t　]+/g, "");
    updateCounts();
});

removeLineBreaksButton.addEventListener("click", () => {
    textInput.value = textInput.value.replace(/\n/g, "");
    updateCounts();
});

normalizeBlankLinesButton.addEventListener("click", () => {
    textInput.value = textInput.value.replace(/\n{3,}/g, "\n\n");
    updateCounts();
});

trimButton.addEventListener("click", () => {
    textInput.value = textInput.value.trim();
    updateCounts();
});

copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(textInput.value);

        copyButton.textContent = "コピー済み";

        setTimeout(() => {
            copyButton.textContent = "コピー";
        }, 1000);

    } catch (error) {
        copyButton.textContent = "失敗しました";

        setTimeout(() => {
            copyButton.textContent = "コピー";
        }, 1000);
    }
});

resetButton.addEventListener("click", () => {
    textInput.value = "";
    updateCounts();
});

textInput.addEventListener("input", updateCounts);

updateCounts();