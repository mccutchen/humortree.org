CodeHighlighter.addStyle("python",{
    comment : {
        exp  : /#[^\n]+/
    },
    brackets : {
        exp  : /\(|\)|\[|\]/
    },
    string : {
        exp  : /'[^']*'|"[^"]*"/
    },
    keywords : {
        exp  : /\b(and|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|None|not|or|pass|print|raise|return|self|try|while|yield|True|False)\b/
    }
});
