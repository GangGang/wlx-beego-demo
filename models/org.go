package models

import (
	"github.com/astaxie/beego/orm"
	"wlx/models/constant"
)

type Org struct {
	Common
	Title  string `orm:"size(32)"`
	Mobile string `orm:"size(16)"`
}

func init() {
	orm.RegisterModel(new(Org))
}

func FindOrg(title string) interface{} {
	org := Org{Title:title}
	err := constant.ORM.Read(&org, "Title")
	if err == nil {
		return org
	} else {
		return nil
	}
}

func InsertOrg(title, mobile string) int64 {
	var org Org
	org.Title = title
	org.Mobile = mobile

	id, err := constant.ORM.Insert(&org)
	if err == nil {
		return id
	} else {
		return -1
	}
}