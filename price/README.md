# EC2 Prices

Retrieves EC2 prices for the EC2 instance types supported by Red Hat OpenShift Service on AWS (ROSA).

The prices are retrieved from the [AWS Price List API](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/price-changes.html).

## Usage

### Option 1: retrieve all on-demand and 1 year EC2 prices for all regions

Prerequisites: Python 3, [rosa CLI](https://docs.openshift.com/rosa/rosa_cli/rosa-get-started-cli.html), `jq`

```bash
bash run.sh
```

- The rosa CLI is used to retrieve the list of supported instance types - see [data/rosa-ec2.json](data/rosa-ec2.json)
- The list of all regions is stored in [data/regions.json](data/regions.json)
- The EC2 prices last updated time is kept in the [out/info.json](out/info.json) for future reference
- The EC2 prices are stored in JSON files in the [out folder](out/) as per the following example of output:

```bash

[us-east-1] output file: out/us-east-1-ondemand.json
[us-east-2] output file: out/us-east-2-ondemand.json
[us-west-1] output file: out/us-west-1-ondemand.json
[us-west-2] output file: out/us-west-2-ondemand.json
[us-gov-west-1] output file: out/us-gov-west-1-ondemand.json
...
```

#### Option 2: retrieve prices for a given region, EC2 term, EC2 instance types or for EBS volumes

Prerequisites: python3

Usage:

- `<region-code>`: AWS Region ID (eg, `us-east-1`)
- `<ec2-types>`: Comma-separated list of EC2 instance types (eg, `m5.xlarge,r5.2xlarge`)
- `<ec2-term>`: EC2 term - accepted values: `JRTCKXETXF` (On-Demand) and `6QCMYABX3D` (1 year)

```bash
python3 prices-ec2.py \
  -r <region-code> \
  -e <ec2-types> \
  -c <ec2-term>
```

Example:

```bash
python3 prices-ec2.py \
  -r us-east-1 \
  -e m5.xlarge,r5.2xlarge,r5.4xlarge,m5.2xlarge,r5.xlarge,m5.2xlarge \
  -c 6QCMYABX3D
```

This command returns a JSON as per following example of output:

```json
[
  {
    "g4dn.12xlarge": "5.1900000000",
    "vcpu": "48",
    "memory": "192 GiB"
  },
  {
    "g4dn.16xlarge": "5.7740000000",
    "vcpu": "64",
    "memory": "256 GiB"
  },
  ...
]
```

```bash
python3 -e $(pwd)/data/ebs.json -r ap-southeast-2
```

## Troubleshooting

An `error.log` file is created when prices for specific EC2 instance types cannot be retrieved.

Errors are usually found on *uncommon* EC2 types - you will need to investigate them if you wish to use their prices in a ROSA cost estimate.

## Known issues

The following regions are currently unsupported:

- `sa-east-1`
- `ap-south-1`

## Resources

- [AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html)
- [Using the AWS Price List API](https://www.sentiatechblog.com/using-the-ec2-price-list-api)
