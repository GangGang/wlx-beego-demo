package controllers

import (
	"github.com/astaxie/beego"
	"errors"
	"strings"
	"wlx/utils"
	"wlx/models"
	"wlx/models/enum"
	"net/http"
)

const userType = enum.O

type LoginController struct {
	beego.Controller
}

func (c *LoginController)Get() {
	c.Data["cdnUrl"] = ""
	c.Data["error"] = errors.New("")
	c.TplName = "login.jade"
	return
}

func (this *LoginController)Post() {
	username := this.GetString("username")
	pwd := this.GetString("password")

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

	if !utils.IsMobile(username) {
		this.Data["json"] = utils.Error(4, "username must be mobile")
		this.ServeJSON()
		return
	}

	if !utils.IsPassword(pwd) {
		this.Data["json"] = utils.Error(5, "password must 6-12")
		this.ServeJSON()
		return
	}

	ok, userAuth := models.FindOneByTypeAndIdentifier(enum.O, username)
	if ok {
		pwdEncoded := utils.EncryptPwd(pwd, userAuth.Salt)
		if strings.EqualFold(userAuth.Credential, pwdEncoded) {
			//密码相等
			sess := this.StartSession()
			token := sess.SessionID()
			sess.Set("token", token)
			ok, _ := models.FindOneByTokenAndType(token, userType)
			if ok {
				//数据库已经有token
			} else {
				//插入token to db
				models.InsertUserToken(username, token, userType)
			}
			//判断权限
			ok, userinfo := models.FindUserinfo(username)
			if ok {
				sess.Set("user" + userType, userinfo)
				this.Redirect("/", http.StatusFound)
				return
			} else {
				this.Data["cdnUrl"] = ""
				this.Data["error"] = "该用户尚未有登录权限,请联系管理员"
				this.TplName = "login.jade"
				return
			}
		} else {
			//密码错误
			this.Data["cdnUrl"] = ""
			this.Data["error"] = "账号或者密码错误"
			this.TplName = "login.jade"
			return
		}
	} else {
		this.Data["cdnUrl"] = ""
		this.Data["error"] = "账号或者密码错误"
		this.TplName = "login.jade"
		return
	}
}
