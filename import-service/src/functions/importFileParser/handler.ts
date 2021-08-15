import 'source-map-support/register';

import { S3CreateEvent } from 'aws-lambda';
import AWS from 'aws-sdk';
import csvParser from 'csv-parser';

import { formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { BUCKET } from '@libs/const';

export const importFileParser = async (event: S3CreateEvent) => {
    console.log('importFileParser lambda is executing', {
        records: event.Records
    });

    const { Records } = event;
    const s3 = new AWS.S3({ region: 'eu-west-1' });

    await Promise.all(
        Records.map(rec => 
            new Promise((resolve, reject) =>
                s3.getObject({
                    Bucket: BUCKET,
                    Key: rec.s3.object.key
                })
                .createReadStream()
                .pipe(csvParser())
                .on('data', data => {
                    console.log(data);
                })
                .on('end', resolve)
                .on('error', reject)
            )
        )
    );

    return formatResponse();
}

export const main = middyfy(importFileParser);
