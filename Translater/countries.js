
/*
 * Language configuration
 *
 * code:       Internal dropdown identifier
 * name:       Display name
 * apiCode:    Language code sent to MyMemory
 * voiceCode:  Language code used for browser speech
 *
 * API language support depends on the selected language pair.
 */

const languageList = [
    // Indian languages
    { code: "as-IN", name: "Assamese", apiCode: "as", voiceCode: "as-IN" },
    { code: "bn-IN", name: "Bengali", apiCode: "bn", voiceCode: "bn-IN" },
    { code: "brx-IN", name: "Bodo", apiCode: "brx", voiceCode: "brx-IN" },
    { code: "doi-IN", name: "Dogri", apiCode: "doi", voiceCode: "doi-IN" },
    { code: "en-GB", name: "English (UK)", apiCode: "en", voiceCode: "en-GB" },
    { code: "en-IN", name: "English (India)", apiCode: "en", voiceCode: "en-IN" },
    { code: "gu-IN", name: "Gujarati", apiCode: "gu", voiceCode: "gu-IN" },
    { code: "hi-IN", name: "Hindi", apiCode: "hi", voiceCode: "hi-IN" },
    { code: "kn-IN", name: "Kannada", apiCode: "kn", voiceCode: "kn-IN" },
    { code: "ks-IN", name: "Kashmiri", apiCode: "ks", voiceCode: "ks-IN" },
    { code: "kok-IN", name: "Konkani", apiCode: "kok", voiceCode: "kok-IN" },
    { code: "mai-IN", name: "Maithili", apiCode: "mai", voiceCode: "mai-IN" },
    { code: "ml-IN", name: "Malayalam", apiCode: "ml", voiceCode: "ml-IN" },
    { code: "mni-IN", name: "Manipuri (Meitei)", apiCode: "mni", voiceCode: "mni-IN" },
    { code: "mr-IN", name: "Marathi", apiCode: "mr", voiceCode: "mr-IN" },
    { code: "ne-IN", name: "Nepali (India)", apiCode: "ne", voiceCode: "ne-IN" },
    { code: "or-IN", name: "Odia", apiCode: "or", voiceCode: "or-IN" },
    { code: "pa-IN", name: "Punjabi", apiCode: "pa", voiceCode: "pa-IN" },
    { code: "sa-IN", name: "Sanskrit", apiCode: "sa", voiceCode: "sa-IN" },
    { code: "sat-IN", name: "Santali", apiCode: "sat", voiceCode: "sat-IN" },
    { code: "sd-IN", name: "Sindhi", apiCode: "sd", voiceCode: "sd-IN" },
    { code: "ta-IN", name: "Tamil", apiCode: "ta", voiceCode: "ta-IN" },
    { code: "te-IN", name: "Telugu", apiCode: "te", voiceCode: "te-IN" },
    { code: "ur-IN", name: "Urdu", apiCode: "ur", voiceCode: "ur-IN" },

    // African languages
    { code: "am-ET", name: "Amharic", apiCode: "am", voiceCode: "am-ET" },
    { code: "bem-ZM", name: "Bemba", apiCode: "bem", voiceCode: "bem-ZM" },
    { code: "ha-NE", name: "Hausa", apiCode: "ha", voiceCode: "ha-NE" },
    { code: "ny-MW", name: "Nyanja", apiCode: "ny", voiceCode: "ny-MW" },
    { code: "rn-BI", name: "Kirundi", apiCode: "rn", voiceCode: "rn-BI" },
    { code: "sg-CF", name: "Sango", apiCode: "sg", voiceCode: "sg-CF" },
    { code: "sn-ZW", name: "Shona", apiCode: "sn", voiceCode: "sn-ZW" },
    { code: "so-SO", name: "Somali", apiCode: "so", voiceCode: "so-SO" },
    { code: "sw-SZ", name: "Swahili", apiCode: "sw", voiceCode: "sw-SZ" },
    { code: "ti-ER", name: "Tigrinya", apiCode: "ti", voiceCode: "ti-ER" },
    { code: "tn-BW", name: "Tswana", apiCode: "tn", voiceCode: "tn-BW" },
    { code: "wo-SN", name: "Wolof", apiCode: "wo", voiceCode: "wo-SN" },
    { code: "xh-ZA", name: "Xhosa", apiCode: "xh", voiceCode: "xh-ZA" },
    { code: "zu-ZA", name: "Zulu", apiCode: "zu", voiceCode: "zu-ZA" },

    // Other languages
    { code: "ar-SA", name: "Arabic", apiCode: "ar", voiceCode: "ar-SA" },
    { code: "be-BY", name: "Belarusian", apiCode: "be", voiceCode: "be-BY" },
    { code: "bi-VU", name: "Bislama", apiCode: "bi", voiceCode: "bi-VU" },
    { code: "bjs-BB", name: "Bajan", apiCode: "bjs", voiceCode: "bjs-BB" },
    { code: "bo-CN", name: "Tibetan", apiCode: "bo", voiceCode: "bo-CN" },
    { code: "br-FR", name: "Breton", apiCode: "br", voiceCode: "br-FR" },
    { code: "bs-BA", name: "Bosnian", apiCode: "bs", voiceCode: "bs-BA" },
    { code: "ca-ES", name: "Catalan", apiCode: "ca", voiceCode: "ca-ES" },
    { code: "cop-EG", name: "Coptic", apiCode: "cop", voiceCode: "cop-EG" },
    { code: "cs-CZ", name: "Czech", apiCode: "cs", voiceCode: "cs-CZ" },
    { code: "cy-GB", name: "Welsh", apiCode: "cy", voiceCode: "cy-GB" },
    { code: "da-DK", name: "Danish", apiCode: "da", voiceCode: "da-DK" },
    { code: "de-DE", name: "German", apiCode: "de", voiceCode: "de-DE" },
    { code: "dv-MV", name: "Dhivehi", apiCode: "dv", voiceCode: "dv-MV" },
    { code: "dz-BT", name: "Dzongkha", apiCode: "dz", voiceCode: "dz-BT" },
    { code: "el-GR", name: "Greek", apiCode: "el", voiceCode: "el-GR" },
    { code: "es-ES", name: "Spanish", apiCode: "es", voiceCode: "es-ES" },
    { code: "et-EE", name: "Estonian", apiCode: "et", voiceCode: "et-EE" },
    { code: "eu-ES", name: "Basque", apiCode: "eu", voiceCode: "eu-ES" },
    { code: "fa-IR", name: "Persian", apiCode: "fa", voiceCode: "fa-IR" },
    { code: "fi-FI", name: "Finnish", apiCode: "fi", voiceCode: "fi-FI" },
    { code: "fo-FO", name: "Faroese", apiCode: "fo", voiceCode: "fo-FO" },
    { code: "fr-FR", name: "French", apiCode: "fr", voiceCode: "fr-FR" },
    { code: "gl-ES", name: "Galician", apiCode: "gl", voiceCode: "gl-ES" },
    { code: "he-IL", name: "Hebrew", apiCode: "he", voiceCode: "he-IL" },
    { code: "hr-HR", name: "Croatian", apiCode: "hr", voiceCode: "hr-HR" },
    { code: "hu-HU", name: "Hungarian", apiCode: "hu", voiceCode: "hu-HU" },
    { code: "id-ID", name: "Indonesian", apiCode: "id", voiceCode: "id-ID" },
    { code: "is-IS", name: "Icelandic", apiCode: "is", voiceCode: "is-IS" },
    { code: "it-IT", name: "Italian", apiCode: "it", voiceCode: "it-IT" },
    { code: "ja-JP", name: "Japanese", apiCode: "ja", voiceCode: "ja-JP" },
    { code: "kk-KZ", name: "Kazakh", apiCode: "kk", voiceCode: "kk-KZ" },
    { code: "km-KH", name: "Khmer", apiCode: "km", voiceCode: "km-KH" },
    { code: "ko-KR", name: "Korean", apiCode: "ko", voiceCode: "ko-KR" },
    { code: "ku-TR", name: "Kurdish", apiCode: "ku", voiceCode: "ku-TR" },
    { code: "la-VA", name: "Latin", apiCode: "la", voiceCode: "la-VA" },
    { code: "lo-LA", name: "Lao", apiCode: "lo", voiceCode: "lo-LA" },
    { code: "lv-LV", name: "Latvian", apiCode: "lv", voiceCode: "lv-LV" },
    { code: "mg-MG", name: "Malagasy", apiCode: "mg", voiceCode: "mg-MG" },
    { code: "mi-NZ", name: "Maori", apiCode: "mi", voiceCode: "mi-NZ" },
    { code: "ms-MY", name: "Malay", apiCode: "ms", voiceCode: "ms-MY" },
    { code: "mt-MT", name: "Maltese", apiCode: "mt", voiceCode: "mt-MT" },
    { code: "my-MM", name: "Burmese", apiCode: "my", voiceCode: "my-MM" },
    { code: "niu-NU", name: "Niuean", apiCode: "niu", voiceCode: "niu-NU" },
    { code: "nl-NL", name: "Dutch", apiCode: "nl", voiceCode: "nl-NL" },
    { code: "no-NO", name: "Norwegian", apiCode: "no", voiceCode: "no-NO" },
    { code: "pau-PW", name: "Palauan", apiCode: "pau", voiceCode: "pau-PW" },
    { code: "pis-SB", name: "Pijin", apiCode: "pis", voiceCode: "pis-SB" },
    { code: "pl-PL", name: "Polish", apiCode: "pl", voiceCode: "pl-PL" },
    { code: "pt-PT", name: "Portuguese", apiCode: "pt", voiceCode: "pt-PT" },
    { code: "ro-RO", name: "Romanian", apiCode: "ro", voiceCode: "ro-RO" },
    { code: "ru-RU", name: "Russian", apiCode: "ru", voiceCode: "ru-RU" },
    { code: "si-LK", name: "Sinhala", apiCode: "si", voiceCode: "si-LK" },
    { code: "sk-SK", name: "Slovak", apiCode: "sk", voiceCode: "sk-SK" },
    { code: "sm-WS", name: "Samoan", apiCode: "sm", voiceCode: "sm-WS" },
    { code: "sq-AL", name: "Albanian", apiCode: "sq", voiceCode: "sq-AL" },
    { code: "sr-RS", name: "Serbian", apiCode: "sr", voiceCode: "sr-RS" },
    { code: "sv-SE", name: "Swedish", apiCode: "sv", voiceCode: "sv-SE" },
    { code: "tet-TL", name: "Tetum", apiCode: "tet", voiceCode: "tet-TL" },
    { code: "tg-TJ", name: "Tajik", apiCode: "tg", voiceCode: "tg-TJ" },
    { code: "th-TH", name: "Thai", apiCode: "th", voiceCode: "th-TH" },
    { code: "tk-TM", name: "Turkmen", apiCode: "tk", voiceCode: "tk-TM" },
    { code: "tl-PH", name: "Tagalog", apiCode: "tl", voiceCode: "fil-PH" },
    { code: "to-TO", name: "Tongan", apiCode: "to", voiceCode: "to-TO" },
    { code: "tr-TR", name: "Turkish", apiCode: "tr", voiceCode: "tr-TR" },
    { code: "uk-UA", name: "Ukrainian", apiCode: "uk", voiceCode: "uk-UA" },
    { code: "uz-UZ", name: "Uzbek", apiCode: "uz", voiceCode: "uz-UZ" },
    { code: "vi-VN", name: "Vietnamese", apiCode: "vi", voiceCode: "vi-VN" },
    { code: "yi", name: "Yiddish", apiCode: "yi", voiceCode: "yi" }
];

// Build convenient lookup tables.
const countries = Object.fromEntries(
    languageList.map(language => [language.code, language.name])
);

const languageByCode = Object.fromEntries(
    languageList.map(language => [language.code, language])
);