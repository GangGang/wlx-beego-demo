package models

type Userinfo struct {
	Common
	Username string `orm:"size(16)"`
	Type string `orm:"size(1)"`
	Org *Org `orm:"rel(fk)"` //设置一对多关系
	Role string `orm:"size(8)"`
}
