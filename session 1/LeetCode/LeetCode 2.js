function strStr(text, word) {
    if (word == "") {
        return 0
    }
for (let i = 0; i <= text.length - word.length; i++) 
    {
    let check = true
    for (let j = 0; j < word.length; j++) {
        if (text[i + j] != word[j]) {
        check = false;
        break;
            }
        }
        if (check) {
            return i
        }
    }
}