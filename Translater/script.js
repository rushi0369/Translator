"use strict";

const sourceSelect = document.getElementById("fselect");
const targetSelect = document.getElementById("sselect");

const fromText = document.getElementById("fromText");
const toText = document.getElementById("toText");

const translateBtn = document.getElementById("transfer");
const buttonText = document.getElementById("buttonText");
const statusMessage = document.getElementById("statusMessage");
const charCount = document.getElementById("charCount");

const clearBtn = document.getElementById("clearText");
const swapBtn = document.getElementById("swapLanguages");

const fromSpeaker = document.getElementById("fromSpeaker");
const toSpeaker = document.getElementById("toSpeaker");
const fromCopy = document.getElementById("fromCopy");
const toCopy = document.getElementById("toCopy");

const MAX_LENGTH = 5000;

// ─── Language helpers 

// Find a language configuration by its dropdown code.
function getLanguage(code) {
    return languageByCode[code] || null;
}

// Populate both dropdowns.
function populateLanguages() {
    const fragment1 = document.createDocumentFragment();
    const fragment2 = document.createDocumentFragment();

    languageList
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(language => {
            const option1 = new Option(language.name, language.code);
            const option2 = new Option(language.name, language.code);

            fragment1.appendChild(option1);
            fragment2.appendChild(option2);
        });

    sourceSelect.appendChild(fragment1);
    targetSelect.appendChild(fragment2);

    sourceSelect.value = "en-GB";
    targetSelect.value = "hi-IN";
}

populateLanguages();

// ─── Status message helper 

function setStatus(message = "", type = "") {
    statusMessage.textContent = message;
    statusMessage.className = "status-message";

    if (type) {
        statusMessage.classList.add(type);
    }
}

// ─── Character count 

function updateCharacterCount() {
    charCount.textContent = `${fromText.value.length} / ${MAX_LENGTH}`;
}

fromText.addEventListener("input", () => {
    updateCharacterCount();

    if (!fromText.value.trim()) {
        toText.value = "";
        setStatus();
    }
});

// ─── Translation engine 

async function translateWithMyMemory(text, sourceLang, targetLang) {
    const params = new URLSearchParams({
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
        mt: "1"
    });

    const response = await fetch(
        `https://api.mymemory.translated.net/get?${params}`
    );

    if (!response.ok) {
        throw new Error("MyMemory service is unavailable.");
    }

    const data = await response.json();

    if (Number(data.responseStatus) !== 200) {
        throw new Error(
            data.responseDetails || "This language pair could not be translated."
        );
    }

    const translated = data.responseData?.translatedText?.trim();

    if (
        !translated ||
        /MYMEMORY WARNING/i.test(translated) ||
        /PLEASE SELECT TWO DISTINCT LANGUAGES/i.test(translated) ||
        /QUERY LENGTH LIMIT/i.test(translated)
    ) {
        throw new Error("MyMemory returned no valid translation.");
    }

    return translated;
}


