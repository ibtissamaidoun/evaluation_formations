#!/bin/bash

echo "Waiting for Kafka to be ready..."
sleep 30

echo "Creating Kafka topics..."

# Topic pour les événements utilisateur
docker exec kafka kafka-topics --create \
  --topic user-events \
  --bootstrap-server localhost:9092 \
  --replication-factor 1 \
  --partitions 3

# Topic pour les notifications
docker exec kafka kafka-topics --create \
  --topic notifications \
  --bootstrap-server localhost:9092 \
  --replication-factor 1 \
  --partitions 3

# Topic pour les événements de cours
docker exec kafka kafka-topics --create \
  --topic course-events \
  --bootstrap-server localhost:9092 \
  --replication-factor 1 \
  --partitions 3

# Topic pour les évaluations
docker exec kafka kafka-topics --create \
  --topic evaluation-events \
  --bootstrap-server localhost:9092 \
  --replication-factor 1 \
  --partitions 3

# Topic pour les événements d'authentification
docker exec kafka kafka-topics --create \
  --topic auth-events \
  --bootstrap-server localhost:9092 \
  --replication-factor 1 \
  --partitions 3

echo "Listing created topics:"
docker exec kafka kafka-topics --list --bootstrap-server localhost:9092

echo "Kafka setup completed!"