package cronjobs

import (
	"github.com/npalladium/cryptex/server/pkg/auth"
	"github.com/npalladium/cryptex/server/pkg/db"
	"github.com/robfig/cron/v3"
)

func Init() {
	c := cron.New()
	c.AddFunc("@every 2s", db.UpdateLeaderboard)
	c.AddFunc("@every 5h", auth.DownloadJWKS)
	c.Start()
}
