package controllers

import (
	"github.com/astaxie/beego"
	"strings"
	"wlx/utils"
	"wlx/models"
	"wlx/models/enum"
	"net/http"
	"time"
	"github.com/astaxie/beego/orm"
)

const userType = enum.O

type LoginController struct {
	beego.Controller
}

func (c *LoginController)Get() {
	c.Data["cdnUrl"] = ""
	c.Data["error"] = ""
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

	ok, userAuth := models.FindOneByTypeAndIdentifier(enum.Mobile, username)
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
				ok, userToken := models.InsertUserToken(username, token, userType)
				if ok {
					sess.Set("ExpiredTime", userToken.ExpiredTime)
				} else {
					sess.Set("ExpiredTime", time.Now().Add(72 * time.Hour))
				}
			}
			//判断权限(role)
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
		this.Data["error"] = "账号不存在"
		this.TplName = "login.jade"
		return
	}
}

func (this *LoginController)Logout() {
	token := this.GetSession("token").(string)

	//删除数据库中userToken
	ok, userToken := models.FindOneByTokenAndType(token, enum.O)
	if ok {
		orm := orm.NewOrm()
		orm.Delete(userToken)
	}
	//删除session
	this.DestroySession()

	//重定向到登录
}
