# Cost estimate

## Install

```bash
npm install
```

## CLI usage, CSV output

The following CLI can be used to generated a CSV which can combine cost estimates for multiple environments and for both single and multi AZ.

Example of use:

```bash
npm run cost $(pwd)/../packages/cost/data/rosa-pricing-page/ $(pwd)/../price/out/us-east-1-ondemand.json $(pwd)/../price/out/us-east-1-ebs.json
```

- 1st argument: path to a directory containing the input data (worker nodes to use). You can create a CSV per environment for example in this folder. Each CSV must provide 1 line per worker node. Each line is provide the EC2 instance type.
- 2nd argument: Amazon EC2 price file 
- 3nd argument: Amazon EBS price file

## Test

```bash
npm run test
```