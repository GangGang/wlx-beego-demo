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
	if sess == nil {
		this.Redirect("/login", http.StatusFound)
		return
	} else {
		this.Data["cdnUrl"] = ""
		this.TplName = "school_index.jade"
	}

}