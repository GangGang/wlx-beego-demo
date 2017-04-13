package utils

import (
	"crypto/md5"
	"encoding/hex"
	"time"
	"math/rand"
	"bytes"
)

const randomSalt = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

// return len=8  salt
func GetSalt() string {
	return getRandomString(8)
}

func EncryptPwd(clearPwd, salt string) string {
	return md5Str(md5Str(clearPwd) + salt)
}

// 生成32位MD5
func md5Str(s string) string {
	m := md5.New()
	m.Write([]byte(s))
	return hex.EncodeToString(m.Sum(nil))
}

//生成len位的随机字符串
func getRandomString(length int) string {
	strBytes := []byte(randomSalt)
	size := len(randomSalt)
	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	var buffer bytes.Buffer
	for i := 0; i < length; i++ {
		buffer.WriteByte(strBytes[r.Intn(size)])
	}
	return buffer.String()
}
