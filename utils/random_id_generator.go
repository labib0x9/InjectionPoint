package utils

import (
	"github.com/google/uuid"
)

func Generate_Random_ID() uuid.UUID {
	id, err := uuid.NewRandom()
	if err != nil {
		panic(err)
	}
	return id
}
