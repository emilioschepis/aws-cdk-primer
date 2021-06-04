import { SynthUtils } from "@aws-cdk/assert";
import { Stack } from "@aws-cdk/core";
import "@aws-cdk/assert/jest";

import dlq = require("../lib/dead-letter-queue");

test("snapshot: dlq creates an alarm", () => {
  const stack = new Stack();
  new dlq.DeadLetterQueue(stack, "DLQ");
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test("unit: dlq creates an alarm", () => {
  const stack = new Stack();
  new dlq.DeadLetterQueue(stack, "DLQ");
  expect(stack).toHaveResource("AWS::CloudWatch::Alarm", {
    MetricName: "ApproximateNumberOfMessagesVisible",
    Namespace: "AWS/SQS",
  });
});
