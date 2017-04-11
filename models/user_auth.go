package models

import (
	"github.com/astaxie/beego/orm"
)

type UserAuth struct {
	Common
	UserinfoId   int64
	IdentityType string
	Identifier   string
	Credential   string
	Salt         string
}

func init() {
	orm.RegisterModel(new(UserAuth))
}

func InsertUserAuth(userinfoId int64, identityType, identifier, credential, salt string) interface{} {
	o := orm.NewOrm()

	userAuth := UserAuth{UserinfoId:userinfoId, IdentityType:identityType, Identifier:identifier, Credential:credential, Salt:salt}
	_, err := o.Insert(&userAuth)
	if err == nil {
		return userAuth
	} else {
		return nil
	}
}
