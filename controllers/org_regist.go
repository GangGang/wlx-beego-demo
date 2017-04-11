package controllers

import (
	"github.com/astaxie/beego"
	"strings"
	"unicode/utf8"
	"regexp"
	"wlx/models"
	"wlx/utils"
	"github.com/astaxie/beego/orm"
)

type OrgRegistController struct {
	beego.Controller
}

//注册机构账号
func (this *OrgRegistController)Put() {
	username := this.GetString("username")
	pwd := this.GetString("password")
	title := this.GetString("title")
	if len(username) == 0 {
		this.Data["json"] = utils.Error(1, "username为空")
		this.ServeJSON()
		return
	}

	if len(pwd) == 0 {
		this.Data["json"] = utils.Error(2, "password为空")
		this.ServeJSON()
		return
	}

	if len(title) == 0 {
		this.Data["json"] = utils.Error(3, "title为空")
		this.ServeJSON()
		return
	}

	if !strings.HasPrefix(username, "1") || utf8.RuneCountInString(username) != 11 {
		this.Data["json"] = utils.Error(4, "username must be mobile")
		this.ServeJSON()
		return
	}

	r, _ := regexp.Compile("^[a-zA-Z0-9]{6,12}$")
	if !r.MatchString(pwd) {
		this.Data["json"] = utils.Error(5, "password must 6-12")
		this.ServeJSON()
		return
	}

	//用户名是否存在
	userinfo := models.FindUserinfo(username)
	if userinfo != nil {
		this.Data["json"] = utils.Error(6, "用户名已存在")
		this.ServeJSON()
		return
	}

	//机构是否存在
	org := models.FindOrg(title)
	if org != nil {
		this.Data["json"] = utils.Error(7, "机构已存在")
		this.ServeJSON()
		return
	}

	//++++++++++++++++事物++++++++
	o := orm.NewOrm()
	//创建机构
	orgId := models.InsertOrg(title, username)
	if orgId == -1 {

	} else {

	}
	//创建账号基础信息
	orguserinfoId := models.InsertOrguserinfo(username, orgId)
	if orguserinfoId == -1 {

	} else {

	}
	//auth表
	salt := utils.GetSalt()
	enPwd := utils.EncryptPwd(pwd, salt)
	userAuth := models.InsertUserAuth(orguserinfoId, "mobile", username, enPwd, salt)
	if userAuth == nil {
		o.Rollback()
		this.Data["json"] = utils.Error(8, "注册失败")
		this.ServeJSON()
		return
	} else {
		o.Commit()
		this.Data["json"] = utils.Success(userAuth)
		this.ServeJSON()
		return
	}
	//++++++++++++++++事物++++++++
}
