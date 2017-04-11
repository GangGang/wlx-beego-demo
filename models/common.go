package models

import "time"

type Common struct {
	Id uint `pk:"auto"`
	CreationDate time.Time
	LastModifiedDate time.Time
	Mark bool
}
