#!/bin/bash

curl \
    -L \
    --url "http://ixirc.com/api?q=arrival 2016 720p bluray&cid=92" \
| jq -r '.results'