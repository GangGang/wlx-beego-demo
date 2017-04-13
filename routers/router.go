package routers

import (
	"wlx/controllers"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
	"strings"
	"net/http"
	"wlx/models/enum"
)

var filterWlxHeader = func(ctx *context.Context) {
	header := ctx.Input.Header("wlx")
	if len(header) == 0 || !strings.EqualFold(header, "chinawlx") {
		ctx.Redirect(404, "")
		return
	}
}

var filterUser = func(ctx *context.Context) {
	//检测session是否登录
	userinfo := ctx.Input.Session("user" + enum.O)
	if userinfo == nil {
		ctx.Redirect(http.StatusFound, "/login")
	}
}

func init() {
	beego.Router("/", &controllers.IndexController{})

	beego.Router("/login", &controllers.LoginController{})

	beego.Router("/org_regist", &controllers.OrgRegistController{})
	beego.InsertFilter("/org_regist", beego.BeforeRouter, filterWlxHeader)

	//org下面的必须登录了机构账号
	beego.InsertFilter("/orgs/*", beego.BeforeRouter, filterUser)

}
