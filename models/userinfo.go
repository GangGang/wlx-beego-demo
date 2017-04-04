package models

import "github.com/astaxie/beego/orm"

type Userinfo struct {
	Common
	Username string `orm:"size(16)"`
	Type string `orm:"size(1)"`
	Org *Org `orm:"rel(fk)"` //设置一对多关系
	Role string `orm:"size(8)"`
}

func init() {
	orm.RegisterModel(new(Userinfo))
}