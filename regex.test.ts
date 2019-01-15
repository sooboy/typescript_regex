import {match,matchOneChar} from './regex';

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
        expect(match('','ab')).toBe(true);
    })
    it("匹配内容为空",()=>{
        expect(match('a','')).toBe(false);
    })
    it('带 . 字符匹配',()=>{
        expect(match('a.b',"aab")).toBe(true);
        expect(match('a.b',"abb")).toBe(true);
        expect(match('a.b',"a.b")).toBe(true);
    })
    it("正常字符匹配",()=>{
        expect(match('aab','a')).toBe(false);
        expect(match('aab','aaa')).toBe(false);
        expect(match('aa','aab')).toBe(true);
        // expect(match('aa','baab')).toBe(true);
    })
})