package models

import (
	"time"
	"github.com/astaxie/beego/orm"
)

type UserToken struct {
	Id          int64  `pk:"auto"`
	Username    string
	Token       string
	Type        string
	ExpiredTime time.Time
}

func init() {
	orm.RegisterModel(new(UserToken))
}

func InsertUserToken(username, token, userType string) (bool, *UserToken) {
	o := orm.NewOrm()

	userToken := UserToken{Username:username, Token:token, Type:userType, ExpiredTime:time.Now().Add(72 * time.Hour)}
	_, err := o.Insert(&userToken)
	if err == nil {
		return true, &userToken
	} else {
		return false,&userToken
	}
}

func FindOneByTokenAndType(token, userType string) (bool, *UserToken) {
	o := orm.NewOrm()

	userToken := UserToken{Token:token, Type:userType}
	err := o.QueryTable("user_token").Filter("token", "type").One(&userToken)
	if err == nil {
		return true, &userToken
	} else {
		return false, &userToken
	}
}
