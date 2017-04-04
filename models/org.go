package models

import "github.com/astaxie/beego/orm"

type Org struct {
	Common
	Title  string `orm:"size(32)"`
	Mobile string `orm:"size(16)"`
}

func init() {
	orm.RegisterModel(new(Org))
}
