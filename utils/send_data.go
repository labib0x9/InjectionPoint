package utils

import (
	"encoding/json"
	"net/http"
)

func SendJson(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	if err := encoder.Encode(v); err != nil {
		w.WriteHeader(500)
	}
}
