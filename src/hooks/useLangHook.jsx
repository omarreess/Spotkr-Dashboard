import { useState } from "react";

export default function useLangHook(){
    const [lang, setLang] = useState("en");
    const handleLangChange = (e) => {
        setLang(e);
      };
      const availableLang=['ar','en']
    return{
        handleLangChange,
        lang,
        setLang,
        availableLang,
    }
}