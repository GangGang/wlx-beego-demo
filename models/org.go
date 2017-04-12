package models

import (
	"github.com/astaxie/beego/orm"
	"time"
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
	o := orm.NewOrm()

	org := Org{Title:title}
	err := o.Read(&org, "Title")
	if err == nil {
		return org
	} else {
		return nil
	}
}

func InsertOrg(title, mobile string) int64 {
	o := orm.NewOrm()

	var org Org
	org.Title = title
	org.Mobile = mobile
	org.CreationDate = time.Now()
	org.LastModifiedDate = time.Now()
	org.Mark = true

	id, err := o.Insert(&org)
	if err == nil {
		return id
	} else {
		return -1
	}
}