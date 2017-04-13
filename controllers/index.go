package controllers

import (
	"github.com/astaxie/beego"
	"net/http"
)

type IndexController struct {
	beego.Controller
}

func (this *IndexController)Get() {
	//检测session是否登录
	sess := this.StartSession()
	userinfo := sess.Get("user" + userType)
	if userinfo == nil {
		this.Redirect("/login", http.StatusFound)
		return
	} else {
		//重定向到校区首页

		this.Data["cdnUrl"] = ""
		this.TplName = "school_index.jade"
	}
}