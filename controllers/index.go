package controllers

import (
	"github.com/astaxie/beego"
	"net/http"
)

type IndexController struct {
	beego.Controller
}

func (c *IndexController)Get() {
	//检测session是否登录
	c.Redirect("/login",http.StatusMovedPermanently)
	return
}