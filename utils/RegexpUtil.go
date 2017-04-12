package utils

import (
	"strings"
	"unicode/utf8"
	"regexp"
)

func IsMobile(text string) bool {
	if strings.HasPrefix(text, "1") && utf8.RuneCountInString(text) == 11 {
		return true
	} else {
		return false
	}
}

func IsPassword(pwd string) bool {
	r, _ := regexp.Compile("^[a-zA-Z0-9]{6,12}$")
	if r.MatchString(pwd) {
		return true
	} else {
		return false
	}
}
