package models

import (
	"github.com/astaxie/beego/orm"
	"wlx/models/enum"
	"wlx/models/constant"
)

type Userinfo struct {
	Common
	Username string `orm:"size(16)"`
	Type     string `orm:"size(1)"`
	OrgId    int64
	Role     string `orm:"size(8)"`
}


func init() {
	orm.RegisterModel(new(Userinfo))
}

func FindUserinfo(username string) interface{} {
	o := orm.NewOrm()

	userinfo := Userinfo{Username:username}
	err := o.Read(&userinfo, "Username")
	if err == nil {
		return userinfo
	} else {
		return nil
	}
}

func InsertOrguserinfo(username string, orgId int64) int64 {
	orguserinfo := Userinfo{Username:username, Type:"O", OrgId:orgId, Role:enum.USER}
	id, err := constant.ORM.Insert(&orguserinfo)
	if err == nil {
		return id
	} else {
		return -1
	}
}