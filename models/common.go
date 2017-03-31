package models

import "time"

type Common struct {
	Id int `pk:"auto"`
	CreationDate time.Time
	LastModifiedDate time.Time
	Mark bool
}
