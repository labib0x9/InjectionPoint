package model

import (
	"time"

	"github.com/google/uuid"
)

// admin = Admin (ROOT), user = Non-admin, anon = Guest user
type User struct {
	Role       string `json:"role"`
	Username   string `json:"username"`
	Password   string
	UUID       uuid.UUID `json:"id"`
	CreatedAt  time.Time
	ExpiredAt  time.Time
	SolvedLabs []string
}

// // guest user
// type AnonUser struct {
// }

var UserList []User

// var AnonUserList []AnonUser
var Count uint64 = 0
