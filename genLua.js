// Image Credits: https://github.com/twitter/twemoji/tree/gh-pages/72x72

const testFolder = "./72x72/";
const fs = require("fs");

var strArr = [];
fs.readdirSync(testFolder).forEach(file => {
	var fileCodes = file.match(/([\w\-]+)\./)[1];
	var codeArr = fileCodes.split('-');
	var codes = [];
	for (let i = 0; i < codeArr.length; i++)
		codes.push(parseInt("0x" + codeArr[i]));
	strArr.push("\t{ \"" + fileCodes + "\", \"" + String.fromCodePoint.apply(null, codes) + "\" },");
})

fs.writeFile("transform.lua", `local tbl = {
`+ strArr.join('\n') +`
}

local getHex = function(str)
	local hex, counter = { }, 0
	string.gsub(str, '.', function(char)
		counter = counter + 1
		hex[counter] = string.format("%X", string.byte(char))
	end)
	return table.concat(hex, '-')
end

for i = 1, #tbl do
	os.rename("72x72/" .. tbl[i][1] .. ".png", "72x72/" .. getHex(tbl[i][2]) .. ".png")
end
`, ()=>{});
