package utils

func Success(data interface{}) map[string]interface{} {
	m := make(map[string]interface{})
	m["code"] = 0
	m["msg"] = "success"
	m["data"] = data
	return m
}

func Error(code int, errMsg string) map[string]interface{} {
	m := make(map[string]interface{})
	m["code"] = code
	m["msg"] = errMsg
	return m
}