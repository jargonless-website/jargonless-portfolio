COMPOSE := docker compose -f infra/compose/docker-compose.yml

.PHONY: up down restart logs api-shell

up:
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) down && $(COMPOSE) up -d --build

logs:
	$(COMPOSE) logs -f

api-shell:
	$(COMPOSE) exec api sh
