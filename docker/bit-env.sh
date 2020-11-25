#!/bin/bash
#script gets run on login to set bit env.
eval "$(ssh-agent -s)"
ssh-add ./docker/bit-key
