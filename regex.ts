/**
 * 
 * @param pattern 匹配的字符
 * @param char    需要被匹配的字符
 * 
 * case 1 : matchOneChar('','a')->true
 * case 2 : matchOneChar('a','')->false
 * case 3 : matchOneChar('.','b')->true
 * case 4 : matchOneChar('a','b')->false
 * case 5 : matchOneChar('a','a')->true  
 * 
 * 单个字符匹配有以上情况
 */
const matchOneChar =(pattern:string,char:string):boolean=>{
    if(!pattern) return true;   //case 1
    if(!char) return false; //case 2
    if(pattern === ".") return true; //case 3
    return pattern === char;  // case 4,5
}

/**
 * 
 * @param pattern 匹配字符
 * @param text    匹配文本
 */
const match =(pattern:string,text:string):boolean=>{
    if (pattern === "") return true;
    if (pattern === "$"&& text==="") return true;
    if (!text) return false;
    // if (pattern[0] === '^') return match(pattern.slice(1),text);
    if (pattern[1] === '?'){
        return matchOneChar(pattern[0],text[0])&&match(pattern.slice(2),text.slice(1))  || match(pattern.slice(2),text);
    }
    if (pattern[1] === '*'){
        return matchOneChar(pattern[0],text[0])&&match(pattern,text.slice(1))  || match(pattern.slice(2),text);
    }

    return matchOneChar(pattern[0],text[0]) &&match(pattern.slice(1),text.slice(1));
}

const search =(pattern:string,text:string):boolean=>{
    if (pattern[0] === '^') {
        return match(pattern.slice(1), text);
      } else {
        return match('.*' + pattern, text);
      }
}

export{
    matchOneChar,
    match,
    search
}