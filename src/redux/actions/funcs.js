export function decToString(numberArray) {
    var i;
    var ans = ""
    for(i = 0; i < numberArray.length; i++) {
        var temp_s = numberArray[i].toString(16);
        if(temp_s.length === 1){
            ans += '0' + temp_s
        }else{
            ans += temp_s
        }
    }
    return ans;
}
