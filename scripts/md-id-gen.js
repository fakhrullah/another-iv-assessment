#!/usr/bin/env node

// source: https://gist.github.com/asabaylus/3071099

function GithubId(val) {
	return val.toLowerCase().replace(/ /g,'-')
		// single chars that are removed
		.replace(/[`~!@#$%^&*()+=<>?,./:;"'|{}\[\]\\–—]/g, '')
		// CJK punctuations that are removed
		.replace(/[　。？！，、；：“”【】（）〔〕［］﹃﹄“”‘’﹁﹂—…－～《》〈〉「」]/g, '')
}

const [,, ...title] = process.argv

console.log()
console.log(GithubId(title.join(' ')));
console.log()

