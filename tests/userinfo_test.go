package test

import (
	"testing"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func TestUserinfo(t *testing.T) {
	orm.Debug = true
	orm.RegisterDataBase("default", "mysql", "root:123456@/wlx?charset=utf8")
	o := orm.NewOrm()
	//userinfo := new(models.Userinfo)
	res, err := o.Raw("SELECT * FROM `userinfo`").Exec()
	if err == nil {
		num, _ := res.RowsAffected()
		t.Log("mysql row affected nums: ", num)
	} else {
		t.Error("err is:",err.Error())
	}
}
