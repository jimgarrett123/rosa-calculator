import awspricing

ec2_offer = awspricing.offer('AmazonEC2')

ec2_offer.search_skus(
  instance_type='c4.large',
  location='US East (N. Virginia)',
  operating_system='Linux',
)  # {'4C7N4APU9GEUZ6H6', 'MBQPYDJSY3BY84BH', 'MDKVAJXMJGZFDJUE'}

ec2_offer.reserved_hourly(
  'c4.xlarge',
  operating_system='Linux',
  lease_contract_length='3yr',
  offering_class='convertible',
  purchase_option='Partial Upfront',
  region='us-east-1'
)  # 0.10845205479452055

rds_offer = awspricing.offer('AmazonRDS')

rds_offer.search_skus(
  instance_type='db.m4.large',
  location='US East (N. Virginia)',
  database_engine='MySQL',
  license_model='No license required',
  deployment_option='Multi-AZ'
) # {'QPZNR6MYN432XTPU'}

rds_offer.ondemand_hourly(
  'db.m4.large',
  'MySQL',
  license_model='No license required',
  deployment_option='Multi-AZ',
  region='us-east-1'
) # 0.35