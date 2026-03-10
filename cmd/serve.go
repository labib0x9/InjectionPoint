package cmd

import (
	"log"
	"log/slog"
	"net/http"

	"github.com/labib0x9/ProjectUnsafe/middleware"
)

func Server() {

	manager := middleware.NewManager()
	manager.Use(
		middleware.Cors,
		middleware.Preflight,
		middleware.Logger,
	)

	mux := http.NewServeMux()
	wrappedMux := manager.WrapMux(mux)

	initRoutes(mux, manager)

	slog.Info("Starting Server at http://127.0.0.1:8080/")
	log.Fatal(http.ListenAndServe(":8080", wrappedMux))
}
