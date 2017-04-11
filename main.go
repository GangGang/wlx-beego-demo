package main

import (
	"fmt"
	"html/template"
	"path/filepath"
	_ "wlx/routers"

	"github.com/Joker/jade"
	"github.com/astaxie/beego"
	"wlx/utils"
	_ "github.com/astaxie/beego/session/redis"
	_ "github.com/go-sql-driver/mysql"
	"github.com/astaxie/beego/orm"
)

func init() {
	orm.RegisterDriver("mysql", orm.DRMySQL)
	orm.RegisterDataBase("default","mysql","root:123456@/wlx?charset=utf8")
}

func main() {
	addJadeTemplate()
	orm.Debug = true
	beego.Run()
}
func addJadeTemplate() {
	beego.AddTemplateEngine("jade", func(root, path string, funcs template.FuncMap) (*template.Template, error) {
		jadePath := filepath.Join(root, path)
		content, err := utils.ReadFile(jadePath)
		if err != nil {
			return nil, fmt.Errorf("error loading jade template: %v", err)
		}
		tpl, err := jade.Parse("name_of_tpl", content)
		if err != nil {
			return nil, fmt.Errorf("error loading jade template: %v", err)
		}
		tmp := template.New("Person template")
		tmp, err = tmp.Parse(tpl)
		if err != nil {
			return nil, fmt.Errorf("error loading jade template: %v", err)
		}
		return tmp, err
	})
}
