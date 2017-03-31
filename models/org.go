package models

type Org struct {
	Common
	Title string `orm:"size(32)"`
	Mobile string `orm:"size(16)"`
}
