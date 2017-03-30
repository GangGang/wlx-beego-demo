package controllers

import (
	"github.com/astaxie/beego"
	"errors"
	"regexp"
	"strings"
	"unicode/utf8"
)

type login struct {
	Username string  `form:"username"`
	Password string `form:"password"`
}

type LoginController struct {
	beego.Controller
}

func (c *LoginController)Get() {
	//检测session,如果已登录直接重定向到首页

	c.Data["cdnUrl"] = ""
	c.Data["error"] = errors.New("password error")
	c.TplName = "login.jade"
}

func (c *LoginController)Post() {
	login := login{}
	if err := c.ParseForm(&login); err != nil {
		jsonMap := make(map[string]interface{})
		jsonMap["code"] = 1
		jsonMap["error"] = err.Error()

		c.Data["json"] = &jsonMap
		c.ServeJSON()
		return
	}

	if strings.EqualFold(login.Username, "") {
		jsonMap := make(map[string]interface{})
		jsonMap["code"] = 1
		jsonMap["msg"] = "username must input"

		c.Data["json"] = &jsonMap
		c.ServeJSON()
		return
	}

	if strings.EqualFold(login.Password, "") {
		jsonMap := make(map[string]interface{})
		jsonMap["code"] = 1
		jsonMap["msg"] = "password must input"

		c.Data["json"] = &jsonMap
		c.ServeJSON()
		return
	}

	if !strings.HasPrefix(login.Username, "1") || utf8.RuneCountInString(login.Username) != 11 {
		jsonMap := make(map[string]interface{})
		jsonMap["code"] = 1
		jsonMap["msg"] = "username must be mobile"

		c.Data["json"] = &jsonMap
		c.ServeJSON()
		return
	}

	r, _ := regexp.Compile("^[a-zA-Z0-9]{6,12}$")
	if !r.MatchString(login.Password) {
		jsonMap := make(map[string]interface{})
		jsonMap["code"] = 1
		jsonMap["msg"] = "password must 6-12"

		c.Data["json"] = &jsonMap
		c.ServeJSON()
		return
	}

	jsonMap := make(map[string]interface{})
	jsonMap["code"] = 0
	jsonMap["msg"] = "success"

	c.Data["json"] = &jsonMap
	c.ServeJSON()
}
