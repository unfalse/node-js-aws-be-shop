import 'source-map-support/register';

import { S3CreateEvent } from 'aws-lambda';
import AWS from 'aws-sdk';
import csvParser from 'csv-parser';

import { formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { BUCKET, PARSED, UPLOADED } from '@libs/const';

export const importFileParser = async (event: S3CreateEvent) => {
    console.log('importFileParser lambda is executing', {
        records: event.Records
    });

    const { Records } = event;
    const s3 = new AWS.S3({ region: 'eu-west-1' });
    const sqs = new AWS.SQS();

    await Promise.all(
        Records.map(rec => 
            new Promise<void>((resolve, reject) =>
                s3.getObject({
                    Bucket: BUCKET,
                    Key: rec.s3.object.key
                })
                .createReadStream()
                .pipe(csvParser())
                .on('data', data => {
                    sqs.sendMessage({
                        QueueUrl: process.env.SQS_QUEUE_URL,
                        MessageBody: JSON.stringify(data)
                    }, (error, sentData) => {
                        console.log('Sent message: ', {error, sentData, data});
                    });
                })
                .on('end', async () => {
                    const { key } = rec.s3.object;
                    console.log('key of record: ', key);
                    if (key !== UPLOADED && key.slice(0, UPLOADED.length) === UPLOADED) {
                        const fileName = key.slice(UPLOADED.length);
                        console.log('fileName: ', fileName);
                        console.log('copying...');
                        await s3.copyObject({
                            Bucket: BUCKET,
                            CopySource: BUCKET + '/' + key,
                            Key: PARSED + fileName
                        }).promise();
                        console.log('deleting...');
                        await s3.deleteObject({
                            Bucket: BUCKET,
                            Key: key
                        }).promise();
                    }
                    console.log('done!');
                    resolve();
                })
                .on('error', reject)
            )
        )
    );
    return formatResponse();
}

export const main = middyfy(importFileParser);
