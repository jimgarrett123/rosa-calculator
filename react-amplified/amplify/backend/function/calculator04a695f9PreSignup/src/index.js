// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * The names of modules to load are stored as a comma-delimited string in the
 * `MODULES` env var.
 */
const moduleNames = process.env.MODULES.split(',');
/**
 * The array of imported modules.
 */
const modules = moduleNames.map(name => require(`./${name}`));

/**
 * This async handler iterates over the given modules and awaits them.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 */
exports.handler = async (event, context) => {
  /**
   * Instead of naively iterating over all handlers, run them concurrently with
   * `await Promise.all(...)`. This would otherwise just be determined by the
   * order of names in the `MODULES` var.
   */
  await Promise.all(modules.map(module => module.handler(event, context)));
  return event;
};
