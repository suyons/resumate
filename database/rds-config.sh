#!/bin/bash

# 참고 문서
# https://hons.io/how-to-ufw-port-forward/

# EC2에서 RDS에 접속하기 위해 실행한 명령어
apt list mysql-client*
apt install mysql-client-core-8.0
mysql -V

# mysql  Ver 8.0.36-0ubuntu0.22.04.1 for Linux on x86_64 ((Ubuntu))

mysql -u root -h {MYSQL_ENDPOINT} -p
# Enter password: {MYSQL_PASSWORD}

# UFW 3306 포트 포워딩 설정
sudo -s
ufw allow 3306
ufw route allow proto tcp from any to {RDS_INSTANCE_IP} port 3306
ufw status

# Status: active

# To                         Action      From
# --                         ------      ----
# 22/tcp                     ALLOW       Anywhere                  
# 22                         ALLOW       Anywhere                  
# 443                        ALLOW       Anywhere                  
# 8080                       ALLOW       Anywhere                  
# 80                         ALLOW       Anywhere                  
# 3306                       ALLOW       Anywhere                  
# 22/tcp (v6)                ALLOW       Anywhere (v6)             
# 22 (v6)                    ALLOW       Anywhere (v6)             
# 443 (v6)                   ALLOW       Anywhere (v6)             
# 8080 (v6)                  ALLOW       Anywhere (v6)             
# 80 (v6)                    ALLOW       Anywhere (v6)             
# 3306 (v6)                  ALLOW       Anywhere (v6)             

# 172.31.64.78 3306/tcp      ALLOW FWD   Anywhere

vim /etc/default/ufw
# DEFAULT_FORWARD_POLICY="ACCEPT"

vim /etc/ufw/sysctl.conf
# net/ipv4/ip_forward=1
# net/ipv6/conf/default/forwarding=1
# net/ipv6/conf/all/forwarding=1

vim /etc/ufw/before.rules

#   ufw-before-output
#   ufw-before-forward
#

# NAT
# *nat
# :PREROUTING ACCEPT [0:0]

# -A PREROUTING -i eth0 -p tcp --dport 3306 -j DNAT --to-destination 172.31.64.78:3306
# -A PREROUTING -i eth1 -p tcp --dport 3306 -j DNAT --to-destination 172.31.64.78:3306
# -A POSTROUTING -j MASQUERADE

# COMMIT

# Don't delete these required lines, otherwise there will be errors

ufw reload

iptables -t nat -L -v

# Chain PREROUTING (policy ACCEPT 0 packets, 0 bytes)
#  pkts bytes target     prot opt in     out     source               destination         
#     0     0 DNAT       tcp  --  eth0   any     anywhere             anywhere             tcp dpt:mysql to:172.31.64.78:3306
#     0     0 DNAT       tcp  --  eth1   any     anywhere             anywhere             tcp dpt:mysql to:172.31.64.78:3306

# Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
#  pkts bytes target     prot opt in     out     source               destination         

# Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)
#  pkts bytes target     prot opt in     out     source               destination         

# Chain POSTROUTING (policy ACCEPT 0 packets, 0 bytes)
#  pkts bytes target     prot opt in     out     source               destination         
#    14  1016 MASQUERADE  all  --  any    any     anywhere             anywhere

reboot

# 이후 로컬 PC에서 RDS에서 구동되는 MySQL에 접속
mysql -h {MYSQL_ENDPOINT} -D resumate -u kosmo -p
# Enter password: {MYSQL_PASSWORD}