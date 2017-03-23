package utils

import (
	"os"
	"io/ioutil"
)

func ReadFile(path string) (str string, err error) {
	fi, err := os.Open(path)
	defer fi.Close()
	bytes, err := ioutil.ReadAll(fi)
	str = string(bytes)
	return
}
