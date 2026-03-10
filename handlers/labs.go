package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/labib0x9/ProjectUnsafe/model"
)

func GetAllLabs(w http.ResponseWriter, r *http.Request) {
	encoder := json.NewEncoder(w)
	encoder.Encode(model.LabList)
}

func GetLabByID(w http.ResponseWriter, r *http.Request)     {}
func StartLab(w http.ResponseWriter, r *http.Request)       {}
func ResetLab(w http.ResponseWriter, r *http.Request)       {}
func TerminateLab(w http.ResponseWriter, r *http.Request)   {}
func GetHintByLabID(w http.ResponseWriter, r *http.Request) {}
