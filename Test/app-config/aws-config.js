// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
var aws_app_analytics = 'enable';
var aws_cognito_identity_pool_id = 'us-east-1:d1a65055-96ee-4cdb-bf21-2121fd96673e';
var aws_cognito_region = 'us-east-1';
var aws_content_delivery = 'enable';
var aws_content_delivery_bucket = 'pfp-hosting-mobilehub-502769725';
var aws_content_delivery_bucket_region = 'us-east-1';
var aws_content_delivery_cloudfront = 'enable';
var aws_content_delivery_cloudfront_domain = 'd1eg12o4u5gzoy.cloudfront.net';
var aws_mobile_analytics_app_id = 'f021431df4bd43659d993057b0e088b4';
var aws_mobile_analytics_app_region = 'us-east-1';
var aws_project_id = '5784809e-ba43-45b1-a300-e8874f03fc74';
var aws_project_name = 'PFP';
var aws_project_region = 'us-east-1';
var aws_resource_name_prefix = 'pfp-mobilehub-502769725';

AWS.config.region = aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: aws_cognito_identity_pool_id
  }, {
    region: aws_cognito_region
  });
AWS.config.update({customUserAgent: 'MobileHub v0.1'});
