# Setting up the indexer in an EC2 instance

- Get creds.pem file
- SSH into the box - `ssh -i "creds.pem" ec2-user@ec2-3-212-207-78.compute-1.amazonaws.com`
- `vi setup.sh` and copy the setup.sh script into the box
- `chmod +x setup.sh`
- Create a fine grained access token for GitHub
  - https://github.com/settings/tokens?type=beta
- Clone repo using your username and the newly generated access token as the password
- `cd indexer/`
- Create .env file (use .env.example to see what values need to be set)
- `sudo docker-compose up -d`

# SSL setup

- Attach an elastic IP to the ec2 instance
- Open up port 80 and 443 from the ec2 console
- Create a godaddy CNAME of type A with the IP address as the value and cms as the name
- ssh into the box
- `sudo yum install nginx`
- `nginx -v` to verify install
- Start nginx `sudo systemctl start nginx`
- Edit nginx config `sudo vi /etc/nginx/conf.d/proxy.conf` and paste in the following

  ```sh
    server {
      listen 80;
      listen [::]:80;
      server_name graph.kintsu.xyz;
      location / {
          proxy_pass http://localhost:4000/graphql;
          proxy_http_version 1.1;
          proxy_set_header Host $host;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_cache_bypass $http_upgrade;
      }
    }
  ```

- Restart nginx `sudo systemctl restart nginx`
- Go to http://graph.kintsu.xyz/ to verify its working
- `sudo yum install -y certbot`
- `sudo yum install -y python3-certbot-nginx`
- `sudo certbot --nginx -d graph.kintsu.xyz` put in stephen@kintsu.xyz for email
- Test renewal of cert (should automatically do) `sudo certbot renew --dry-run`

# SSH into box w subdomain

- Once everything is configured you can ssh into the box like so `ssh -i "creds.pem" ec2-user@graph.kintsu.xyz`

# Pulling code updates

- ssh into box
- `cd indexer`
- `git pull` using your username and your generated access token as the password
- `sudo docker-compose down`
- `sudo docker-compose up -d`
- If you need to blow the database away to pick up new changes you may need to stop the container and run `docker stop `docker ps -qa` > /dev/null 2>&1; docker system prune --volumes --all;`
- Or you may delete the states collection from the database to begin indexing from the block stored in .env again
