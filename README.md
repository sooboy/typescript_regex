[项目地址](https://github.com/sooboy/typescript_regex)
```shell

npm install or yarn //安装依赖

npm run test // 运行测试文件

```

> 我们将会实现一个简单正则引擎，它的规则如下

|语法|含义|example|匹配|
|---|---|---|---|
|a|匹配文本字面量|"a"|"a"|
|*|匹配0或多个前字符|"a*"|"","a","aa"|
|?|匹配0或1个前字符|"a？"|"","a"|
|.|匹配任意字符|"."|"a","b"|
|^|起始匹配符|"^a"|"a","aa","ab"|
|$|结尾匹配符|"a$"|"aaa","bba"|

> 我们用`Typescript`编写Code 

## 先考虑单个字符匹配
单个字符,情况简单的多。它有以下五种情况：

```Typescript
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
```

### 配上测试
```Typescript
import {search,matchOneChar} from './regex';

describe("匹配单个字符",()=>{
    it("匹配字符为空",()=>{
        expect(matchOneChar('','a')).toBe(true)
    });
    it("匹配内容为空",()=>{
        expect(matchOneChar('a','')).toBe(false);
    })
    it("特殊字符 . 匹配",()=>{
        expect(matchOneChar('.','a')).toBe(true);
        expect(matchOneChar('.','b')).toBe(true);
    })
    it("匹配字符是否相同",()=>{
        expect(matchOneChar('a','a')).toBe(true);
        expect(matchOneChar('a','b')).toBe(false);
    })
})
```

## 多个字符的匹配

### 先考虑头部对齐匹配
仅考虑文本匹配
```Typescript
/**
 * 
 * @param pattern 匹配字符
 * @param text    匹配文本
 */
const match =(pattern:string,text:string):boolean=>{
    if (pattern === "") return true;
    if (!text) return false;
    return matchOneChar(pattern[0],text[0]) &&match(pattern.slice(1),text.slice(1));
}
```
### 添加 “$”匹配符
```
/**
 * 
 * @param pattern 匹配字符
 * @param text    匹配文本
 */
const match =(pattern:string,text:string):boolean=>{
    if (pattern === "") return true;
    if (pattern === "$"&& text==="") return true;
    if (!text) return false;
    return matchOneChar(pattern[0],text[0]) &&match(pattern.slice(1),text.slice(1));
}
```

### 添加 “？”匹配符
```
const match =(pattern:string,text:string):boolean=>{
    if (pattern === "") return true;
    if (pattern === "$"&& text==="") return true;
    if (!text) return false;
    //  添加 “？”匹配
    if (pattern[1] === '?'){
        return matchOneChar(pattern[0],text[0])&&match(pattern.slice(2),text.slice(1))  || match(pattern.slice(2),text);
    }
    return matchOneChar(pattern[0],text[0]) &&match(pattern.slice(1),text.slice(1));
}
```

### 添加 “*”匹配符
```Typescript
const match =(pattern:string,text:string):boolean=>{
    if (pattern === "") return true;
    if (pattern === "$"&& text==="") return true;
    if (!text) return false;
    if (pattern[1] === '?'){
        return matchOneChar(pattern[0],text[0])&&match(pattern.slice(2),text.slice(1))  || match(pattern.slice(2),text);
    }
    if (pattern[1] === '*'){
        return matchOneChar(pattern[0],text[0])&&match(pattern,text.slice(1))  || match(pattern.slice(2),text);
    }

    return matchOneChar(pattern[0],text[0]) &&match(pattern.slice(1),text.slice(1));
}
```

### 头部不对齐情况
可以通过转换匹配符或是匹配文本转换成头部对齐情况，有两种处理方案：
- 匹配符前面加上“.*”

```Typescript
const search =(pattern:string,text:string):boolean=>{
    if (pattern[0] === '^') {
        return match(pattern.slice(1), text);
      } else {
        return match('.*' + pattern, text);
      }
}
```

- 拆分匹配文本，只要又一个匹配上就OK
```Typescript
const search =(pattern:string,text:string):boolean=>{
    if (pattern[0] === '^') {
        return match(pattern.slice(1), text);
      } else {
        return text.split('').some((_, index) => {
            return match(pattern, text.slice(index));
          });
      }
}
```

## 总结：
思考过程由顶层开始
> 头部不对齐 -> 头部对齐 -> 单个字符匹配
将大的问题一步一步根据条件拆分成小问题，如此往复。
整个实现代码在20行左右。

