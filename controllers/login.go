package controllers

import (
	"github.com/astaxie/beego"
	//"errors"
)

type LoginController struct {
	beego.Controller
}

func (c *LoginController) Get() {
	c.Data["cdnUrl"] = ""
	//c.Data["error"] = errors.New("password error")
	c.TplName = "login.jade"
}

func (c *LoginController)Post() {

}
