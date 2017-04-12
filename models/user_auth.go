package models

import (
	"github.com/astaxie/beego/orm"
	"time"
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
	userAuth.CreationDate = time.Now()
	userAuth.LastModifiedDate = time.Now()
	userAuth.Mark = true

	_, err := o.Insert(&userAuth)
	if err == nil {
		return userAuth
	} else {
		return nil
	}
}

func FindOneByTypeAndIdentifier(identityType, identifier string) (bool, *UserAuth) {
	o := orm.NewOrm()

	userAuth := UserAuth{IdentityType:identityType, Identifier:identifier}
	err := o.QueryTable("user_auth").Filter("identity_type", "identifier").One(&userAuth)
	if err == nil {
		return true,&userAuth
	} else {
		return false,&userAuth
	}
}
