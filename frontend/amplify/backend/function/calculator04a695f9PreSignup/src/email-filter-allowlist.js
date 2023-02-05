// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
exports.handler = async event => {
  // allowed domains
  const ald = process.env.DOMAINALLOWLIST.split(',').map(d => d.trim());

  const { email } = event.request.userAttributes;
  const domain = email.substring(email.indexOf('@') + 1);

  if (!ald.includes(domain)) {
    throw new Error(`Invalid email domain: ${domain}`);
  }

  return event;
};