async function translateWithLingva(text, sourceLang, targetLang) {
    const url = `https://lingva.ml/api/v1/${encodeURIComponent(sourceLang)}/${encodeURIComponent(targetLang)}/${encodeURIComponent(text)}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Lingva Translate service is unavailable.");
    }

    const data = await response.json();

    if (!data.translation) {
        throw new Error("Lingva returned no translation.");
    }

    return data.translation;
}

/**
 * Translate a single text chunk using the primary API with fallback.
 */
async function translateChunk(text, sourceLang, targetLang) {
    // Guard: MyMemory limits each request to ~500 UTF-8 bytes.
    if (new TextEncoder().encode(text).length > 500) {
        throw new Error("Text chunk is too long. Please use shorter text.");
    }

    try {
        return await translateWithMyMemory(text, sourceLang, targetLang);
    } catch (primaryError) {
        console.warn("Primary API failed, trying fallback:", primaryError.message);

        try {
            return await translateWithLingva(text, sourceLang, targetLang);
        } catch (fallbackError) {
            console.warn("Fallback API also failed:", fallbackError.message);
            // Re-throw the primary error which has a more useful message.
            throw primaryError;
        }
    }
}

// ─── Text splitting 

/**
 * Split text into chunks that respect word boundaries.
 * Each chunk stays under maxChunkLength characters so that the
 * UTF-8 byte count stays within the API limit.
 */
function splitText(text, maxChunkLength = 450) {
    const chunks = [];
    let remaining = text.trim();

    while (remaining.length > maxChunkLength) {
        let cut = remaining.lastIndexOf(" ", maxChunkLength);

        if (cut < Math.floor(maxChunkLength * 0.5)) {
            cut = maxChunkLength;
        }

        chunks.push(remaining.slice(0, cut));
        remaining = remaining.slice(cut).trimStart();
    }

    if (remaining) {
        chunks.push(remaining);
    }

    return chunks;
}

// ─── Translate button 

translateBtn.addEventListener("click", async () => {
    const text = fromText.value.trim();

    if (!text) {
        toText.value = "";
        setStatus("Please enter some text to translate.", "error");
        fromText.focus();
        return;
    }

    const source = getLanguage(sourceSelect.value);
    const target = getLanguage(targetSelect.value);

    if (!source || !target) {
        setStatus("Please select both languages.", "error");
        return;
    }

    if (source.apiCode === target.apiCode) {
        toText.value = text;
        setStatus("Source and target languages are the same.", "success");
        return;
    }

    translateBtn.disabled = true;
    buttonText.textContent = "Translating...";
    toText.value = "";
    setStatus("Translating your text...");

    try {
        const chunks = splitText(text);
        const translatedChunks = [];

        for (let i = 0; i < chunks.length; i++) {
            const result = await translateChunk(
                chunks[i],
                source.apiCode,
                target.apiCode
            );

            translatedChunks.push(result);

            // Show partial progress for long texts.
            toText.value = translatedChunks.join(" ");
        }

        toText.value = translatedChunks.join(" ");
        setStatus("Translation completed.", "success");
    } catch (error) {
        console.error("Translation error:", error);

        toText.value = "";
        setStatus(
            error.message || "Translation failed. Please try again later.",
            "error"
        );
    } finally {
        translateBtn.disabled = false;
        buttonText.textContent = "Translate";
    }
});

// ─── Swap languages 

swapBtn.addEventListener("click", () => {
    const tempLang = sourceSelect.value;
    sourceSelect.value = targetSelect.value;
    targetSelect.value = tempLang;

    const tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    updateCharacterCount();
    setStatus("Languages swapped.", "success");
});

// ─── Clear text 

clearBtn.addEventListener("click", () => {
    fromText.value = "";
    toText.value = "";
    updateCharacterCount();
    setStatus();
    fromText.focus();
});

// ─── Text-to-speech 

// Cache available browser voices once they load.
let cachedVoices = [];

function loadVoices() {
    cachedVoices = window.speechSynthesis?.getVoices() || [];
}

if ("speechSynthesis" in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

function findBestVoice(voiceCode) {
    if (!cachedVoices.length) return null;

    const target = voiceCode.toLowerCase();
    const baseLang = target.split("-")[0];

    // 1. Exact match  (e.g. "hi-IN" === "hi-IN")
    let match = cachedVoices.find(
        v => v.lang.toLowerCase() === target
    );
    if (match) return match;

    // 2. Prefix match (e.g. voice "hi-IN" starts with "hi")
    match = cachedVoices.find(
        v => v.lang.toLowerCase().startsWith(baseLang + "-")
    );
    if (match) return match;

    // 3. Base language only (e.g. voice is just "hi")
    match = cachedVoices.find(
        v => v.lang.toLowerCase() === baseLang
    );
    return match || null;
}

function splitForTTS(text, max = 200) {
    const chunks = [];
    let remaining = text.trim();

    while (remaining.length > max) {
        // Try to cut at sentence-ending punctuation.
        let cut = -1;
        for (const sep of ["। ", "। ", ". ", "? ", "! ", "; ", ", "]) {
            const idx = remaining.lastIndexOf(sep, max);
            if (idx > max * 0.3) {
                cut = idx + sep.length;
                break;
            }
        }
        if (cut <= 0) {
            cut = remaining.lastIndexOf(" ", max);
            if (cut < max * 0.3) cut = max;
        }

        chunks.push(remaining.slice(0, cut).trim());
        remaining = remaining.slice(cut).trim();
    }

    if (remaining) chunks.push(remaining);
    return chunks;
}

let currentTTSAudio = null;

function speakWithGoogleTTS(text, apiCode) {
    if (currentTTSAudio) {
        currentTTSAudio.pause();
        currentTTSAudio = null;
    }

    const chunks = splitForTTS(text);
    let index = 0;

    function playNext() {
        if (index >= chunks.length) {
            currentTTSAudio = null;
            return;
        }

        const chunk = chunks[index++];
        const url =
            `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob` +
            `&tl=${encodeURIComponent(apiCode)}` +
            `&q=${encodeURIComponent(chunk)}`;

        const audio = new Audio(url);
        currentTTSAudio = audio;

        audio.onended = playNext;
        audio.onerror = () => {
            setStatus("Voice playback failed for this language.", "error");
            currentTTSAudio = null;
        };

        audio.play().catch(() => {
            setStatus("Voice playback was blocked by the browser.", "error");
            currentTTSAudio = null;
        });
    }

    playNext();
}
function speakText(text, languageCode) {
    if (!text.trim()) {
        setStatus("There is no text to read aloud.", "error");
        return;
    }

    const language = getLanguage(languageCode);
    const voiceCode = language?.voiceCode || languageCode;
    const apiCode = language?.apiCode || languageCode.split("-")[0];

    // Stop anything currently playing.
    window.speechSynthesis?.cancel();
    if (currentTTSAudio) {
        currentTTSAudio.pause();
        currentTTSAudio = null;
    }

    // Try the browser's built-in speech synthesis first.
    const voice = findBestVoice(voiceCode);

    if (voice) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.lang = voice.lang;

        utterance.onerror = event => {
            if (event.error !== "canceled" && event.error !== "interrupted") {
                // Browser voice failed — try Google TTS as fallback.
                speakWithGoogleTTS(text, apiCode);
            }
        };

        window.speechSynthesis.speak(utterance);
        return;
    }

    // No browser voice — use Google TTS.
    speakWithGoogleTTS(text, apiCode);
}

fromSpeaker.addEventListener("click", () => {
    speakText(fromText.value, sourceSelect.value);
});

toSpeaker.addEventListener("click", () => {
    speakText(toText.value, targetSelect.value);
});

// ─── Copy to clipboard 

async function copyText(text, button) {
    if (!text.trim()) {
        setStatus("There is no text to copy.", "error");
        return;
    }

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            const temporary = document.createElement("textarea");
            temporary.value = text;
            temporary.style.position = "fixed";
            temporary.style.opacity = "0";

            document.body.appendChild(temporary);
            temporary.select();

            const copied = document.execCommand("copy");
            temporary.remove();

            if (!copied) {
                throw new Error("Copy was unsuccessful.");
            }
        }

        setStatus("Text copied to clipboard.", "success");

        const originalTitle = button.title;
        button.title = "Copied!";

        window.setTimeout(() => {
            button.title = originalTitle;
        }, 1200);
    } catch (error) {
        console.error("Clipboard error:", error);
        setStatus("Unable to copy. Please select and copy the text manually.", "error");
    }
}

fromCopy.addEventListener("click", () => {
    copyText(fromText.value, fromCopy);
});

toCopy.addEventListener("click", () => {
    copyText(toText.value, toCopy);
});

// ─── Keyboard shortcut 

// Ctrl + Enter (Windows/Linux) or Cmd + Enter (Mac).
fromText.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        translateBtn.click();
    }
});

// ─── Initial UI state 

updateCharacterCount();