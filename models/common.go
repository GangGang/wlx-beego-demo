package models

import "time"

type Common struct {
	Id               int64  `pk:"auto"`
	CreationDate     time.Time
	LastModifiedDate time.Time
	Mark             bool
}
