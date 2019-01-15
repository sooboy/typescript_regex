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

describe("匹配多个字符",()=>{
    it("匹配字符为空",()=>{
        expect(search('','ab')).toBe(true);
    })
    it("匹配内容为空",()=>{
        expect(search('a','')).toBe(false);
    })
    it('带 . 字符匹配',()=>{
        expect(search('a.b',"aab")).toBe(true);
        expect(search('a.b',"abb")).toBe(true);
        expect(search('a.b',"a.b")).toBe(true);
    })
    it("正常字符匹配",()=>{
        expect(search('aab','a')).toBe(false);
        expect(search('aab','aaa')).toBe(false);
        expect(search('aa','aab')).toBe(true);
        expect(search('aa','baab')).toBe(true);
    })
    it("匹配 $ 结尾的字符",()=>{
        expect(search("aaaa$","aaaa")).toBe(true);
    })
    it("匹配 ^ 匹配符",()=>{
        expect(search("^aaa","aaa")).toBe(true);
        expect(search("^aa","aaa")).toBe(true);
        expect(search("^aa","baaa")).toBe(false);
    })
    it("匹配 ？ 匹配符",()=>{
        expect(search("a?bb","bb")).toBe(true)
        expect(search("a?bb","abb")).toBe(true)
        expect(search("a?bb","abba")).toBe(true)
        expect(search("a?bb","abbb")).toBe(true)
    })
    it("匹配 * 匹配符",()=>{
        expect(search('a*b',"aaaaaabaaa")).toBe(true);
        expect(search('a*b',"baaa")).toBe(true);
        expect(search('a*b',"ab")).toBe(true);
    })
})