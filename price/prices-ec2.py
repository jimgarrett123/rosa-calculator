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


def get_ec2_products(ec2_type, region_name):
#    print("ec2_type = " + ec2_type)
#    print("region_name = " + region_name)

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

    p_length = len(products) 
    if  p_length == 0:
        return products

    vcpu = products[0]['product']['attributes']['vcpu']
    memory = products[0]['product']['attributes']['memory']

    onDemandProducts = products[0]['terms']['OnDemand']
    onDemandProductData = (list(onDemandProducts.values())
                        [0]['priceDimensions'])

    product = {
        "type": ec2_type,
        "priceOnDemand": list(onDemandProductData.values())[0]['pricePerUnit']['USD'],
        "vcpu": vcpu,
        "memory": memory
    }

    reservedProducts = products[0]['terms']['Reserved']
#    print(json.dumps(reservedProducts))
    for key in reservedProducts.keys():
        if reservedProducts[key]['termAttributes']['PurchaseOption'] != 'All Upfront':
            continue 
        if reservedProducts[key]['termAttributes']['OfferingClass'] != 'standard':
            continue

        priceDimensions = reservedProducts[key]['priceDimensions'].values()
        
        for priceDim in list(priceDimensions):
            if (priceDim['unit'] == 'Quantity'):
                product['price' + reservedProducts[key]['termAttributes']['LeaseContractLength']] = priceDim['pricePerUnit']['USD']

#    print(product)
    return product

if __name__ == '__main__':
    arg_ec2_types = ""
    arg_region_code = ""
    arg_ec2_plan = ""
    arg_help = "{0} -e <ec2-instance-types-comma-separated> -r <region>".format(
        sys.argv[0])

    try:
        opts, args = getopt.getopt(sys.argv[1:], "h:e:r:c:", ["help", "ec2-instance-types=",
                                                              "region="])
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
    ec2_types = arg_ec2_types.split(',')
    region_name = get_region_full_name(arg_region_code)
    client = boto3.client('pricing',  region_name='us-east-1')

    results = []
    with open('error.log', 'a') as error_file:
        for ec2_type in ec2_types:
            try:
                product = get_ec2_products(ec2_type, region_name)
                if len(product) != 0:
                    type = product["type"]
                    priceOnDemand = product["priceOnDemand"] 
                    price1yr = int(product["price1yr"])
                    price1yrHourly = price1yr/8760
                    price3yr = int(product["price3yr"])
                    price3yrHourly = price3yr/3/8760
                    cpu = int(product["vcpu"])
                    memory = product["memory"]
#                    print(type)
#                    print(price1yrHourly)
#                    print(price3yrHourly)
                    sql = "insert into instances (instance, instanceType, region, operatingSystem, ondemandprice, std_1yr_nuri_effhourly, std_3yr_auri_effhourly, cpu, memory) values ('" + region_name + "_" + type + "_" + "Linux'," + "'" + type + "'," + "'" + region_name + "'," + "'Linux'," + str(priceOnDemand) + "," + str(price1yrHourly) + "," + str(price3yrHourly) + "," + str(cpu) + ",'" + memory + "');"
#                    results.append(product)
                    print(sql)
            except:
                traceback._exc()
                error_file.write("[error] " + ec2_type + '/' + region_name + '\n') 

#        print(json.dumps(results))
