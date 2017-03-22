package main

import (
	"fmt"
	_ "wlx/routers"

	"github.com/astaxie/beego"
)

func main() {
	beego.Run()
	fmt.Println("测试")
}
