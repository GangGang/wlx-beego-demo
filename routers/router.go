package routers

import (
	"wlx/controllers"

	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.IndexController{},"get:Get")
	beego.Router("/login", &controllers.LoginController{},"get:Get;post:Post")
}
