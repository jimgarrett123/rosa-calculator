#!/bin/bash

set -eu

current_script_path="$(cd "$(dirname "$0")" && pwd -P)/$(basename "$0")"
current_script_dir=$(dirname "$current_script_path")

function join_by {
  local d=${1-} f=${2-}
  if shift 2; then
    printf %s "$f" "${@/#/$d}"
  fi
}

function get_ebs_price() {
  DATA_FILE="data/ebs.json"
  curl -q 'https://calculator.aws/pricing/2.0/meteredUnitMaps/ec2/USD/current/ebs-calculator.json' --compressed > "${DATA_FILE}"
  jq . "${DATA_FILE}" > temp && mv temp "${DATA_FILE}"
}

function get_price() {
    PRICE_REGION=$1
    EC2_TYPES=$2

#    OUT_FILE="out/$PRICE_REGION-ebs.json"
#    python3 prices-ebs.py -e "${current_script_dir}/data/ebs.json" -r "$PRICE_REGION" > "${OUT_FILE}"
#    jq . "${OUT_FILE}" > temp && mv temp "${OUT_FILE}"
#    echo  "[${PRICE_REGION}] output file: ${OUT_FILE}"

#    OUT_FILE="out/$PRICE_REGION-ec2.sql"
    python3 prices-ec2.py -r "$PRICE_REGION" -e "${EC2_TYPES}" >> "${OUT_FILE}"
#    jq . "${OUT_FILE}" > temp && mv temp "${OUT_FILE}"
    echo  "[${PRICE_REGION}] output file: ${OUT_FILE}"
    sleep 5
}
rosa list instance-types -o json | jq -r ".[].id" > data/rosa-ec2.json
ROSA_EC2_TYPES_DATA=$(cat data/rosa-ec2.json)
ROSA_EC2_TYPES=$(join_by "," $ROSA_EC2_TYPES_DATA)
OUT_FILE="out/ec2.sql"  
#touch ${OUT_FILE}
#rm ${OUT_FILE}
get_ebs_price

echo us-east-1
get_price "us-east-1" "${ROSA_EC2_TYPES}"
echo us-east-2
get_price "us-east-2"  "${ROSA_EC2_TYPES}"
echo us-west-1
get_price "us-west-1"  "${ROSA_EC2_TYPES}"
echo us-west-2
get_price "us-west-2"  "${ROSA_EC2_TYPES}"
echo us-gov-west-1
get_price "us-gov-west-1"  "${ROSA_EC2_TYPES}"
echo us-gov-east-1
get_price "us-gov-east-1"  "${ROSA_EC2_TYPES}"
echo us-central-1
get_price "ca-central-1"  "${ROSA_EC2_TYPES}"
echo eu-north-1
get_price "eu-north-1"  "${ROSA_EC2_TYPES}"
echo eu-west-1
get_price "eu-west-1"  "${ROSA_EC2_TYPES}"
echo eu-west-2
get_price "eu-west-2"  "${ROSA_EC2_TYPES}"
echo eu-west-3
get_price "eu-west-3"  "${ROSA_EC2_TYPES}"
echo eu-central-1
get_price "eu-central-1"  "${ROSA_EC2_TYPES}"
echo eu-south-1
get_price "eu-south-1"  "${ROSA_EC2_TYPES}"
echo af-south-1
get_price "af-south-1"  "${ROSA_EC2_TYPES}"
echo ap-northeast-1
get_price "ap-northeast-1"  "${ROSA_EC2_TYPES}"
echo ap-northeast02
get_price "ap-northeast-2"  "${ROSA_EC2_TYPES}"
echo ap-northeast-3
get_price "ap-northeast-3"  "${ROSA_EC2_TYPES}"
echo ap-sourheast-1
get_price "ap-southeast-1"  "${ROSA_EC2_TYPES}"
echo ap-southeast-2
get_price "ap-southeast-2"  "${ROSA_EC2_TYPES}"
echo ap-southeast-3
get_price "ap-southeast-3"  "${ROSA_EC2_TYPES}"
echo ap-east-1
get_price "ap-east-1"  "${ROSA_EC2_TYPES}"
#get_price "me-south-1"  "${ROSA_EC2_TYPES}"
#get_price "cn-north-1"  "${ROSA_EC2_TYPES}"
#get_price "cn-northwest-1"  "${ROSA_EC2_TYPES}"

timestamp=$(date +%s)
echo "{\"last_updated\": ${timestamp}}" > out/info.json
jq . "out/info.json" > temp && mv temp "out/info.json"

## Currently Unsupported regions
# get_price "sa-east-1"  "${ROSA_EC2_TYPES}"
# get_price "ap-south-1"  "${ROSA_EC2_TYPES}"