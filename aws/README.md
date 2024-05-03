# Setting up the indexer in an EC2 instance

- Get creds.pem file
- SSH into the box - `ssh -i "creds.pem" ec2-user@ec2-54-234-63-208.compute-1.amazonaws.com`
- `vi setup.sh` and copy the setup.sh script into the box
- `chmod +x setup.sh`
- Create a fine grained access token for GitHub
  - https://github.com/settings/tokens?type=beta
- Clone repo using your username and the newly generated access token as the password
- `cd indexer/`
- Create .env file (use .env.example to see what values need to be set)
- `docker-compose up -d`

# Pulling code updates

- ssh into box
- `cd indexer`
- `git pull` using your username and your generated access token as the password
- `docker-compose down`
- `docker-compose up -d`
- If you need to blow the database away to pick up new changes you may need to stop the container and run `docker system prune -a`
- Or you may delete the states collection from the database to begin indexing from the block stored in .env again
