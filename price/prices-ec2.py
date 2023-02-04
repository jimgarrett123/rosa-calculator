import json
import boto3
import sys
import getopt


def get_region_full_name(region_code):
    region_file = 'data/regions.json'
    with open(region_file, 'r') as f:
        regions = json.load(f)
        for region in regions:
            if region_code == region['code']:
                return region['full_name']
        raise Exception("Region \"" + region_code + "\" not found in " + region_file)


def get_ec2_products(ec2_type, ec2_plan, region_name):
    paginator = client.get_paginator('get_products')

    response_iterator = paginator.paginate(
        ServiceCode="AmazonEC2",
        Filters=[
            {
                'Type': 'TERM_MATCH',
                'Field': 'location',
                'Value': region_name
            },
            {
                'Type': 'TERM_MATCH',
                'Field': 'instanceType',
                'Value': ec2_type
            },
            {
                'Type': 'TERM_MATCH',
                'Field': 'capacitystatus',
                'Value': 'Used'
            },
            {
                'Type': 'TERM_MATCH',
                'Field': 'tenancy',
                'Value': 'Shared'
            },
            {
                'Type': 'TERM_MATCH',
                'Field': 'preInstalledSw',
                'Value': 'NA'
            },
            {
                'Type': 'TERM_MATCH',
                'Field': 'operatingSystem',
                'Value': 'Linux'
            },
            {
                'Type': 'TERM_MATCH',
                'Field': 'offerTermCode',
                'Value': ec2_plan
            }
        ],
        PaginationConfig={
            'PageSize': 100
        }
    )

    products = []
    for response in response_iterator:
        for priceItem in response["PriceList"]:
            priceItemJson = json.loads(priceItem)
            products.append(priceItemJson)

    onDemandProducts = products[0]['terms']['OnDemand']
    vcpu = products[0]['product']['attributes']['vcpu']
    memory = products[0]['product']['attributes']['memory']
    if (len(onDemandProducts.keys()) == 1):
        onDemandProduct = (list(onDemandProducts.values())
                           [0]['priceDimensions'])

        return {
            ec2_type: list(onDemandProduct.values())[0]['pricePerUnit']['USD'],
            "vcpu": vcpu,
            "memory": memory
        }

if __name__ == '__main__':

    arg_ec2_types = ""
    arg_region_code = ""
    arg_ec2_plan = ""
    arg_help = "{0} -e <ec2-instance-types-comma-separated> -r <region> -c <code-ondemand: JRTCKXETXF, 1 year: 6QCMYABX3D>".format(
        sys.argv[0])

    try:
        opts, args = getopt.getopt(sys.argv[1:], "h:e:r:c:", ["help", "ec2-instance-types=",
                                                              "region=", 'ec2-code='])
    except:
        print(arg_help)
        sys.exit(2)

    for opt, arg in opts:
        if opt in ("-h", "--help"):
            print(arg_help)  # print the help message
            sys.exit(2)
        elif opt in ("-e", "--ec2-instance-types"):
            arg_ec2_types = arg
        elif opt in ("-r", "--region"):
            arg_region_code = arg
        elif opt in ("-c", "--code"):  # on-demand code: JRTCKXETXF, 1 year: 6QCMYABX3D
            arg_ec2_plan = arg
    ec2_types = arg_ec2_types.split(',')
    region_name = get_region_full_name(arg_region_code)
    client = boto3.client('pricing',  region_name='us-east-1')

    results = []
    with open('error.log', 'a') as error_file:
        for ec2_type in ec2_types:
            try:
                product = get_ec2_products(ec2_type, arg_ec2_plan, region_name)
                results.append(product)
            except:
                error_file.write("[error] " + ec2_type + '/' + arg_ec2_plan + '/' + region_name + '\n') 

        print(json.dumps(results))
