#!/bin/sh

for crontab in /crontabs/*; do
    if [ -f "$crontab" ]; then
        echo "Loading crontab: $crontab"
        cat "$crontab" >>/etc/crontabs/root
    fi
done

echo "Starting crond..."
crond -f -l 8
