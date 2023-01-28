#!/bin/bash

set -eu

function join_by {
  local d=${1-} f=${2-}
  if shift 2; then
    printf %s "$f" "${@/#/$d}"
  fi
}

function get_price() {
    PRICE_REGION=$1
    EC2_TYPES=$2

    # OUT_FILE="out/$PRICE_REGION-ondemand.json"
    # python3 prices.py -r "$PRICE_REGION" -e "${EC2_TYPES}" -c JRTCKXETXF > "${OUT_FILE}"
    # jq . "${OUT_FILE}" > temp && mv temp "${OUT_FILE}"
    # echo  "[${PRICE_REGION}] output file: ${OUT_FILE}"
    sleep 5

    OUT_FILE="out/$PRICE_REGION-1year.json"
    python3 prices.py -r "$PRICE_REGION" -e "${EC2_TYPES}" -c 6QCMYABX3D > "${OUT_FILE}"
    jq . "${OUT_FILE}" > temp && mv temp "${OUT_FILE}"
    echo  "[${PRICE_REGION}] output file: ${OUT_FILE}"
}
rosa list instance-types -o json | jq -r ".[].id" > data/rosa-ec2.json
ROSA_EC2_TYPES_DATA=$(cat data/rosa-ec2.json)
ROSA_EC2_TYPES=$(join_by "," $ROSA_EC2_TYPES_DATA)

get_price "us-east-1" "${ROSA_EC2_TYPES}"
get_price "us-east-2"  "${ROSA_EC2_TYPES}"
get_price "us-west-1"  "${ROSA_EC2_TYPES}"
get_price "us-west-2"  "${ROSA_EC2_TYPES}"
get_price "us-gov-west-1"  "${ROSA_EC2_TYPES}"
get_price "us-gov-east-1"  "${ROSA_EC2_TYPES}"
get_price "ca-central-1"  "${ROSA_EC2_TYPES}"
get_price "eu-north-1"  "${ROSA_EC2_TYPES}"
get_price "eu-west-1"  "${ROSA_EC2_TYPES}"
get_price "eu-west-2"  "${ROSA_EC2_TYPES}"
get_price "eu-west-3"  "${ROSA_EC2_TYPES}"
get_price "eu-central-1"  "${ROSA_EC2_TYPES}"
get_price "eu-south-1"  "${ROSA_EC2_TYPES}"
get_price "af-south-1"  "${ROSA_EC2_TYPES}"
get_price "ap-northeast-1"  "${ROSA_EC2_TYPES}"
get_price "ap-northeast-2"  "${ROSA_EC2_TYPES}"
get_price "ap-northeast-3"  "${ROSA_EC2_TYPES}"
get_price "ap-southeast-1"  "${ROSA_EC2_TYPES}"
get_price "ap-southeast-2"  "${ROSA_EC2_TYPES}"
get_price "ap-southeast-3"  "${ROSA_EC2_TYPES}"
get_price "ap-east-1"  "${ROSA_EC2_TYPES}"
get_price "me-south-1"  "${ROSA_EC2_TYPES}"
get_price "cn-north-1"  "${ROSA_EC2_TYPES}"
get_price "cn-northwest-1"  "${ROSA_EC2_TYPES}"

timestamp=$(date +%s)
echo "{\"last_updated\": ${timestamp}}" > out/info.json
jq . "out/info.json" > temp && mv temp "out/info.json"

## Currently Unsupported regions
# get_price "sa-east-1"  "${ROSA_EC2_TYPES}"
# get_price "ap-south-1"  "${ROSA_EC2_TYPES}"