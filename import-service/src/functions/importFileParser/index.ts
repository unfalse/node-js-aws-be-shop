import { BUCKET } from '@libs/const';
import { handlerPath } from '@libs/handlerResolver';

export const importFileParser = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        event: 's3:ObjectCreated:*',
        bucket: BUCKET,
        rules: [
          {
            prefix: 'uploaded/',
            suffix: 'csv'
          }
        ],
        existing: true
      }
    }
  ]
}
