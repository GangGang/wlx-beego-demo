FROM golang:latest
MAINTAINER WuMing wuming497735138@gmail.com

# Install beego & bee
RUN go get -u github.com/astaxie/beego
RUN go get -u github.com/beego/bee

ENV PORT 8080

EXPOSE 8080

CMD ["bee","run"]
