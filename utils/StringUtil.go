package utils

import "unicode/utf8"

func Length(text string)int {
	return utf8.RuneCountInString(text)
}
