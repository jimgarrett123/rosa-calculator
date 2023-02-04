import json
import sys
import getopt


def get_region_code(region_name):
    region_file = 'data/regions.json'
    with open(region_file, 'r') as f:
        regions = json.load(f)
        for region in regions:
            if region_name == region['full_name']:
                return region['code']
        raise Exception("Region \"" + region_name + "\" not found in " + region_file)

if __name__ == '__main__':

    arg_ebs_file = ""
    arg_help = "{0} -e <ebs-file> -r <region-code>".format(
        sys.argv[0])

    try:
        opts, args = getopt.getopt(sys.argv[1:], "h:e:r:c:", ["help", "ebs-file=", "region-code="])
    except:
        print(arg_help)
        sys.exit(2)

    for opt, arg in opts:
        if opt in ("-h", "--help"):
            print(arg_help)  # print the help message
            sys.exit(2)
        elif opt in ("-e", "--ebs-file"):
            arg_ebs_file = arg
        elif opt in ("-r", "--region-code"):
            arg_region_code = arg

        with open('error.log', 'a') as error_file:
            with open(arg_ebs_file, 'r') as file:
                data = json.load(file)
                for region in data['regions']:
                    try:
                        region_code = get_region_code(region)
                        if arg_region_code == region_code:
                            print(json.dumps(data['regions'][region]))
                    except:
                        error_file.write("[error] " + region + 'not found in EBS data\n')
    