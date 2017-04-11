package routers

import (
	"wlx/controllers"

	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.IndexController{})
	beego.Router("/login", &controllers.LoginController{})
	beego.Router("/org_regist",&controllers.OrgRegistController{})
}
