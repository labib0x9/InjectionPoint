package main

import (
	"log/slog"
	"net/http"
)

func main() {

	fs := http.FileServer(http.Dir("./www"))
	http.Handle("/", fs)

	slog.Info("Starting Server at http://127.0.0.1:8080/")
	http.ListenAndServe(":8080", nil)
}
