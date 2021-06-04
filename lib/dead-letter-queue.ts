import cloudwatch = require("@aws-cdk/aws-cloudwatch");
import sqs = require("@aws-cdk/aws-sqs");
import { Construct, Duration } from "@aws-cdk/core";

export class DeadLetterQueue extends sqs.Queue {
  public readonly messagesInQueueAlarm: cloudwatch.IAlarm;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.messagesInQueueAlarm = new cloudwatch.Alarm(this, "Alarm", {
      alarmDescription: "There are messages in the Dead Letter Queue",
      evaluationPeriods: 1,
      threshold: 1,
      metric: this.metricApproximateNumberOfMessagesVisible().with({
        period: Duration.minutes(1),
      }),
    });
  }
}
