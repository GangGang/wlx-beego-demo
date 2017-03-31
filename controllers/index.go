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
	session, err := beego.GlobalSessions.SessionStart(c.Ctx.ResponseWriter, c.Ctx.Request)
	if err != nil {
		c.Redirect("/login", http.StatusFound)
		return
	}
	uid := session.Get("uid")
	if uid == nil {
		c.Redirect("/login", http.StatusFound)
		return
	}
	c.Data["cdnUrl"] = ""
	c.Data["error"] = uid
	c.TplName = "login.jade"
}