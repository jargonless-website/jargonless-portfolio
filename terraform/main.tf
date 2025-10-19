locals {
  tunnel_name = "jargonless-main"
}

resource "random_id" "tunnel_secret" {
  byte_length = 35
}

resource "cloudflare_zero_trust_tunnel_cloudflared" "main" {
  account_id = var.cloudflare_account_id
  name       = local.tunnel_name
  secret     = random_id.tunnel_secret.b64_std
}

resource "cloudflare_record" "root" {
  zone_id         = var.cloudflare_zone_id
  name            = "@"
  type            = "CNAME"
  content         = cloudflare_zero_trust_tunnel_cloudflared.main.cname
  proxied         = true
  allow_overwrite = true
}

resource "cloudflare_record" "api" {
  zone_id         = var.cloudflare_zone_id
  name            = "api"
  type            = "CNAME"
  content         = cloudflare_zero_trust_tunnel_cloudflared.main.cname
  proxied         = true
  allow_overwrite = true
}

resource "cloudflare_record" "wildcard" {
  zone_id = var.cloudflare_zone_id
  name    = "*"
  type    = "CNAME"
  content = "jargonless.ai"
  proxied = true
}

output "tunnel_token" {
  value       = cloudflare_zero_trust_tunnel_cloudflared.main.tunnel_token
  description = "Use this token inside the cloudflared container on your NAS"
  sensitive   = true
}
