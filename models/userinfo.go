package models

import (
	"github.com/astaxie/beego/orm"
	"wlx/models/enum"
	"time"
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

func FindUserinfo(username string)(bool,*Userinfo) {
	o := orm.NewOrm()

	userinfo := Userinfo{Username:username}
	err := o.Read(&userinfo, "Username")
	if err == nil {
		return true,&userinfo
	} else {
		return false,&userinfo
	}
}

func InsertOrguserinfo(username string, orgId int64) int64 {
	o := orm.NewOrm()

	orguserinfo := Userinfo{Username:username, Type:"O", OrgId:orgId, Role:enum.USER}
	orguserinfo.CreationDate = time.Now()
	orguserinfo.LastModifiedDate = time.Now()
	orguserinfo.Mark = true

	id, err := o.Insert(&orguserinfo)
	if err == nil {
		return id
	} else {
		return -1
	}
}