terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.34"
    }
  }
  required_version = ">= 1.6.0"
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
