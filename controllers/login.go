package controllers

import (
	"github.com/astaxie/beego"
	"errors"
	"github.com/astaxie/beego/validation"
	"fmt"
)

type login struct {
	Username string `valid:"Mobile"` //Mobile必须为正确的手机号
	Password string `valid:"Required;Match(/^Bee.*/)"`
}

type LoginController struct {
	beego.Controller
}

func (c *LoginController) Get() {
	//检测session,如果已登录直接重定向到首页

	c.Data["cdnUrl"] = ""
	c.Data["error"] = errors.New("password error")
	c.TplName = "login.jade"
}

func (c *LoginController)Post() {
	login := login{}
	if err := c.ParseForm(&login); err != nil {
		//handle error
		return
	}

	valid := validation.Validation{}
	b, err := valid.Valid(&login)
	if err != nil {
		//handle error
	}

	if !b {
		//验证不通过
		for _, err := range valid.Errors {
			fmt.Println(err.Key, err.Message)
		}
	}
}
