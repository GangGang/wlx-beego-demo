package controllers

import (
	"github.com/astaxie/beego"
	"net/http"
)

type IndexController struct {
	beego.Controller
}

func (c *IndexController)Get() {
	c.Redirect("/login",http.StatusMovedPermanently)
	return
}